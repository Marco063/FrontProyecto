import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const updateDiscipline = (id, data) => {
  return fetch(`https://back-proyecto.vercel.app/discipline/${id}`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result;
      } else {
        throw new Error(result.error);
      }
    })
    .catch(err => console.log(err));
};

const EditDiscipline = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [isIndividual, setIsIndividual] = useState(null);

  useEffect(() => {
    setName(rowData.name);
    setIsIndividual(rowData.individual);
  }, [rowData]);

  const handleEditDiscipline = () => {
    const disciplineData = {
      name: name,
      individual: isIndividual
    };

    updateDiscipline(rowData.id, disciplineData)
      .then((result) => {
        alert("Disciplina actualizada exitosamente");
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
        header="Editar Disciplina"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <i className="pi pi-user"></i>
            <InputText
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
            />
          </div>
          <div className="p-field">
            <i className="pi pi-check"></i>
            <br />
            <Button
              label="Sí"
              icon="pi pi-check"
              className={`p-button-success mr-2 ${isIndividual === true ? "p-button-outlined" : ""}`}
              onClick={() => setIsIndividual(true)}
            />
            <Button
              label="No"
              icon="pi pi-times"
              className={`p-button-danger ${isIndividual === false ? "p-button-outlined" : ""}`}
              onClick={() => setIsIndividual(false)}
            />
          </div>
        </div>
        <br />
        <div className="p-d-flex p-jc-end">
          <Button
            label="Aceptar"
            icon="pi pi-check"
            onClick={() => handleEditDiscipline()}
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

export default EditDiscipline;
