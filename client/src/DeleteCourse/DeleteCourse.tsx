import React from 'react';
import './DeleteCourse.scss';
import { Course, DeleteProps } from "./../tools/tech-roster.model"
import { useParams,Link } from "react-router-dom";

const DeleteCourse = ({courses, onDelete}:DeleteProps) => {

    let { id } = useParams<{id:string}>();

    let course:(Course | undefined) = courses.find(item => item._id == id);


    return (
    <div>
        Are you sure you want to delete the follow course?
        <div>{course?.courseCode+"\u00A0"+course?.courseName}</div><br/>
        <input type="hidden" value={id} id="id" />
        <Link to={`/`}>
        <input type="submit" className="btn btn-success" value="Delete" onClick={() => (onDelete())}></input>{'\u00A0'}
        <input type="submit" className="btn btn-success" value="Cancel" ></input>
        </Link>

    </div>
    );
}
export default DeleteCourse;