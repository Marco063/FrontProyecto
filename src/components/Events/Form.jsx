import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";


const saveEvent = (eventData, setFlag, setVisible) => {
  fetch("https://back-proyecto.vercel.app/event", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert("Evento creado exitosamente");
      setFlag(true);
      setVisible(false);
    })
    .catch((error) => {
      console.error("Error al crear el evento:", error);
      alert("Error al crear el evento. Por favor, inténtalo de nuevo.");
    });
};

const Form = ({ setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [site, setSite] = useState("");
  const [city, setCity] = useState("");

  const handleSaveEvent = () => {
    const eventData = {
      name: name,
      date: date,
      site: site,
      city: city,
    };

    saveEvent(eventData, setFlag, setVisible);
  };

  return (
    <>
      <Button
        label="Agregar Evento"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Agregar Evento"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card flex justify-content-center"></div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-user"></i>
          </span>
          <InputText value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-calendar"></i>
          </span>
          <InputText value={date} onChange={(e) => setDate(e.target.value)} placeholder="Fecha" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-map-marker"></i>
          </span>
          <InputText value={site} onChange={(e) => setSite(e.target.value)} placeholder="Lugar" />
        </div>

        <div className="p-inputgroup flex-1">
          <span className="p-inputgroup-addon">
            <i className="pi pi-home"></i>
          </span>
          <InputText value={city} onChange={(e) => setCity(e.target.value)} placeholder="Ciudad" />
        </div>

        <br></br>
        <div className="p-d-flex p-jc-end">
          <Button
            label="Aceptar"
            icon="pi pi-check"
            onClick={handleSaveEvent}
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

export default Form;
