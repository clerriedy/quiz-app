import React from "react";
import { Quiz } from "./components";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-center my-8">
        📚 Cuestionario de SAP Fiori
      </h1>
      <Quiz />
    </div>
  );
};

export default App;