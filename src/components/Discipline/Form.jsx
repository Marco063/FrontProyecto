import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";

const saveDiscipline = (disciplineData, setFlag, setVisible, setName, setIsIndividual) => {
  fetch("https://back-proyecto.vercel.app/discipline", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(disciplineData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert("Disciplina creada exitosamente");
      setFlag(true);
      setVisible(false);
      // Restablecer los valores a sus estados iniciales
      setName("");
      setIsIndividual(null);
    })
    .catch((error) => {
      console.error("Error al crear la disciplina:", error);
      alert("Error al crear la disciplina. Por favor, inténtalo de nuevo.");
    });
};

const FormDiscipline = ({ setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [isIndividual, setIsIndividual] = useState(null); // Cambiado a null en lugar de string

  const handleSaveDiscipline = () => {
    if (isIndividual === null) {
      alert("Por favor, seleccione 'Sí' o 'No' para la opción Individual.");
      return;
    }

    const disciplineData = {
      name: name,
      individual: isIndividual,
    };

    saveDiscipline(
      disciplineData,
      setFlag,
      setVisible,
      setName,
      setIsIndividual
    );
  };

  return (
    <>
      <Button
        label="Agregar Disciplina"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Agregar Disciplina"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="p-fluid">
          <div className="p-field">
            <i className="pi pi-user"></i>
            <InputText
              id="name"
              value={name}
              placeholder="Nombre"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="p-fluid">
            <div className="p-field">
              <i className="pi pi-check"></i>
              <span className="p-mr-2">Individual:</span> {/* Título "Individual" */}
              <Button
                label="Sí"
                icon="pi pi-check"
                className={`p-button mr-2 ${
                  isIndividual === true ? "p-button-outlined" : ""
                }`}
                onClick={() => setIsIndividual(true)}
              />
              <Button
                label="No"
                icon="pi pi-times"
                className={`p-button-danger ${
                  isIndividual === false ? "p-button-outlined" : ""
                }`}
                onClick={() => setIsIndividual(false)}
              />
            </div>
          </div>
        </div>
        <br></br>
        <div className="p-d-flex p-jc-end">
          <Button
            label="Aceptar"
            icon="pi pi-check"
            onClick={handleSaveDiscipline}
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
    </>
  );
};

export default FormDiscipline;
