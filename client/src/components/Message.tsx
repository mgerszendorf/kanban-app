import React from "react";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { Store } from "../redux/types";

function Message() {
  const messageState = useSelector((state: Store) => state.messageState.value);

  return (
    <>
      {messageState?.type === "Error" && (
        <div className="message" style={{ backgroundColor: "#FDEDEE" }}>
          <MdError style={{ color: "#F04D62" }} />
          <p>{messageState?.message}</p>
        </div>
      )}
      {messageState?.type === "Success" && (
        <div className="message" style={{ backgroundColor: "#EBFBF6" }}>
          <MdError style={{ color: "#34D39D" }} />
          <p>{messageState?.message}</p>
        </div>
      )}
    </>
  );
}

export default Message;
