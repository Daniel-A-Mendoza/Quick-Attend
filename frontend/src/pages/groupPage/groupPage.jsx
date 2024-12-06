import React from 'react';
import { useLocation } from 'react-router-dom';
import { Popup } from '../../components/popup/popup';
import { useState } from 'react';
import { doc, setDoc, getDoc, getDocs, collection, query, where} from "../../../node_modules/firebase/firestore";
import {db} from "../../../../backend/config/firebase-config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'; // Material-UI

import {TimePicker} from '@mui/x-date-pickers/TimePicker'; 
import "./index.css";

// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// // date-fns
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { TimePicker } from '@mui/x-date-pickers/TimePicker'; // Material-UI

const GroupPage = () => {

    const navigate = useNavigate();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isPopupOpen2, setIsPopupOpen2] = useState(false);
    const [currentSession, setCurrentSession] = useState({});
    const [isPopupOpen3, setIsPopupOpen3] = useState(false);

    const [code, setCode] = useState('');
    const [date, onDateChange] = useState(new Date());
    const [time, onTimeChange] = useState('10:00');
    const [sessions, setSessions] = useState([]);
    const [students, setStudents] = useState([]);
    const [currentStudentSessions, setStudentSessions] = useState([]);
    const [currentSessionStudents, setSessionStudents] = useState([]);


    const getStudents = async () => {
        const queryRef = query(collection(db, "group_student"), where ("groupCode", "==", group.groupCode));
        const querySnapshot = await getDocs(queryRef);
        const tempStudents = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            tempStudents.push(doc.data());
        });

        const queryRef2 = query(collection(db, "student"), where ("studentID", "in", tempStudents.map(student => student.studentID)));
        const querySnapshot2 = await getDocs(queryRef2);
        const tempStudents2 = [];
        querySnapshot2.forEach((doc) => {
            
            console.log(doc.data());
            tempStudents2.push(doc.data());
        });

        console.log("Students");
        console.log(tempStudents2);
        setStudents(tempStudents2);
    };

    const getSessionAttendance = async (session) => {
        const queryRef = query(collection(db, "student_session"), where ("sessionCode", "==", session.sessionID));
        const querySnapshot = await getDocs(queryRef);
        const tempSessions = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            tempSessions.push(doc.data());
        });
        setSessionStudents(tempSessions);
        const studentIDs = tempSessions.map(session => session.studentID);
        console.log("Student IDs: ");
        console.log(studentIDs);
        let queryRef2 = query(collection(db, "student"), where ("studentID", "in", studentIDs));
        const querySnapshot2 = await getDocs(queryRef2);
        let tempStudents = [];
        querySnapshot2.forEach((doc) => {
            tempStudents.push(doc.data());
        });
        console.log("Temp Students: ");
        console.log(tempStudents);
        setSessionStudents(tempStudents);
        
    };

    const handleOpenPopup = () =>{
        setIsPopupOpen(true);
    };

    const handleClosePopup = () =>{
        setIsPopupOpen(false);
    };

    const handleOpenPopup2 = () =>{

        setIsPopupOpen2(true);
    };

    const handleClosePopup2 = () =>{
        setIsPopupOpen2(false);
    };
   
    const handleOpenPopup3 = () => {
        setIsPopupOpen3(true);
    }

    const handleClosePopup3 = () =>{
        setIsPopupOpen3(false);
    };

    const generateCode =  () => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            result += characters[randomIndex];
        }
        return result;
    };

    // Retrieves the current groups associated with the Leader
    const getSessions = async () => {
        const queryRef = query(collection(db, "session"), where ("groupCode", "==", group.groupCode));
        const querySnapshot = await getDocs(queryRef);
        const tempGroup = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            tempGroup.push(doc.data());
        });
        setSessions(tempGroup);
    };

    useEffect(() => {
        getSessions();
        getStudents();
    }, [code]);

    
    const getStudentAttendance = async (student) => {
        const queryRef = query(collection(db, "student_session"), where ("studentID", "==", student.studentID));
        const querySnapshot = await getDocs(queryRef);
        const tempSessions = [];
        querySnapshot.forEach((doc) => {
            console.log(doc.data());
            tempSessions.push(doc.data());
        });
        setStudentSessions(tempSessions);
        const sessionCodes = tempSessions.map(session => session.sessionCode);
        console.log("Session Codes: ");
        console.log(sessionCodes);
        let queryRef2 = query(collection(db, "session"), where ("sessionID", "in", sessionCodes));
        queryRef2 = query(queryRef2, where("groupCode", "==", group.groupCode));
        const querySnapshot2 = await getDocs(queryRef2);
        let tempSessions2 = [];
        querySnapshot2.forEach((doc) => {
            tempSessions2.push(doc.data());
        });
        console.log("Temp Sessions 2: ");
        setStudentSessions(tempSessions2);
        console.log(tempSessions2);
       
    };

    const createSession = async () => {
        console.log("Creating Group");

        // When needed to create a new group, a new code is generated
        const newCode = generateCode();
        setCode(newCode);
    
        // Sets the document in the group collection with the ID as the groupCode
        await setDoc (doc(db, "session", newCode),{
            sessionID: newCode,
            sessionName: document.getElementById("sessionTopic").value,
            groupCode: group.groupCode,
            date: date,
            startTime: time
        })
        console.log("Session Created");
        // Once group creation is completed, then we will close the popup
        setIsPopupOpen(false);
    };

    const location = useLocation();
    console.log(location);
    const group = location.state;

    return (
        <div className = "container3">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
            <h1>Group Information</h1>
            <button onClick = {() => {
                navigate('/leaderDashboard');
            }}>Go to Groups</button>
            <p>Group Name: {group.groupName}</p>
            <p>Group Code: {group.groupCode}</p>
            <p>Group Location: {group.groupLocation}</p>
            <p>Semester: {group.semester}</p>
            <button onClick = {handleOpenPopup}>Create A Session</button>
            <Popup isOpen = {isPopupOpen} onClose = {handleClosePopup}>
                <h1>Create a Session</h1>
                <p>Write Session Topic: </p>
                <input id = "sessionTopic" type = "text" placeholder = "Session Topic" />
                <p>Select Date: </p>
                <DatePicker dateFormat = "dd/MM/yyyy" onChange = {(date) => {
                    const dateString = new Date(date).toLocaleDateString()
                    console.log(dateString)
                    onDateChange(dateString)
                }}/>
                <p>Select Time: </p>
                <TimePicker onChange = {(newTime) => {
                        const timeString = new Date(newTime).toLocaleTimeString()
                        console.log(timeString)
                        onTimeChange(timeString)
                }
                }/>
                <p></p>
                <button onClick = {createSession}>Create Session</button>
            </Popup>
            <h2>Sessions: </h2>
            <ul>
                {sessions.map((session) => {
                    const handleOpenPopup2 = () => {
                        setIsPopupOpen2(true);
                        setCurrentSession(session);
                        getSessionAttendance(session);
                    }
                    return (
                    <div>
                        <li key={session.sessionID} onClick = {handleOpenPopup2}>
                            {session.sessionName}
                        </li>
                    </div>
                    );
                })}
            </ul>
            <Popup isOpen = {isPopupOpen2} onClose = {handleClosePopup2}>
                <h1>Session Information</h1>
                <p>Session Name: {currentSession.sessionName}</p>
                <p>Session Date: {currentSession.date}</p>
                <p>Session Start Time: {currentSession.startTime}</p>
                <p>Session Code: {currentSession.sessionID}</p>
                <p>Students that Attended: </p>
                <ul>
                {currentSessionStudents.map((student) => {
                    return (
                    <div>
                        <li key={student.studentID}>
                            {student.name}
                        </li>
                    </div>
                    );
                })}
            </ul>
                
         
                
            </Popup>
            <h2>Students</h2>
            <ul>
                {students.map((student) => {
                    const handleOpenPopup3 = () => {
                        setIsPopupOpen3(true);
                        getStudentAttendance(student);
                    }

                    return (
                        <div>
                            <li key={student.studentID} onClick = {handleOpenPopup3}>
                                {student.name}
                            </li>
                        </div>
                    );
                })}
            </ul>
            <Popup isOpen = {isPopupOpen3} onClose = {handleClosePopup3}>
                <h1>Student Attendend Sessions: </h1>
                <ul>
                    {currentStudentSessions.map((session) => {
                        return (
                            <li key={session.sessionID}>
                                {session.sessionName}
                                {session.date}
                                {session.sessionID}
                            </li>
                        )
                    })}
                </ul>
            </Popup>
            
{/* 
            <Popup isOpen = {isPopupOpen2} onClose = {handleClosePopup2}>
                <h1>Session Information</h1>
                <p>Session Name: {currentSession.sessionName}</p>
                <p>Session Date: {currentSession.date}</p>
                <p>Session Start Time: {currentSession.startTime}</p>
                <p>Session Code: {currentSession.sessionID}</p>
                <h2>Student Attendance</h2>
                <ul>
                    {currentStudentSessions.map((session) => {
                        return (
                            <li key={session.sessionID}>
                                {session.sessionName}
                                {session.date}
                                {session.sessionID}
                            </li>
                        )
                    })}
                </ul>
            </Popup> */}

            </LocalizationProvider>
        </div>
    );
};
export { GroupPage };