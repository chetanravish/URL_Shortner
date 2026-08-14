import { createUser, findUserByEmail, findUserByEmailByPassword } from "../dao/user_dao.js";
import { ConflictError } from "../utils/error_handler.js";
import { signToken } from "../utils/helper.js";


export const registerUser=async(name,email,password)=>{
    const user = await findUserByEmail(email);
    if(user){
        throw new ConflictError("User already exists");
    }
    const newUser = await createUser(name,email,password);
    const token =  signToken({id:newUser._id});
    return {token,user}
}

export const loginUser = async (email, password) => {
    const user = await findUserByEmailByPassword(email);

    if (!user) {
        throw new Error("Invalid Credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);

    if (!isPasswordCorrect) {
        throw new Error("Invalid Credentials");
    }

    const token = signToken({ id: user._id });

    return { token, user};
};