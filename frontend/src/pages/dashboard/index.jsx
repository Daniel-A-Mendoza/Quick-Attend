import { Logout } from "../../components/logout";
import { useNavigate } from "react-router-dom";
import { useCreateLeader } from "../../../../backend/hooks/useCreateLeader.js";
import { useCheckUserExists } from "../../../../backend/hooks/useCheckUserExists.js";
import "./index.css";
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
            <div className = "header">
                <Logout />
            </div>
            <h1 className = "role-header">Select Role</h1>
            <div className = "container">
                <div className = "student-box">
                    
                    <p className = "student-name">Student</p>
                    <p>Mark and View Attendance</p>
                    <button className = "student-btn" onClick = {handleStudent}>Student</button>
                </div>
                <div className = "leader-box">
                    <p className = "leader-name">Leader</p>
                    <p>Manage your Groups and View your Students' Attendance</p>
                    <button className = "leader-btn" onClick = {handleLeader}> Leader</button>
                
                </div>
            </div>
        </div>
    );
};