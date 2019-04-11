import React, { Fragment, useState } from "react";
import axios from "axios";

import Message from './Message';

const FileUploader = () => {
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose file");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState({
    msg: '',
    color: ''
  });

  const handleChange = event => {
    setFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  const handleSubmit = async event => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-type": "multipart/form-data"
        }
      });
      const { fileName, filePath } = res.data;
      setUploadedFile({ fileName, filePath });
      setMessage({
        msg: 'File Uploaded',
        color: 'success'
      })
    } catch (err) {
      if (err.response.status === 500) {
        setMessage({
          msg: "There was a problem with the server",
          color: 'danger'
        });
      } else {
        setMessage({
          msg:err.response.data.msg,
          color: 'danger'
        });
      }
    }
  };

  return (
    <Fragment>
      {message ? <Message color={message.color} message={message.msg} /> : null}
      <form onSubmit={handleSubmit}>
        <div className="custom-file mb-4">
          <input
            type="file"
            className="custom-file-input"
            id="customFile"
            onChange={handleChange}
          />
          <label className="custom-file-label" htmlFor="customFile">
            {filename}
          </label>
        </div>
        <input
          type="submit"
          value="Upload"
          className="btn btn-primary btn-block mt-4 "
        />
      </form>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <img
              style={{ width: "100%" }}
              src={uploadedFile.filePath}
              alt={uploadedFile.fileName}
            />
          </div>
        </div>
      ) : (
        null
      )}
    </Fragment>
  );
};

export default FileUploader;
