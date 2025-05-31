
# Modelo Sequelize: Empleados
Este archivo define el modelo `Empleados` utilizando Sequelize para interactuar con la BD.

## Definicion del Modelo
```js
import { DataTypes } from "sequelize";
import sequelize from "../DB/conexion.js";

const empleados = sequelize.define('Empleados', {
    id: {type: DataTypes.INTEGER, primaryKey: true},
    tipo: {type: DataTypes.TEXT},
    sueldoDiario: {type: DataTypes.DOUBLE},
    nombre: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
}, {timestamps: false});

export default empleados;
```

## Definicion de los Campos
- `id`: Identificador unico del empleado. Es la clave primaria (`primaryKey`).
- `tipo`: Tipo de empleado.
- `sueldoDiario`: Sueldo que recibe el empleado diario.
- `nombre`: Nombre completo del empleado.
- `telefono`: Numero de telefono del empleado. Debe ser unico.
- `email`: Direccion de correo electronico del empleado. Debe ser unico.

## Opciones del Modelo
- `timestamps: false`: Indica que no se usaran los campos `createdAt` ni `updatedAt` que Sequelize incluye por defecto.