function toggleMenu (event) {
  this.classList.toggle('is-active');
  document.querySelector( ".menuppal" ).classList.toggle("is_active");
  event.preventDefault();
}
function checkEmail (email){
  let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if(expReg.test(email)){
      return true
  } else {
      return false
  }
}
function checkPassword (password){
  let expReg = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/ //La contraseña debe tener al entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
  if(expReg.test(password)){
      return true
  } else {
      return false
  }
}
// event
let menu = document.querySelector('.hamburger');
let formulario = document.getElementById("formulario");
let createform = document.getElementById("createform");
 if (menu){
   menu.addEventListener('click', toggleMenu, false);
 }
if (formulario){
  formulario.addEventListener("submit", function (event){
    console.log(event)
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let resEmail = checkEmail(email);
  console.log(email, resEmail)
  if (resEmail){
    let resPassword = checkPassword(password);
    if (resPassword){
        event.target.submit();
    } else {
      alert ("Por favor introduce correctamente la contraseña");
    }
  } else{
    alert("Por favor introduce correctamente tu email");    
}
})
}
if (createform){
  createform.addEventListener("submit", function (event){
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;
  let resEmail = checkEmail(email);
  console.log(email, resEmail)
  if (resEmail){
    let resPassword = checkPassword(password);
    if (resPassword){
        event.target.submit();
    } else {
      alert ("Por favor introduce correctamente la contraseña");
    }
  } else{
    alert("Por favor introduce correctamente tu email");    
}
})
}
