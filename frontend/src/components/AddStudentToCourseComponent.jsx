import { useState } from "react";
import axios from "axios"
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";


export const AddStudentToCourseComponent = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [courseId, setCourseId] = useState("");
    


    async function sendRequest() {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/Student/AddStudenttoCourse`,{
                name:name,
                courseId:courseId,
                email:email
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }});
            
          
            navigate("/DashBoard");
        } catch(e) {
            console.log(e);
        }
    }
    

    return (
        <div className="h-screen flex justify-center flex-col">
            <div className="flex justify-center">
                <div>
                    <div className="text-3xl font-bold justify-self-center">
                        Add Student
                    </div>
                    
                    <div>
                        <LabelledInput label="SCourse Name" placeholder="Web D.." onChange={(e) => {
                            setName(
                                e.target.value)
                        }} />
                        
                        <LabelledInput label="Course ID" placeholder="abc123" onChange={(e) => {
                            setCourseId(
                                e.target.value)
                        }} />
                        <LabelledInput  label="Student Email" type = "email" placeholder="JohnDoe@gmail.com" onChange={(e) => {
                            setEmail(
                                e.target.value)
                        }} />
                        <div className="mt-4">
                            <button onClick = {sendRequest} type="Submit" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
                               Add Student
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}



function LabelledInput({ label, placeholder, onChange, type }) {
    return (
        <div className="mb-4">
            <label className="block mb-2 text-sm font-bold text-gray-900 dark:text-black">{label}</label>
            <input
                type={type || "text"}
                onChange={onChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder={placeholder}
                required
            />
        </div>
    );
}
