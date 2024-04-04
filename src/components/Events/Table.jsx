import React, { useState, useEffect } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dialog } from "primereact/dialog";
import EditEvent from "../Events/EditEvents";
import DeleteEvent from "../Events/DeleteEvents";
import "../MainPage.css"; 

const findAllEvents = () => {
  return fetch('https://back-proyecto.vercel.app/event', {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(result => result.json())
    .then(result => {
      if (result.state) {
        return result.data.map(event => ({
          ...event,
          id: event._id // Utiliza el _id devuelto por el servidor como el id único para cada evento
        }));
      }
      throw new Error('No se pudo cargar los eventos');
    });
};


const Table = ({ flag, setFlag }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true); // Nuevo estado para indicar si se están cargando los datos

  const loadEvents = () => {
    setLoading(true); // Establecer el estado de carga en true mientras se cargan los eventos
    findAllEvents()
      .then((result) => {
        setEvents(result);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false)); // Establecer el estado de carga en false después de cargar los eventos
    setFlag(false);
  };

  useEffect(() => {
    loadEvents();
  }, [flag]);


  return (
    <div className="card" >
      {loading ? ( // Mostrar un mensaje de carga mientras se están cargando los datos
        <div>Cargando...</div>
      ) : (
        <DataTable
          value={events}
          tableStyle={{ minWidth: "50rem" }}
          sortField="id"
          sortOrder={1}
        >
          <Column field="id" header="ID" ></Column >
          <Column field="name" header="Nombre"></Column>
          <Column field="date" header="Fecha"></Column>
          <Column field="site" header="Lugar"></Column>
          <Column field="city" header="Ciudad"></Column>
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

      )}
      <Dialog
        header="Editar Evento"
        visible={false} // Asegúrate de manejar la visibilidad correctamente
        modal={false}
        style={{ width: "50vw" }}
        onHide={() => { }} // Implementa la lógica para ocultar el diálogo
      ></Dialog>
    </div>
  );
};

export default Table;
