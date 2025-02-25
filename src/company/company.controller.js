import Company from "./company.model.js"

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

        console.log("Consulta enviada a MongoDB:", query); 

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
