const letra = []; // Array que armazenará cada linha da letra
let color1;
let color2;
const canvas = document.getElementById('eqCanvas');
        const ctx2 = canvas.getContext('2d');
        const bars = 30;
        const barWidth = canvas.width / bars;

        // Array para armazenar as alturas atuais e as metas (suavização)
        let currentHeights = new Array(bars).fill(0);
        let targetHeights = new Array(bars).fill(0);
        const smoothingFactor = 0.08; // Ajuste para mais/menos suavidade (0.01 a 0.2)

        async function animate() {
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            
            for (let i = 0; i < bars; i++) {
                targetHeights[i] = (Math.random() > 0.7 ? 1 : Math.random()) * canvas.height;
                // Aumentei a chance de gerar barras mais altas (30% de chance)
            }

            // Suaviza as alturas atuais em direção às metas
            for (let i = 0; i < bars; i++) {
                currentHeights[i] += (targetHeights[i] - currentHeights[i]) * smoothingFactor;
                //cor cinza
                ctx2.fillStyle = 'rgba(255, 255, 255, 0.8)'; // Cor das barras
                ctx2.fillRect(
                    i * (barWidth + 2), 
                    canvas.height - currentHeights[i], 
                    barWidth, 
                    currentHeights[i]
                );
            }

            requestAnimationFrame(animate);
        }

        animate(); // Inicia a animação




async function getFullLyrics(artist, title) {
    try {
        // Limpa o array antes de cada nova busca
        letra.length = 0;
        
        // Converter para string caso sejam elementos DOM
        const artistStr = typeof artist === 'string' ? artist : artist?.textContent || String(artist);
        const titleStr = typeof title === 'string' ? title : title?.textContent || String(title);
        
        // Limpar e normalizar os textos
        const cleanArtist = artistStr.replace(/\([^)]*\)/g, '').trim();
        const cleanTitle = titleStr.replace(/\([^)]*\)/g, '').trim();
        

        // Usar proxy CORS confiável
        const proxyUrl = 'https://api.allorigins.win/get?url=';
        const encodedUrl = encodeURIComponent(
            `http://api.chartlyrics.com/apiv1.asmx/SearchLyricDirect?artist=${cleanArtist}&song=${cleanTitle}`
        );
        
        const response = await fetch(proxyUrl + encodedUrl);
        
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Verificar se a API retornou conteúdo
        if (!result.contents) {
            throw new Error('Resposta da API sem conteúdo');
        }
        
        // Processar o XML
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(result.contents, "text/xml");
        const lyric = xmlDoc.getElementsByTagName("Lyric")[0]?.textContent;
        
        if (lyric) {
            // Dividir a letra em linhas e adicionar ao array
            const linhas = lyric.split('\n');
            
            // Processar cada linha e adicionar ao array letra
            linhas.forEach(linha => {
                const linhaLimpa = linha.trim();
                if (linhaLimpa) { // Ignora linhas vazias
                    letra.push(linhaLimpa);
                }
            });
            const linhasFiltradas = linhas.map((linha, index) => {
                if (linha.includes('[') || linha.includes(']') || linha.includes('Chorus') || linha.includes('{')) {
                    if (index === 0 || linha.includes('Chorus') || linha.includes('{')) {
                        return null;
                    }
                    return '\u00A0';
                }
                return linha; // Mantém a linha original
            }).filter(linha => linha !== null); // Remove as linhas que foram apagadas
            const letraDiv = document.getElementById('letra');
            letraDiv.innerHTML = ''; // Limpa o conteúdo anterior
            linhasFiltradas.forEach(linha => {
                const p = document.createElement('p'); // Cria um elemento <p>
                if(linha.includes('(')){
                    p.style.fontStyle = 'italic'; // Define o estilo itálico
                    p.style.color = 'lightgray'; // Define a cor cinza
                }
                p.textContent = linha; // Define o texto da linha
                letraDiv.appendChild(p); // Adiciona o <p> ao componente
                $(function() {
                    var time = 300;
                    var efeito = "fade";
                    var options = {};
                    $('.content_music_letra').css('overflow', 'auto');
                    $('#eqCanvas').hide(efeito, options, time);
                    setTimeout(function() {
                        $('#letra').show(efeito, options, time);
                        $('#expand_lyrics').show(efeito, options, time);
                    }, 300); // Tempo para mostrar a letra após esconder o canvas
                });
            });
            
        } else {
            console.warn('Letra não encontrada na resposta da API');
            $(function() {
                var time = 300;
                var efeito = "fade";
                var options = {};
                $('.content_music_letra').css('overflow', 'hidden');
                $('#letra').hide(efeito, options, time);
                $('#expand_lyrics').hide(efeito, options, time);
                setTimeout(function() {
                    $('#eqCanvas').show(efeito, options, time);
                }, 300); // Tempo para mostrar o canvas após esconder a letra
            });
            return null;
        }
        
    } catch (error) {
        console.error('Erro durante a busca de letras:', error.message);
        return null;
    }
}