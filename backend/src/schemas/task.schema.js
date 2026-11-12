import {z} from "zod";

export const taskSchema = z.object({
    title: z
    .string({
        error: (issue) =>
            issue.input === undefined
        ? "El titulo es obligatorio"
        : "El titulo debe ser texto",
    })

    .trim()
    .min(1, "El titulo es obligatorio")
    .max(150, "El titulo admite maximo 150 caracteres"),


    description : z
    .string({error: "La descripcion debe ser texto"})
    .trim()
    .max(1000, "la descripcion admite maximo 1000 caracteres")
    .optional()
    .nullable(),



    due_date: z 
    .string({error: "La fecha debe ser texto con el formato AAAA-MM-DD"})
    .regex(/^\d{4}-\d{2}-\d{2}$/, "La fecha debe tener el formato AAAA-MM-DD")
    .refine((valor) =>{
        const fecha = new Date(`${valor}T00:00:00Z`);
        return (
            !Number.isNaN(fecha.getTime()) &&
            fecha.toISOString().slice(0, 10) === valor
        );

    }, "La fecha no existe en el calendario")
    .optional()
    .nullable(),
})

