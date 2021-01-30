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
/***************************Validación exp reg formularios****************************/
function checkEmail(email) {
  let expReg = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/
  if (expReg.test(email)) {
    return true
  } else {
    return false
  }
}
function checkPassword(password) {
  let expReg = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{8,16}$/ //La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
  if (expReg.test(password)) {
    return true
  } else {
    return false
  }
}
function checkTitulo(titulo) {
  let expReg = /^[a-z0-9À-ÿ\u00f1\u00d1\:\!\@\#\$\%\&\s]{1,100}$/gi //El título debe tener al entre 1 y 100 caracteres, incluyendo cualquier letra acentuada o no, número, ñ Ñ, y esos caracteres especiales
  if (expReg.test(titulo)) {
    return true
  } else {
    return false
  }
}
function checkAno(ano) {
  let expReg = /^(1[8-9][0-9][0-9]|20[0-9][0-9]|2100)$/ // desde 1800 a 1999 o desde 2000 a 2099 o 2100
  if (expReg.test(ano)) {
    return true
  } else {
    return false
  }
}
function checkDirector(director) {
  let expReg = /^[a-z\sÀ-ÿ\u00f1\u00d1]{2,50}$/gi //El nombre debe tener al entre 2 y ?? caracteres, incluyendo cualquier letra acentuada o no ??, número, ñ Ñ
  if (expReg.test(director)) {
    return true
  } else {
    return false
  }
}
function checkGenero(genero) {
  let expReg = /^[a-z\sÀ-ÿ\u00f1\u00d1\-\/]{2,25}$/gi //El género debe tener al entre 2 y 25 caracteres, incluyendo cualquier letra acentuada o no ??, número, ñ Ñ, -, /
  if (expReg.test(genero)) {
    return true
  } else {
    return false
  }
}
function checkDuracion(duracion) {
  let expReg = /^[a-z\s0-9\:]{4,15}$/gi // ??
  if (expReg.test(duracion)) {
    return true
  } else {
    return false
  }
}
function checkUrl(url) {
  let expReg = /^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/
  if (expReg.test(url)) {
    return true
  } else {
    return false
  }
}
function checkSearch(titulo) {
  let expReg = /^\s*$/gi // campo vacío
  if (expReg.test(titulo)) {
    return true
  } else {
    return false
  }
}

let formulario = document.getElementById("formulario");
let createform = document.getElementById("createform");
let eliminar = document.querySelectorAll('.eliminar');
let search = document.getElementById("formularioS");
let edit = document.getElementById("editform");

if (formulario) {
  formulario.addEventListener("submit", function (event) {
    console.log(event)
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let resEmail = checkEmail(email);
    console.log(email, resEmail)
    if (resEmail) {
      let resPassword = checkPassword(password);
      if (resPassword) {
        event.target.submit();
      } else {
        alert("Por favor introduce correctamente la contraseña");
      }
    } else {
      alert("Por favor introduce correctamente tu email");
    }
  })
}
if (createform) {
  createform.addEventListener("submit", function (event) {
    event.preventDefault();
    let titulo = document.getElementById("createtitulo").value;
    let ano = document.getElementById("createano").value;
    let director = document.getElementById("createdirector").value;
    let genero = document.getElementById("creategenero").value;
    let duracion = document.getElementById("createduracion").value;
    let url = document.getElementById("createurl").value;
    let resTitulo = checkTitulo(titulo);
    if (resTitulo) {
      let resAno = checkAno(ano);
      if (resAno) {
        let resDirector = checkDirector(director);
        if (resDirector) {
          let resGenero = checkGenero(genero);
          if (resGenero) {
            let resDuracion = checkDuracion(duracion);
            if (resDuracion) {
              let resUrl = checkUrl(url);
              if (resUrl) {
                event.target.submit();
              } else {
                alert("Por favor introduce correctamente la url de la imagen de la película")
              }
            } else {
              alert("Por favor introduce correctamente la duración de la película")
            }
          } else {
            alert("Por favor introduce correctamente el género de la película");
          }
        } else {
          alert("Por favor introduce correctamente el director de la película");
        }
      } else {
        alert("Por favor introduce correctamente el año de la película");
      }
    } else {
      alert("Por favor introduce correctamente el título");
    }
  })
}
if (eliminar) {
  for (let i = 0; i < eliminar.length; i++) {
    eliminar[i].addEventListener("submit", function (event) {
      event.preventDefault();
      pregunta = confirm("¿Deseas eliminar realmente esta Película?");
      if (pregunta) {
        console.log("Aceptada")
        event.target.submit();
      } else {
        alert("No borrada");
      }
    })
  }
}

if(search){
  search.addEventListener("submit", function (event) {
  event.preventDefault()
  let titulo = document.getElementById("peli").value;

  if (titulo == "") {
      alert('Campo vacío. Por favor introduzca el titulo de una película')
      
  } else {event.target.submit()};
});
}

if (edit) {
  edit.addEventListener("submit", function (event) {
    event.preventDefault();
    let titulo = document.getElementById("editartitulo").value;
    let ano = document.getElementById("editaraño").value;
    let director = document.getElementById("editardirector").value;
    let genero = document.getElementById("editargenero").value;
    let duracion = document.getElementById("editarduracion").value;
    let url = document.getElementById("editarurl").value;
    let resTitulo = checkTitulo(titulo);
    if (resTitulo) {
      let resAno = checkAno(ano);
      if (resAno) {
        let resDirector = checkDirector(director);
        if (resDirector) {
          let resGenero = checkGenero(genero);
          if (resGenero) {
            let resDuracion = checkDuracion(duracion);
            if (resDuracion) {
              let resUrl = checkUrl(url);
              if (resUrl) {
                event.target.submit();
              } else {
                alert("Por favor introduce correctamente la url de la imagen de la película")
              }
            } else {
              alert("Por favor introduce correctamente la duración de la película")
            }
          } else {
            alert("Por favor introduce correctamente el género de la película");
          }
        } else {
          alert("Por favor introduce correctamente el director de la película");
        }
      } else {
        alert("Por favor introduce correctamente el año de la película");
      }
    } else {
      alert("Por favor introduce correctamente el título");
    }
  })
}
