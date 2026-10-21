export const index = (req, res) => {
    res.json({message: "Bienvenido a la Api de tareas"});
};

export const ping = (req, res) => {
    res.json({message: "pong"});
}