# Stock-Web-Angular

### Aplicación de Ventas de Insumos Electrónicos

Esta es una aplicación de ventas de insumos electrónicos desarrollada como proyecto estudiantil donde se utiliza TypeScript para el back-end y Angular para el Front-end,

La aplicación sigue el patrón de diseño Modelo-Vista-Controlador (MVC) para organizar y estructurar el código.

## Características principales
* Gestión de usuarios: Permite registrar y administrar usuarios con roles de administrador y vendedor.
* Gestión de productos: Permite agregar, editar y eliminar productos de la base de datos, incluyendo detalles como nombre, descripción, precio, existencia, etc.
* Gestión de clientes: Permite registrar y administrar información de los clientes, como nombres, direcciones, información de contacto, etc.
* Gestión de pedidos: Permite realizar y administrar pedidos de los clientes, seleccionando productos disponibles, especificando cantidades, generando facturas, etc.

## Tecnologías utilizadas
* Lenguaje de programación: TypeScript
* Base de datos: MySQL
* Framework web: Angular
* ORM: Sequelize
* Patrón de diseño: Modelo-Vista-Controlador (MVC)
  
## Estructura del proyecto
El proyecto está organizado siguiendo la estructura típica de una aplicación Angular con backend separado:

* Backend: Contiene el código del servidor y se encarga de gestionar las peticiones del cliente, interactuar con la base de datos y proporcionar los datos necesarios para la aplicación frontend.
  
  * Controladores: Manejan las solicitudes HTTP y realizan las operaciones correspondientes en la base de datos (Contienen la lógica de negocio).

  * Modelos: Representan las entidades de la aplicación y definen su estructura y relaciones.

  * Rutas: Definen las rutas y los controladores asociados para cada endpoint de la API.

  * Conexión al Base de Datos: Contiene la configuración de la base de datos MySQL.
  
* Frontend: Contiene el código de la aplicación Angular:

  * Componentes: Representan las diferentes partes de la interfaz de usuario, como la lista de productos, el formulario de pedidos, etc.

  * Servicios: Se encargan de la comunicación con el backend y proporcionan los datos necesarios para los componentes.

  * Interceptor: son clases que permiten capturar y manipular las peticiones HTTP antes de que se envíen al servidor o las respuestas HTTP antes de que se entreguen a los componentes.

  * Guards: son clases que se utilizan para proteger las rutas y controlar el acceso a diferentes partes de una aplicación. Los guards se ejecutan antes de que una ruta se active y permiten tomar decisiones basadas en ciertas condiciones, como la autenticación, roles de usuario, permisos, etc.

  * Modelos: Representan las estructuras de datos utilizadas en la aplicación frontend.

  * Estilos: Contiene los estilos CSS utilizados en la aplicación.

## Instrucciones de instalación y ejecución

1) Clona el repositorio a tu máquina local.
2) Configura la base de datos MySQL y asegúrate de tener acceso a un servidor MySQL.
3) En el backend, actualiza la cadena de conexión a la base de datos en el archivo de configuración correspondiente.
4) Ejecuta los scripts de creación de la base de datos en tu servidor MySQL.
5) Instala las dependencias del backend ejecutando npm install en el directorio raíz

## Contribución

Si deseas contribuir a este proyecto, puedes seguir los siguientes pasos:

1) Realiza un fork de este repositorio.
2) Crea una nueva rama con el nombre descriptivo de tu contribución.
3) Realiza los cambios y mejoras en tu rama.
4) Envía un pull request para revisar tus cambios.
