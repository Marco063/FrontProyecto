import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";

const updateAffiliate = (id, data) => {
  return fetch(`https://back-proyecto.vercel.app/affiliate/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(result => {
      if (result.status) {
        return result;
      } else {
        throw new Error(result.error);
      }
    })
    .catch(err => console.log(err));
};

const EditAffiliate = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [id, setID] = useState(0);
  const [document, setDocument] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [genre, setGenre] = useState(true);
  const [phone, setPhone] = useState("");
  const [discipline, setDiscipline] = useState(null);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    setID(rowData._id);
    setDocument(rowData.document);
    setFname(rowData.fname);
    setLname(rowData.lname);
    setGenre(rowData.genre);
    setPhone(rowData.phone);
    setDiscipline(rowData.discipline);
    fetchDisciplines();
  }, [rowData]);

  const fetchDisciplines = () => {
    fetch("https://back-proyecto.vercel.app/discipline")
      .then((response) => response.json())
      .then((data) => {
        setDisciplines(data.data);
      })
      .catch((error) => {
        console.error("Error fetching disciplines:", error);
      });
  };

  const handleEditAffiliate = () => {
    const affiliateData = {
      document: document,
      fname: fname,
      lname: lname,
      genre: genre,
      phone: phone,
      discipline: discipline._id
    };

    updateAffiliate(id, affiliateData)
      .then((result) => {
        alert("Afiliado actualizado exitosamente");
        setFlag(true);
        setVisible(false);
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="card flex justify-content-center">
      <Button
        label="Editar"
        icon="pi pi-user-edit"
        severity="warning"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Editar Afiliado"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
       
       <div className="card flex flex-column md:flex-row gap-3">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">ID</span>
            <InputNumber placeholder="ID" value={id} disabled />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText value={document} onChange={(e) => setDocument(e.target.value)} placeholder="numero de docuemto" />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText value={fname} onChange={(e) => setFname(e.target.value)} placeholder="nombre" />
          </div>
          
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText value={lname} onChange={(e) => setLname(e.target.value)} placeholder="apellidos" />
          </div>

          <div className="p-inputgroup flex-1">
  <span className="p-inputgroup-addon">
    <i className="pi pi-book"></i>
  </span>
  <InputText 
    value={genre} 
    onChange={(e) => {
      const lowerCaseValue = e.target.value.toLowerCase();
      if (lowerCaseValue === 'masculino') {
        setGenre(true);
      } else if (lowerCaseValue === 'femenino') {
        setGenre(false);
      } else {
        setGenre(e.target.value); // Si no es "masculino" ni "femenino", mantén el valor tal como está
      }
    }} 
    placeholder="Género" 
  />
</div>


          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-phone"></i>
            </span>
            <InputText value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="telefono" />
          </div>
          <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
              <i className="pi pi-check"></i>
              </span>
            <Dropdown
              optionLabel="name"
              value={discipline}
              options={disciplines}
              onChange={(e) => setDiscipline(e.value)}
              placeholder="Seleccionar Disciplina"
            />
          </div>
        </div>
        <br />
        <div className="p-d-flex p-jc-end">
          <Button
            label="Aceptar"
            icon="pi pi-check"
            onClick={handleEditAffiliate}
            className="p-button-success"
          />
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => setVisible(false)}
            className="p-button-text"
          />
        </div>
      </Dialog>
    </div>
  );
};

export default EditAffiliate;
