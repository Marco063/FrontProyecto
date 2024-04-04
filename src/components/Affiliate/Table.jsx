import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import EditEvent from "../Affiliate/EditAffiliate";
import DeleteAffiliate from "../Affiliate/DeleteAffiliate";

const findAllAffiliates = () => {
  return fetch('https://back-proyecto.vercel.app/affiliate', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result.data;
      }
      throw new Error('No se pudieron cargar los afiliados');
    });
};

const findDisciplineById = (disciplineId) => {
  return fetch(`https://back-proyecto.vercel.app/discipline/${disciplineId}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result.data;
      }
      throw new Error('No se pudo encontrar la disciplina');
    });
};

const Table = ({ flag, setFlag }) => {
  const [affiliates, setAffiliates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscipline, setSelectedDiscipline] = useState(null);

  const loadAffiliates = () => {
    setLoading(true);
    findAllAffiliates()
      .then((result) => {
        setAffiliates(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    setFlag(false);
  };

  useEffect(() => {
    loadAffiliates();
  }, [flag]);

  const showDisciplineInfo = (disciplineId) => {
    findDisciplineById(disciplineId)
      .then((discipline) => {
        setSelectedDiscipline(discipline);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="card">
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <DataTable
          value={affiliates}
          tableStyle={{ minWidth: "50rem" }}
          sortField="id"
          sortOrder={1}
        >
          <Column field="document" header="Identificacion" ></Column >
          <Column field="fname" header="Nombre"></Column>
          <Column field="lname" header="Apellido"></Column>
          <Column
            field="genre"
            header="Género"
            body={(rowData) => (
              <span>{rowData.genre ? "Masculino" : "Femenino"}</span>
            )}
          >
          </Column>
          <Column field="phone" header="Teléfono"></Column>

          <Column
            header="Disciplina"
            body={(rowData) => (
              <Button
                label="Informacion de la Disciplina"
                icon="pi pi-info-circle"
                onClick={() => showDisciplineInfo(rowData.discipline)}
              />
            )}
          ></Column>
          <Column
            header="Opciones"
            body={(rowData) => (
              <div className="flex items-center">
                <div className="flex space-x-2">
                  <EditEvent rowData={rowData} setFlag={setFlag} />

                </div>
              </div>
            )}
          ></Column>
          <Column

            body={(rowData) => (
              <div className="flex items-center">
                <div className="flex space-x-2">

                  <DeleteAffiliate rowData={rowData} setFlag={setFlag} />
                </div>
              </div>
            )}
          ></Column>
        </DataTable>
      )}
      <Dialog
        header="Informacion de la Disciplina"
        visible={selectedDiscipline !== null}
        modal={true}
        style={{ width: "33vw" }}
        onHide={() => setSelectedDiscipline(null)}
      >
        <div>
          {selectedDiscipline && (
            <div>
              <h3>{selectedDiscipline.name}</h3>
            </div>
          )}
        </div>
      </Dialog>
    </div>
  );
};

export default Table;
