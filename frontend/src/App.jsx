import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Auth} from "./pages/authentication/index.jsx";
import {StudentDashboard} from "./pages/studentDashboard/index.jsx";
import { LeaderDashboard } from './pages/leaderDashboard/index.jsx';
import { GroupPage } from "./pages/groupPage/groupPage.jsx";
import {Dashboard} from "./pages/dashboard/index.jsx";
import { StudentGroupPage } from './pages/studentGroupPage/studentGroupPage.jsx';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" exact element = {<Auth />} />
          <Route path = "/studentdashboard" element = {<StudentDashboard />} />
          <Route path = "/leaderdashboard" element = {<LeaderDashboard />} />
          <Route path = "/dashboard" element = {<Dashboard />} />
          <Route path = "/leader/group/:groupName" element = {<GroupPage/>} />
          <Route path = "/student/group/:groupName" element = {<StudentGroupPage/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App


