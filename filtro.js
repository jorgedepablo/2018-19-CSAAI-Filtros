function filtroRGB(ctx, canvas, img){
    countR.innerHTML = deslR.value
    countG.innerHTML = deslG.value
    countB.innerHTML = deslB.value

    ctx.drawImage(img, 0,0);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data

    var umbralR = deslR.value
    var umbralG = deslG.value
    var umbralB = deslB.value

    if (colores.style.border == '3px solid orange'){
        for (var i = 0; i < data.length; i+=4) {
          if (data[i] > umbralR){
            data[i] = umbralR;
          }
          if (data[i+1] > umbralG){
            data[i+1] = umbralG;
          }
          if (data[i+2] > umbralB){
            data[i+2] = umbralB;
          }
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

function filtroGrises(ctx, canvas, img){
    ctx.drawImage(img, 0,0);
    var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    var data = imgData.data

    for (var i = 0; i < data.length; i+=4) {
        R = data[i];
        G = data[i+1];
        B = data[i+2];
        var brillo = (3*R + 4*G + 1*B)/8

        data[i] = brillo;
        data[i+1] = brillo;
        data[i+2] = brillo;
    }
    ctx.putImageData(imgData, 0, 0);
}

function main() {

    var img = document.getElementById('imagesrc')
    var canvas = document.getElementById('display');

    deslR = document.getElementById('deslizadorR');
    countR = document.getElementById('counterR');
    deslG = document.getElementById('deslizadorG');
    countG = document.getElementById('counterG');
    deslB = document.getElementById('deslizadorB');
    countB = document.getElementById('counterB');

    canvas.width = img.width;
    canvas.height = img.height;

    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0,0);

    grises = document.getElementById('grises');
    colores = document.getElementById('colores');

    grises.onclick = () => {
        ctx.drawImage(img, 0,0);
        if (grises.style.border == '3px solid orange'){
            grises.style.border = '0px';
        }else {
            grises.style.border = '3px solid orange';
            colores.style.border = '0px';
            filtroGrises(ctx, canvas, img);
        }
    }

    colores.onclick = () => {
        ctx.drawImage(img, 0,0);
        if (colores.style.border == '3px solid orange'){
            colores.style.border = '0px';
        }else {
            colores.style.border = '3px solid orange';
            grises.style.border = '0px';
        }
    }

    deslR.oninput = () => {
        filtroRGB(ctx, canvas, img);
    }
    deslG.oninput = () => {
        filtroRGB(ctx, canvas, img);
    }
    deslB.oninput = () => {
        filtroRGB(ctx, canvas, img);
    }

}
