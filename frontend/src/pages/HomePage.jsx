import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { request } from "../api.js";

function HomePage() {
    const [profile, setProfile] = useState(null);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) return;
        request("/api/auth/profile", { token })
            .then(setProfile)
            .catch((err) => setError(err.message));
    }, [token]);


    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (!token) {
        return (
            <main className="page">
                <h1>Tareas</h1>
                <p>No has iniciado sesion.</p>
                <Link to="/login"> Ir a iniciar sesion</Link>
            </main>
        );
    }
    return (
        <main className="page">
            <h1>Tareas</h1>
            {error && <p className="error">{error}</p>}
            {profile && <p>Hola, {profile.username}({profile.email})</p>}
            <button onClick={handleLogout}>Cerrar sesion</button>
        </main>
    );
}

export default HomePage;