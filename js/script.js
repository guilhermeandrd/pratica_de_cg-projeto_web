const responseField = document.getElementById('responseField');
const buttonVerify = document.getElementById('buttonVerify');
const answerWaited = "";

responseField.addEventListener("click", function (){
    responseField.style.width = "400px";
    responseField.style.height = "400px";
})

responseField.addEventListener("keydown", (event) => {
    if(event.key === "Enter"){
        responseField.style.width = "200px";
        responseField.style.height = "70px";
    }
})

buttonVerifyInput.addEventListener("click", () => {
    if(responseField.innerText() === answerWaited){
        console.log("acertou");
    }
})

