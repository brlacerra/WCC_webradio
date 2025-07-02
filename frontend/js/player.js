const clientID = ''; // Insira seu Client ID aqui
const clientSecret = ''; // Insira seu Client Secret aqui
const redirectUri = window.location.href.split('?')[0];

//const playlistId = '0aslgxsPY13vd3X1IuxeE6'; //Playlist Oficial Rockstar
const playlistId = '6PXlzp4AAbw05bNuBD0fTF'; //Playlist Oficial WWC Radio



let player;
let deviceID;
let currentTrack = null;
let currentPlaylist = null;
let playlists = [];
let tracks = [];
let currentTrackIndex = 0;
let progressInterval;
let accessToken;

const loginBtn = document.getElementById('loginBtn');
const start = document.getElementById('start');
const album_img = document.getElementById('album_img');
const music_title = document.getElementById('music_title');
const music_author = document.getElementById('music_author');
const explicit = document.getElementById('explicit_content');
const progress = document.getElementById('progress');
const progress_bar = document.getElementById('progress_bar');
const atual_time = document.getElementById('atual_time');
const music_duration = document.getElementById('music_duration');
const vol_down = document.getElementById('vol_down');
const vol_up = document.getElementById('vol_up');
const vol_bar = document.getElementById('vol_bar');
let vol = 0.5;
let volTotal = 50;
let isPlaying = false;

let currentTrackID;
let currentTrackName;
let currentTrackArtist;
let currentTrackAlbumImg;
let currentTrackImg;


const hash = window.location.hash.substring(1);
const params = new URLSearchParams(hash);
const token = params.get('access_token');

const refreshToken = async () => {
    try {
        // Substitua pelo seu REFRESH_TOKEN (obtido durante a autenticação inicial)
        const REFRESH_TOKEN = token; 

        const response = await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + btoa(`${clientID}:${clientSecret}`) // Base64 do client_id:client_secret
            },
            body: new URLSearchParams({
                grant_type: 'refresh_token',
                refresh_token: REFRESH_TOKEN
            })
        });

        if (!response.ok) throw new Error('Falha ao renovar token');

        const data = await response.json();
        accessToken = data.access_token; // Atualiza o token global
        console.log('Token renovado com sucesso!');
        
        // Renova o token a cada 50 minutos (antes de expirar)
        setTimeout(refreshToken, 30 * 60 * 1000); 

    } catch (error) {
        console.error('Erro ao renovar token:', error);
        // Redireciona para o login se o refresh_token falhar
        window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectUri}&scope=${scopes}`;
    }
};
if(token){
    accessToken = token;
    initializePlayer();
    window.history.pushState({}, document.title, window.location.pathname);
    setTimeout(refreshToken, 30 * 60 * 1000);
}

loginBtn.addEventListener('click', () => {
    const scopes = [
        'streaming',
        'user-read-email',
        'user-read-private',
        'user-library-read',
        'user-library-modify',
        'user-read-playback-state',
        'user-modify-playback-state',
        'playlist-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-modify-private',
    ].join(' ');

    const authUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
    
    window.location.href = authUrl;
});

function initializePlayer(){
    loginBtn.style.display = 'none';
    navbar.style.display = 'flex';

    start.addEventListener('click', playOrNothing);
    content_logo.addEventListener('click', playOrNothing);
    function playOrNothing() {
        if (!isPlaying) {
            loadPlaylistTracks();
            isPlaying = true;
            setTimeout(function (){
                start.textContent = "Voltar para Player";
            }, 1000);
        }else{
            getColorfromAlbum(currentTrackImg);
        }
    }

    if(window.Spotify){
        setupPlayer();
    }else{
        const script = document.createElement('script');
        script.src = 'https://sdk.scdn.co/spotify-player.js';
        script.async = true;
        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = setupPlayer;
    }
}

vol_down.addEventListener('click',() => volControl(-0.1));
vol_up.addEventListener('click', () => volControl(0.1));
function volControl(volStat) {
    vol = Math.min(Math.max(vol + volStat, 0), 1); 
    vol_bar.style.width = (vol * 100) + "%"; 
    if (player) {
        console.log(vol);
        player.setVolume(vol).catch(error => {
            console.error('Erro ao ajustar o volume:', error);
        });
    }
    
}

function setupPlayer(){
    player = new Spotify.Player({
        name: 'West Coast Classics WEB Radio',
        getOAuthToken: cb => {cb(accessToken)},
        volume: 0.5
    });

    player.addListener('ready', ({device_id}) => {
        console.log('Ready with Device ID', device_id);
        deviceID = device_id;
        $(function () {
            var time = 300;
            var efeito = "drop";
            var options = {direction: "down"};
            setTimeout(function () {
                $("#start").show(efeito, options, time);
            }, 400);
        }
        );

        fetch('https://api.spotify.com/v1/me/player', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                device_ids: [device_id],
                play: false
            })
        }).catch(error => console.error('Transfer error:', error));
    });

    player.connect();
}

function transferPlayback(device_id) {
    fetch('https://api.spotify.com/v1/me/player', {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            device_ids: [device_id],
            play: false
        })
    });
}

function loadPlaylistTracks() {
    if (!playlistId) return;

    currentPlaylist = playlists.find(p => p.id === playlistId);

    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
        .then(response => response.json())
        .then(data => {
            tracks = data.items.filter(item => item.track).map(item => item.track);
            currentTrackIndex = 0;

            if (tracks.length > 0) {
                playTrack(tracks[0]);
            }
        })
        .catch(error => console.error('Error fetching playlist tracks:', error));
}
function playTrack(track) {
    if (!deviceID) {
        console.error('Device ID not available');
        return;
    }

    fetch(`https://api.spotify.com/v1/me/player/play?device_id=${deviceID}`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uris: [track.uri],
            position_ms: 0
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(err => { throw err; });
            }
            currentTrack = track;
            updateTrackInfo(track);
            startProgressTimer(track);
            createTrackObject(track);
        })
        .catch(error => {
            console.error('Error playing track:', error);
            // Tentar reconectar se o erro for de dispositivo
            if (error.error && error.error.reason === 'NO_ACTIVE_DEVICE') {
                player.connect();
            }
        });
}

function playNextTrack() {
    currentTrackIndex++;
    //currentTrackIndex = Math.floor(Math.random() * tracks.length);
    if(currentTrackIndex >= tracks.length) {
        currentTrackIndex = 0;
    }  
    playTrack(tracks[currentTrackIndex]);
}
isfirstTime = true;
function updateTrackInfo(track) {
    music_title.textContent = track.name;
    music_author.textContent = track.artists.map(artist => artist.name).join(', ');
    music_album.textContent = track.album.name;
    music_year.textContent = track.album.release_date.split('-')[0];
    const albumImage =  track.album.images[0];
    currentTrackImg = albumImage.url;
    $("#album_img").fadeOut(150, function() {
        $(this).attr('src', albumImage.url).fadeIn(150);
    });
    if (!$("#mainPage").is(":visible")) {
        if(isfirstTime){
            setTimeout(function () {
                getColorfromAlbum(currentTrackImg);
            }, 3000);
            isfirstTime = false;
        }else{
            getColorfromAlbum(currentTrackImg);
        }
    }
    else {
    }

    if (track.explicit) {
        explicit.style.display = 'block';
    }
    else {
        explicit.style.display = 'none';
    }
    getFullLyrics(music_author.textContent, music_title.textContent);
    const linktoMusic = track.external_urls.spotify;
    music_link.href = linktoMusic;
    titlePage.textContent = "WWC Radio - " + track.name;
    scrollPageTitle();
}

function startProgressTimer(trackInfo) {
    let volumeTotal = 0;
    let segundos = 0;
    clearInterval(progressInterval);
    progressInterval = setInterval(() => {
        player.getCurrentState().then(state => {
            if (!state) return;
            const position = state.position;
            const duration = state.duration;
            const progressPercent = (position / duration) * 100;
            progress_bar.style.width = `${progressPercent}%`;

            atual_time.textContent = formatTime(position);
            music_duration.textContent = formatTime(duration);
            volumeTotal+=vol*100;
            segundos++;

            if(position >= duration-1000) {
                clearInterval(progressInterval);
                updateMusicObject(trackInfo.id, volumeTotal/segundos);
                const numeroAleatorio = Math.floor(Math.random() * 100) + 1;
                createMusicRegistro(trackInfo.id, numeroAleatorio);
                playNextTrack();
            }
        });
    }, 1000);
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}