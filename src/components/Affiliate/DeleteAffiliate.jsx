import React, { useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";

const deleteAffiliate = (id) => {
  return fetch(`https://back-proyecto.vercel.app/affiliate/${id}`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json"
    }
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

const DeleteAffiliate = ({ rowData, setFlag }) => {
  const [visible, setVisible] = useState(false);

  const handleDeleteAffiliate = () => {
    deleteAffiliate(rowData._id)
      .then((result) => {
        alert("Afiliado eliminado exitosamente");
        setFlag(true);
        setVisible(false);
      })
      .catch((error) => alert(error));
  };

  return (
    <div >
      <Button
        label="Eliminar"
        icon="pi pi-eraser"
        severity="danger"
        onClick={() => setVisible(true)}
      />
      <Dialog
        header="Eliminar Afiliado"
        visible={visible}
        modal={false}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <div className="p-inputgroup flex-1 flex-column align-items-center">
          <i className="pi pi-exclamation-triangle" style={{ fontSize: "2em", marginBottom: "1em" }}></i>
          <p style={{ textAlign: "center" }}>¿Está seguro de que desea eliminar este afiliado?</p>
          <div className="flex justify-content-center" style={{ width: "100%" }}>
           <center> <Button
              label="Eliminar"
              icon="pi pi-eraser"
              severity="danger"
              onClick={() => handleDeleteAffiliate()}
              className="mr-2"
            />
            <Button
              label="Cancelar"
              icon="pi pi-times"
              onClick={() => setVisible(false)}
              className="p-button-text"
            /></center>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteAffiliate;
