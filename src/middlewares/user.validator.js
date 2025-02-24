import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";


export const loginValidator = [
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 4}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]
