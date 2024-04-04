import React from "react";
import { Menubar } from "primereact/menubar";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../NavBar.css"; // Importa tu archivo CSS personalizado

const NavBar = () => {
  const items = [
    {
      id: "home",
      label: "Inicio",
      icon: "pi pi-home",
      url: "/",
    },
    {
      id: "events",
      label: "Eventos",
      icon: "pi pi-calendar",
      url: "/events",
    },
    {
      id: "discipline",
      label: "Disciplinas",
      icon: "pi pi-book",
      url: "/discipline",
    },
    {
      id: "affiliate",
      label: "Afiliados",
      icon: "pi pi-users",
      url: "/affiliate",
    },
    {
      id: "attendance",
      label: "Asistencias",
      icon: "pi pi-check",
      url: "/attendance",
    },
  ];

  return (
    

    <div className="card">
      <div className="menu-bar">
        <span className="menu-title">Menú</span>
        <Menubar model={items} />
      </div>
    </div>
  );
};

export default NavBar;
