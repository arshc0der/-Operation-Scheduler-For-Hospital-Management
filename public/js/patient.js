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
const form = document.getElementById('patientForm');
const patientList = document.getElementById('patientList');

// Add new patient
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const age = document.getElementById('age').value.trim();

  if (!name || !age) return alert("Please fill all fields");

  try {
    await addDoc(collection(db, 'patients'), { name, age });
    alert("Patient added");
    form.reset();
    loadPatients();
  } catch (error) {
    console.error("Error adding patient:", error);
    alert("Failed to add patient");
  }
});

// Load patients and show with delete option
async function loadPatients() {
  patientList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'patients'));

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement('div');
    item.className = "p-4 bg-gray-50 border rounded-lg shadow flex justify-between items-center";

    item.innerHTML = `
      <div class="w-full">
        <p class="font-semibold text-green-800 mb-1">
          <i class="fas fa-procedures"></i> ${data.name}
        </p>
        <p class="text-sm text-gray-600 mb-1">Age: ${data.age}</p>
        <input type="text" readonly class="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded w-full" value="ID: ${docSnap.id}" />
      </div>
      <button data-id="${docSnap.id}" class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm ml-4">
        <i class="fas fa-trash"></i>
      </button>
    `;

    patientList.appendChild(item);
  });

  // Attach delete handlers
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm("Delete this patient?")) {
        try {
          await deleteDoc(doc(db, 'patients', id));
          loadPatients();
        } catch (error) {
          alert("Error deleting patient.");
          console.error(error);
        }
      }
    });
  });
}

loadPatients();

}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});