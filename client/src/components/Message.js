import React from "react";

const Message = props => {
  return (
    <div className={`alert alert-${props.color}`} role="alert">
      {props.message}
    </div>
  );
};

export default Message;
