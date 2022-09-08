import React, {Fragment} from "react";

export const ReadOnlyStudentRow =({student, handleEditClick, onDelete}) => {
        return(
            <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.college.collegeName}</td>
                <td><button onClick={(event)=>handleEditClick(event, student)}>Edit</button> <button onClick={(event)=>onDelete(event, student)}>Delete</button></td>
            </tr>
        )

}

export const EditableStudentRow =({student, colleges, onSave, onDelete, change}) => {
    return(
        <tr key={student.id}>
            <td>{student.id}</td>
            <td><input type="text" name="studentName" id="StudentName" required="required" placeholder="Enter Student Name"
                       defaultValue={student.name} onChange={(event)=>change(event)}/></td>
            <td><select defaultValue={student.college.id} name="collegeId" required="required" id="StudentCollege" placeholder="Select College" onChange={(event)=>change(event)}>
                <option value="">Select your college</option>
                {colleges.map(college => (
                    <option value={college.id}>{college.collegeName}</option>
                ))}
            </select></td>
            <td><button onClick={(event)=>onSave(event, student)}>Save</button>
                <button onClick={(event)=>onDelete(event, student)}>Delete</button></td>
        </tr>
    )
}


export const EditableCollegeRow = ({college, onSave, onDelete, change}) => {
    return(
        <tr key={college.id}>
            <td>{college.id}</td>
            <td><input type="text" name="collegeName" id="CollegeName" required="required" placeholder="Enter College Name"
                       defaultValue={college.collegeName} onChange={(event)=>change(event)}/></td>
            <td><button onClick={(event)=>onSave(event, college)}>Save</button>
                <button onClick={(event)=>onDelete(event, college)}>Delete</button></td>
        </tr>
    )
}

export const ReadOnlyCollegeRow =({college, handleEditClick, onDelete}) => {
    return(
        <tr key={college.id}>
            <td>{college.id}</td>
            <td>{college.collegeName}</td>
            <td><button onClick={(event)=>handleEditClick(event, college)}>Edit</button> <button onClick={(event) => onDelete(event, college)}>Delete</button></td>
        </tr>
    )
}
