import React from 'react';
import './EditCourse.scss';
import { EditProps, Course } from "./../tools/tech-roster.model"
import { useParams,Link } from "react-router-dom";

const EditCourse = ({courses, onEdit}:EditProps) => {

    let { id } = useParams<{id:string}>();

    let course:(Course | undefined) = courses.find(item => item._id == id);


    return (
        <div className="main">
        <h4>Edit Course</h4>
    <form>
        <input type="hidden" value={id} id="id" />

        <label> Course Code:</label><br/>
        <input type="text" defaultValue={course?.courseCode} name="name" id="courseCode" readOnly/><br/><br/>

        <label> Name:</label><br/>
        <input type="text" defaultValue={course?.courseName} name="name" id="courseName"/><br/><br/>


    <Link to={`/`}>
        <input type="submit" className="btn btn-success" value="Add" onClick={() => (onEdit())}></input>{'\u00A0'}
        <input type="submit" className="btn btn-success" value="Cancel" ></input>
    </Link>
    </form>
</div>
    );
}
export default EditCourse;