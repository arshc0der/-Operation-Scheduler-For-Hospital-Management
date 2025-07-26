import { db } from './firebase.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

// Elements
const doctorCount = document.getElementById('doctorCount');
const patientCount = document.getElementById('patientCount');
const scheduleCount = document.getElementById('scheduleCount');

// Count documents
async function countDocs(colName, element) {
  try {
    const snapshot = await getDocs(collection(db, colName));
    element.textContent = snapshot.size;
  } catch (error) {
    console.error(`Error counting ${colName}:`, error);
    element.textContent = '0';
  }
}

// Load all counts
countDocs('doctors', doctorCount);
countDocs('patients', patientCount);
countDocs('schedules', scheduleCount);
