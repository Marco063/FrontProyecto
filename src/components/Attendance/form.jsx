import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";

const saveAttendance = (attendanceData, setFlag, setVisible) => {
    fetch(`https://back-proyecto.vercel.app/attendance`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attendanceData),
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
            console.error("Error al crear la asistencia:", error);
            alert("Error al crear la asistencia. Por favor, inténtalo de nuevo.");
        });
};

const Form = ({ setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [position, setPosition] = useState(0);
    const [affiliate, setAffiliate] = useState(null);
    const [affiliates, setAffiliates] = useState([]);
    const [event, setEvent] = useState(null);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetchAffiliate();
        fetchEvents();
    }, []);

    const fetchAffiliate = () => {
        fetch("https://back-proyecto.vercel.app/affiliate")
            .then((response) => response.json())
            .then((data) => {
                setAffiliates(data.data);
            })
            .catch((error) => {
                console.error("Error fetching affiliate:", error);
            });
    };

    const fetchEvents = () => {
        fetch("https://back-proyecto.vercel.app/event")
            .then((response) => response.json())
            .then((data) => {
                setEvents(data.data);
            })
            .catch((error) => {
                console.error("Error fetching disciplines:", error);
            });
    };

    const handleSaveAttendance = () => {
        if (!isNaN(position) && position !== null && position !== 0) {
            const affiliateData = {
                position: Number(position),
                eventId: String(event ? event._id : null),
                affiliateId: String(affiliate ? affiliate._id : null)
            };
            saveAttendance(affiliateData, setFlag, setVisible);

            setPosition(0);
            setAffiliate(null);
            setEvent(null);
        } else {
            alert("La posición es inválida");
        }
    };

    return (
        <>
            <Button
                label="Agregar Asistencia"
                icon="pi pi-plus"
                onClick={() => setVisible(true)}
            />
            <Dialog
                header="Agregar Asistencia"
                visible={visible}
                modal={false}
                style={{ width: "50vw" }}
                onHide={() => setVisible(false)}
            >
                <div className="card flex justify-content-center">
                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-check"></i>
                        </span>
                        <InputText value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Posición" />
                    </div>



                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <Dropdown
                            optionLabel="document"
                            value={affiliate}
                            options={affiliates}
                            onChange={(e) => setAffiliate(e.value)}
                            placeholder="Seleccionar Afiliado"
                        />
                    </div>

                    <div className="p-inputgroup flex-1">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-book"></i>
                        </span>
                        <Dropdown
                            optionLabel="name"
                            value={event}
                            options={events}
                            onChange={(e) => setEvent(e.value)}
                            placeholder="Seleccionar Evento"
                        />
                    </div>
                </div>
                <br />
                <div className="p-d-flex p-jc-end">
                    <Button
                        label="Aceptar"
                        icon="pi pi-check"
                        onClick={handleSaveAttendance}
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
