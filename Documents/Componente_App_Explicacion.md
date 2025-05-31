
# Componente `App.jsx`

Este componente es el **componente principal** de la aplicación en React. La cual se encarga de definir las rutas principales de la aplicación utilizando la librería `react-router-dom`.

---

## Importaciones

```javascript
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Consultar from './Pages/Consultar/Consultar';
import Registrar from './Pages/Registrar/Registrar';
import Actualizar from './Pages/Actualizar/Actualizar';
```

- `App.css`: Archivo de estilo global para este componente.
- `Routes` y `Route`: Componentes provenientes de `react-router-dom` para definir la navegación de las rutas.
- `Consultar`, `Registrar`, `Actualizar`: Componentes de la página, ubicadas en la carpeta `Pages`, que se renderizan según la ruta actual.

---

## Estructura del Componente

```javascript
function App() {
  return (
    <>
      <div className="App">
          <Routes>
            <Route path="/" element={<Registrar />} />
            <Route path="/consultar" element={<Consultar />} />
            <Route path="/actualizar" element={<Actualizar />} />
          </Routes>
      </div>
    </>
  );
}
```

### Explicación:

- `function App()` Este es el componente funcional principal.
- Dentro del componente se usa un el contenedor `div` con un classname definido como `"App"` para poder aplicar estilos.
- El componente `<Routes>` contiene las rutas de la pagina, las cuales son:
  - `/` -- Renderiza el componente `Registrar`
  - `/consultar` -- Renderiza el componente `Consultar`
  - `/actualizar` -- Renderiza el componente `Actualizar`
- Finalmente se exporta `App` como el componente principal que se utiliza en el `index.jsx`.

---

## Rutas Definidas

| Ruta            | Componente Renderizado |
|-----------------|------------------------|
| `/`             | `<Registrar />`        |
| `/consultar`    | `<Consultar />`        |
| `/actualizar`   | `<Actualizar />`       |

