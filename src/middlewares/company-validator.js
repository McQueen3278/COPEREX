import { body } from "express-validator";
import { companyExists } from "../helpers/db-validator";
import { validarCampos } from "./validar-campos";
import { handleErrors } from "./handleErrors";
import {validateJWT} from "./validate-jwt.js";
import {hasRoles} from "./role-validator.js";

export const registerCompanyValidator = [
    validateJWT,
    hasRoles("ADMIN_ROLE"),
    body("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    body("impact").not().isEmpty().withMessage("El impacto es obligatorio"),
    body("trajectory").not().isEmpty().withMessage("La trayectoria es obligatoria"),
    body("category").not().isEmpty().withMessage("La categoria es obligatoria"),
    validarCampos,
    handleErrors
]