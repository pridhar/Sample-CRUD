import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Table, Button } from "react-bootstrap";

interface Sprofile {
  id: number;
  email: string;
  mobile: string;
}

interface Sstandard {
  id: number;
  standardName: string;
}

interface Sparent {
  id: number;
  parentName: string;
}

interface FormData {
  id: number;
  studentName: string;
  profile: Sprofile;
  parents: Sparent[];
  standards: Sstandard[];
}

const Studentlist = () => {
  const [notesList, setnotesList] = useState<Array<FormData>>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState(false);

  useEffect(() => {
    getStudent();
  }, []);

  useEffect(() => {
    getStudent();
    setShowAddNoteModal(false);
    
  }, [showAddNoteModal]);

  const onStudentdelete = async (ssid: number) => {
    try {
      await axios.delete(`http://localhost:5000/students/${ssid}`);
      
    } catch (err) {
      console.error(err);
    }
  };

  const getStudent = async () => {
    try {
      const response = await axios.get("http://localhost:5000/students");
      const gotdata = response.data;
      console.log(gotdata);
      setnotesList(gotdata);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container-fluid">
        <br></br>
        <div className="row">
          <div className="col-md-12">
            <form>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Class</th>
                    <th>Email</th>
                    <th>Phone No</th>
                    <th>Parents Name</th>
                    <th>Parents Name</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {notesList.map((noteitem, index) => {
                    if (noteitem.studentName != "")
                      return (
                        <tr>
                          <td>{noteitem.studentName}</td>
                          <td>{noteitem.standards[0].standardName}</td>
                          <td>{noteitem.profile.email}</td>
                          <td>{noteitem.profile.mobile}</td>
                          <td>{noteitem.parents[0].parentName}</td>
                          <td>{noteitem.parents[1].parentName}</td>
                          <td>
                            <Link to={`/${noteitem.id}`}>
                              <Button variant="outline-primary">Edit</Button>
                            </Link>
                            <Button
                              onClick={() => {
                                onStudentdelete(noteitem.id);
                                setShowAddNoteModal(true);
                              }}
                              variant="outline-primary"
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      );
                  })}
                </tbody>
              </Table>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Studentlist;
