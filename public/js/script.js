

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
  if (tipo.type == "password") {
    tipo.type = "text";
  } else {
    tipo.type = "password";
  }
}
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
  let expReg = /^(?=.*\d)(?=.*[\u0021-\u002b\u003c-\u0040])(?=.*[A-Z])(?=.*[a-z])\S{2,20}$/ //La contraseña debe tener al menos entre 8 y 16 caracteres, al menos un dígito, al menos una minúscula, al menos una mayúscula y al menos un caracter no alfanumérico.
  if (expReg.test(password)) {
    return true
  } else {
    return false
  }
}
function checkTitulo(titulo) {
  let expReg = /^[a-z0-9À-ÿ\u00f1\u00d1\:\!\@\"\.\,\#\$\%\&\-\s]{1,500}$/gi //El título debe tener al entre 1 y 100 caracteres, incluyendo cualquier letra acentuada o no, número, ñ Ñ, y esos caracteres especiales
  if (expReg.test(titulo)) {
    return true
  } else {
    return false
  }
}
function checkYear(year) {
  let expReg = /^(1[8-9][0-9][0-9]|20[0-9][0-9]|2100)$/ // desde 1800 a 1999 o desde 2000 a 2099 o 2100
  if (expReg.test(year)) {
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
let search = document.querySelector('.formularioS'); // he añadido una S de serach para diferenciarlo del otro formulario
let edit = document.getElementById("editform");
let dashboard = document.getElementById("dashboard");
let favorite = document.getElementsByClassName("culo");


if (formulario) {
  formulario.addEventListener("submit", function (event) {
    console.log(event)
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let resEmail = checkEmail(email);
    console.log(email, resEmail)
    if (resEmail) {
      //let resPassword = checkPassword(password);
      //if (resPassword) {
        event.target.submit();
      //} else {
        //alert("Por favor introduce correctamente la contraseña");
      } else {
      alert("Por favor introduce correctamente tu email");
    }
  })
}
if (createform) {
  createform.addEventListener("submit", function (event) {
    event.preventDefault();
    let titulo = document.getElementById("createtitulo").value;
    let year = document.getElementById("createyear").value;
    let director = document.getElementById("createdirector").value;
    let genero = document.getElementById("creategenero").value;
    let duracion = document.getElementById("createduracion").value;
    let url = document.getElementById("createurl").value;
    let escritor = document.getElementById("createescritor").value;
    let actores = document.getElementById("createactores").value;
    let resumen = document.getElementById("createresumen").value;
    let premios = document.getElementById("createpremios").value;

    let resTitulo = checkTitulo(titulo);
    if (resTitulo) {
      let resyear = checkYear(year);
      if (resyear) {
        let resDirector = checkDirector(director);
        if (resDirector) {
          let resGenero = checkGenero(genero);
          if (resGenero) {
            let resDuracion = checkDuracion(duracion);
            if (resDuracion) {
              let resEscritor = checkTitulo(escritor);
              if (resEscritor) {
                let resActores = checkTitulo(actores);
                if (resActores) {
                  let resResumen = checkTitulo(resumen)
                  if (resResumen) {
                    let resPremios = checkTitulo(premios)
                    if (resPremios) {
                      let resUrl = checkUrl(url);
                      if (resUrl) {
                        event.target.submit();
                      } else {
                        alert("Por favor introduce correctamente la url de la imagen de la película")
                      }
                    } else {
                      alert("Por favor introduce correctamente los premios de la película")
                    }
                  } else {
                    alert("Por favor introduce correctamente el resumen de la película")
                  }
                } else {
                  alert("Por favor introduce correctamente los actores de la película")
                }
              } else {
                alert("Por favor introduce correctamente el escritor de la película")
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
      } else { alert("No borrada") }
    })
  }
};

if (search) {
  search.addEventListener("submit", function (event) {
    event.preventDefault()
    let titulo = document.getElementById("peli").value;

    if (titulo == "") {
      alert('Campo vacío. Por favor introduce el título de una película')

    } else { event.target.submit() };
  });
}

if (edit) {
  edit.addEventListener("submit", function (event) {
    event.preventDefault();
    let titulo = document.getElementById("editartitulo").value;
    console.log(titulo)
    let year = document.getElementById("editaryear").value;
    let director = document.getElementById("editardirector").value;
    let genero = document.getElementById("editargenero").value;
    let duracion = document.getElementById("editarduracion").value;
    let escritor = document.getElementById("editarescritor").value;
    let actores = document.getElementById("editaractores").value;
    let resumen = document.getElementById("editarresumen").value;
    let premios = document.getElementById("editarpremios").value;
    let resTitulo = checkTitulo(titulo);
    if (resTitulo) {
      let resyear = checkYear(year);
      if (resyear) {
        let resDirector = checkDirector(director);
        if (resDirector) {
          let resGenero = checkGenero(genero);
          if (resGenero) {
            let resDuracion = checkDuracion(duracion);
            if (resDuracion) {
              let resEscritor = checkTitulo(escritor);
              if (resEscritor) {
                let resActores = checkTitulo(actores);
                if (resActores) {
                  let resResumen = checkTitulo(resumen)
                  if (resResumen) {
                    let resPremios = checkTitulo(premios)
                    if (resPremios) {
                      event.target.submit();
                    } else {
                      alert("Por favor introduce correctamente los premios de la película")
                    }
                  } else {
                    alert("Por favor introduce correctamente el resumen de la película")
                  }
                } else {
                  alert("Por favor introduce correctamente los actores de la película")
                }
              } else {
                alert("Por favor introduce correctamente el escritor de la película")
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
if (dashboard)
  document.addEventListener('DOMContentLoaded', () => {
    const elementosCarrousel = document.querySelectorAll('.carousel');
    M.Carousel.init(elementosCarrousel, {
      duration: 480,
      dist: -80,
      indicators: true,
      padding: -20
    })
  });
if (favorite) {
  console.log(favorite)
  Array.from(favorite).forEach(element => { // Array. from es neecsario para convertir getelement a un array normal (sale un html colletion, y no tiene el método foreach)
    element.addEventListener('click', function (event) {
      element.style.backgroundColor = "#aee1e1"
    });


  })
}

