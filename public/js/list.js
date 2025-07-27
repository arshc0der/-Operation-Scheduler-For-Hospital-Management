import { db } from './firebase.js';
import {
  collection,
  getDocs
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { requireAuth } from './authGuard.js';

requireAuth('user').then(({ user }) => {
const doctorList = document.getElementById('doctorList');

async function loadDoctors() {
  const snapshot = await getDocs(collection(db, 'doctors'));
  doctorList.innerHTML = '';

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const card = document.createElement('div');
    card.className =
      "bg-white border border-gray-200 rounded-xl shadow p-4 hover:shadow-lg hover:border-green-400 transition";

    card.innerHTML = `
      <div class="flex items-center gap-3 mb-2">
        <i class="fas fa-user-md text-green-500 text-2xl"></i>
        <h3 class="text-lg font-semibold text-green-700">${data.name}</h3>
      </div>
      <p class="text-gray-600 text-sm"><i class="fas fa-stethoscope text-gray-500 mr-1"></i> Specialty: ${data.specialty}</p>
    `;

    doctorList.appendChild(card);
  });
}

loadDoctors();
}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});