import React from 'react';
import './AddTechnology.scss';
import { AddProps , Course} from "./../tools/tech-roster.model"
import { Link } from "react-router-dom";

const AddTechnology = ({technologies,courses,onSubmit}:AddProps) => {

    return (
    <div className="main">
            <h4>Add New Technology</h4>
        <form>

            <label> Name:</label><br/>
            <input type="text" name="name" id="name"/><br />

            <label> Description:</label><br/>
            <input type="text" name="description" id="description"/><br />

            <label> Difficulty:</label><br/>
            <input type="number" name="name" min="1" max="5" defaultValue="1" id="difficulty"/><br/>

            <label> Used in courses:</label><br/>
            {courses.map((course:Course, n:number) => 
                <div className="add-checkbox">
                    <input type="checkbox" name="courses"/>
                    <label>{course.courseCode+" "+course.courseName}</label>
                </div>

            )} <br/>


        <Link to={`/`}>
            <input type="submit" className="btn btn-success" value="Add" onClick={() => (onSubmit())}></input>{'\u00A0'}
            <input type="submit" className="btn btn-success" value="Cancel" ></input>
        </Link>
        </form>
    </div>
    );
}
export default AddTechnology;