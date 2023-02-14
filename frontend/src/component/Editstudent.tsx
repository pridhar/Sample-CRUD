import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useParams } from "react-router-dom";

interface FormData {
  sname: string;
  smob: string;
  semail: string;
  sstandard: number;
  sparent1: string;
  sparent2: string;
}

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

interface Student {
  id: number;
  studentName: string;
  profile: Sprofile;
  parents: Sparent[];
  standards: Sstandard[];
}

const Editstudent = () => {
  const { sid } = useParams();

  const [notesList, setnotesList] = useState<Partial<Student>>();
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [standardList, setstandard] = useState<Array<Sstandard>>([]);
  const [showAddNoteModal, setShowAddNoteModal] = useState("");

  useEffect(() => {
    getStudent();
    getStandard();
  }, []);

  const getStandard = async () => {
    try {
      const response = await axios.get("http://localhost:5000/standards");
      const gotstandard = response.data;
      console.log(gotstandard);
      setstandard(gotstandard);
    } catch (err) {
      console.error(err);
    }
  };

  const getStudent = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/students/${sid}`);
      const gotdata = response.data;
      setnotesList(gotdata);
      //console.log()
    } catch (err) {
      console.error(err);
    }
  };
  async function create(data: FormData) {
    const { sname, smob, semail, sstandard, sparent1, sparent2 } = data;
    const variables = { sname, smob, semail, sstandard, sparent1, sparent2 };
    try {
      const res = await axios.put(
        `http://localhost:5000/students/${sid}`,
        variables
      );
      setnotesList(res.data);
      setShowAddNoteModal("Updated Successfully!");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(create)}>
        <div className="container-fluid">
          <br></br>
          <br></br>
          <h3>UPDATE STUDENT DETAILS</h3>
          <br></br>
          <br></br>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Name"
                  {...register("sname")}
                  defaultValue={notesList?.studentName}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Email"
                  {...register("semail")}
                  defaultValue={notesList?.profile?.email}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Phone no"
                  {...register("smob")}
                  defaultValue={notesList?.profile?.mobile}
                />
              </div>
            </div>

            <div className="col-md-3">
              <div className="form-group">
              <select className={`form-control`} {...register("sstandard")} value={notesList?.standards?.[0].standardName}>
               
                {standardList.map((standarditem, index) => {
                  return (
                    <option key={standarditem.id}>{standarditem.standardName}</option>
                  );
                })}
              </select> 
              </div>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Parents Name"
                  {...register("sparent1")}
                  defaultValue={notesList?.parents?.[0].parentName}
                />
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Parents Name"
                  {...register("sparent2")}
                  defaultValue={notesList?.parents?.[1].parentName}
                />
              </div>
            </div>

            <div className="col-md-3">
              <button className="btn btn-primary pl-3 pr-3" type="submit">
                {" "}
                Save{" "}
              </button>
            </div>
          </div>
          <br></br>
          <div className="row">
            <div className="col-md-3"></div>
            <div className="col-md-3">
              <p>{showAddNoteModal}</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Editstudent;
