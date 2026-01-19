export const getSpecialtyIcon = (specialtyName) => {
  const icons = {
    OFTALMOLOGIA: "visibility",
    "MEDICINA INTERNA": "home_health",
    "MEDICINA FAMILIAR": "family_restroom",
    "GINECOLOGIA Y OBSTETRICIA": "pregnant_woman",
    TRAUMATOLOGIA: "healing",
    DIABETOLOGIA: "monitor_weight",
    "PSICOLOGÍA INFANTIL Y CLÍNICA": "psychology",
    PEDIATRÍA: "child_care",
    ODONTOLOGÍA: "health_and_safety",
    OTORRINOLARINGOLOGÍA: "hearing",
    "CIRUGIA GENERAL": "content_cut",
    DERMATOLOGÍA: "face",
    default: "medical_services",
  };

  // search the icon by specialty name in uppercase
  const nameKey = specialtyName?.toUpperCase() || "DEFAULT";
  return icons[nameKey] || icons["default"];
};
