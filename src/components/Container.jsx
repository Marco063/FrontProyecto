import React, { useState } from "react";
import App from "./App"; // Importa el componente App
import Events from "./Events"; // Importa el componente Events

const Container = () => {
  const [flag, setFlag] = useState(false);
  
  return (
    <>
      <App setFlag={setFlag} /> {/* Renderiza el componente App dentro del contenedor */}
      <Events flag={flag} setFlag={setFlag} /> {/* Renderiza el componente Events dentro del contenedor */}
    </>
  );
};

export default Container;
