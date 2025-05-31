import { useNavigate } from "react-router-dom";
import './Registrar.css'
import { useState } from "react";


function Registrar() {

    const navigate = useNavigate();

    //Estados para el nombre
    const [nombre, setNombre] = useState('');
    const [errorNombre, setErrorNombre] = useState({nombre:""})
    // Validacion del nombre
    const handleNameSubmit = () => {
        const newErrors = { nombre: ""};

        if (nombre.trim() === "") {
        newErrors.nombre = "Porfavor de ingresar el nombre.";
        }

        setErrorNombre(newErrors);
        return newErrors.nombre === "";
    };
    //Estados para el tipo de empleado
    const [tipoEmpleado, setTipoEmpleado] = useState('');


    const [sueldoDiario, setSalarioDiario] = useState(0);

    //Estados para el correo electronico
    const [email, setSalarioEmail] = useState('');
    const [emailError, setEmailError] = useState("");
    //Validacion para el correo electronico
    const validateEmail = (input) => { // Validación de correo electrónico
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

    //Estados para el numero de telefono
    const [telefono, setTelefono] = useState('');
    const [errorTelefono, setErrorTelefono] = useState(''); 
    // Validacion del telefono
    const validationTelefono = () => {
        if (telefono.trim() === "") {
            setErrorTelefono("Por favor ingresa el teléfono celular.");
            return false;
        }
        setErrorTelefono("");
        return true;
    };
    



    const [serverError, setServerError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [serverTelefonoError, setServerTelefonoError] = useState("");
    const [serverEmailError, setServerEmailError] = useState("");


    // Función para manejar el envío del formulario
    const handleSubmit = async (e) => {
        e.preventDefault();
        setServerError(""); // Reinicia el mensaje de error
        setServerEmailError(""); // Reinicia el mensaje de error de correo electrónico
        setSuccessMessage(""); // Reinicia el mensaje de éxito

        // Validaciones síncronas
        const isNombreValid = handleNameSubmit();
        const isTelefonoValid = validationTelefono();
        const isEmailValid = validateEmail(email);
        const isTipoValid = tipoEmpleado !== "";

if (!isEmailValid || !isNombreValid || !isTelefonoValid || !isTipoValid) {
    setServerError("Por favor, completa todos los campos correctamente.");
    return;
}

        if (!isEmailValid || !isNombreValid || !isTelefonoValid) {
            setServerError("Por favor, completa todos los campos correctamente.");
            return; // Detiene el envío si hay errores
        }

        //Construir el JSON que se enviara a la ruta de la API
        const userData = {
            nombre,
            tipoEmpleado,
            sueldoDiario: Number(sueldoDiario),
            email,
            telefono
        }

    try {
            const response = await fetch("http://localhost:3000/registrar_Empleado", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(userData)
            });

            const data = await response.json();

            if (response.ok) {
                setSuccessMessage("¡Registro exitoso! El empleado ha sido registrado correctamente.");
            } else {
                // Manejo de errores del servidor
                if(response.status === 400) {
                    if(data.error === "El teléfono ya está registrado") {
                        setServerTelefonoError("El telefono ingresado ya esta registrado.");
                    } else if(data.error === "El email ya está registrado") {
                        setServerEmailError("El correo electronico ya esta registrado.");
                    } else {
                        setServerError(data.error || "Error en el servidor. Intenta nuevamente.");
                    }
                }
                setServerError(data.error || "Error en el servidor. Intenta nuevamente.");
            }
        } catch (err) {
            setServerError("Error de conexión. Verifica tu red.");
            console.error("Error al enviar datos:", err);
        }
    }

        return (

            <>

                <div className='RegistrarSueldo'>
                    <div class="container">
                        <div class="form_area">
                            <p class="title">Registrar Sueldo</p>
                            <form action="" className="form_wrapper" onSubmit={handleSubmit}>

                                <div class="form_group">
                                    <label class="sub_title" for="name">Nombre del Empleado</label>
                                    <input value={nombre} onChange=
                                        {(e) => setNombre(e.target.value)} class="form_style" type="text" />
                                    
                                    {errorNombre.nombre && <p className="registration-error-message">{errorNombre.nombre}</p>}
                                </div>

                                <div class="form_group">
                                    <label class="sub_title" for="email">Email</label>
                                    <input value={email} onChange={(e) => setSalarioEmail(e.target.value)}
                                        placeholder="Ingresa tu Email" onBlur={() => validateEmail(email)} className="form_style" type="email" />

                                    {emailError && <p className="registration-error-message">{emailError}</p>}
                                    {serverEmailError && <p className="registration-error-message">{serverEmailError}</p>}

                                </div>

                                <div class="form_group">
                                    <label class="sub_title" for="email">Telefono</label>
                                    <input value={telefono} onChange={(e) => setTelefono(e.target.value)} placeholder="Ingresa tu telefono" minLength="10" maxLength="10" class="form_style" type="text" />

                                    {errorTelefono && (<p className="registration-error-message">{errorTelefono}</p>)}
                                    {serverTelefonoError && <p className="registration-error-message">{serverTelefonoError}</p>}
                                </div>

                                <div class="form_group">
                                    <label class="sub_title" for="password">Sueldo diario</label>
                                    <input value={sueldoDiario} onChange={(e) => setSalarioDiario(e.target.value)} class="form_style" type="number" step="0.05" min="278.80" />
                                    
                                </div>

                                <div class="form_group">
                                    <label className='sub_title' for="sub_title">Tipo de empleado:</label>
                                    <select value={tipoEmpleado} onChange={(e) => setTipoEmpleado(e.target.value)} className="form_style" id="tipoEmpleado" name="tipoEmpleado">
                                        <option className="options_style" value="" disabled>Seleccionar Puesto</option>
                                        <option className="options_style" value="auxiliar">Auxiliar</option>
                                        <option className="options_style" value="base">Base</option>
                                        <option className="options_style" value="practicante">Practicante</option>
                                    </select>
                                </div>

                                <div class="form_group_buttons">
                                    <button className="btn" type="Submit" >Registrar</button>
                                </div>

                                {serverError && <p className="registration-error-message">{serverError}</p>}
                                {successMessage && <p className="registration-success-message">{successMessage}</p>}

                                <div class="form_group_buttons">
                                    <button class="btn" onClick={() => navigate('/Consultar')}>Consultar Empleados</button>
                                    <button class="btn" onClick={() => navigate('/actualizar')}>Actualizar Empleado</button>
                                </div>

                            </form>
                        </div>
                    </div>
                </div>

            </>
        );
    }

    export default Registrar;