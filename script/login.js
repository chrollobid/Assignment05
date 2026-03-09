document.getElementById('login-btn').addEventListener('click', function(){
    //  1.get the number input
    const nameInput = document.getElementById('input-username');
    const username = nameInput.value ;
    console.log(username);
    // 2.get the pin
    const pinInput = document.getElementById('input-password');
    const pinNum = pinInput.value ;
    console.log(pinNum);

    // 3.match pin and number
    if(username == 'admin' && pinNum == 'admin123' ){
        // 3-1. true::>> alert>homepage
alert("Login successful")
// window.location.replace('/home.html')
window.location.assign('/home.html')
    }
    else{
        // 3-2. false::>> alert>return
alert("Login Failed")
return
    }

})