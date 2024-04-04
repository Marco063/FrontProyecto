import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { InputNumber } from "primereact/inputnumber";

const updateAttendance = (id, data) => {
    console.log(id);
    console.log(data);
    return fetch(`https://back-proyecto.vercel.app/attendance/${id}`, {
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

const EditAttendance = ({ rowData, setFlag }) => {
    const [visible, setVisible] = useState(false);
    const [id, setID] = useState(0);
    const [position, setPosition] = useState(0);
    useEffect(() => {
        setID(rowData._id);
        setPosition(rowData.position);
    }, [rowData]);


    const handleEditAffiliate = () => {
        const attendanceData = {
            position: position,
        };

        updateAttendance(id, attendanceData)
            .then((result) => {
                alert("Afiliado actualizado exitosamente");
                setFlag(true);
                setVisible(false);
            })
            .catch((error) => alert(error));
    };

    return (
        <div >
            <Button
                label="Editar"
                icon="pi pi-user-edit"
                severity="warning"
                onClick={() => setVisible(true)}
            />
            <Dialog
                header="Editar Asistencia"
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
                        <InputText value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Posicion" />
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

export default EditAttendance;
