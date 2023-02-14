import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Addstudent from "./component/Addstudent";
import Studentlist from "./component/Studentlist";
import Editstudent from "./component/Editstudent";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Addstudent />} />
          <Route path="/list" element={<Studentlist />} />
          <Route path="/:sid" element={<Editstudent />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
