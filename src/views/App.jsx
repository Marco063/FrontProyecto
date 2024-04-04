import { useState } from "react";

import MainPage from "../components/MainPage";

function App() {
  const [ setFlag] = useState(false);

  return (
    <>
    <MainPage setFlag={setFlag}/>
     
    </>
  );
}

export default App;
