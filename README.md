# TIC-TAC-TOE Backend
Este proyecto es la implementación del backend para el reto especificado en [este repositorio](https://github.com/darkxeno/js-code-test/blob/master/README.reduced.js.md)
El proyecto de Frontend se encuentra en [este repositorio](https://github.com/rafaalvfe/tic-tac-toe-front)

## Especificaciones técnicas
- Node 14.15.1
- NPM 6.14.8

## Instalación
````
npm install
````
## Configuración
### .env
Para entorno de desarrollo crear un fichero ``.env`` en la raíz del proyecto
Este proyecto utiliza las siguientes variables de entorno:
- JWT_TTT_KEY: llave para JWT.
- PORT: Puerto que utilizará la API (opcional, 3000 por defecto).


## Ejecutar aplicación
````
npm start
````

## Solución
El servidor responderá al cliente con las siguientes propiedades adicionales:
- token: String. Token único que contiene información de la partida para validación del juego, se actualiza después de cada movimiento del jugador.
- cpuMark: String. Ficha que utilizará la máquina en esa partida.
- score: Object 
    - "o": Number. Puntuación de la ficha círculo.
    - "x": Number. Puntuación de la ficha equis.
    - "finished": Boolean. Indica si la partida ha finalizado.
    
Cada llamada a la API desde el cliente debe incluir el nuevo generado token salvo la primera vez que se inicia la partida.
Para la elección de la siguiente posción que selecciona la máquina se implementó el algoritmo recursivo minimax.

