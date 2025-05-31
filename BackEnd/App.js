import express from "express";
import { Op } from "sequelize";
import empleados from "./models/empleados.js";
import cors from "cors";
import bodyParser from "body-parser";
const app = express();
const port = 3000;

//configurar el body parse
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(port, async () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
})

app.post("/registrar_Empleado", async (req, res) => {
    const { nombre, email, telefono,tipoEmpleado, sueldoDiario } = req.body;
    
    if (!nombre || !email || !telefono || !tipoEmpleado || !sueldoDiario) {
        return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const empleadoExiste = await empleados.findOne( [Op.or] [ { email: email }, { telefono: telefono } ]);
    
    if (empleadoExiste.email === email) {
        return res.status(400).json({ error: "El email ya está registrado" });
    } else if (empleadoExiste.telefono === telefono) {
        return res.status(400).json({ error: "El teléfono ya está registrado" });
    }



    try {
        const nuevoSueldo = await empleados.create({
            tipo:tipoEmpleado,
            sueldoDiario,
            nombre,
            email,
            telefono
        });
        res.status(201).json(nuevoSueldo);
    } catch (error) {
        console.error("Error al registrar empleado:", error);
        res.status(500).json({ error: "Error al crear el sueldo" });
    }
});

app.get('/obtenerDatos_Empleado/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const empleado = await empleados.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }
        res.json(empleado);
    } catch (error) {
        console.error("Error al obtener el empleado:", error);
        res.status(500).json({ error: "Error al obtener el empleado" });
    }
});


app.put("/actualizar_Empleado", async (req, res) => {
    const { id, nombre, email, telefono, tipoEmpleado, sueldoDiario } = req.body;

    try {
        // 1. Validar que el empleado existe
        const empleado = await empleados.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        // 2. Validar campos obligatorios
        const emailExistente = await empleados.findOne({ where: { email } });
        if (emailExistente && emailExistente.id !== Number(id)) {
            return res.status(400).json({ error: "El email ya está registrado" });
        }

        const telefonoExistente = await empleados.findOne({ where: { telefono } });
        if (telefonoExistente && telefonoExistente.id !== Number(id)) {
            return res.status(400).json({ error: "El teléfono ya está registrado" });
        }

        //Actualizar los campos del empleado
        empleado.nombre = nombre;
        empleado.email = email;
        empleado.telefono = telefono;
        empleado.tipoEmpleado = tipoEmpleado;
        empleado.sueldoDiario = sueldoDiario;

        //Guardar los cambios
        await empleado.save();

        return res.json(empleado);
    } catch (error) {
        console.error("Error al actualizar el empleado:", error);
        return res.status(500).json({ error: "Error al actualizar el empleado" });
    }
});

app.delete("/eliminar_Empleado/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const empleado = await empleados.findByPk(id);
        if (!empleado) {
            return res.status(404).json({ error: "Empleado no encontrado" });
        }

        await empleado.destroy();
        return res.json({ message: "Empleado eliminado correctamente" });
    } catch (error) {
        console.error("Error al eliminar el empleado:", error);
        return res.status(500).json({ error: "Error al eliminar el empleado" });
    }
});

app.get("/obtener_Empleados", async (req, res) => {
    try {
        const sueldosList = await empleados.findAll();
        res.json(sueldosList);
    } catch (error) {
        console.error("Error al obtener los sueldos:", error);
        res.status(500).json({ error: "Error al obtener los sueldos" });
    }
});