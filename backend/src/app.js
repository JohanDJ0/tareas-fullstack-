import authRoutes from "./routes/auth.routes.js"
import express from "express";
import morgan from "morgan";
import indexRoutes from "./routes/index.routes.js";
import tasksRoutes from "./routes/tasks.routes.js";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors({origin: "http://localhost:5173"}));
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use(indexRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/tasks", tasksRoutes);

//ruta no encontrada (siempre al final )
app.use((req,res) =>{
    res.status(404).json ({message: "Not found"});
});


//Manejador de errores: llave CUATRO parametros (siempre al final de todo)

app.use((error, req, res, next) =>{

// JSON mal escrito en el cuerpo de la petcion: es culpa del criente (400)
    if(error.type === "entity.parse.failed"){
        return res.status(400).json({ message: "El cuerpo no es un JSON valido"});
    }
    console.error(error);
    res.status(500).json({message: "Error interno del servidor"});
});

export default app;