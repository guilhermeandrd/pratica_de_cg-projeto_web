const answerBtn = document.getElementById('answerBtn');
const responseField = document.getElementById('responseField');

answerBtn.addEventListener("click", function (){
    if (responseField.style.display === "flex") {
        responseField.style.display = "none";
    } else {
        responseField.style.display = "flex";
    }
})

