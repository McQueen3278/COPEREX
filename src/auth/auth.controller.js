import User from "../user/user.model.js"
import { hash, verify } from "argon2"
import { generateJWT } from "../helpers/generate-jwt.js";

const createAdminUser = async () => {
    try {
        const existingAdmin = await User.findOne({ username: "admin" });


        if (!existingAdmin) {
            const hashedPassword = await hash("admin");

            const admin = new User({
                username: "admin",
                password: hashedPassword,
                role: "ADMIN_ROLE"
            });

   
            await admin.save();
            console.log("Admin creado correcaamente.");
        } else {
            console.log("Ya existe un administrador.");
        }
    } catch (error) {
        console.error("Error al crear usuario", error);
    }
};

export default createAdminUser;


export const login = async (req, res) => {
    const { email, username, password } = req.body
    try{
        const user = await User.findOne({
            $or:[{email: email}, {username: username}]
        })

        if(!user){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error:"No existe el usuario o correo ingresado"
            })
        }

        const validPassword = await verify(user.password, password)

        if(!validPassword){
            return res.status(400).json({
                message: "Crendenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message: "Login successful",
            userDetails: {
                token: token,
                profilePicture: user.profilePicture
            }
        })
    }catch(err){
        return res.status(500).json({
            message: "login failed, server error",
            error: err.message
        })
    }
}