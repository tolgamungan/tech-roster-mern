import React from 'react';
import './DeleteTechnology.scss';
import { Technology, DeleteProps } from "./../tools/tech-roster.model"
import { useParams,Link } from "react-router-dom";

const DeleteTechnology = ({technologies, onDelete}:DeleteProps) => {

    let { id } = useParams<{id:string}>();

    let technology:(Technology | undefined) = technologies.find(item => item._id == id);


    return (
    <div>
        Are you sure you want to delete the follow technology?
        <div>{technology?.name}</div><br/>
        <input type="hidden" value={id} id="id" />

        <Link to={`/`}>
        <input type="submit" className="btn btn-success" value="Delete" onClick={() => (onDelete())}></input>{'\u00A0'}
        <input type="submit" className="btn btn-success" value="Cancel" ></input>
        </Link>

    </div>
    );
}
export default DeleteTechnology;