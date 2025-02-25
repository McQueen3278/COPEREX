import  Company from "../company/company.model.js"

export const companyExists = async (name = "") => {
    const existe = await Company.findOne({ name });
    if (existe) {
        throw new Error(`Company ${name} is already registered`);
    }
}
