import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

interface FormData {
  sname: string;
  smob: string;
  semail: string;
  sstandard: number;
  sparent1: string;
  sparent2: string;
}

interface Sstandard {
  id: number;
  standardName: string;
}

const Addstudent = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [standardList, setstandard] = useState<Array<Sstandard>>([]);

  useEffect(() => {
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

  async function create(data: FormData) {
    const { sname, smob, semail, sstandard, sparent1, sparent2 } = data;
    const variables = { sname, smob, semail, sstandard, sparent1, sparent2 };
    //console.log(variables);
    try {
      await axios
        .post("http://localhost:5000/students", variables)
        .then((data) => {
          console.log(data);
          reset();
        });
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <div className="container-fluid">
        <br></br>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <h3>ADD STUDENT</h3>
            <br></br>
            <form onSubmit={handleSubmit(create)}>
              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Name"
                  {...register("sname")}
                />
              </div>
              <br></br>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Email"
                  {...register("semail")}
                />
              </div>
              <br></br>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Phone no"
                  {...register("smob")}
                />
              </div>
              <br></br>

              <div className="form-group">
              <select className={`form-control`} {...register("sstandard")}>
                <option value="0">Select</option>
                {standardList.map((standarditem, index) => {
                  return (
                    <option key={standarditem.id}>{standarditem.standardName}</option>
                  );
                })}
              </select> 
              </div>
              <br></br>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Parents Name"
                  {...register("sparent1")}
                />
              </div>
              <br></br>

              <div className="form-group">
                <input
                  type="text"
                  className={`form-control`}
                  placeholder="Parents Name"
                  {...register("sparent2")}
                />
              </div>

              <br></br>
              <button className="btn btn-primary pl-3 pr-3" type="submit">
                {" "}
                Save{" "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addstudent;
