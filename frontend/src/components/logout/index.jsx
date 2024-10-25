import {getAuth, signOut} from "../../../node_modules/firebase/auth";
import {useNavigate} from "react-router-dom";
export const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try{
            const auth = getAuth();
            await signOut(auth);
            localStorage.removeItem("auth");
            navigate("/");
        }
        catch (error){
            console.log(error);
        }
    };

    return (
        <div>
            <button onClick = {handleLogout}>Logout</button>
        </div>
    );
};