import Company from "./company.model.js"
import ExcelJS from "exceljs";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const carpetReport = path.join(__dirname, "../../report");

if (!fs.existsSync(carpetReport)) {
    fs.mkdirSync(carpetReport, { recursive: true });
}


export const registerCompany = async (req, res) => {
    try{
        const data = req.body;

        const { name, impact, trajectory, category } = data;

        const company = new Company({
            name,
            impact,
            trajectory,
            category
        })

        await company.save()

        res.status(201).json({
            success: true,
            message: "Empresa registrada",
            company
        });
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al registrar la empresa",
            error: err.message
        });
    }
}

export const getCompanies = async (req, res) => {
    try {
        let { filter, order, trajectory } = req.query;
        let query = {};

        if (filter) {
            query.category = filter;
        }

        if (trajectory) {
            let years = parseInt(trajectory);
            if (!isNaN(years)) {
                query.trajectory = { $gte: years };
            }
        }

        let companies = await Company.find(query).sort({ trajectory: -1 });

        if (order === 'A-Z') {
            companies.sort((a, b) => a.name.localeCompare(b.name));
        } else if (order === 'Z-A') {
            companies.sort((a, b) => b.name.localeCompare(a.name));
        }

        companies = companies.map(company => ({
            ...company._doc,
            trajectory: `${company.trajectory} años`
        }));

        res.status(200).json({
            success: true,
            message: "Empresas encontradas",
            companies
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al obtener las empresas",
            error: err.message
        });
    }
};

export const getReport = async (req, res) => {
    try {
        const companies = await Company.find();

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Empresas");

        worksheet.columns = [
            { header: "ID", key: "_id", width: 30 },
            { header: "Nombre", key: "name", width: 30 },
            { header: "Impacto", key: "impact", width: 15 },
            { header: "Trayectoria", key: "trajectory", width: 20 },
            { header: "Categoría", key: "category", width: 20 },
            { header: "Estado", key: "status", width: 15 }
        ];

        companies.forEach(company => {
            worksheet.addRow({
                _id: company._id,
                name: company.name,
                impact: company.impact,
                trajectory: `${company.trajectory} años`,
                category: company.category,
                status: company.status ? "Activo" : "Inactivo"
            });
        });

        const fileName = `Reporte_Empresas_${Date.now()}.xlsx`;
        const filePath = path.join(carpetReport, fileName);

        await workbook.xlsx.writeFile(filePath);

        return res.status(200).json({
            success: true,
            message: "Reporte generado y guardado con éxito",
            filePath: `/report/${fileName}` 
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar el reporte",
            error: err.message
        });
    }
};