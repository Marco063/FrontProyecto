import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const saveAffiliate = (affiliateData, setFlag, setVisible, id) => {
  fetch(`https://back-proyecto.vercel.app/affiliate/${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(affiliateData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((result) => {
      console.log(result);
      alert("Afiliado creado exitosamente");
      setFlag(true);
      setVisible(false);
    })
    .catch((error) => {
      console.error("Error al crear el afiliado:", error);
      alert("Error al crear el afiliado. Por favor, inténtalo de nuevo.");
    });
};

const Form = ({ setFlag }) => {
  const [visible, setVisible] = useState(false);
  const [document, setDocument] = useState(0);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [genre, setGenre] = useState(true);
  const [phone, setPhone] = useState("");
  const [discipline, setDiscipline] = useState(null);
  const [disciplines, setDisciplines] = useState([]);

  useEffect(() => {
    fetchDisciplines();
  }, []);

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

  const handleSaveAffiliate = () => {
    if (!isNaN(document) && document !== null) {
      const affiliateData = {
        document: Number(document),
        fname: fname,
        lname: lname,
        genre: genre,
        phone: phone
      };
      const id = discipline ? discipline._id : null;
      saveAffiliate(affiliateData, setFlag, setVisible, id);

      // Restablecer los estados a los valores iniciales después de guardar
      setDocument(0);
      setFname("");
      setLname("");
      setGenre(true);
      setPhone("");
      setDiscipline(null);
    } else {
      alert("El número de documento es inválido");
    }
  };

  return (
    <>
      <Button
        label="Agregar Afiliado"
        icon="pi pi-plus"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Agregar Afiliado"
        visible={visible}
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="card flex justify-content-center">
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-id-card"></i>
            </span>
            <InputText value={document} onChange={(e) => setDocument(e.target.value)} placeholder="Número de documento" />
          </div>
          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText value={fname} onChange={(e) => setFname(e.target.value)} placeholder="Nombre" />
          </div>

          <div className="p-inputgroup flex-1">
            <span className="p-inputgroup-addon">
              <i className="pi pi-user"></i>
            </span>
            <InputText value={lname} onChange={(e) => setLname(e.target.value)} placeholder="Apellidos" />
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
            <InputText value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Teléfono" />
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
            onClick={handleSaveAffiliate}
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
