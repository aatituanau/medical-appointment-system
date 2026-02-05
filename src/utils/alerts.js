import Swal from "sweetalert2";

// Centralized SweetAlert helpers to keep UX consistent.
export const showAlertConfirm = async (title, text) => {
  const result = await Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí",
    cancelButtonText: "Cancelar",
    confirmButtonColor: "#d33",
    cancelButtonColor: "#64748b",
    reverseButtons: true,
    focusCancel: true,
  });

  return result.isConfirmed;
};

export const showSuccessToast = (title) =>
  Swal.fire({
    icon: "success",
    title,
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 2500,
    timerProgressBar: true,
  });

export const showErrorAlert = (title, text = "") =>
  Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonColor: "#1d4ed8",
  });
