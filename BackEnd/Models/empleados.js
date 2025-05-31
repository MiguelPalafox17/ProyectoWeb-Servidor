import { DataTypes } from "sequelize";
import sequelize from "../DB/conexion.js";


const empleados = sequelize.define('Empleados', {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    tipo: {type: DataTypes.TEXT},
    sueldoDiario: {type: DataTypes.DOUBLE},
    nombre: {type: DataTypes.STRING},
    telefono: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
}, {timestamps: false});

export default empleados;