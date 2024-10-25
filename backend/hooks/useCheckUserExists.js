import { auth } from "../config/firebase-config";
import { fetchSignInMethodsForEmail } from "../../frontend/node_modules/firebase/auth";
export const useCheckUserExists = async (email) => {
    try{
        const signInMethods = await fetchSignInMethodsForEmail (auth, email);
        return signInMethods.length > 0;
    } catch (error){
        console.error("Error checking user existence: ", error);
        return false;
    }
};
