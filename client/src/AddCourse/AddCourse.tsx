import React from 'react';
import './AddCourse.scss';
import { AddProps , Course} from "./../tools/tech-roster.model"
import { Link } from "react-router-dom";

const AddCourse = ({technologies,courses,onSubmit}:AddProps) => {

    return (
    <div className="main">
            <h4>Add New Course</h4>
        <form>

            <label> Course Code:</label><br/>
            <input type="text" name="courseCode" id="courseCode" required/><br />

            <label> Name:</label><br/>
            <input type="text" name="courseName" id="courseName"/><br/><br/>


        <Link to={`/`}>
            <input type="submit" className="btn btn-success" value="Add" onClick={() => (onSubmit())}></input>{'\u00A0'}
            <input type="submit" className="btn btn-success" value="Cancel" ></input>
        </Link>
        </form>
    </div>
    );
}
export default AddCourse;