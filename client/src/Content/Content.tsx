import React from 'react';
import './Content.scss';
import { ContentProps, Course, Technology } from "./../tools/tech-roster.model"
import { Link } from "react-router-dom";

const Content = ({courses,technologies}:ContentProps) => {

    return (
    <div className="main">
        <table>
            <th>
                <form>
                    <span className="category-title">Technologies:</span><br />
                    <Link to={`/AddTechnology/`}><span className="fas fa-plus" ></span></Link>

                </form>
                {technologies.map((tech:Technology, n:number) => 
                        <form className="border-left">
                            <td><Link to={`/EditTechnology/${tech._id}`}><span className="fas fa-pencil-alt" ></span></Link></td>
                            <td><Link to={`/DeleteTechnology/${tech._id}`}><span className="fas fa-trash-alt" ></span></Link></td>
                            <td>{tech.name}</td>
                        </form>
                    )}
            </th>
            <th>
                <form>
                    <span className="category-title">Courses:</span><br/>
                    <Link to={`/AddCourse/`}><span className="fas fa-plus" ></span></Link>      
                </form>
                {courses.map((course:Course, n:number) => 
                        <form className="border-left">
                            <td><Link to={`/EditCourse/${course._id}`}><span className="fas fa-pencil-alt" ></span></Link></td>
                            <td><Link to={`/DeleteCourse/${course._id}`}><span className="fas fa-trash-alt" ></span></Link></td>
                            <td>{course.courseCode+" "+course.courseName}</td>
                        </form>
                    )}
            </th>
        </table>
    </div>
    );
}
export default Content;