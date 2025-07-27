import { db } from './firebase.js';
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";
import { requireAuth } from './authGuard.js';

requireAuth('admin').then(({ user }) => {
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
}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});