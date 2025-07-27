import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { requireAuth } from './authGuard.js';

requireAuth('admin').then(({ user }) => {
const form = document.getElementById('scheduleForm');
const scheduleList = document.getElementById('scheduleList');

// Submit schedule
form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const schedule = {
    doctorId: document.getElementById('doctorId').value.trim(),
    doctorName: document.getElementById('doctorName').value.trim(),
    patientId: document.getElementById('patientId').value.trim(),
    patientName: document.getElementById('patientName').value.trim(),
    date: document.getElementById('date').value,
    time: document.getElementById('time').value,
    anesthesiaType: document.getElementById('anesthesiaType').value.trim(),
    anesthesiologist: document.getElementById('anesthesiologist').value.trim(),
    materials: document.getElementById('materials').value.trim()
  };

  try {
    await addDoc(collection(db, 'schedules'), schedule);
    alert("Schedule added");
    form.reset();
    loadSchedules();
  } catch (err) {
    alert("Failed to add schedule");
    console.error(err);
  }
});

// Load and display schedules
async function loadSchedules() {
  scheduleList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'schedules'));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const div = document.createElement('div');
    div.className = "p-4 border bg-gray-50 rounded-lg shadow flex justify-between items-start";

    div.innerHTML = `
      <div>
        <p class="font-semibold text-blue-700 mb-1"><i class="fas fa-user-md"></i> Dr. ${data.doctorName}</p>
        <p class="text-sm text-gray-700">Patient: ${data.patientName}</p>
        <p class="text-sm text-gray-600">Date: ${data.date} | Time: ${data.time}</p>
        <p class="text-sm text-gray-500">Anesthesia: ${data.anesthesiaType || '-'}</p>
        <p class="text-xs text-gray-400 mt-1">Materials: ${data.materials || '-'}</p>
        <p class="text-xs text-gray-300">Schedule ID: ${docSnap.id}</p>
      </div>
      <button data-id="${docSnap.id}" class="deleteBtn bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
        <i class="fas fa-trash-alt"></i>
      </button>
    `;

    scheduleList.appendChild(div);
  });

  // Delete listeners
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm("Delete this schedule?")) {
        await deleteDoc(doc(db, 'schedules', id));
        loadSchedules();
      }
    });
  });
}

// Initial load
loadSchedules();
}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});