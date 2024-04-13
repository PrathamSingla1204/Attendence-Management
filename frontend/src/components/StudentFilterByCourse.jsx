import { useStudent } from "../hooks/useStudent";

export const StudentFilterByCourse = () =>{
     const {student} = useStudent();
return(
     <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        {student.map((s) => (
           
                <div key={s._id} className=" block bg-white shadow rounded-lg p-6 mb-4">
                    <h2 className="text-xl font-semibold mb-2">{s.name}</h2>
                </div>
        ))}
    </div>)
}