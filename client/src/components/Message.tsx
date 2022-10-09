import React from "react";
import { MdError } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Store } from "../redux/types";

function Message() {
  const authState = useSelector((state: Store) => state.authState);
  const errorMessageState = useSelector(
    (state: Store) => state.errorMessageState
  );
  const successMessageState = useSelector(
    (state: Store) => state.successMessageState
  );

  return (
    <>
      {errorMessageState && (
        <div className="message" style={{ backgroundColor: "#FDEDEE" }}>
          <MdError style={{ color: "#F04D62" }} />
          <p>{authState?.authMsg}</p>
        </div>
      )}
      {successMessageState && (
        <div className="message" style={{ backgroundColor: "#EBFBF6" }}>
          <MdError style={{ color: "#34D39D" }} />
          <p>{authState?.authMsg}</p>
        </div>
      )}
    </>
  );
}

export default Message;
