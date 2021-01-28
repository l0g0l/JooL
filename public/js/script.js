//El evento DOMContentLoaded es disparado cuando el documento HTML ha sido completamente cargado y parseado, sin esperar hojas de estilo, images y subframes para  finalizar la carga
document.addEventListener('DOMContentLoaded',() =>{
  console.log("Mojolulu")
  const btn_menu = document.querySelector(".btn_menu")
  if(btn_menu) {
    btn_menu.addEventListener ('click', () => {
      console.log("Mojolulu")
      const menu_items = document.querySelector(".menu_items")
      menu_items.classList.toggle("show")
    })
  }
})




