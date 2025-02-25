import { Router } from "express";
import { registerCompany, getCompanies, getReport } from "./company.controller.js";
import { registerCompanyValidator, getCompaniesValidator, getReportValidator } from "../middlewares/company-validator.js";

const router = Router();

/**
 * @swagger
 * /registerCompany:
 *   post:
 *     summary: Register a new company
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               impact:
 *                 type: string
 *               trajectory:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       201:
 *         description: Company registered successfully
 *       500:
 *         description: Error registering company
 */
router.post("/registerCompany", registerCompanyValidator, registerCompany);

/**
 * @swagger
 * /getCompanies:
 *   get:
 *     summary: Get a list of companies
 *     tags: [Company]
 *     parameters:
 *       - in: query
 *         name: filter
 *         schema:
 *           type: string
 *         description: Filter by category
 *       - in: query
 *         name: order
 *         schema:
 *           type: string
 *         description: Order by name (A-Z or Z-A)
 *       - in: query
 *         name: trajectory
 *         schema:
 *           type: number
 *         description: Filter by minimum trajectory in years
 *     responses:
 *       200:
 *         description: List of companies
 *       500:
 *         description: Error getting companies
 */
router.get("/getCompanies", getCompaniesValidator, getCompanies);

/**
 * @swagger
 * /getReport:
 *   get:
 *     summary: Get a report of companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Report generated successfully
 *       500:
 *         description: Error generating report
 */
router.get("/getReport", getReportValidator, getReport);

export default router;