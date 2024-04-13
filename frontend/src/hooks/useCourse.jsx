import { useState,useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

export const useCourse = () => {
    const [course, setCourse] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/course/courseList`, {
            headers: {
                Authorization: localStorage.getItem("token")
            }
        })
        .then(response => {
            setCourse(response.data.courses);
        })
        .catch(error => {
            console.error("Error fetching courses:", error);
        });
    }, []);

    return { course }; 
}
