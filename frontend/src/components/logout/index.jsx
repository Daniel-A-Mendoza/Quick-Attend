import {getAuth, signOut} from "../../../node_modules/firebase/auth";
import {useNavigate} from "react-router-dom";
import "./index.css";
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
            <button className = "logout-button" onClick = {handleLogout}>Logout</button>
        </div>
    );
};