# API REST para Gestion de Empleados
Este proyecto implementa una API que utiliza **Express** y **Sequelize** para gestionar  a los empleados.

## Configuracion del Servidor
```js
import express from "express";
import { Op } from "sequelize";
import empleados from "./models/empleados.js";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
```

## Endpoints

### POST `/registrar_Empleado`
Registra un nuevo empleado.

**Parámetros esperados en el body:**
- `nombre`
- `email`
- `telefono`
- `tipoEmpleado`
- `sueldoDiario`

**Validaciones:**
- Todos los campos son obligatorios.
- El email o teléfono no deben estar registrados previamente.

```js
app.post("/registrar_Empleado", async (req, res) => {
    ... //Resto del codigo
});
```

---
### GET `/obtenerDatos_Empleado/:id`
Obtiene la informacion de un solo empleado mediante su ID.

```js
app.get('/obtenerDatos_Empleado/:id', async (req, res) => {
    ...  //Resto del codigo
});
```

---

### PUT `/actualizar_Empleado`
Actualiza los datos de un empleado.

**Parametros que esperan estar en el body:**
- `id`
- `nombre`
- `email`
- `telefono`
- `tipoEmpleado`
- `sueldoDiario`

**Validaciones:**
- El empleado debe existir.
- El email y telefono no deben estar registrados por otro empleado.

```js
app.put("/actualizar_Empleado", async (req, res) => {
    ...  //Resto del codigo
});
```

---
### DELETE `/eliminar_Empleado/:id`
Elimina un empleado mediante su ID.

```js
app.delete("/eliminar_Empleado/:id", async (req, res) => {
    ... //Resto del codigo
});
```

**Validaciones:**
- El empleado debe existir.

---
### GET `/obtener_Empleados`

Obtiene todos los empleados registrados.

```js
app.get("/obtener_Empleados", async (req, res) => {
    ... //Resto del codigo
});
```