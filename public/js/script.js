//El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado, sin esperar hojas de estilo, images y subframes para  finalizar la carga
document.addEventListener('DOMContentLoaded', () => {
  const btn_menu = document.querySelector(".btn_menu")
  if (btn_menu) {
      btn_menu.addEventListener('click', () => {
          const menu_items = document.querySelector(".menu_items")
          menu_items.classList.toggle("show")
      })
  }
})

function mostrarContraseña() {
  let tipo = document.getElementById("password");
  if(tipo.type == "password"){
      tipo.type = "text";
  }else{
      tipo.type = "password";
  }
}
/***************************Validación exp reg formularios****************************/


let regexp_email = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
let regexp_psw = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/ //La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
let regexp_titulo = /^[a-z0-9À-ÿ\s\u00f1\u00d1\:\!\@\#\$\%\&]{1,100}$/gi //El título debe tener al entre 1 y 100 caracteres, incluyendo cualquier letra acentuada o no, números, ñ Ñ, y esos caracteres especiales, \s permite espacios en blanco
let regexp_year = /^(1[8-9][0-9][0-9]|20[0-9][0-9]|2100)$/ // desde 1800 a 1999 o desde 2000 a 2099 o 2100
let regexp_director = /^[a-zÀ-ÿ\s\u00f1\u00d1]{2,19}$/gi //El nombre debe tener al entre 2 y 19 caracteres, incluyendo cualquier letra acentuada o no, números, ñ Ñ
let regexp_genero = /^[a-z\sÀ-ÿ\u00f1\u00d1\-\/]{2,25}$/gi //El género debe tener al entre 2 y 25 caracteres, incluyendo cualquier letra acentuada o no ??, número, ñ Ñ, -, / e incluído guión y barra
let regexp_duracion = /^[a-z\s0-9\:]{4,15}$/gi // 2 horas, 02:45
let regexp_url = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/

function checkRegexp(cadena, redexp) {
  if (redexp.test(cadena)) {
      return true
  } else {
      return false
  }
}

let formulario = document.getElementById("formulario"); // en el formulario tenia una clase, lo he cambiado a ID
let createform = document.getElementById("createform");
let eliminar = document.querySelectorAll('.eliminar');
let search = document.querySelector('.formularioS'); // he añadido una S de serach para diferenciarlo del otro formulario
let edit = document.getElementById("editform");
let dashboard = document.getElementById("dashboard");


if(formulario) {
formulario.addEventListener("submit", function (event) {
  event.preventDefault();
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  let valor_email = checkRegexp(email, regexp_email);
  let valor_psw = checkRegexp(password, regexp_psw);

  if (valor_email === true) {
      if (valor_psw === true) {
          event.target.submit()
      } else { alert("Por favor introduce correctamente la contraseña. Debe tener entre 8 y 16 caracteres y contener un dígito, minúscula, mayúscula y caracter no alfanumérico") }
  } else { alert("Por favor introduce correctamente tu email") }
});
}

if(createform){
  createform.addEventListener("submit", function (event) {
  event.preventDefault();
  let titulo = document.getElementById("createtitulo").value;
  let year = document.getElementById("createyear").value;
  let director = document.getElementById("createdirector").value;
  let genero = document.getElementById("creategenero").value;
  let duracion = document.getElementById("createduracion").value;
  let url = document.getElementById("createurl").value;

  let valor_titulo = checkRegexp(titulo, regexp_titulo);
  let valor_year = checkRegexp(year, regexp_year);
  let valor_director = checkRegexp(director, regexp_director);
  let valor_genero = checkRegexp(genero, regexp_genero);
  let valor_duracion = checkRegexp(duracion, regexp_duracion);
  let valor_url = checkRegexp(url, regexp_url);

  if (valor_titulo === true) {
      if (valor_year === true) {
          if (valor_director === true) {
              if (valor_genero === true) {
                  if (valor_duracion === true) {
                      if (valor_url === true) {
                          event.target.submit();
                      } else { alert("Por favor introduce correctamente la url de la imagen de la película") }
                  } else { alert("Por favor introduce correctamente la duración de la película") }
              } else { alert("Por favor introduce correctamente el género de la película") }
          } else { alert("Por favor introduce correctamente el director de la película") }
      } else { alert("Por favor introduce correctamente el año de la película") }
  } else { alert("Por favor introduce correctamente el título") }
});
}

if (eliminar) {
  for (let i = 0; i < eliminar.length; i++) {
      eliminar[i].addEventListener("submit", function (event) {
          event.preventDefault();
          pregunta = confirm("¿Deseas eliminar realmente esta Película?");
          if (pregunta) {
              console.log("Aceptada")
              event.target.submit();
          } else { alert("No borrada") }
      })
  }
};

if(search){
  search.addEventListener("submit", function (event) {
  event.preventDefault()
  let titulo = document.getElementById("peli").value;

  if (titulo == "") {
      alert('Campo vacío. Por favor introduce el título de una película')
      
  } else {event.target.submit()};
});
}

if(edit) {
  edit.addEventListener("submit", function(event) {
  event.preventDefault();
      let titulo = document.getElementById("editartitulo").value;
      let year = document.getElementById("editaryear").value; // 
      let director = document.getElementById("editardirector").value;
      let genero = document.getElementById("editargenero").value;
      let duracion = document.getElementById("editarduracion").value;
      let url = document.getElementById("editarurl").value;

      let valor_titulo = checkRegexp(titulo, regexp_titulo);
      let valor_year = checkRegexp(year, regexp_year);
      let valor_director = checkRegexp(director, regexp_director);
      let valor_genero = checkRegexp(genero, regexp_genero);
      let valor_duracion = checkRegexp(duracion, regexp_duracion);
      let valor_url = checkRegexp(url, regexp_url);

      if (valor_titulo === true) {
          if (valor_year === true) {
              if (valor_director === true) {
                  if (valor_genero === true) {
                      if (valor_duracion === true) {
                          if (valor_url === true) {
                              event.target.submit();
                          } else { alert("Por favor introduce correctamente la url de la imagen de la película") }
                      } else { alert("Por favor introduce correctamente la duración de la película") }
                  } else { alert("Por favor introduce correctamente el género de la película") }
              } else { alert("Por favor introduce correctamente el director de la película") }
          } else { alert("Por favor introduce correctamente el año de la película") }
      } else { alert("Por favor introduce correctamente el título") }
  });
}
if (dashboard)
document.addEventListener('DOMContentLoaded', () => {
  const elementosCarrousel = document.querySelectorAll('.carousel');
  M.Carousel.init(elementosCarrousel, {
      duration:480,
      dist:-80,
      indicators: true,
      padding: -20
  })
});
