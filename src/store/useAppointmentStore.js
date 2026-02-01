import {create} from "zustand";

const useAppointmentStore = create((set) => ({
  // Initial state
  selectedSpecialty: null,
  selectedDoctor: null,
  selectedDate: null,
  selectedSlot: null,
  step: 1, // To control which part of the form the user is in

  // Actions to update the state
  setSpecialty: (specialty) =>
    set({
      selectedSpecialty: specialty,
      selectedDoctor: null, // Reset dependents if specialty changes
      selectedSlot: null,
      step: 2,
    }),

  setDoctor: (doctor) =>
    set({
      selectedDoctor: doctor,
      selectedSlot: null,
      step: 3,
    }),

  setDate: (date) => set({selectedDate: date}),

  setSlot: (slot) => set({selectedSlot: slot, step: 4}),

  setStep: (step) => set({step}),

  // Clean everything after successfully confirming the appointment
  resetAppointment: () =>
    set({
      selectedSpecialty: null,
      selectedDoctor: null,
      selectedDate: null,
      selectedSlot: null,
      step: 1,
    }),
}));

export default useAppointmentStore;
