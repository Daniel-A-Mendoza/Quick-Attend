import { DashboardBtn } from "../dashboardBtn";
import { Logout } from "../logout";
import "./index.css";
export const Header = () => {
    

    return (
        <div className = "container">
           <DashboardBtn />
            <Logout />
        </div>
    );
};