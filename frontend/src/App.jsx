import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Title from './components/Title';
import Login from './components/Login';
import Signup from './components/Signup';
import Tlogin from './components/Tlogin';
import Teacher from './components/Teacher';
import Announcements from './pages/Announcements';
import Timetable from './pages/Timetable';
import Mannouncements from './pages/Mannoucements';
import Mtimetable from './pages/Mtimetable';
import Assignotes from './pages/Assignotes';
import Assignments from './pages/Assignments';
import Massignments from './pages/Massignments';
import Notes from './pages/Notes';
import Mnotes from './pages/Mnotes';
import Classrooms from './pages/Classrooms';
import Req from './pages/Req';
import Vclassrooms from './pages/Vclassrooms';
import MyClassrooms from './pages/Myclassrooms';
import Lstudents from './pages/Lstudents';
import Assignmark from './pages/Assignmark';
import Tprofile from './pages/Tprofile';
import Reqt from './pages/Reqt';
import Reqs from './pages/Reqs';
import Mclass from './pages/Mclass';
import Mstudents from './pages/Mstudents';
import Mteachers from './pages/Mteachers';
import Student from './components/Student';
import Sannouncements from './pages/Sannouncements';
import Stimetable from './pages/Stimetable';
import Sassignotes from './pages/Sassignotes';
import Sassignments from './pages/Sassignments';
import Snotes from './pages/Snotes';
import Sjoinclass from './pages/Sjoinclass';
import Smyclass from './pages/Smyclass';
import Sprofile from './pages/Sprofile';
import Smark from './pages/Smark';



function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      
      <Routes>
        <Route path='/' element={<Title/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/teachers' element={<Tlogin/>}/>
        <Route path='/teacher' element={<Teacher/>}/>
        <Route path='/teacher/announcements' element={<Announcements/>}/>
        <Route path='/teacher/announcements/manage' element={<Mannouncements/>}/>
        <Route path='/teacher/timetable' element={<Timetable/>}/>
        <Route path='/teacher/timetable/edit' element={<Mtimetable/>}/>
        <Route path='/teacher/assignotes' element={<Assignotes/>}/>
        <Route path='/teacher/assignotes/assignments' element={<Assignments/>}/>
        <Route path='/teacher/assignotes/assignments/manage' element={<Massignments/>}/>
        <Route path='/teacher/assignotes/notes' element={<Notes/>}/>
        <Route path='/teacher/assignotes/notes/manage' element={<Mnotes/>}/>
        <Route path='/teacher/classroom' element={<Classrooms/>}/>
        <Route path='/teacher/classroom/req' element={<Req/>}/>
        <Route path='/teacher/classroom/view' element={<Vclassrooms/>}/>
        <Route path='/teacher/myclassroom' element={<MyClassrooms/>}/>
        {/* <Route path='/teacher/myclassroom/studentslist' element={<Lstudents/>}/> */}
        <Route path='/teacher/myclassroom/:classid/studentslist' element={<Lstudents/>}/>
        {/* <Route path='/teacher/myclassroom/assignmentmark' element={<Assignmark/>}/> */}
        <Route path='/teacher/myclassroom/:classid/assignmentmark' element={<Assignmark/>}/>
        <Route path='/teacher/profile' element={<Tprofile/>}/>
        <Route path='/teacher/reqs' element={<Reqs/>}/>
        <Route path='/teacher/reqt' element={<Reqt/>}/>
        <Route path='/teacher/manageclass' element={<Mclass/>}/>
        {/* <Route path='/teacher/manageclass/students' element={<Mstudents/>}/> */}
        <Route path='/teacher/manageclass/:classid/students' element={<Mstudents/>}/>
        {/* <Route path='/teacher/manageclass/teachers' element={<Mteachers/>}/> */}
        <Route path='/teacher/manageclass/:classid/teachers' element={<Mteachers/>}/>
        <Route path='/student' element={<Student/>}/>
        <Route path='/student/announcements' element={<Sannouncements/>}/>
        <Route path='/student/timetable' element={<Stimetable/>}/>
        <Route path='/student/assignnotes' element={<Sassignotes/>}/>
        <Route path='/student/assignnotes/assignments' element={<Sassignments/>}/>
        <Route path='/student/assignnotes/notes' element={<Snotes/>}/>
        <Route path='/student/joinclass' element={<Sjoinclass/>}/>
        <Route path='/student/myclass' element={<Smyclass/>}/>
        <Route path='/student/profile' element={<Sprofile/>}/>
        <Route path='/student/myclass/mark' element={<Smark/>}/>
       
        

      </Routes>



   </Router>
  );
}

export default App
