import { body } from "express-validator";
import { companyExists } from "../helpers/db-validator.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import {validateJWT} from "./validate-jwt.js";
import {hasRoles} from "./role-validator.js";

export const registerCompanyValidator = [
    body("name").not().isEmpty().withMessage("El nombre es obligatorio"),
    body("impact").not().isEmpty().withMessage("El impacto es obligatorio"),
    body("trajectory").not().isEmpty().withMessage("La trayectoria es obligatoria"),
    body("category").not().isEmpty().withMessage("La categoria es obligatoria"),
    body("name").custom(companyExists),
    validarCampos,
    handleErrors
]

export const getCompaniesValidator = [
    validateJWT,
    hasRoles('ADMIN_ROLE')
]