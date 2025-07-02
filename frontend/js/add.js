async function loadAndShowQueryMusics() {
    const queryInput = document.getElementById("music_adder").value;
    const containerQuery = "music_preview_list";

    if (queryInput.length === 0) {
        $(function () {
            var time = 300;
            var efeito = "fade";
            var options = {};
            $("#add_music").animate({
                "background-color": "rgba(0, 0, 0, 0.8)",
                "display": "flex",
                "justify-content": "center",
                "color": "white",
            }, 1000);
            $("#add_music").css("background-image", "url('imgs/fundo.jpeg')");
            $("#music_preview_list").hide(efeito, options, time);
            $("#music_selected_toAdd").hide(efeito, options, time);
            setTimeout(function () {
                $("#music_start_toAdd").show(efeito, options, time);
            }, 400);
        });
        return;
    }
    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(queryInput)}&type=track&limit=10`, {
            headers: { 'Authorization': `Bearer ${accessToken}` }
        });

        if (!response.ok) {
            throw new Error(`Erro ao buscar músicas: ${response.status} - ${response.statusText}`);
        }

        $(function () {
            var time = 300;
            var efeito = "fade";
            var options = {};
            $("#add_music").animate({
                "background-color": "rgba(211, 211, 211, 0.1)"
            }, 1000);
            $("#add_music").css("background-image", "none");

            $("#music_start_toAdd").hide(efeito, options, time);
            setTimeout(function () {
                $("#music_preview_list").show(efeito, options, time);
            }, 400);
        })
        const data = await response.json();
        const tracks = data.tracks.items;

        renderPlaylistTracks(tracks, containerQuery);


    } catch (error) {
        console.error("Error loading music:", error);
    }
}

$(function () {
    document.querySelector('#music_preview_list').addEventListener('click', function (event) {
        const musicItem = event.target.closest('.music_item');
        if (musicItem) {
            loadParamsAdd(musicItem);
            showMusicAdd();
        }
    });

    function showMusicAdd() {
        var time = 300;
        var efeito = "fade";
        var options = {};
        $('#music_query').animate({
            "width": "60%",
        });
        //se for tela mobile
        if (window.innerWidth <= 768) {
            $("#music_preview_list").css({
                "max-height": "40vh",
            });
        }
        setTimeout(function () {
            $('#music_selected_toAdd').show(efeito, options, time);
        }, 400);
    }
    function returnToQuery() {
        var time = 300;
        var efeito = "fade";
        var options = {};

        $('#music_selected_toAdd').hide(efeito, options, time);
        $('#music_query').animate({
            "width": "100%",
        });
    }

    $("#return_toQuery_logo").on('click', function () {
        returnToQuery();
    });
});

let toAddID = null;
async function loadParamsAdd(musicItem) {
    const trackId = musicItem.id;
    try {
        // Primeiro busca as informações da track
        const trackResponse = await fetch(`https://api.spotify.com/v1/tracks/${trackId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!trackResponse.ok) {
            throw new Error(`Erro ao buscar informações da música: ${trackResponse.status} - ${trackResponse.statusText}`);
        }

        const trackInfo = await trackResponse.json();

        // Agora busca informações do artista principal para obter os gêneros
        const artistId = trackInfo.artists[0].id;
        const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistId}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!artistResponse.ok) {
            throw new Error(`Erro ao buscar informações do artista: ${artistResponse.status} - ${artistResponse.statusText}`);
        }

        const artistInfo = await artistResponse.json();

        // Extrai os dados necessários

        const trackImg = trackInfo.album.images[0].url;
        const trackName = trackInfo.name;
        toAddID = trackId;
        const trackArtist = trackInfo.artists.map(artist => artist.name).join(', ');
        const trackAlbum = trackInfo.album.name;
        const trackYear = trackInfo.album.release_date.split('-')[0];
        const trackDuration = formatTime(trackInfo.duration_ms);

        // Atualiza a UI
        getColorFromAdd(trackImg);
        document.getElementById("music_toAdd_title").textContent = trackName;
        document.getElementById("music_toAdd_img").src = trackImg;
        document.getElementById("music_toAdd_author").textContent = trackArtist;
        document.getElementById("music_toAdd_album").textContent = trackAlbum;
        document.getElementById("music_toAdd_year").textContent = trackYear;
        document.getElementById("music_toAdd_duration").textContent = trackDuration;
    } catch (error) {
        console.error('Erro ao carregar informações da música:', error);
    }
}

$("#addToSpotify").on("click", function () {
    addToSpotifyPlaylist(playlistId, toAddID);
});

async function addToSpotifyPlaylist(playlistid, trackid) {
    const trackId = trackid;
    const playlistId = playlistid;
    console.log("Verificando se a música já está na playlist:", trackId, playlistId);

    try {
        // Verifica se a música já está na playlist
        const playlistResponse = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!playlistResponse.ok) {
            throw new Error(`Erro ao buscar músicas da playlist: ${playlistResponse.status} - ${playlistResponse.statusText}`);
        }

        const playlistData = await playlistResponse.json();
        const tracks = playlistData.items.map(item => item.track.id);
        $(function () {
            var time = 300;
            efeito = "fade";
            options = {};
            $("#l_musicToAdd").hide(efeito, options, time);
            $("#r_musicToAdd").hide(efeito, options, time);
            setTimeout(function () {
                $("#returnToAdd").show(efeito, options, time);
                $("#returnLoading").show(efeito, options, time);
            }, 400);
        });
        if (tracks.includes(trackId)) {
            $(function () {
                var time = 300;
                efeito = "fade";
                options = {};
                setTimeout(function () {
                    $("#returnLoading").hide(efeito, options, time);
                    setTimeout(function () {
                        $("#failAdd").show(efeito, options, time);
                    }, 400);
                    setTimeout(function () {
                        $("#failAdd").hide(efeito, options, time);
                        $("#returnToAdd").hide(efeito, options, time);
                        setTimeout(function () {
                            $("#l_musicToAdd").show(efeito, options, time);
                            $("#r_musicToAdd").show(efeito, options, time);
                        }, 400);
                    }, 1000);
                }, 3000);
            });
            return;
        }
        $(function () {
            var time = 300;
            efeito = "fade";
            options = {};
            setTimeout(function () {
                $("#returnLoading").hide(efeito, options, time);
                setTimeout(function () {
                    $("#successAdd").show(efeito, options, time);
                }, 400);
                setTimeout(function () {
                    $("#successAdd").hide(efeito, options, time);
                    $("#returnToAdd").hide(efeito, options, time);
                    setTimeout(function () {
                        $("#l_musicToAdd").show(efeito, options, time);
                        $("#r_musicToAdd").show(efeito, options, time);
                    }, 400);
                }, 1000);
            }, 3000);
        });
        console.log("Adicionando música à playlist:", trackId, playlistId);
        const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=spotify:track:${trackId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Erro ao adicionar música à playlist: ${response.status} - ${response.statusText}`);
        }

        console.log("Música adicionada à playlist com sucesso!");
    } catch (error) {
        console.error("Erro ao adicionar música à playlist:", error);
    }
}

