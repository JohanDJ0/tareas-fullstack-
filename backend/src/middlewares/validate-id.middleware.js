export const validateId = (req, res, next) =>{
    const texto = req.params.id;


    //solo digitos, matoyes que 0 y que quepa en un INTEGER de postgreSQL(2147483647)
    if (!/^\d+$/.test(texto)||  Number(texto) < 1 || Number(texto)> 2147483647) {
        return res
        .status(400)
        .json({message: "El id debe ser un numer positovo"});
    }

    next();
};

