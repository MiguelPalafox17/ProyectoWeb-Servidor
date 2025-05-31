import './Actualizar.css';
import { useState, useEffect } from "react";
import BackButton from '../../Components/Back-Button/Back-Button';

function Actualizar() {
    // Estados inicializados con los valores del empleado
    const [id, setId] = useState('');
    const [errorId, setErrorId] = useState('');
    const [nombre, setNombre] = useState('');
    const [errorNombre, setErrorNombre] = useState('');
    const [tipoEmpleado, setTipoEmpleado] = useState('');
    const [sueldoDiario, setSalarioDiario] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState("");
    const [telefono, setTelefono] = useState('');
    const [errorTelefono, setErrorTelefono] = useState('');
    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [serverTelefonoError, setServerTelefonoError] = useState("");
    const [serverEmailError, setServerEmailError] = useState("");


    //Validacion del ID
    const handleIdSubmit = () => {
        const newErrors = { id: "" };
        if (id.trim() === "") {
            newErrors.id = "Necesario ingresar el id";
            setErrorId(newErrors);
            return false;
        }
        
        if (!/^\d+$/.test(id)) {
            newErrors.id = "El ID debe ser numérico";
            setErrorId(newErrors);
            return false;
        }
        
        setErrorId(newErrors);
        return true;
    };

    // Validación del nombre
    const handleNameSubmit = () => {
        const newErrors = { nombre: "" };
        if (nombre.trim() === "") {
            newErrors.nombre = "Por favor ingrese el nombre.";
        }
        setErrorNombre(newErrors);
        return newErrors.nombre === "";
    };

    // Validación del email
    const validateEmail = (input) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!input) {
            setEmailError("El correo electrónico es requerido");
            return false;
        } else if (!emailRegex.test(input)) {
            setEmailError("Ingresa un correo electrónico válido");
            return false;
        } else {
            setEmailError("");
            return true;
        }
    };

    // Validación del teléfono
    const validationTelefono = () => {
        if (telefono.trim() === "") {
            setErrorTelefono("Por favor ingresa el teléfono celular.");
            return false;
        }
        setErrorTelefono("");
        return true;
    };

    // Función para obtener los datos del empleado por ID
    useEffect(() => {
        if (id.trim() !== "") {
            const obtenerDatosEmpleado = async () => {
                try {

                    const response = await fetch(`http://localhost:3000/obtenerDatos_Empleado/${id}`, {
                        method: 'GET',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        }
                    });
                    if (response.ok) {
                        const data = await response.json();
                        setNombre(data.nombre || '');
                        setTipoEmpleado(data.tipoEmpleado || '');
                        setSalarioDiario(data.sueldoDiario || '');
                        setEmail(data.email || '');
                        setTelefono(data.telefono || '');
                        setServerError("");
                    } else {
                        setNombre('');
                        setTipoEmpleado('');
                        setSalarioDiario('');
                        setEmail('');
                        setTelefono('');
                        setServerError("No se encontró un empleado con ese ID");
                    }
                } catch (err) {
                    setServerError("Error al conectar con el servidor");
                    console.error("Error al obtener datos:", err);
                }
            };

            obtenerDatosEmpleado();
        }
    }, [id]);

    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError("");
        setServerEmailError("");
        setServerTelefonoError("");
        setSuccessMessage("");

        // Validaciones
        const isIdValid = handleIdSubmit();
        const isNombreValid = handleNameSubmit();
        const isTelefonoValid = validationTelefono();
        const isEmailValid = validateEmail(email);
        const isTipoValid = tipoEmpleado !== "";

        // Verirficar si el ID es válido antes de continuar
        if (!handleIdSubmit()) {
            return;
        }
        
        // Verificar si todos los campos son válidos
        if (!isEmailValid || !isNombreValid || !isTelefonoValid || !isTipoValid || !isIdValid) {
            setServerError("Por favor, completa todos los campos correctamente.");
            return;
        }

        // Construir el JSON para actualizar
        const userData = {
            id: Number(id),
            nombre,
            tipoEmpleado,
            sueldoDiario: Number(sueldoDiario),
            email,
            telefono
        };

        

        try {
            const response = await fetch("http://localhost:3000/actualizar_Empleado", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("¡Actualización exitosa! Los datos del empleado han sido actualizados.");
            } else {
                if(response.status === 400) {
                    if(data.error === "El teléfono ya está registrado") {
                        setServerTelefonoError("El teléfono ingresado ya está registrado.");
                    } else if(data.error === "El email ya está registrado") {
                        setServerEmailError("El correo electrónico ya está registrado.");
                    } else {
                        setServerError(data.error || "Error en el servidor. Intenta nuevamente.");
                    }
                } else {
                    setServerError(data.error || "Error en el servidor. Intenta nuevamente.");
                }
            }
        } catch (err) {
            setServerError("Error de conexión. Verifica tu red.");
            console.error("Error al enviar datos:", err);
        }
    };

    return (
        <div className='RegistrarSueldo'>
            <div className="container">
                <div className="form_area">
                    <BackButton />
                    <p className="title">Actualizar Empleado</p>
                    <form className="form_wrapper" onSubmit={handleSubmit}>

                        <div className="form_group">
                            <label className="sub_title">ID del Empleado</label>
                            <input 
                                value={id} 
                                onChange={(e) => setId(e.target.value)} 
                                onBlur={handleIdSubmit}
                                className="form_style" 
                                type="text" 
                            />
                            {errorId.id && <p className="registration-error-message">{errorId.id}</p>}
                        </div>

                        <div className="form_group">
                            <label className="sub_title">Nombre del Empleado</label>
                            <input 
                                value={nombre} 
                                onChange={(e) => setNombre(e.target.value)} 
                                className="form_style" 
                                type="text" 
                            />
                            {errorNombre.nombre && <p className="registration-error-message">{errorNombre.nombre}</p>}
                        </div>

                        <div className="form_group">
                            <label className="sub_title" htmlFor="email">Email</label>
                            <input 
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ingresa tu Email" 
                                onBlur={() => validateEmail(email)} 
                                className="form_style" 
                                type="email" 
                            />
                            {emailError && <p className="registration-error-message">{emailError}</p>}
                            {serverEmailError && <p className="registration-error-message">{serverEmailError}</p>}
                        </div>

                        <div className="form_group">
                            <label className="sub_title" htmlFor="email">Teléfono</label>
                            <input 
                                value={telefono} 
                                onChange={(e) => setTelefono(e.target.value)} 
                                placeholder="Ingresa tu teléfono" 
                                minLength="10" 
                                maxLength="10" 
                                className="form_style" 
                                type="text" 
                            />
                            {errorTelefono && <p className="registration-error-message">{errorTelefono}</p>}
                            {serverTelefonoError && <p className="registration-error-message">{serverTelefonoError}</p>}
                        </div>

                        <div className="form_group">
                            <label className="sub_title" htmlFor="password">Sueldo diario</label>
                            <input 
                                value={sueldoDiario} 
                                onChange={(e) => setSalarioDiario(e.target.value)} 
                                className="form_style" 
                                type="number" 
                                step="0.05" 
                                min="278.80" 
                            />
                        </div>

                        <div className="form_group">
                            <label className="sub_title" htmlFor="tipoEmpleado">Tipo de empleado:</label>
                            <select 
                                value={tipoEmpleado} 
                                onChange={(e) => setTipoEmpleado(e.target.value)} 
                                className="form_style" 
                                id="tipoEmpleado" 
                                name="tipoEmpleado"
                            >
                                <option className="options_style" value="" disabled>Seleccionar Puesto</option>
                                <option className="options_style" value="auxiliar">Auxiliar</option>
                                <option className="options_style" value="base">Base</option>
                                <option className="options_style" value="practicante">Practicante</option>
                            </select>
                        </div>

                        <div className="form_group_buttons">
                            <button className="btn" type="submit">Actualizar</button>
                        </div>

                        {serverError && <p className="registration-error-message">{serverError}</p>}
                        {successMessage && <p className="registration-success-message">{successMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Actualizar;