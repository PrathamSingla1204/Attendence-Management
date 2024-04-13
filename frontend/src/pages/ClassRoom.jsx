import { AppBar } from "../components/AppBar"
import {  useStudentById } from "../hooks/useStudent";
import {useParams} from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const ClassRoom = () =>{
    const { id } = useParams();
    console.log(id);
    const { student, isLoading } = useStudentById(id);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!student) {
        return <div>Student not found</div>;
    }
    
    async function MarkAttendence(studentId) {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/student/Attendance/${studentId}/${id}`,{}, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }});
        } catch(e) {
            console.log(e);
        }
    }
  
    return(
        <>
       <AppBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">ClassRoom</h1>
                {student.map((s) => (
                    <div key={s._id} className="block bg-white shadow rounded-lg p-6 mb-4">
                        <h2 className="text-xl font-semibold mb-2">{s.name}</h2>
                        <button
                            type="button"
                            onClick={() => MarkAttendence(s._id)} 
                            className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 "
                        >
                            Mark Present
                        </button>
                    </div>
                ))}
            </div>
            </>
        )
}