import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api.js";

function RegisterPage(){
    const [form, setForm] = useState ({ username: "", email: "", password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange  = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await request("/api/auth/register", {method: "POST", body: form});
            navigate("/login")
        } catch (err) {
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    return (
        <main className="page">
            <h1>Crear cuenta</h1>
            <form onSubmit={handleSubmit}>
                <label> 
                    Nombre de usuario
                    <input name="username" value={form.username} onChange={handleChange} />
                </label>
                <label>
                    Correo 
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                </label>
                <label >
                    Constraseña 
                    <input name="password" type="password" value={form.password} onChange={handleChange} />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Registrando...": "Registrarme"}
                </button>
            </form>

            <p>
                ¿Ya tienes cuenta ? <Link to="/login">Inicia sesion</Link>
            </p>
        </main>
    );
}

export default RegisterPage;