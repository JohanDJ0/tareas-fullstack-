import { Router} from "express";
import { createTask, getTasks, getTask, updateTask, deleteTask} from "../controllers/tasks.controller.js";
import { requireAuth } from "../middlewares/auth.middleware.js";
import { validateId } from "../middlewares/validate-id.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {taskSchema} from "../schemas/task.schema.js"
const router = Router();

//Todas las rutas de tareas exigen token
router.use(requireAuth);

router.post("/",validateSchema(taskSchema), createTask);
router.get("/", getTasks);
router.get("/:id",validateId, getTask);
router.put("/:id",validateId, validateSchema(taskSchema), updateTask);
router.delete("/:id",validateId, deleteTask);
export default router;