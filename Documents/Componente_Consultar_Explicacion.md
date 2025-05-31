
# Componente `Consulta.jsx`

Este componente muestra la tabla con los datos de los empleados registrados. Permite visualizar y eliminar los registros directamente desde la tabla.

---

## Importaciones

```javascript
import { useState, useEffect } from 'react';
import './Consultar.css';
```

- `useState`: Para manejar el estado local de los datos.
- `useEffect`: Para ejecutar la carga de datos al montar el componente.
- `./Consultar.css`: Hoja de estilos para la tabla y botones.

---

## Estado y Datos

```javascript
const [filas, setFilas] = useState([]);
```

- `filas`: Arreglo que contiene los datos de los empleados obtenidos desde la API.

La URL de la API es:

```javascript
const API_URL = 'http://localhost:3000/obtener_Empleados';
```

Se realiza un `fetch` en el `useEffect` para poder obtener los datos una sola vez al montar el componente.

---

## Eliminar Registros

Función `handleEliminar`:

- Solicita la confirmacion del usuario.
- Realiza una peticion `DELETE` a la ruta `http://localhost:3000/eliminar_Empleado/:id`.
- Si es exitosa, elimina al empleado y se actualiza la tabla sin recargar la página.
- Muestra alertas segun el resultado.

---

## Renderizado de Tabla

Se muestra una tabla con las columnas:

- ID
- Nombre
- Tipo de Empleado
- Sueldo Diario
- Email
- Telefono
- Acciones (botón "Eliminar")

```jsx
{filas.map((fila, index) => (
  <tr key={fila.id || index}>
    ...
  </tr> 
))}
```

Si no hay registrose en la BD, muestra una fila que indica: **"No hay empleados."**