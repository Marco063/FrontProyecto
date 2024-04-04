
import { useState } from "react";
import Table from "../components/Discipline/Table";
import Form from "../components/Discipline/Form";


function Discipline() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Bienvenidos a la página de Disiplinas</h2>
      
       
      </div>
      <br />
      <Form setFlag={setFlag} />
      <br />
      <br />
      <Table flag={flag} setFlag={setFlag} />
    </>
  );
}

export default Discipline;


