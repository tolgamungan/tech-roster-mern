import React from 'react';
import './EditTechnology.scss';
import { Technology, EditProps, Course } from "./../tools/tech-roster.model"
import { useParams,Link } from "react-router-dom";

const EditTechnology = ({technologies, courses, onEdit}:EditProps) => {

    let { id } = useParams<{id:string}>();

    let technology:(Technology | undefined) = technologies.find(item => item._id == id);


    return (
        <div className="main">
        <h4>Add New Technology</h4>
    <form>
        <input type="hidden" value={id} id="id" />

        <label> Name:</label><br/>
        <input type="text" defaultValue={technology?.name} name="name" id="name"/><br />

        <label> Description:</label><br/>
        <input type="text" defaultValue={technology?.description} name="description" id="description"/><br />

        <label> Difficulty:</label><br/>
        <input type="number" defaultValue={technology?.difficulty} name="name" min="1" max="5" id="difficulty"/><br/>

        <label> Used in courses:</label><br/>
        {courses.map((course:Course, n:number) => 

            <div className="add-checkbox">
                <input type="checkbox" name="courses"/>
                <label>{course.courseCode+" "+course.courseName}</label>
            </div>


        )} <br/>


    <Link to={`/`}>
        <input type="submit" className="btn btn-success" value="Add" onClick={() => (onEdit())}></input>{'\u00A0'}
        <input type="submit" className="btn btn-success" value="Cancel" ></input>
    </Link>
    </form>
</div>
    );
}
export default EditTechnology;