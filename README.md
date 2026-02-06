<div align="center">

# 🏥 Hospital del Día – Medical Appointment System

Web app that digitizes the booking flow for Hospital del Día Universitario. Patients can self-manage appointments while admins control doctors, specialties, live schedules, and exportable reports.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-12-FFCA28?logo=firebase&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-38BDF8?logo=tailwindcss&logoColor=white)

</div>

## 📌 Overview

- **Patient module:** Firebase Auth login, search by specialty/doctor, real-time slot protection (RTDB), personal history, and EmailJS notifications.
- **Admin module:** Dashboard metrics (Chart.js), CRUD for doctors/specialties, schedule manager, exportable PDF/XLSX reports, and live status of confirmed/canceled visits.
- **Frontend stack:** React 19 + Vite, React Router, Zustand for global state, React Query for caching/fetching.

## 🚀 Inicio rápido

1. **Clone and enter the project**

   ```bash
   git clone https://github.com/aatituanau/medical-appointment-system
   cd medical-appointment-system
   ```

2. **Install dependencies and create `.env`**

   ```bash
   npm install
   cp .env.example .env
   ```

3. **Fill Firebase + EmailJS credentials** (see sections below) and start dev mode:

   ```bash
   npm run dev
   ```

## ☁️ Architecture (high level)

```
Frontend (Vite + React)
   │
  ├─ Firebase Auth ............ Handles login/roles.
  ├─ Cloud Firestore .......... Stores users, doctors, appointments.
  ├─ Realtime Database ........ Exposes live availability.
  ├─ Firebase Storage ......... Keeps future attachments (optional).
  └─ EmailJS Service .......... Sends confirmations/cancellations.

Frontend internals:
  • React Query caches Firestore/RTDB reads.
  • Zustand syncs shared state (user + local appointments).
  • Custom hooks talk to Firebase and feed the UI.
```

1. UI actions (book, cancel, etc.) update Zustand and send writes to Firestore/RTDB.
2. React Query revalidates after each mutation so dashboards stay fresh.
3. EmailJS triggers from the client when appointments change to notify the patient.

## 🛠️ Tech stack

- **Framework:** React 19 + Vite.
- **UI:** Tailwind CSS 4, internal components, Storybook.
- **Data:** Firebase Auth, Firestore, Realtime Database.
- **State & forms:** Zustand, React Query, React Hook Form + Zod.
- **Utilities:** Chart.js, jsPDF, XLSX, EmailJS, SweetAlert2.

## ⚙️ Detailed setup

1. Create `.env` based on `.env.example`.
2. Follow the **Firebase** and **EmailJS** sections to fill each variable.
3. Run `npm run dev` to confirm connections (Vite console should show "Connected to Firebase").

## 📦 Scripts disponibles

| Script                    | Descripción                                     |
| ------------------------- | ----------------------------------------------- |
| `npm run dev`             | Inicia el servidor de desarrollo Vite.          |
| `npm run build`           | Genera el build optimizado para producción.     |
| `npm run preview`         | Sirve el build generado para pruebas finales.   |
| `npm run lint`            | Ejecuta ESLint sobre todo el código fuente.     |
| `npm run storybook`       | Levanta Storybook en modo desarrollo (UI docs). |
| `npm run build-storybook` | Compila la documentación de componentes.        |

## 🗄️ Database setup

Create a **Firebase** project with: `Authentication`, `Cloud Firestore`, `Realtime Database`, and `Storage` (future attachments).

Minimum Firestore collections:

| Collection     | Purpose                                                 |
| -------------- | ------------------------------------------------------- |
| `users`        | Basic profiles with roles (`admin`, `student`, `user`). |
| `doctors`      | Doctor info, specialty assignment, active status.       |
| `specialties`  | Catalog of hospital services.                           |
| `appointments` | Confirmed/canceled visits and relationships.            |

Realtime Database keeps doctor availability in `schedules/{doctorId}/{date}/{time}`. Apply security rules for your environment.

> ℹ️ Firebase/EmailJS credentials stay private inside `.env`.

## 🔥 Firebase configuration

1. Go to the [Firebase console](https://console.firebase.google.com/) and create a project.
2. Under **Build → Authentication**, enable Email/Password.
3. In **Firestore Database**, create it in production mode and add the minimum collections above.
4. In **Realtime Database**, create it in production mode and add rules for `schedules/{doctorId}/{date}/{time}`.
5. In **Storage**, create a bucket (even for future use) and keep the rules restricted.
6. Add a Web app inside Firebase, copy the SDK config, and fill the table:

| `.env` variable                     | Where to find it in Firebase           |
| ----------------------------------- | -------------------------------------- |
| `VITE_FIREBASE_API_KEY`             | App settings → **apiKey**              |
| `VITE_FIREBASE_AUTH_DOMAIN`         | App settings → **authDomain**          |
| `VITE_FIREBASE_PROJECT_ID`          | App settings → **projectId**           |
| `VITE_FIREBASE_STORAGE_BUCKET`      | App settings → **storageBucket**       |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | App settings → **messagingSenderId**   |
| `VITE_FIREBASE_APP_ID`              | App settings → **appId**               |
| `VITE_FIREBASE_MEASUREMENT_ID`      | Optional Analytics → **measurementId** |

### Recommended rules

**Firestore (`firestore.rules`)**

```javascript
rules_version = '2';

service cloud.firestore {
   match /databases/{database}/documents {
      // Any user (even without a session) can read specialties
      match /specialties/{document=**} {
         allow read: if true;
         allow write: if request.auth != null;
      }

      // The remaining documents require authentication
      match /{document=**} {
         allow read, write: if request.auth != null;
      }
   }
}
```

**Realtime Database (`database.rules.json`)**

```json
{
  "rules": {
    "schedules": {
      ".read": "auth != null",
      ".write": "auth != null"
    }
  }
}
```

## Initial data seed

To quickly fill `specialties` and `doctors`, create a temporary `SeedHospital` component (not part of the repo to avoid accidents). Suggested flow:

1. Create `temp/SeedHospital.jsx` locally with the following code and tweak the dataset:

```jsx
import {db} from "../src/firebase/config";
import {collection, addDoc} from "firebase/firestore";

const hospitalData = [
  // ... shared dataset (specialties + doctors + schedules)
];

const SeedHospital = () => {
  const handleSeed = async () => {
    try {
      console.log("Starting seed...");
      for (const item of hospitalData) {
        await addDoc(collection(db, "specialties"), {
          name: item.name,
          active: true,
          description: `Hospital del Día ${item.name} service.`,
        });

        for (const docInfo of item.docs) {
          await addDoc(collection(db, "doctors"), {
            name: docInfo.n,
            specialty: item.name,
            office: docInfo.c,
            baseSlots: docInfo.h,
            status: "active",
          });
        }
      }
      alert("Firebase updated with real data!");
    } catch (error) {
      console.error(error);
      alert("Seed failed, check console.");
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999]">
      <button
        onClick={handleSeed}
        className="bg-red-600 text-white px-6 py-3 rounded-full font-bold shadow-2xl hover:bg-red-700"
      >
        🚀 LOAD REAL DATA
      </button>
    </div>
  );
};

export default SeedHospital;
```

2. Mount `<SeedHospital />` in your layout, click once, and wait. Running it again will duplicate records.
3. Delete `temp/SeedHospital.jsx` and its import right after seeding.

> Tip: move `hospitalData` to `seed/hospitalData.json` so you can reuse it with Node/Firebase Admin scripts.

Example entry in `hospitalData`:

```json
{
  "name": "OFTALMOLOGIA",
  "docs": [
    {
      "n": "Dra. Juan Perez",
      "c": "5",
      "h": ["12:00", "12:30", "13:00", "13:30"]
    }
  ]
}
```

## ✉️ EmailJS configuration

### Step-by-step activation

1. Go to [EmailJS](https://dashboard.emailjs.com/sign-in) and create a free account.
2. Under **Account → API Keys**, generate your `public_key`.
3. In **Email Services → Add new service**, connect Gmail/Outlook/SMTP and note the `service_id`.
4. In **Email Templates → Create template**, add the placeholders (`patient_name`, `doctor_name`, etc.) and note the `template_id`.
5. Optional: under **Integration → Installation**, use "Send test email" to confirm delivery.
6. Fill the `.env` variables with those values and restart `npm run dev` so Vite reloads them.

| `.env` variable            | Where to find it in EmailJS     |
| -------------------------- | ------------------------------- |
| `VITE_EMAILJS_SERVICE_ID`  | Email Services → Service ID     |
| `VITE_EMAILJS_TEMPLATE_ID` | Email Templates → Template ID   |
| `VITE_EMAILJS_PUBLIC_KEY`  | Account → API Keys → Public Key |

> Tip: send a test from EmailJS before wiring the app so you isolate delivery issues.

### Suggested template

- Placeholders: `student_name`, `specialty`, `doctor_name`, `appointment_date`, `appointment_time`, `office`.
- Subject: `Appointment confirmation – Hospital del Día`.
- Body:

```html
Hola {{student_name}}, Se ha registrado con éxito tu cita médica en nuestra
plataforma. A continuación, te detallamos la información de tu turno: DETALLES
DE LA CITA Especialidad: {{specialty}} Médico: {{doctor_name}} Fecha:
{{appointment_date}} Hora: {{appointment_time}} Ubicación: {{office}}
Indicaciones importantes: 1. Por favor, preséntate 15 minutos antes de la hora
pactada. 2. Lleva tu carnet universitario o cédula de identidad. 3. Recuerde que
si quiere cancelar su cita, debe hacerlo con 24 horas de anticipación. Este es
un mensaje automático, por favor no lo respondas. Administración - Hospital del
Día UCE.
```

### Reference image

<img src="./docs/emailjs-template.png" alt="EmailJS Template" width="520" />

## 🔐 Environment variable summary

```bash
VITE_FIREBASE_API_KEY=""
VITE_FIREBASE_AUTH_DOMAIN=""
VITE_FIREBASE_PROJECT_ID=""
VITE_FIREBASE_STORAGE_BUCKET=""
VITE_FIREBASE_MESSAGING_SENDER_ID=""
VITE_FIREBASE_APP_ID=""
VITE_FIREBASE_MEASUREMENT_ID=""

VITE_EMAILJS_SERVICE_ID=""
VITE_EMAILJS_TEMPLATE_ID=""
VITE_EMAILJS_PUBLIC_KEY=""
```

Without them the app cannot reach Firebase or EmailJS.
