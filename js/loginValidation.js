function validateLoginForm(form,event){
    event.preventDefault();
    console.log("hello from javascript");
    if(form.email.value == ""){
        console.log("hello from javascript");
        form.email.focus();
        form.email.style.borderColor = "red";
        //document.getElementById('email').style.color = "red";
        result = false;
        return false;
    }
    form.submit();
}