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
      alert("Doctor added successfully");
      form.reset();
      loadDoctors();
    } catch (error) {
      console.error("Error adding doctor:", error);
      alert("Failed to add doctor");
    }
  });

  // Load doctors
  async function loadDoctors() {
    doctorList.innerHTML = '<p class="text-sm text-gray-500">Loading...</p>';

    try {
      const snapshot = await getDocs(collection(db, 'doctors'));
      doctorList.innerHTML = ''; // clear again after data fetched

      if (snapshot.empty) {
        doctorList.innerHTML = '<p class="text-gray-500">No doctors found.</p>';
        return;
      }

      snapshot.forEach(docSnap => {
        const data = docSnap.data();
        const item = document.createElement('div');
        item.className = "p-4 bg-gray-50 border rounded-lg shadow flex justify-between items-center mb-3";

        item.innerHTML = `
          <div>
            <p class="font-semibold text-blue-800"><i class="fas fa-user-md mr-1"></i> ${data.name}</p>
            <p class="text-sm text-gray-600">Specialty: ${data.specialty}</p>
            <p class="text-xs text-gray-400">ID: ${docSnap.id}</p>
          </div>
          <button data-id="${docSnap.id}" class="deleteBtn bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm">
            <i class="fas fa-trash-alt"></i>
          </button>
        `;

        doctorList.appendChild(item);
      });

      // Add delete listeners
      document.querySelectorAll('.deleteBtn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const id = btn.dataset.id;
          if (confirm("Delete this doctor?")) {
            try {
              await deleteDoc(doc(db, 'doctors', id));
              loadDoctors();
            } catch (err) {
              alert("Failed to delete doctor");
              console.error(err);
            }
          }
        });
      });

    } catch (err) {
      console.error("Error loading doctors:", err);
      doctorList.innerHTML = '<p class="text-red-500">Failed to load doctors.</p>';
    }
  }

  // Initial load
  loadDoctors();

}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});
