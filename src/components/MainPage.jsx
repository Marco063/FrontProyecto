import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsPeople, BsCalendar, BsClock, BsShield } from "react-icons/bs";
import "./MainPage.css"; // Archivo de estilos personalizados



function MainPage() {
  return (
    
    <div className="container" >
    <div className="card-body text-center">
      <h1 className="card-title font-family mb-4">Bienvenidos al Servicio de Manejo del Club Deportivo</h1>
      <p className="mi-clase-truculenta">
        En este apartado, podrás realizar consultas, agregar, eliminar y modificar eventos, afiliados, asistencias y disciplinas. 
        Descubre todas las funcionalidades disponibles a continuación:
      </p>
    </div>

      <div className="row mt-5">
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="card">
            <div className="card-body text-center">
              <BsPeople size={50} className="card-icon text-primary" />
              <h5 className="card-title">Afiliados</h5>
              <p className="card-text">Administar afiliados.</p>
              <a href="/affiliate" className="btn btn-primary btn-icon">Ver Afiliados</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="card">
            <div className="card-body text-center">
              <BsCalendar size={50} className="card-icon text-danger" />
              <h5 className="card-title">Eventos</h5>
              <p className="card-text">Administar eventos.</p>
              <a href="/Events" className="btn btn-danger btn-icon">Ver Eventos</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="card">
            <div className="card-body text-center">
              <BsClock size={50} className="card-icon text-success" />
              <h5 className="card-title">Asistencias</h5>
              <p className="card-text">Administar asistencias.</p>
              <a href="/attendance" className="btn btn-success btn-icon">Ver Asistencias</a>
            </div>
          </div>
        </div>
        <div className="col-md-3 d-flex justify-content-center align-items-center">
          <div className="card">
            <div className="card-body text-center">
              <BsShield size={50} className="card-icon text-warning" />
              <h5 className="card-title">Disciplinas</h5>
              <p className="card-text">Administar disciplinas.</p>
              <a href="/discipline" className="btn btn-warning btn-icon">Ver Disciplinas</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
