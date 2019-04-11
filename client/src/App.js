import React from "react";
import "./App.css";
import FileUploader from "./components/FileUploader";

const App = () => (
  <div className="container mt-4">
    <h4 className="display-4 text-center mb-4">
      <i className="fab fa-react" />
      React File Upload
    </h4>
    <FileUploader />
  </div>
);

export default App;
