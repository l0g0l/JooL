movieApp  
---  

Requisitos del proyecto  
---  

Se pide desarrollar una aplicación web de búsqueda y gestión de películas que contemple las siguientes funcionalidades y endpoints asociados. Trabajaremos sobre los conceptos vistos de Frontend y Backend en clase

Aclaración inicial previa: La app tendrá dos roles distintos: Usuario y Administrador. Las funcionalidades que aparecerán tanto en el panel de control como en el resto de endpoints variarán dependiendo del tipo de usuario, no pudiendo nunca acceder a aquellas zonas o contenidos que no le corresponden.

Endpoints  

Endpoints generales de la app:  
[GET] / Vista de inicio de la app  
[GET] /dashboard Panel de control  
[GET] /search/:title Vista detalle de la película  
[GET] /search Buscador de películas  
[GET] /movies Mis películas  
[POST] /login Hacer login en la aplicación  
[POST] /logout Salir  
[POST] /createMovie Crear película  
[PUT] /editMovie/:id Editar película  
[DELETE] /removeMovie Borrar película  

Formulario de acceso  

Endpoints para formulario:  
[GET] / Vista de inicio de la app. Tendrá como mínimo un formulario de email y contraseña como credenciales de entrada a la app. Además, deberá ofrecer la alternativa de identificación mediante Google, Facebook u otro proveedor de autenticación.  
[POST] /login Validación de credenciales, abrir sesión y redirección a /dashboard si es Usuario, o /movies si es Administrador.  
[POST] /logout Cierre de sesión y redirección a / .  

Menú  
No asociado a ningún endpoint concreto, sino que estará presente una vez dentro de la app, pasada la identificación, en todas las vistas excepto el Panel de control.  

Dicho menú se podrá representar como se desee, si bien se recomienda un efecto de persiana asociada a un icono de hamburguesa.  

Endpoints para menú Usuario:  
[GET] /dashboard Panel de control  
[GET] /search Buscador de películas  
[GET] /movies Mis películas  
[POST] /logout Salir  

Endpoints para menú Administrador:  
[POST] /logout Salir  
Panel de control (Usuario): /dashboard  
Se mostrarán dos botones con iconos para acceder a las secciones /search y /movies.  

Buscar película (Usuario): /search  
Aparecerá un buscador (una caja de texto y un botón o icono de enviar) que buscará una película por título y mostrará a continuación las posibles coincidencias.  

Para cada película se mostrará la siguiente info:  

Título completo  
Imagen representativa  
Año  
Director  
Género  
Duración  
Para cada película habrá un botón de Añadir a Mis películas, que asociará dicha película al Usuario en la BBDD.  

Vista detalle de la película (Usuario): /search/:title  

Aparecerá la vista detalle de la película buscada, representando la información de dicha peli:  
Título completo  
Imagen representativa  
Año  
Director  
Género  
Duración  
Sinopsis  
Actores  
Rating  
Etc...  
Habrá un botón de Añadir a Mis películas, que asociará dicha película al Usuario.  

Mis películas (Usuario): /movies  
Aparecerá un listado de las películas que el Usuario añadió a la BBDD a través del buscador, con la misma información adicional de cada una de ellas (título completo, imagen representativa, año, director, género y duración), así como un botón de Quitar de Mis películas, que eliminará la asociación de película del Usuario.  

Gestionar películas (Administrador): /movies  
Esta es la única vista que tendrá el Administrador en la aplicación, de manera que no podrá acceder a ninguna de las otras. De la misma manera, el Usuario no podrá acceder a esta vista tampoco.   

Se mostrará un botón de Crear nueva y debajo del mismo, un listado de todas las películas almacenadas localmente, con botones de Editar y Eliminar para cada una de ellas.  

El botón de Crear nueva llevará al endpoint /createMovie , que mostrará un formulario con los campos título completo, imagen representativa, año, director, género y duración, para dar de alta una nueva película en la base de datos local. Se valorará positivamente la realización de algún tipo de validación de dichos campos. 

Para el botón de Editar, cuando el Administrador pinche sobre él, la aplicación irá al endpoint /editMovie/:id (donde :id tendrá el valor correspondiente), que mostrará un formulario idéntico al del párrafo anterior, pero con los campos autorrellenados con los datos almacenados localmente. Si se realizó la validación en la creación, debería también aplicarse en este caso al modificarlos el Administrador.  

Para el botón de Eliminar, se solicitará algún tipo de confirmación y en caso afirmativo, se borrará de la base de datos local. Se lanzará una petición al endpoint /removeMovie Asimismo, se desasociarán todas las posibles relaciones entre dicha película eliminada y aquellos Usuarios que la tuvieran guardada en sus películas.  

Notas adicionales  
---  

Sobre el control de acceso  

La aplicación debe estar protegida a entradas indebidas de usuarios no registrados (o autorizados por un proveedor externo), de manera que cualquier endpoint asociado a la zona privada (es decir, distinto de /, /login y /logout) comprobará si la sesión está abierta, y en otro caso redireccionará al inicio de la app.  

Para el login con credenciales email y contraseña, deberá hacerse mediante JWT (el cifrado es opcional). Para la parte de login con uno o más proveedores de terceros(Google, Github, etc...) deberá hacerse mediante OAuth (con o sin Firebase, a elegir; en cualquier caso, con un proveedor OAuth será suficiente).  

Sobre el modelo de datos  

Para el almacenamiento y la búsqueda de los datos, se realizará de la siguiente manera:

La información relativa a usuarios de la plataforma (credenciales y otras cuestiones de acceso, así como la asociación de películas a usuarios) se almacenará en una base de datos relacional SQL.  

Los datos de las películas provendrán de dos fuentes distintas:  

API OMDB
Base de datos no relacional MongoDB, que será exclusivamente mantenida por el Administrador.  
El objetivo será en todo momento que no se replique información, dando prioridad a OMDB si ya dispone de los datos de una película, y si no es así, complementarla con una base de datos local.  

Al realizar un Usuario la búsqueda de películas por título, la aplicación deberá consultar en primer lugar a la API OMDB:  

Si la película es localizada en dicha API, mostrará sus datos al Usuario por pantalla en los resultados de búsqueda, sin almacenarlos en ninguna base de datos local.  
Si la película no es localizada en dicha API, entonces buscará en la BBDD MongoDB.  
Si no existe, devolverá un mensaje de No hay resultados o similar.  
Cuando un Usuario añada a sus películas una de las mostradas en el buscador, se guardará en la base de datos relacional (SQL) la información necesaria para asociar dicho usuario con la fuente de datos correspondiente (OMDB o en la BBDD MongoDB). Remarcar que no deben guardarse de nuevo los datos de la película, puesto que estos ya existen en otro lugar, sino la relación entre la fuente de la que provienen sus datos (OMDB o MongoDB) y el usuario.  

La base de datos local MongoDB tan solo guardará las películas que no están en OMDB (con los mismos datos: título completo, imagen representativa, año, director, género y duración) para alimentar el buscador del Usuario. Para dicho Usuario, el origen de los datos debería ser totalmente transparente, de manera que no debería saber si estos provienen de API externa o de BD local. En cualquier caso, el objetivo es evitar cualquier tipo de redundancia.  

Sobre la app  
La aplicación debe ser mobile-first y de tipo Server Side Rendering utilizando un motor de plantillas (Pug).  

Control de versiones  
Gestión del control de versiones con GiHub desde el principio del proyecto. Lo utilizaremos para trabajar en equipo de manera paralela, utilizando ramas, pull request, fork, etc.  

Sobre los recursos de terceros  
Se permite (y recomienda, si con ello se minimiza el tiempo de desarrollo y se acelera así el de entrega) el uso de cualquier recurso de terceros (librerías, paquetes npm, etc.) además del código propio.  

Sobre la metodología  
Durante el desarrollo del proyecto completo, se seguirá una metodología ágil tipo SCRUM, aplicando además TDD desde el comienzo hasta el final.  

Esto implicará el establecimiento de un backlog de tareas, un sprint con sus story points y reparto de tareas, así como la creación de tests unitarios desde el principio y, a ser posible, la realización de tests e2e al final.
