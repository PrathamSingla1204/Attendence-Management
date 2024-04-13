import { AppBar } from "../components/AppBar";
import { useCourse } from "../hooks/useCourse"; 
import { Link } from "react-router-dom";

export const DashBoard = () => {
    const { course } = useCourse(); 


    if (course.length === 0) {
        return <div>No courses available.</div>;
    }

    return (
        <>
            <AppBar />
            <div className="container mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
                {course.map((c) => (
                    <Link key={c._id} to={`/ClassRoom/${c.courseId}`}>
                        <div className="bg-white shadow rounded-lg p-6 mb-4">
                            <h2 className="text-xl font-semibold mb-2">{c.courseName}</h2>
                            <p className="text-gray-600">Instructor: {c.Instructor}</p>
                            <p className="text-gray-600">Course Code: {c.courseId}</p>
                            <p className="text-gray-600">Strength: {c.students.length}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    );
};
