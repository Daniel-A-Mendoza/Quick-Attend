import { Logout } from "../../components/logout";
import { useNavigate } from "react-router-dom";
import { useCreateLeader } from "../../../../backend/hooks/useCreateLeader.js";
import { useCheckUserExists } from "../../../../backend/hooks/useCheckUserExists.js";


import { auth } from "../../../../backend/config/firebase-config.js";
export const Dashboard = () => {
    const navigate = useNavigate();
    const {createLeader} = useCreateLeader();
  

    const handleStudent = () => {
        
        navigate("/studentdashboard");
    };

    const handleLeader = () => {
        navigate("/leaderdashboard");
    };

    return (
        <div>
            
            <h1>Dashboard </h1>
            <p> Select Role </p>
            <button onClick = {handleStudent}>Student</button>
            <button onClick = {handleLeader}> Leader</button>
            {/* <button onClick = {createLeader} >Create Leader</button> */}
            <Logout />
        </div>
    );
};