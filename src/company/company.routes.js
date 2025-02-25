import { Router } from "express";
import { registerCompany, getCompanies } from "./company.controller";
import { registerCompanyValidator } from "../middlewares/company-validator";

const router = Router();

router.post("/registerCompany", registerCompanyValidator, registerCompany);

router.post("/getCompanies", getCompanies)

export default router;