import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import EditEvent from "../Discipline/EditDiscipline";
import DeleteEvent from "../Discipline/DeleteDiscipline";
import { Dialog } from "primereact/dialog";
import { findAllAffiliates, findDisciplineById,findAllDisciplines } from "./API";



const renderIndividual = (rowData) => {
  return rowData.individual ? "Sí" : "No";
};

const TableDiscipline = ({ flag, setFlag }) => {
  const [disciplines, setDisciplines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAffiliatesDialog, setShowAffiliatesDialog] = useState(false);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);
  const [affiliates, setAffiliates] = useState([]);

  const loadDisciplines = () => {
    setLoading(true);
    findAllDisciplines()
      .then(result => {
        setDisciplines(result);
      })
      .catch(err => console.log(err))
      .finally(() => setLoading(false));
    setFlag(false);
  };

  const showAffiliatesInfo = (disciplineId) => {
    findDisciplineById(disciplineId)
      .then((discipline) => {
        setSelectedDiscipline(discipline);
        // Llama a findAllAffiliates con el ID de la disciplina seleccionada
        findAllAffiliates(disciplineId)
          .then(result => {
            setAffiliates(result);
            setShowAffiliatesDialog(true);
          })
          .catch(err => console.log(err));
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadDisciplines();
  }, [flag]);

  return (
    <div className="card">
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <DataTable
            value={disciplines}
            tableStyle={{ minWidth: "50rem" }}
            sortField="id"
            sortOrder={1}
          >
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Nombre"></Column>
            <Column field="individual" header="Individual" body={renderIndividual}></Column>
            <Column
              header="Ver Afiliados"
              body={(rowData) => (
                <Button
                  label="Ver Afiliados"
                  icon="pi pi-users"
                  onClick={() => showAffiliatesInfo(rowData.id)}
                />
              )}
            ></Column>
            <Column
              header="Opciones"
              body={(rowData) => (
                <>
                  <EditEvent rowData={rowData} setFlag={setFlag} />
                  
                </>
              )}
            ></Column>
             <Column
             
              body={(rowData) => (
                <>
             
                  <DeleteEvent rowData={rowData} setFlag={setFlag} />
                </>
              )}
            ></Column>
          </DataTable>
          <Dialog
            header="Afiliados de la Disciplina"
            visible={showAffiliatesDialog}
            onHide={() => setShowAffiliatesDialog(false)}
            style={{ width: "50vw" }}
          >
            {selectedDiscipline && (
              <>
                <h3>{selectedDiscipline.name}</h3>
                <DataTable value={affiliates}>
                  <Column field="document" header="Identificacion"></Column>
                  <Column field="fname" header="Nombre"></Column>
                  <Column field="lname" header="Apellido"></Column>
                  <Column field="genre" header="Género"></Column>
                  <Column field="phone" header="Teléfono"></Column>
                </DataTable>
              </>
            )}
          </Dialog>
        </>
      )}
    </div>
  );
};

export default TableDiscipline;
