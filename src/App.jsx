import './App.css';
import {Route, Routes } from 'react-router-dom';
import Consultar from './Pages/Consultar/Consultar';
import Registrar from './Pages/Registrar/Registrar';
import Actualizar from './Pages/Actualizar/Actualizar';


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
  )
}

export default App;