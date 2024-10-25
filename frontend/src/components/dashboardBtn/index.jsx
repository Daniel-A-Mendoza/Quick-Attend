import {useNavigate} from "react-router-dom";

export const DashboardBtn = () => {
    const navigate = useNavigate();

    const handleHome = async () => {
        navigate("/dashboard");
    };

    return (
        <div>
            <button onClick = {handleHome}>Home</button>
            <p></p>
        </div>
    );
};