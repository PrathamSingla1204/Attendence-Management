import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useStudent = () => {
    const [student, setStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/student/studentList`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setStudent(response.data.students);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching Students:", error);
            setIsLoading(false);
        });
    }, []);

    return { student, isLoading }; 
}

export const useStudentById = (id) => {
    const [student, setStudent] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/student/studentByCourse/${id}`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setStudent(response.data.students);
            setIsLoading(false);
        })
        .catch(error => {
            console.error("Error fetching Students:", error);
            setIsLoading(false);
        });
    }, []);

    return { student,isLoading }; 
}