import React from 'react';
import { useLocation } from 'react-router-dom';
import { Popup } from '../../components/popup/popup';
import { useState } from 'react';
import { doc, setDoc, getDoc, getDocs, collection, query, where} from "../../../node_modules/firebase/firestore";
import {db} from "../../../../backend/config/firebase-config";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useEffect } from 'react';
import { useGetUserInfo } from "../../../../backend/hooks/useGetUserInfo.js";


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

const StudentGroupPage = () => {

    const navigate = useNavigate();
    const [state, setState] = useState(false);
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [code, setCode] = useState('');
    const [sessions, setSessions] = useState([]);

    const handleOpenPopup = () =>{
        
        setIsPopupOpen(true);
    };

    const handleClosePopup = () =>{
        console.log("Closing Popup");
        setIsPopupOpen(false);
    };

    // Retrieves the current groups associated with the Leader
    // Fix the getSessions functinons/
    // It should be able to retrieve sessions automatically from the studentsession
    const getSessions = async () => {
        const queryRef = query(collection(db, "student_session"), where("studentID", "==", useGetUserInfo().userID));
        const querySnapshot = await getDocs(queryRef);
        let tempSessions = [];
        console.log("Getting sessions");
        console.log(sessions);
        querySnapshot.forEach((doc) => {
            tempSessions.push(doc.data());
        });
        console.log("Session Objects");
        console.log(tempSessions);
        
        console.log("groupCode: " + group.groupCode);
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
        console.log(tempSessions2);
        setSessions(tempSessions2);
        // tempSessions.map(async (session) => {
        //     const queryRef2 = query(collection(db, "session"), where ("sessionID", "==", session.sessionCode));
        //     const querySnapshot2 = await getDocs(queryRef2);
        //     const tempSessions2 = [];
        //     querySnapshot2.forEach((doc) => {
        //         tempSessions2.push(doc.data());
        //         console.log(doc.data());
        //     });
        //     tempSessions =
        // });
        // console.log("Temp Sessions 2: ");   
        // console.log(tempSessions2);
        // setSessions(tempSessions);
        // console.log("Current Session Objects: ");
        // console.log(sessions);
      
    };

    useEffect(() => {
        console.log("Use Effect");
        console.log(sessions);
        getSessions();
    } , [state]);
    // getSessions();
    const checkSessionCode = async () => {
        const sessionCode = document.getElementById("sessionCode").value;
        console.log(sessionCode);
        const groupRef = collection(db, "session");
        const q = query(groupRef, where("sessionID", "==", sessionCode, "and", "groupCode", "==", group.groupCode));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot);
        console.log("Check if sessions");
        console.log(sessions);
    const sessionExists = sessions.some(session => session.sessionID == sessionCode && studentID == useGetUserInfo().userID);
    if (sessionExists) {
        setIsPopupOpen(false);
        alert("You already attendend the session!");
        return;
    }
        if (!querySnapshot.empty) {
            const studentSessionRef = collection(db, "student_session");
            await setDoc(doc(studentSessionRef),
                 { 
                    sessionCode: sessionCode,
                    studentID: useGetUserInfo().userID
                 });
           
        } else {
            alert("Session code does not exist.");

        }

        setIsPopupOpen(false);
        setState(!state);

    };

    const location = useLocation();
    console.log(location);
    const group = location.state;

    return (
        <div className = "container2">
            <h1>Group Information</h1>
            <button onClick = {() => {
                navigate('/studentDashboard');
            }}>Go to Groups</button>
            <p>Group Name: {group.groupName}</p>
            <p>Group Code: {group.groupCode}</p>
            <p>Group Location: {group.groupLocation}</p>
            <p>Semester: {group.semester}</p>
            <button onClick = {handleOpenPopup}>Join A Session</button>
            <Popup isOpen = {isPopupOpen} onClose = {handleClosePopup}>
                <h1>Join A Session</h1>
                <input id = "sessionCode" type = "text" placeholder = "Session Topic" />
                <button onClick = {checkSessionCode}>Join Session</button>
            </Popup>
            <p> Attendend Sessions: </p>
            <ul>
                {/* {sessions.map((session) => {
                    return (
                        <li key={session.sessionID}>
                            {session.sessionName}
                        </li>
                    );
                })} */}
                {sessions.map((session) => {
                    return (
                        <li key={session.sessionID}>
                            <p>{session.sessionName} {session.date} {session.sessionID}</p>
                        </li>
                    )
                })}
            </ul>

        </div>
    );
};
export { StudentGroupPage };