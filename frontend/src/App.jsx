import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import {Auth} from "./pages/authentication/index.jsx";
import {StudentDashboard} from "./pages/studentDashboard/index.jsx";
import { LeaderDashboard } from './pages/leaderDashboard/index.jsx';
import { GroupPage } from "./pages/group/index.jsx";
import {Dashboard} from "./pages/dashboard/index.jsx";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" exact element = {<Auth />} />
          <Route path = "/studentdashboard" element = {<StudentDashboard />} />
          <Route path = "/leaderdashboard" element = {<LeaderDashboard />} />
          <Route path = "/group" element = {<GroupPage />} />
          <Route path = "/dashboard" element = {<Dashboard />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
