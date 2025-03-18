import React from "react";
import Quiz from "./components/Quiz";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>Cuestionario de SAP Fiori</h1>
      <Quiz />
    </div>
  );
};

export default App;