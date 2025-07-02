function getContrastingColor(hexColor) {
    const color = hexColor.replace('#', '');

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    const luminance = 0.299 * r + 0.587 * g + 0.114 * b;

    return luminance > 186 ? '#000000' : '#FFFFFF';
}

function hexToRgba(hexColor, alpha) {
    const color = hexColor.replace('#', '');

    const r = parseInt(color.substring(0, 2), 16);
    const g = parseInt(color.substring(2, 4), 16);
    const b = parseInt(color.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function getColorAnalytics(imageUrl) {
    Vibrant.from(imageUrl).getPalette()
        .then(palette => {
            const primaryColor = palette.Vibrant.getHex(); 
            const secondaryColor = palette.Muted.getHex();

            $("#selected_music_infos").css({
                'background': `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
            });
            console.log(primaryColor, secondaryColor);
        })
        .catch(error => {
            console.error('Erro ao processar a imagem:', error);
        });
}
function getColorfromAlbum(imageUrl) {
    Vibrant.from(imageUrl).getPalette()
        .then(palette => {
            const primaryColor = palette.Vibrant.getHex(); 
            const secondaryColor = palette.Muted.getHex();
            const contrastColor = getContrastingColor(primaryColor);
            const bodyColor1 = hexToRgba(primaryColor, 0.4);
            const bodyColor2 = hexToRgba(secondaryColor, 0.3);
            const bodyColor3 = hexToRgba(contrastColor, 0.1);

            $("#content_music_letra").css({
                'background': `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
            });
            
            $("#letra").animate({'color': contrastColor}, 500);
            
            document.body.style.background = `linear-gradient(to right, ${bodyColor1}, ${bodyColor2}, ${bodyColor3})`;
            document.body.style.backgroundSize = "400% 400%"; // Define o tamanho do background para a animação
            document.body.style.backgroundPosition = "0% 50%"; 


        })
        .catch(error => {
            console.error('Erro ao processar a imagem:', error);
        });
}

function getColorFromAdd(imageUrl) {
    Vibrant.from(imageUrl).getPalette()
        .then(palette => {
            const primaryColor = palette.Vibrant.getHex(); 
            const secondaryColor = palette.Muted.getHex();


            $("#music_selected_toAdd").css({
                'background': `linear-gradient(to right, ${primaryColor}, ${secondaryColor})`
            });

        })
        .catch(error => {
            console.error('Erro ao processar a imagem:', error);
        });
}


  
