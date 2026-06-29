const responseField = document.getElementById('responseField');
const buttonVerify = document.getElementById('buttonVerify');
const answerWaited = "";


// fazer isso aqui ser de classes 
responseField.addEventListener("click", function (){
    event.stopPropagation();
    responseField.style.width = "400px";
    responseField.style.height = "400px";
})

document.addEventListener("click", function(){
    if(responseField.style.width == "400px" && responseField.style.height == "400px"){
        responseField.style.width = "200px";
        responseField.style.height = "70px";
    }
})


buttonVerify.addEventListener("click", () => {
    if(responseField.innerText() === answerWaited){
        console.log("acertou");
    }
})

