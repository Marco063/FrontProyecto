import { useState } from "react";
import Table from "../components/Affiliate/Table";
import Form from "../components/Affiliate/Form";



function Affiliate() {
  const [flag, setFlag] = useState(false);

  return (
    <>
      <br />
      <div style={{ textAlign: "center" }}>
        <h2>Bienvenidos a la página de Afiliados</h2>
      
       
      </div>
      <br />
      <Form setFlag={setFlag} />
      <br />
      <br />
      <Table flag={flag} setFlag={setFlag} />
    </>
  );
}

export default Affiliate;