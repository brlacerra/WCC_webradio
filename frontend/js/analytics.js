containerId = 'music_list';

function generateDateLabels() {
    const labels = [];
    const today = new Date(); // Data atual

    for (let i = 5; i >= 0; i--) {
        const date = new Date(); // Cria uma nova data
        date.setDate(today.getDate() - i); // Subtrai os dias para obter os dias anteriores

        const day = date.getDate().toString().padStart(2, '0'); // Obtém o dia (com zero à esquerda)
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Obtém o mês (com zero à esquerda)

        labels.push(`${day}/${month}`); // Adiciona a label no formato "dia/mês"
    }

    return labels;
}

const ctx = document.getElementById('volGraf').getContext('2d');
const meuGrafico = new Chart(ctx, {
    type: 'line', // Tipo de gráfico (pode ser 'line', 'bar', 'pie', etc.)
    data: {
        labels: generateDateLabels(), // Labels do eixo X (datas)
        datasets: [{
            label: 'Volume médio de Reprodução',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'transparent'
            ],
            borderColor: [
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

const ctx3 = document.getElementById('rankingGraf').getContext('2d');
const meuGrafico2 = new Chart(ctx3, {
    type: 'line', // Tipo de gráfico (pode ser 'line', 'bar', 'pie', etc.)
    data: {
        labels: generateDateLabels(), // Labels do eixo X (datas)
        datasets: [{
            label: 'Ranking',
            data: [0, 0, 0, 0, 0, 0],
            backgroundColor: [
                'rgba(255, 255, 255, 0.5)'
            ],
            borderColor: [
                'rgba(255, 255, 255, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false,
                reverse: true 
            }
        }
    }
});

$(function () {
    function toogleChart(){
        var time = 300;
        var efeito = "fade";
        var options = {};
        if($('#volGraf').is(':visible')){
            $('#volGraf').hide(efeito, options, time);
            document.getElementById('toogleChart').innerHTML = "Ver Gráfico de Volume";
            setTimeout(function () {
                $('#rankingGraf').show(efeito, options, time);
            }, 400);
        }else{
            $('#rankingGraf').hide(efeito, options, time);
            document.getElementById('toogleChart').innerHTML = "Ver Gráfico de Ranking";
            setTimeout(function () {
                $('#volGraf').show(efeito, options, time);
            }, 400);
        }
    }
    $('#toogleChart').on('click', function () {
        toogleChart();
    });
});

function updateChartData(values, rankings) {
    meuGrafico.data.datasets[0].data = values;
    meuGrafico2.data.datasets[0].data = rankings;
    meuGrafico2.update();
    meuGrafico.update();
}
$(function () {
document.querySelector('.music_list').addEventListener('click', function (event) {
    const musicItem = event.target.closest('.music_item'); 
    if (musicItem) {
        const musica = musicas.find(musica => musica.id === musicItem.id);
        if(musica){
            loadParams(musicItem);
            console.log("musica encontrada");
            showMusicInfo(); 
        }else{
            showMusicNotReproduced();
        }
        
        
        const values = JSON.parse(musicItem.getAttribute('data-values'));
        const rankings = JSON.parse(musicItem.getAttribute('data-ranking'));
        updateChartData(values, rankings);
        //const queryID = musicItem.id;
        //const clickedMusic = musicas.find(m => m.id === queryID); 
        //console.log(clickedMusic);
        console.log(musicas);

    }
});

    function showMusicInfo(){
        var time = 300;
        var efeito = "fade";
        var options = {};
        $('#analytics_waiting_music').hide(efeito, options, time);
        $('#music_not_reproduced').hide(efeito, options, time);
        setTimeout(function () {
            $('#analytics_music_selected').show(efeito, options, time);
            $('#analytics_music_selected').css('display', 'flex');
            $('#analytics_music_selected').css('flex-direction', 'column');
        }, 400);
    }
    function showMusicNotReproduced(){
        var time = 300;
        var efeito = "fade";
        var options = {};
        $('#analytics_waiting_music').hide(efeito, options, time);
        $('#analytics_music_selected').hide(efeito, options, time);
        setTimeout(function () {
            $('#music_not_reproduced').show(efeito, options, time);
            $('#music_not_reproduced').css('display', 'flex');
        }, 400);
    }
});


    
function updateColorRanking(ranking) {
    console.log(ranking);
    if(ranking == 1){
        $('#music_ranking').animate({'color': '#FFD700'}, 300);
        $('#r_insights').css({'border': '2px solid #FFD700'});
    }else if(ranking == 2){
        $('#music_ranking').animate({'color': '#C0C0C0'}, 300);
        $('#r_insights').css({'border': '2px solid #C0C0C0'});
    }else if(ranking == 3){
        $('#music_ranking').animate({'color': '#CD7F32'}, 300);
        $('#r_insights').css({'border': '2px solid #CD7F32'});
    }else{
        $('#music_ranking').animate({'color': '#FFFFFF'});
        $('#r_insights').css({'border': 'none'});
    }
}
async function loadParams(musicItem) {
    const trackId = musicItem.id;

        try {
            const response = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
                headers: {
                    'Authorization': `Bearer ${accessToken}` 
                }
            });
    
            if (!response.ok) {
                throw new Error(`Erro ao buscar informações da música: ${response.status} - ${response.statusText}`);
            }
    
            const trackInfo = await response.json();
            getColorAnalytics(trackInfo.album.images[0].url);
            document.getElementById('music_item_img').src = trackInfo.album.images[0].url;
            document.getElementById('music_item_title').textContent = trackInfo.name;
            if(trackInfo.explicit){
                document.getElementById('analytics_explicit_content').style.display = 'block';
            }else{
                document.getElementById('analytics_explicit_content').style.display = 'none';
            }
            document.getElementById('music_item_author').textContent = trackInfo.artists.map(artist => artist.name).join(', ');
            document.getElementById('music_item_album').textContent = trackInfo.album.name;
            document.getElementById('music_item_duration').textContent = formatTime(trackInfo.duration_ms);

            const rankings = JSON.parse(musicItem.getAttribute('data-ranking'));
            const lastRanking = rankings[rankings.length - 1]; // Pega o último ranking

            document.getElementById('music_ranking').textContent = "#" + lastRanking;
            updateColorRanking(lastRanking);

            const musica = musicas.find(musica => musica.id === trackId);
            if (musica) {
                document.getElementById('music_times_played').textContent = "Musica tocada " + musica.vezesTocada + " vezes";
                const somaMediaVolume = musica.mediaVolume.reduce((acumulador, valorAtual) => acumulador + valorAtual, 0);
                const mediaVolume = somaMediaVolume / musica.mediaVolume.length;
                document.getElementById('music_geral_vol_media').textContent = "Média de Volume: " + Math.round(mediaVolume);
            }
        } catch (error) {
            console.error('Erro ao carregar informações da música:', error);
        }
}


/**
 * Renderiza todas as músicas da playlist no container especificado
 * @param {Array} playlistTracks - Array de músicas da playlist
 * @param {string} containerId - ID do elemento container onde as músicas serão inseridas
 */
function renderPlaylistTracks(playlistTracks, containerId) {
    const container = document.getElementById(containerId);
    
    if (!container) {
        console.error(`Container com ID ${containerId} não encontrado`);
        return;
    }

    // Limpa o container antes de adicionar novos itens
    container.innerHTML = '';

    // Adiciona cada música ao container
    playlistTracks.forEach((track, index) => {
        const musicItem = createMusicItem(track, index);
        container.appendChild(musicItem);
    });
}

/**
 * Cria um elemento HTML para uma música individual
 * @param {Object} track - Objeto contendo informações da música
 * @param {number} index - Índice da música na playlist
 * @returns {HTMLElement} Elemento HTML da música
 */
function createMusicItem(track, index) {

    const musicItem = document.createElement('div');
    const photoNameDiv = document.createElement('div');
    const img = document.createElement('img');
    const authorDiv = document.createElement('div');
    const author = document.createElement('p');
    const title = document.createElement('p');
    musicItem.id = track.id;
    let musicaExiste = musicas.find(musica => musica.id === track.id);
    let mediaVolume, ranking;

    if(musicaExiste){
        mediaVolume = musicaExiste.mediaVolume;
        ranking = musicaExiste.ranking;
    }else{
        mediaVolume = [0,0,0,0,0,0];
        ranking = [0,0,0,0,0,0];
    }


    musicItem.className = 'music_item';
    author.className = 'music_item_author';
    img.className = 'music_item_img';
    photoNameDiv.className = 'music_item_photoname';
    title.className = 'music_item_title';

    


    musicItem.setAttribute('data-values', JSON.stringify(mediaVolume)); 
    musicItem.setAttribute('data-ranking', JSON.stringify(ranking));
    img.src = track.album?.images?.[0]?.url;
    img.alt = `Capa do álbum ${track.album?.name || 'Desconhecido'}`; 
    title.textContent = track.name || `Música ${index + 1}`;   
    author.textContent = track.artists?.map(artist => artist.name).join(', ') || 'Artista Desconhecido';
    
    authorDiv.appendChild(author);
    photoNameDiv.appendChild(img);
    photoNameDiv.appendChild(title);
    musicItem.appendChild(photoNameDiv);
    musicItem.appendChild(authorDiv);
    
    return musicItem;
}

/**
 * Gera valores aleatórios para o data-values
 * @returns {Array} Array com 6 números aleatórios entre 1 e 25
 */
function generateRandomValues() {
    const values = [];
    for (let i = 0; i < 6; i++) {
        values.push(Math.floor(Math.random() * 10) + 1);
    }
    return values;
}
async function loadAndRenderPlaylist() {
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });
        const data = await response.json();
        
        // Filtra apenas os itens que têm track e mapeia para o formato necessário
        const playlistTracks = data.items
            .filter(item => item.track)
            .map(item => item.track);
        
        // Renderiza as músicas no container especificado
        renderPlaylistTracks(playlistTracks, containerId);
        
    } catch (error) {
        console.error('Erro ao carregar playlist:', error);
    }
}
let segundos =1;
function getVolume(){
    volTotal+= (vol*100);
    segundos++;
    console.log(Math.round(volTotal/segundos));
}

async function searchAndRenderTracks() {
    const searchInput = document.getElementById('music_searcher').value; // Obtém o valor do input
    const containerMusics = document.getElementById('music_list'); // Obtém o container onde as músicas serão renderizadas

    // Esconde o container com efeito fade
    $(containerMusics).fadeOut(100, async function () {
        if (searchInput === '') {
            // Se o input estiver vazio, carrega a playlist padrão
            await loadAndRenderPlaylist();

            // Mostra o container com efeito fade
            $(containerMusics).fadeIn(300);
            return;
        }

        try {
            // Faz a requisição para buscar músicas com base no termo de busca
            const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(searchInput)}&type=track&limit=10`, {
                headers: { 'Authorization': `Bearer ${accessToken}` }
            });

            if (!response.ok) {
                throw new Error(`Erro ao buscar músicas: ${response.status} - ${response.statusText}`);
            }

            const data = await response.json();
            const tracks = data.tracks.items; // Obtém as músicas encontradas

            // Renderiza as músicas no container especificado
            renderPlaylistTracks(tracks, 'music_list');

            // Mostra o container com efeito fade
            $(containerMusics).fadeIn(300);

        } catch (error) {
            console.error('Erro ao buscar músicas:', error);
        }
    });
}

