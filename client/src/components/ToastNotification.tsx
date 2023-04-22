import React from "react";
import { MdError } from "react-icons/md";
import { useSelector } from "react-redux";
import { Store } from "../redux/types";

function ToastNotification() {
  const toastNotificationState = useSelector((state: Store) => state.toastNotificationState.value);

  return (
    <>
      {toastNotificationState?.type === "Error" && (
        <div className="toast-notification" style={{ backgroundColor: "#FDEDEE" }}>
          <MdError style={{ color: "#F04D62" }} />
          <p>{toastNotificationState?.message}</p>
        </div>
      )}
      {toastNotificationState?.type === "Success" && (
        <div className="toast-notification" style={{ backgroundColor: "#EBFBF6" }}>
          <MdError style={{ color: "#34D39D" }} />
          <p>{toastNotificationState?.message}</p>
        </div>
      )}
    </>
  );
}

export default ToastNotification;
