import {pool } from "../db.js"


export	const createTask = async (req, res) => {
    const {title, description, due_date} = req.body;

    const result = await pool.query(
         ` INSERT INTO tasks (title, description, due_date, user_id)
         VALUES ($1, $2, $3 , $4)
         RETURNING id, title, description, due_date::text AS due_date, created_at`,
         [title.trim(), description ?? null, due_date ?? null, req.user.id]
    );

    return res.status(201).json(result.rows[0]);
};


export const getTasks = async (req, res) => {
    const result = await pool.query(
        `SELECT id, title, description, due_date::text AS due_date, created_at
        FROM tasks
        WHERE user_id = $1
        ORDER BY created_at DESC, id DESC`,
        [req.user.id]

    );

    return res.json(result.rows);
}


export const getTask = async (req,res) =>{
    const result = await pool.query(
        `SELECT id, title, description, due_date::text AS due_date, created_at
        FROM tasks
        WHERE id = $1 AND user_id = $2`,
        [req.params.id, req.user.id]
    );

    if (result.rows.length ===0){
        return res.status(404).json({message: "Tarea no encontrada"});
    }

    return res.json(result.rows[0]);
};


export const updateTask = async (req, res) => {
    const { title, description, due_date } = req.body ;

   

    const result = await pool.query(
        `UPDATE tasks
        SET title = $1, description = $2, due_date = $3
        WHERE ID = $4 AND user_id = $5
        RETURNING id, title, description, due_date::text AS due_date, created_at`,
        [title.trim(), description ?? null, due_date || null, req.params.id, req.user.id]
    );

    if (result.rows.length === 0){
        return res.status(404).json({message: "Tarea no encontrada"});
    }
    return res.json(result.rows[0]);
}

export const deleteTask = async (req, res ) => {
    const result = await pool.query(
        "DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING id",
        [req.params.id, req.user.id]
    );

    if (result.rows.length === 0){
        return res.status(404).json({message: "Tarea no encontrada"});
    }
    return res.sendStatus(204);
};