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

    drawHLines(ctx, backColor, 3, 0, 0, width, hLines, height/hLines);
    drawVLines(ctx, backColor, 3, 0, 0, height, vLines, width/vLines);
    drawArrows(ctx, height/hLines, width/vLines, 10, height, width);
    ctx.font = "30px dogica serif";
    ctx.fillText(`y`, 10, 45);
    ctx.fillText(`x`, 1046, 355);
}

function drawVLines(canvas, color, width, xInicial, yInicial, yFinal, nLines, spacement){
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    let currentX;
    for(let index = 0; index <= nLines; index++) {
        currentX = xInicial + ((index+1) * spacement);
        canvas.beginPath();
            canvas.moveTo(currentX, yInicial);
            canvas.lineTo(currentX, yFinal);
            canvas.stroke();
        canvas.fillText(index, currentX, 340)
    }
}

function drawHLines(canvas, color, width, xInicial, yInicial, xFinal, nLines, spacement){
    canvas.strokeStyle = color;
    canvas.lineWidth = width;
    let currentY;
    for(let index = 0; index <= nLines; index++) {
        currentY = yInicial + (index * spacement);
        canvas.beginPath();
            canvas.moveTo(xInicial, currentY);
            canvas.lineTo(xFinal, currentY);
            canvas.stroke();
        canvas.fillText((9-index), 30, currentY)
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

function Numbers(params) {
    
}