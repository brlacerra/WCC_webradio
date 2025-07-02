const musica = {
    id: null,
    vezesTocada: null,
    mediaVolume: [],
    ranking: []
}

const musicas = [];


window.addEventListener('load', () => {
    fetch('http://localhost:2333/dados')
        .then(response => response.json())
        .then(dados => {
            dados.forEach(musicaBanco => {
                const musica = {
                    id: musicaBanco.musica_id,
                    vezesTocada: musicaBanco.times_played,
                    mediaVolume: [
                        parseFloat(musicaBanco.volume_1),
                        parseFloat(musicaBanco.volume_2),
                        parseFloat(musicaBanco.volume_3),
                        parseFloat(musicaBanco.volume_4),
                        parseFloat(musicaBanco.volume_5),
                        parseFloat(musicaBanco.volume_6)
                    ],
                    ranking: [
                        parseInt(musicaBanco.ranking_1),
                        parseInt(musicaBanco.ranking_2),
                        parseInt(musicaBanco.ranking_3),
                        parseInt(musicaBanco.ranking_4),
                        parseInt(musicaBanco.ranking_5),
                        parseInt(musicaBanco.ranking_6)
                    ]
                };
                musicas.push(musica);
            });

            console.log("Músicas carregadas:", musicas);
        })
        .catch(error => {
            console.error('Erro ao buscar músicas:', error);
        });
});


function createTrackObject(trackInfo){
    if(!musicas.find(musica => musica.id === trackInfo.id)){
        musicas.push({
            id: trackInfo.id,
            vezesTocada: 0,
            mediaVolume: [50, 50, 50, 50, 50, 50],
            ranking: [0, 0, 0, 0, 0, 0]
        });
        console.log("Nova musica criada: ", trackInfo.id);
    }else{
        console.log("Musica Existe");
    }
}

function updateMusicObject(trackID, newMedia){
    const musica = musicas.find(musica => musica.id === trackID);
    if(musica){
        console.log("Musica encontrada");
        musica.vezesTocada++;
        saveMusic(musica);
    }else{
        console.log("Musica não encontrada");
    }
}
function createMusicRegistro(trackID, mediaVolume){
    fetch('http://localhost:2333/saveReprodution', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: trackID, mediaVolume})
    })
    .then(response => {
        if(!response.ok) throw new Error('Erro ao salvar registro');
        return response.json();
    })
    .then(data => {
        console.log("Registro de música salvo com sucesso", data);
    })
    .catch(error => {
        console.error('Erro ao salvar registro:', error);
    });
}

function saveMusic(musica) {
    fetch('http://localhost:2333/musica', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(musica)
    })
    .then(response => {
        if (!response.ok) throw new Error('Erro ao salvar música');
        return response.json();
    })
    .then(data => {
        console.log('Música salva com sucesso:', data);
    })
    .catch(error => {
        console.error('Erro ao salvar música:', error);
    });
}
