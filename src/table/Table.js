import React, {useEffect, useState} from "react";
import './Table.css';

export default function Table(props){

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [collegesLoaded, setCollegesLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [colleges, setColleges] = useState([]);
    const [addStudentFormData, setAddStudentFormData] = useState({
        studentName: "",
        collegeId: ""
        }
    )
    const [addCollegeFormData, setAddCollegeFormData] = useState({
            collegeName: ""
        }
    )


    const handleStudentFormData = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newStudentFormData = { ...addStudentFormData}
        newStudentFormData[fieldName] = fieldValue
        setAddStudentFormData(newStudentFormData)
        console.log(addStudentFormData)
    }

    const handleAddStudentData = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/addStudent",{
            method: 'POST',
            body: JSON.stringify({
                'name': addStudentFormData.studentName,
                'college': {
                    'id':addStudentFormData.collegeId
                }
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => {
                console.log(data);
                document.getElementById("CollegeName").value = ""
                document.getElementById("StudentCollege").value = ""
                updateData()
                // Handle data

            })
            .catch((err) => {
                console.log(err.message);
                document.getElementById("CollegeName").value = ""
                document.getElementById("StudentCollege").value = ""
                updateData()
            });

    }

    const handleCollegeFormData = (event) => {
        event.preventDefault()
        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;
        const newCollegeFormData = { ...addCollegeFormData}
        newCollegeFormData[fieldName] = fieldValue
        setAddCollegeFormData(newCollegeFormData)
    }

    const handleAddCollegeData = (event) => {
        event.preventDefault()
        fetch("http://localhost:8080/addCollege",{
            method: 'POST',
            body: JSON.stringify({
                'collegeName': addCollegeFormData.collegeName
            }),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then((data) => {
                console.log(data);
                // Handle data
                document.getElementById("CollegeName").value = ""
                updateData()
            })
            .catch((err) => {
                console.log(err.message);
                document.getElementById("CollegeName").value = ""
                updateData()
            });


    }

    function updateData(){
        console.log("Updated")
        fetch("http://localhost:8080/getColleges")
            .then(res => res.json())
            .then(
                (result) => {
                    setCollegesLoaded(true)
                    setColleges(result)
                }
            )

        const Url = (props.contents==="Students")?"http://localhost:8080/getStudents":"http://localhost:8080/getColleges";
        fetch(Url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }

    useEffect(()=> {
        fetch("http://localhost:8080/getColleges")
            .then(res => res.json())
            .then(
                (result) => {
                    setCollegesLoaded(true)
                    setColleges(result)
                }
            )

        const Url = (props.contents==="Students")?"http://localhost:8080/getStudents":"http://localhost:8080/getColleges";
        fetch(Url)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true)
                    setItems(result)
                },
                (error) => {
                    setIsLoaded(true)
                    setError(error)
                }
            )
    }, [])



    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        if (props.contents === "Students") {
            return (
                <div>
                    <table className={"styled-table"}>
                        <caption>Students Table</caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>College</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.name}</td>
                                <td>{item.college.collegeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h2>Add Student Data</h2>
                    <form onSubmit={handleAddStudentData}>
                        <input type="text" name="studentName" id="StudentName" required="required" placeholder="Enter Student Name"
                               onChange={handleStudentFormData}/>

                        <select name="collegeId" required="required" id="StudentCollege" placeholder="Select College"
                                onChange={handleStudentFormData}>
                            <option value="">Select your college</option>
                            {colleges.map(item => (
                                <option value={item.id}>{item.collegeName}</option>
                            ))}
                        </select>
                        <button type="submit">Add Student</button>
                    </form>
                    <h6 id="studentMessage"></h6>
                </div>
            );
        } else {
            return (
                <div>
                    <table className={"styled-table"}>
                        <caption>Colleges Table</caption>
                        <thead>
                        <tr>
                            <th>Id</th>
                            <th>College Name</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <tr key={item.id}>
                                <td>{item.id}</td>
                                <td>{item.collegeName}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>

                    <form onSubmit={handleAddCollegeData}>
                        <input type="text" name="collegeName" id="CollegeName" required="required" placeholder="Enter College Name"
                               onChange={handleCollegeFormData}/>
                        <button type="submit">Add College</button>
                    </form>
                    <h6 id="collegeMessage"></h6>
                </div>

            );
        }

    }
}