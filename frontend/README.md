# frontend

Aquí se incluyen css, bootstrap, javascript, react, etc.

## node_modules

No lo tocamos, son cosas de instalación relacionadas con npm.

## public

Assets que serán publicos, como imagen de logo, etc.

## src

Carpeta del código.

## index.html

El archivo base, punto de entrada a la página.

## package.json

Información del proyecto, nombre del proyecto, librerías usadas, etc.

## tsconfig.json y vite.config.js

No se ocupa modificar, es para typescript y otra info técnica.

### estructura base para un componente

function App() {
return (
<></>
);
}

export default App;

### linea para la importación de react router

import { Link } from "react-router-dom";
