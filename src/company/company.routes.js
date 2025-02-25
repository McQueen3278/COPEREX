import { Router } from "express";
import { registerCompany, getCompanies, getReport } from "./company.controller.js";
import { registerCompanyValidator, getCompaniesValidator } from "../middlewares/company-validator.js";

const router = Router();

router.post("/registerCompany", registerCompanyValidator, registerCompany);

router.get("/getCompanies",getCompaniesValidator,  getCompanies)

router.get("/getReport", getReport);

export default router;