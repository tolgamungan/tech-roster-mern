import React from 'react';
import './App.scss';
import "./../node_modules/@fortawesome/fontawesome-free/scss/fontawesome.scss";
import "./../node_modules/@fortawesome/fontawesome-free/scss/solid.scss";
import {editJSONData,deleteJSONData ,sendJSONData, getJSONData} from "./tools/Toolkit";
import { Route, Switch } from "react-router-dom";
import LoadingOverlay from "./LoadingOverlay/LoadingOverlay";
import {Course,Technology, TechData, TechnologyCourse} from './tools/tech-roster.model';
import Content from './Content/Content';
import AddTechnology from './AddTechnology/AddTechnology';
import AddCourse from './AddCourse/AddCourse';
import DeleteTechnology from './DeleteTechnology/DeleteTechnology';
import DeleteCourse from './DeleteCourse/DeleteCourse';
import EditTechnology from './EditTechnology/EditTechnology';
import EditCourse from './EditCourse/EditCourse';
import Error from './Error/Error'



function App() {
  const DELETE_SCRIPT   = "/delete"; 
  const EDIT_SCRIPT     = "/put"; 
  const RETRIEVE_SCRIPT = "/get"; 
  const SUBMIT_SCRIPT   = "/post"; 


  const onResponse = (result:TechData) => { 
    setLoading(true);
    setCourses(result.courses);
    setTechnologies(result.technologies);
    console.log("RESPONSE");
    setLoading(false);
  };

  const onDelete =() => {
    console.log("Deleting..");
    let id:string = (document.getElementById('id') as HTMLFormElement).value
    console.log(id);
    deleteJSONData(DELETE_SCRIPT,id, onSuccess, onError);
  };
    
  const onSubmit =() => {
    let sendString ="";
    if (document.getElementById('name')===null){
      let courseCode:string = (document.getElementById('courseCode') as HTMLFormElement).value;
      let courseName:string = (document.getElementById('courseName') as HTMLFormElement).value;
      sendString = '{ "courseCode":' +'"'+ courseCode + '"' + ',' + '"courseName": ' + '"'+ courseName + '"' +'}';

    } else{
      let name:string = (document.getElementById('name') as HTMLFormElement).value;
      let description:string = (document.getElementById('description') as HTMLFormElement).value;
      let difficulty:string = (document.getElementById('difficulty') as HTMLFormElement).value;
      let courses:TechnologyCourse[];
      sendString = '{ "name":' +'"'+ name + '"' + ',' + '"description": ' + '"'+ description + '"' + ',' + '"difficulty": ' +  difficulty + ',' + '"courses": ' + '[{' + '}]' + '}';
      console.log("NAME: "+description);
    }
    console.log("Submitting..");
    console.log(sendString);
    sendJSONData(SUBMIT_SCRIPT,sendString, onSuccess, onError);  
  };
  const onEdit =() => {
    console.log("Editing..");
    let id:string = (document.getElementById('id') as HTMLFormElement).value;
    let sendString ="";
    if (document.getElementById('name')===null){
      let courseCode:string = (document.getElementById('courseCode') as HTMLFormElement).value;
      let courseName:string = (document.getElementById('courseName') as HTMLFormElement).value;
      sendString = '{ "id":' +'"'+ id + '"' + ',' + '"courseCode":' +'"'+ courseCode + '"' + ',' + '"courseName": ' + '"'+ courseName + '"' +'}';

    } else{
      let name:string = (document.getElementById('name') as HTMLFormElement).value;
      let description:string = (document.getElementById('description') as HTMLFormElement).value;
      let difficulty:string = (document.getElementById('difficulty') as HTMLFormElement).value;
      let courses:TechnologyCourse[];
      sendString = '{ "id":' +'"'+ id + '"' + ',' + '"name": ' + '"'+ name + '"' + ',' + '"description": ' + '"'+ description + '"' + ',' + '"difficulty": ' +  difficulty + ',' + '"courses": ' + '[{' + '}]' + '}';
      console.log(sendString);
    }
    editJSONData(EDIT_SCRIPT,sendString,onSuccess, onError)
  };

  const onSuccess = () => {
    setLoading(true);
    console.log("Success!");
    getJSONData(RETRIEVE_SCRIPT, onResponse, onError); // to update the list after delete
    setLoading(false);
  };
    

  const onError = (message:string) => {
    console.log("*** Error has occured during AJAX data transmission: " + message);
    setLoading(false)};


    // ---------------------------------------------- state variables
    const [courses, setCourses] = React.useState<Course[]>([]);
    const [technologies, setTechnologies] = React.useState<Technology[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

      // ---------------------------------------------- lifecycle hooks
      React.useEffect(() => {
        getJSONData(RETRIEVE_SCRIPT, onResponse, onError);
      }, []);

  return (
    <div className="main">
       <LoadingOverlay bgColor="#469672" spinnerColor="#FFFFFF" enabled={loading} />

        <div className="header">_Technology Roster : Course Admin</div>

        <Switch>
        <Route
          path="/"
          render={() => <Content courses={courses} technologies={technologies} />}
          exact />

        <Route
          path="/AddTechnology"
          render={() => <AddTechnology technologies={technologies} courses={courses} onSubmit={onSubmit}/> }
          />
        <Route
          path="/AddCourse"
          render={() => <AddCourse technologies={technologies} courses={courses} onSubmit={onSubmit}/> }
          />
        
        <Route
          path="/DeleteTechnology/:id"
          render={() => <DeleteTechnology courses={courses} technologies={technologies} onDelete={onDelete} /> }
          />

        <Route
          path="/DeleteCourse/:id"
          render={() => <DeleteCourse courses={courses} technologies={technologies} onDelete={onDelete} /> }
          />

          <Route
          path="/EditTechnology/:id"
          render={() => <EditTechnology courses={courses} technologies={technologies} onEdit={onEdit} /> }
          />

          <Route
          path="/EditCourse/:id"
          render={() => <EditCourse courses={courses} technologies={technologies} onEdit={onEdit} /> }
          />

        <Route render={() => <Error />} />
      </Switch>


        <div className="footer">Web App powered by <a href="https://www.mongodb.com/mern-stack" target="_blank" rel="noopener noreferrer">MERN Stack</a></div>

    </div>

    
  );
}

export default App;
