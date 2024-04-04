
import { useState } from "react";
import Table from "../components/Attendance/Table";
import Form from "../components/Attendance/form";



function Attendance() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Bienvenidos a la página de Asistencias</h2>


      </div>
      <br />
      <Form setFlag={setFlag} />
      <br />
      <br />
      <Table flag={flag} setFlag={setFlag} />
    </>
  );
}

export default Attendance;


