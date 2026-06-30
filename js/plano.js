const plane = document.getElementById("plane");
const backColor = "rgba(85, 79, 79, 0.2)";
const mainColor = "black";
const ctx = plane.getContext("2d");

function loadPlane(){
    plane.width = plane.offsetWidth;
    plane.height = plane.offsetHeight;
    const width = plane.width , height = plane.height;
    let vLines = 30;
    let hLines = 10;

    drawHLines(ctx, 3, 0, 0, width, hLines, height/hLines);
    drawVLines(ctx, 3, 0, 0, height, vLines, width/vLines);
    drawArrows(ctx, height/hLines, width/vLines, 10, height, width);
    ctx.font = "25px dogica serif";
    ctx.fillText(`y`, 29, 25);
    ctx.fillText(`x`, 1060, 334);
}

function drawVLines(canvas, width, xInicial, yInicial, yFinal, nLines, spacement){
    canvas.lineWidth = width;
    let currentX;
    for(let index = 0; index <= nLines; index++) {
        canvas.strokeStyle = backColor;
        currentX = Math.floor(xInicial + ((index+1) * spacement)) + 0.5;
        canvas.beginPath();
            canvas.moveTo(currentX, yInicial);
            canvas.lineTo(currentX, yFinal);
            canvas.stroke();
        if(index < 28 && index > -1){
            canvas.strokeStyle = mainColor;
            canvas.beginPath();
                canvas.moveTo(currentX, 320);
                canvas.lineTo(currentX, 320+15);
                canvas.stroke();
            Numbers(canvas, index, currentX-6, 350);
        }
    }
}

function drawHLines(canvas, width, xInicial, yInicial, xFinal, nLines, spacement){
    canvas.lineWidth = width;
    let currentY;
    for(let index = 0; index <= nLines; index++) {
        canvas.strokeStyle = backColor;
        currentY = Math.floor(yInicial + ((index+1) * spacement)) + 0.5;
        canvas.beginPath();
            canvas.moveTo(xInicial, currentY);
            canvas.lineTo(xFinal, currentY);
            canvas.stroke();
        if(8-index < 8 && 8-index > -1){
            if(currentY != 327.5){
                canvas.strokeStyle = mainColor;
                canvas.beginPath();
                    canvas.moveTo(28, currentY);
                    canvas.lineTo(46, currentY);
                    canvas.stroke();
            }
            Numbers(canvas, 8-index, 10, currentY+3);
        }
    }
}

function drawArrows(canvas, height, width, size, yFinal, xFinal){
    //ponta da flecha pra cima
    canvas.beginPath();
        canvas.moveTo(width, height-2);
        canvas.lineTo(width-size, height+size);
        canvas.lineTo(width+size, height+size);
        canvas.fill();

    //cabo da flecha pra cima
    canvas.beginPath();
        canvas.strokeStyle = mainColor
        canvas.moveTo(width, height+10);
        canvas.lineTo(width, yFinal-height+15);
        canvas.stroke();
        
    //mudando a posição da seta
    width += 1020;
    height += 290;

    //seta pro lado
    canvas.beginPath();
        canvas.moveTo(width+2, height+1);
        canvas.lineTo(width-size, height-size);
        canvas.lineTo(width-size, height+size+1);
        canvas.fill();

    //cabo da flecha pro lado
    canvas.beginPath();
        canvas.strokeStyle = mainColor
        canvas.moveTo(width-5, height);
        canvas.lineTo(xFinal-width-15, height);
        canvas.stroke();
}

function Numbers(canvas, char, x, y){
    if(char == 0){
        canvas.fillText(char, 24.5, 340.5);
    }else{
        if(char < 10){
            canvas.fillText(`0${char}`, x, y);
        }else{
            canvas.fillText(char, x, y);
        }
    }
}