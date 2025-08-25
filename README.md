
---

# 🏥 Operation Scheduler For Hospital Management

[![License](https://img.shields.io/github/license/arshc0der/Operation-Scheduler-For-Hospital-Management?color=blue)](LICENSE)
[![GitHub Repo stars](https://img.shields.io/github/stars/arshc0der/Operation-Scheduler-For-Hospital-Management?style=social)](https://github.com/arshc0der/Operation-Scheduler-For-Hospital-Management/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/arshc0der/Operation-Scheduler-For-Hospital-Management?style=social)](https://github.com/arshc0der/Operation-Scheduler-For-Hospital-Management/network)
[![Open Issues](https://img.shields.io/github/issues/arshc0der/Operation-Scheduler-For-Hospital-Management)](https://github.com/arshc0der/Operation-Scheduler-For-Hospital-Management/issues)
[![Last Commit](https://img.shields.io/github/last-commit/arshc0der/Operation-Scheduler-For-Hospital-Management)](https://github.com/arshc0der/Operation-Scheduler-For-Hospital-Management/commits/main)
[![Maintained](https://img.shields.io/maintenance/yes/2025)]()
[![Made With](https://img.shields.io/badge/Made%20With-JavaScript-yellow)]()
[![Firebase](https://img.shields.io/badge/Backend-Firebase-orange)]()
[![Tailwind CSS](https://img.shields.io/badge/Style-TailwindCSS-blue)]()
[![Responsive](https://img.shields.io/badge/Responsive-Yes-brightgreen)]()
[![Status](https://img.shields.io/badge/Project-Complete-success)]()
[![Website](https://img.shields.io/website?down_color=red&down_message=offline&up_color=green&up_message=live&url=https%3A%2F%2Ffirebase.google.com)]()
[![Deployed](https://img.shields.io/badge/Deployed-Firebase%20Hosting-success)]()
[![JavaScript](https://img.shields.io/badge/Language-JavaScript-yellow)]()
[![HTML](https://img.shields.io/badge/Markup-HTML5-red)]()
[![CSS](https://img.shields.io/badge/Style-CSS3-blue)]()
[![Open Source](https://img.shields.io/badge/Open%20Source-Yes-brightgreen)]()
[![Contribution](https://img.shields.io/badge/Contributions-Welcome-lightgrey)]()
[![Security](https://img.shields.io/badge/Security-Firestore%20Rules-important)]()
[![GitHub Repo Size](https://img.shields.io/github/repo-size/arshc0der/Operation-Scheduler-For-Hospital-Management)]()

---

## 📖 About the Project

The **Operation Scheduler for Hospital Management** is a web-based system built using Firebase, HTML, CSS (Tailwind), and JavaScript. It allows hospitals to efficiently manage:

- 🔐 Secure authentication for Admin and Users
- 👨‍⚕️ Doctor and Patient records
- 🕒 Scheduling of surgeries and OT activities
- 📃 Uploading surgical reports (if needed)
- 📊 Viewing schedules dynamically

Built with minimal UI and maximum functionality in mind — no frameworks required.

## 🚀 Features

### 👨‍⚕️ Admin Module

- Admin Login
- Manage Doctor Details
- Manage Patient Details
- Post Operation Schedule Details
- Analyze OT activity and efficiency
- Monitor material/resource use for planned procedures

### 🧑‍💻 User Module

- User Registration & Login
- View Doctor Information
- View Surgical Details
- Access OT schedules (past and upcoming)

---

## 🗂️ Surgery Scheduling Includes

Each surgery entry includes:

- Date and Time of Surgery
- Operation Theater (OT) ID
- Anesthesia Type & Anesthesiologist Name
- Primary Surgeon and Assistant (if any)
- Operating Room Nurses
- Pre- and Post-operative Event Logs
- Surgical Reports (Charts, Transcriptions)
- Surgeon Remarks
- Required Materials, Drugs, and Instruments

---

## 📆 Dynamic OT Activity Interface

- Real-time OT activity board
- Emergency updates and instant rescheduling
- OT activity log dashboard
- Daily, weekly, and monthly schedule views

---


## 🔧 Firebase Setup

To get started with Firebase:

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a project
3. Enable the following:
   - 🔑 **Authentication** → Sign-in method → Enable **Email/Password**
   - 🗃️ **Cloud Firestore** → Start in **Production Mode**
   - ☁️ (Optional) **Storage** → Enable if you want to upload reports/files

4. Create your Firestore structure:
   - Collection: `users`
     - Document ID: `UID` (auto created on register)
     - Fields:
       - `email`: string
       - `role`: `'admin'` or `'user'`

---

## 🔐 Firebase Config Setup

Create a file called **`public/env.js`** with your Firebase app credentials:

```js
window.firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
````

---

## 📁 File Structure

```
📦 hospital-ot-scheduler/
├── public/
│   ├── index.html
│   ├── dashboard_admin.html
│   ├── dashboard_user.html
│   ├── doctor.html
│   ├── patient.html
│   ├── schedule.html
│   ├── view.html
│   ├── register.html
│   ├── 404.html
│   ├── js/
│   │   ├── auth.js
│   │   ├── register.js
│   │   ├── doctor.js
│   │   ├── patient.js
│   │   ├── schedule.js
│   │   ├── view.js
│   │   └── firebase.js
│   └── env.js 🔒 (DO NOT COMMIT)
├── .firebaserc
├── firebase.json
├── firestore.rules
├── storage.rules (if you're using storage)
├── README.md
└── .gitignore
```

---

## 🚀 Run Locally

```bash
npm install -g firebase-tools

firebase login
firebase init
firebase serve
```

Then visit: [http://localhost:5000](http://localhost:5000)

---

## 📤 Deploy to Firebase Hosting

```bash
firebase deploy
```

---

## 📸 Screenshots

> (You can include screenshots here to show UI, if desired)

---
## 🛡️ Code Quality

This project follows best practices to ensure:

- ✅ **Modular Code**  
- ✅ **Safe Execution**  
- ✅ **Testable Functions**  
- ✅ **Maintainability**  
- ✅ **Portability Across OS**  

All actions are logged using JavaScript logging mechanisms.

## 🙌 Contributing

Pull requests and contributions are welcome!
Please open an issue or PR for improvements or suggestions.

---

## 📜 License

This project is open-sourced under the [MIT License](LICENSE).

---

### 💬 Need Help?

Create a GitHub issue

---
