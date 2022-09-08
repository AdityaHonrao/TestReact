import React, {Fragment, useEffect, useState} from "react";
import './Table.css';
import {EditableCollegeRow, EditableStudentRow, ReadOnlyCollegeRow, ReadOnlyStudentRow} from "./Rows";

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

    const [updateStudentFormData, setUpdateStudentFormData] = useState({
            studentName: "",
            collegeId: ""
        }
    )

    const [updateCollegeFormData, setUpdateCollegeFormData] = useState({
            collegeName: ""
        }
    )

    const [editStudentId, setEditStudentId] = useState(null)
    const [editCollegeId, setEditCollegeId] = useState(null)

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

    const handleEditStudentId=(event, student)=>{
        event.preventDefault()
        setEditStudentId(student.id)
    }

    const handleUpdateStudentFormData = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const updatedFormData = { ...updateStudentFormData}
        updatedFormData[fieldName] = fieldValue
        setUpdateStudentFormData(updatedFormData)
        console.log(addStudentFormData)
    }

    const handleStudentUpdate = (event, student)=>{
        fetch("http://localhost:8080/updateStudent",{
            method: 'POST',
            body: JSON.stringify({
                'id':student.id,
                'name': updateStudentFormData.studentName,
                'college': {
                    'id':updateStudentFormData.collegeId
                }
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

    const handleEditCollegeId=(event, college)=>{
        event.preventDefault()
        setEditCollegeId(college.id)
    }

    const handleUpdateCollegeFormData = (event) => {
        event.preventDefault()

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const updatedFormData = { ...updateCollegeFormData}
        updatedFormData[fieldName] = fieldValue
        setUpdateCollegeFormData(updatedFormData)
        console.log(addStudentFormData)
    }

    const handleCollegeUpdate = (event, college)=>{
        fetch("http://localhost:8080/updateCollege",{
            method: 'POST',
            body: JSON.stringify({
                'id':college.id,
                'collegeName': updateCollegeFormData.collegeName
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
        setEditStudentId(null)
        setEditCollegeId(null)
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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {items.map(item => (
                            <Fragment>
                                {editStudentId=== item.id?
                                    <EditableStudentRow student = {item} colleges={colleges} onSave={handleStudentUpdate} change={handleUpdateStudentFormData}/>:
                                    <ReadOnlyStudentRow student={item} handleEditClick={handleEditStudentId}/>}
                            </Fragment>
                        ))}
                        </tbody>
                    </table>
                    <div className="Table-form">
                        <h4>Add Student Data</h4>
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
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            items.map(item => (
                                <Fragment>
                                    {editCollegeId=== item.id?
                                        <EditableCollegeRow college={item} onSave={handleCollegeUpdate} change={handleUpdateCollegeFormData}/>:
                                        <ReadOnlyCollegeRow college={item} handleEditClick={handleEditCollegeId}/>}
                                </Fragment>
                        ))}
                        </tbody>
                    </table>
                    <div className="Table-form">
                        <h4>Add College Data</h4>
                        <form onSubmit={handleAddCollegeData}>
                            <input type="text" name="collegeName" id="CollegeName" required="required" placeholder="Enter College Name"
                                   onChange={handleCollegeFormData}/>
                            <button type="submit">Add College</button>
                        </form>
                        <h6 id="collegeMessage"></h6>
                    </div>

                </div>
            );
        }

    }
}