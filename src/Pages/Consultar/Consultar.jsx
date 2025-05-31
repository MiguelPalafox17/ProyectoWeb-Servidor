import { useState, useEffect } from 'react';
import './Consultar.css';

function Consulta() {
  const [filas, setFilas] = useState([]);

  // Cambia esta URL por la de tu API real
  const API_URL = 'http://localhost:3000/obtener_Empleados';

  // Cargar los datos al montar el componente
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setFilas(data))
      .catch((err) => console.error('Error al cargar datos:', err));
  }, []);


  const handleEliminar = async (id) => {
    if (!window.confirm('¿Estás seguro de que deseas eliminar este empleado?')) {
      return;
    }

    try {

      const response = await fetch(`http://localhost:3000/eliminar_Empleado/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        // Actualizar el estado eliminando el registro
        setFilas(filas.filter(fila => fila.id !== id));
        alert('Empleado eliminado correctamente');
      } else {
        const errorData = await response.json();
        alert(`Error al eliminar: ${errorData.message || 'Error desconocido'}`);
      }
    } catch (error) {
      console.error('Error al eliminar:', error);
      alert('Error al conectar con el servidor');
    }
  };



return (
    <table border="1" cellPadding="5" cellSpacing="0" className="tabla-empleados"> 
      <thead>
        <tr>
          <th>ID</th>
          <th>Nombre</th>
          <th>Tipo Empleado</th>
          <th>Salario Diario</th>
          <th>Email</th>
          <th>Teléfono</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {filas.map((fila, index) => (
          <tr key={fila.id || index}>
            <td>{fila.id}</td>
            <td>{fila.nombre}</td>
            <td>{fila.tipo}</td>
            <td>{fila.sueldoDiario}</td>
            <td>{fila.email}</td>
            <td>{fila.telefono}</td>
            <td>
              <button 
                onClick={() => handleEliminar(fila.id)}
                className="boton-eliminar"
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
        {filas.length === 0 && (
          <tr>
            <td>No hay empleados.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}


export default Consulta;
