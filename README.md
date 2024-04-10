# MyHotels

## Dev ```Este proyecto tiene un backend que solo corre local con la dependencia json-server```
        ```Èsta aplicacion no corre en produccion, por falta de un backend para el mismo```

Seguir los siguientes pasos para correr localmente.

1. Clonar el proyecto
2. Ejecutar ```npm install```
3. Despues de ejecutar el paso 2, Levantamos el backend con ```npm run backend``` en esta consola
4. Despues de ejecutar el paso 3, abrimos una nueva consola sin cerrar la anterior y ejecutamos ```npm start```

5. Para ingresar a la aplicacion solo es necesario dar click en "sign in".
6. Si se da click en logout, debe volver a ingresar desde el login, 
   esta aplicacion tiene un guard que valida si existe un token guardado en localstorage.
