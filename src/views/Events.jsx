
import { useState } from "react";
import Table from "../components/Events/Table";
import Form from "../components/Events/Form";

function Events() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Bienvenidos a la página de Eventos</h2>
      
       
      </div>
      <br />
      <Form setFlag={setFlag} />
      <br />
      <br />
      <Table flag={flag} setFlag={setFlag} />
    </>
  );
}

export default Events;


