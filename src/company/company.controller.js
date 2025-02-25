import Company from "./company.model.js"

export const registerCompany = async (req, res) => {
    try{
        const data = req.body;

        const { name, impact, trayectory, category } = data;

        const company = new Company({
            name,
            impact,
            trayectory,
            category
        })

        await company.save()

        res.status(201).json({
            success: true,
            message: "Empresa registrada",
            comment
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
    try{
        let { filter, order, trajectory } = req.query;
        let query = {};

        if(filter){
            query.category = filter;
        }

        if(trajectory){
            query.trayectory = trajectory;
        }

        let companies =  await Company.find(query);

        if(order === 'A-Z'){
            companies.sort((a, b) =>
            a.name.localeCompare(b.name));
        }

        if(order === 'Z-A'){
            companies.sort((a, b) =>
                b.name.localeCompare(a.name));
        }

        res.status(200).json({
            success: true,
            message: "Empresas encontradas",
            companies
        })
   }catch(err){
    res.status(500).json({
        success: false,
        message: "Error al obetener las empresas",
        error: err.message
    });
   }
}

