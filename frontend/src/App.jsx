import { BrowserRouter,Routes,Route } from "react-router-dom"
import { Signin } from "./pages/Signin"
import { DashBoard } from "./pages/DashBoard"
import { AddStudent } from "./pages/AddStudent"
import { AddCourse } from "./pages/AddCourse"
import { AddStudentToCourse } from "./pages/AddStudentToCourse"
import { ClassRoom } from "./pages/ClassRoom"


function App() {
    return(
      <>
       <BrowserRouter>
        <Routes>
          <Route path="/" element={<Signin />}/>
          <Route path = "/dashBoard" element = {<DashBoard/>}/>
          <Route path = "/AddStudent" element = {<AddStudent/>}/>
          <Route path = "/AddCourse" element = {<AddCourse/>}/>
          <Route path = "/AddStudentToCourse" element = {<AddStudentToCourse/>}/>
          <Route path = "/ClassRoom/:id" element = {<ClassRoom/>}/>
          
        </Routes>
       </BrowserRouter>
      </>
    )  
}

export default App
