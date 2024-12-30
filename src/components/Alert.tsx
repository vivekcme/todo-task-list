import React from "react";
import Swal from "sweetalert2";

interface AlertProps {
  message: string;
  isSuccess: boolean;
}
export const showAlert = ({ message, isSuccess }: AlertProps) => {
  return Swal.fire({
    title: message,
    text: `Your action was ${isSuccess ? "Successful" : "Unsuccessful"}`,
    icon: isSuccess ? "success" : "error",
    confirmButtonText: "OK",
  });
};

export const showYesNoPopup = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "Do you want to proceed with this action?",
    icon: "question",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
  });
};
