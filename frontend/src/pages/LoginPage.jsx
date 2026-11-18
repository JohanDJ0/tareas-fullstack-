import { useState } from "react";
import { Link, useNavigate  } from "react-router-dom";
import { request } from "../api.js";


function LoginPage() {
    const [form, setForm] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError();
        setLoading(true);

        try {
            const data = await request("/api/auth/login", { method: "POST", body: form });
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("/");

        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="page">
            <h1>Iniciar sesión</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    Correo
                    <input name="email" type="email" value={form.email} onChange={handleChange} />
                </label>
                <label>
                    Contraseña
                    <input name="password" type="password" value={form.password} onChange={handleChange} />
                </label>
                {error && <p className="error">{error}</p>}
                <button type="submit" disabled={loading}>
                    {loading ? "Entrando..." : "Entrar"}
  
                </button>
            </form>
            <p>
                ¿No tienes cuenta? <Link to="/register">Registrate</Link>
            </p>

        </main>
    )

}


export default LoginPage;