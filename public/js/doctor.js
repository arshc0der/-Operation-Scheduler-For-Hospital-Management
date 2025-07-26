import { db } from './firebase.js';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';

const form = document.getElementById('doctorForm');
const doctorList = document.getElementById('doctorList');

// Add doctor
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const specialty = document.getElementById('specialty').value.trim();

  if (!name || !specialty) return alert("Please fill all fields");

  try {
    await addDoc(collection(db, 'doctors'), { name, specialty });
    alert("Doctor added");
    form.reset();
    loadDoctors();
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("Failed to add doctor");
  }
});

// Load doctors
async function loadDoctors() {
  doctorList.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'doctors'));
  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const item = document.createElement('div');
    item.className = "p-4 bg-gray-50 border rounded-lg shadow flex justify-between items-center";

    item.innerHTML = `
      <div>
        <p class="font-semibold text-blue-800"><i class="fas fa-user-md"></i> ${data.name}</p>
        <p class="text-sm text-gray-600">Specialty: ${data.specialty}</p>
        <p class="text-xs text-gray-400">ID: ${docSnap.id}</p>
      </div>
      <button data-id="${docSnap.id}" class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
        <i class="fas fa-trash"></i>
      </button>
    `;

    doctorList.appendChild(item);
  });

  // Add delete listeners
  document.querySelectorAll('.deleteBtn').forEach(btn => {
    btn.addEventListener('click', async () => {
      const id = btn.dataset.id;
      if (confirm("Delete this doctor?")) {
        await deleteDoc(doc(db, 'doctors', id));
        loadDoctors();
      }
    });
  });
}

loadDoctors();
