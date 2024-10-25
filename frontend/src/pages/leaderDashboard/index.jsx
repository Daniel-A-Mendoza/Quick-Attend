import {Header} from "../../components/header/index.jsx";

export const LeaderDashboard = () => {
    return (
        <div>
            <h1>Leader Dashboard</h1>
            <p>Create a Group</p>
            <button>Create Group</button>
            <p>View Groups</p>
            <Header />

            <p>Here will be the props of the Groups</p>
            <p> It will have the same style as Canvas for courses</p>
        </div>
    );
};