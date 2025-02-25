import { Router } from "express";
import { registerCompany, getCompanies } from "./company.controller";
import { registerCompanyValidator, getCompaniesValidator } from "../middlewares/company-validator";

const router = Router();

router.post("/registerCompany", registerCompanyValidator, registerCompany);

router.post("/getCompanies",getCompaniesValidator,  getCompanies)

export default router;