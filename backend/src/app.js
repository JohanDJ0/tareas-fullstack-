import express from "express";
import morgan from "morgan";

import indexRoutes from "./routes/index.routes.js";

const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Rutas
app.use(indexRoutes);

//ruta no encontrada (siempre al final )
app.use((req,res) =>{
    res.status(404).json ({message: "Not found"});
});

export default app;