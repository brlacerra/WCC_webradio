const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const cron = require('node-cron');
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());


const port = 2333;

app.use(express.static(path.join(__dirname, '../../frontend')));
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend', 'radio.html'));
});

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'wcc'
});

conexao.connect((erro) =>{
    if(erro){
        console.error("Erro ao conetar ao mysql: ", erro);
        return;
    }
    console.log('Conectado ao MySql!');
});

cron.schedule('0 * * * *', () => {
    console.log('Processando médias do dia...');

    // Chamar o próprio endpoint localmente
    fetch('http://localhost:2333/processarMediasDoDia', { method: 'POST' })
        .then(response => {
            if (!response.ok) throw new Error('Erro ao processar médias');
            return response.json();
        })
        .then(data => {
            console.log('Médias processadas automaticamente:', data);
        })
        .catch(error => {
            console.error('Erro no processamento automático:', error);
        });

}, {
    timezone: "America/Sao_Paulo"
});


app.get('/dados', (req, res) => {
    conexao.query('SELECT * FROM musica', (erro, resultados) => {
      if (erro) {
        console.error(erro);
        return res.status(500).json({ erro: 'Erro ao buscar dados', detalhes: erro });
      }
      res.json(resultados);
    });
});
app.use(express.json()); // Para o express entender JSON no corpo da requisição

app.post('/musica', (req, res) => {
    const { id, vezesTocada, mediaVolume, ranking } = req.body;
    conexao.query('SELECT * FROM musica WHERE musica_id = ?', [id], (erro, resultados) => {
        if (erro) {
            console.error(erro);
            return res.status(500).json({ erro: 'Erro ao buscar música' });
        }

        if (resultados.length > 0) {
            // Música existe → UPDATE
            conexao.query(
                'UPDATE musica SET times_played = ?, volume_1 = ?, volume_2 = ?, volume_3 = ?, volume_4 = ?, volume_5 = ?, volume_6 = ?, ranking_1 = ?, ranking_2 = ?, ranking_3 = ?, ranking_4 = ?, ranking_5 = ?, ranking_6 = ? WHERE musica_id = ?',
                [vezesTocada, ...mediaVolume, ...ranking, id],
                (erro) => {
                    if (erro) {
                        console.error(erro);
                        return res.status(500).json({ erro: 'Erro ao atualizar música' });
                    }
                    res.json({ mensagem: 'Música atualizada com sucesso' });
                }
            );
        } else {
            // Música não existe → INSERT
            conexao.query(
                'INSERT INTO musica (musica_id, times_played, volume_1, volume_2, volume_3, volume_4, volume_5, volume_6, ranking_1, ranking_2, ranking_3, ranking_4, ranking_5, ranking_6) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [id, vezesTocada,  ...mediaVolume, ...ranking],
                (erro) => {
                    if (erro) {
                        console.error(erro);
                        return res.status(500).json({ erro: 'Erro ao inserir música' });
                    }
                    res.json({ mensagem: 'Música inserida com sucesso' });
                }
            );
        }
    });
});
app.post('/saveReprodution', (req, res) =>{
    const {id, mediaVolume} = req.body;
    conexao.query('INSERT INTO musica_reproducao (musica_id, volume) VALUES (?, ?)',
        [id, mediaVolume],
        (erro) => {
            if(erro){
                console.error(erro);
                return res.status(500).json({erro: 'Erro ao salvar reprodução '})
            }
            res.json({mensagem: 'Registro de musica realizado com sucesso'});
        }
    )
});

app.post('/processarMediasDoDia', (req, res) => {
    const hoje = new Date();
    const offsetBrasilia = -3 * 60; // 3 horas em minutos
    const dataHoje = new Date(hoje.getTime() + offsetBrasilia * 60000)
                    .toISOString()
                .slice(0, 10);
    console.log(hoje);
    conexao.query(
        `SELECT musica_id, AVG(volume) AS mediaVolume
         FROM musica_reproducao
         WHERE DATE(data_execucao) = ?
         GROUP BY musica_id`,
        [dataHoje], (erro, resultados) => {
            if (erro) {
                console.error(erro);
                return res.status(500).json({ erro: 'Erro ao calcular médias' });
            }
            console.log(resultados.length);
            if (resultados.length === 0) {
                return res.json({ mensagem: 'Nenhuma reprodução para processar hoje' });
            }

            let atualizacoesPendentes = resultados.length;

            resultados.forEach((musica) => {
                const { musica_id, mediaVolume } = musica;

                conexao.query(
                    `UPDATE musica
                     SET volume_1 = volume_2,
                         volume_2 = volume_3,
                         volume_3 = volume_4,
                         volume_4 = volume_5,
                         volume_5 = volume_6,
                         volume_6 = ?
                     WHERE musica_id = ?`,
                    [mediaVolume, musica_id],
                    (erro) => {
                        if (erro) {
                            console.error('Erro ao atualizar volumes da música:', erro);
                        }

                        atualizacoesPendentes--;

                        if (atualizacoesPendentes === 0) {
                            // Depois de atualizar volumes, calcular o ranking de TODAS as músicas
                            atualizarRanking(dataHoje, res);
                        }
                    }
                );
            });
        }
    );
});

function atualizarRanking(dataHoje, res) {
    conexao.query(
        `SELECT musica_id
         FROM musica
         ORDER BY volume_6 DESC`, // Ranking baseado no volume mais recente
        (erro, musicas) => {
            if (erro) {
                console.error('Erro ao buscar músicas para ranking:', erro);
                return res.status(500).json({ erro: 'Erro ao buscar músicas para ranking' });
            }

            let rankingPendentes = musicas.length;

            musicas.forEach((musica, index) => {
                const rankingHoje = index + 1; // 1º lugar = índice 0 + 1
                conexao.query(
                    `UPDATE musica
                     SET ranking_1 = ranking_2,
                         ranking_2 = ranking_3,
                         ranking_3 = ranking_4,
                         ranking_4 = ranking_5,
                         ranking_5 = ranking_6,
                         ranking_6 = ?
                     WHERE musica_id = ?`,
                    [rankingHoje, musica.musica_id],
                    (erro) => {
                        if (erro) {
                            console.error('Erro ao atualizar ranking da música:', erro);
                        }

                        rankingPendentes--;

                        if (rankingPendentes === 0) {
                            // Depois de tudo, limpar a tabela de reproduções
                            conexao.query(
                                `DELETE FROM musica_reproducao WHERE DATE(data_execucao) = ?`,
                                [dataHoje],
                                (erro) => {
                                    if (erro) {
                                        console.error('Erro ao limpar registros:', erro);
                                        return res.status(500).json({ erro: 'Erro ao limpar registros' });
                                    }
                                    res.json({ mensagem: 'Médias processadas e rankings atualizados com sucesso!' });
                                }
                            );
                        }
                    }
                );
            });
        }
    );
}



  

app.listen(port, () =>{
    console.log(`Servidor backend rodando em http://localhost:${port}`);
});