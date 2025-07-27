import { db } from './firebase.js';
import {
  getDocs,
  collection
} from 'https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js';
import { requireAuth } from './authGuard.js';

requireAuth().then(({ user }) => {
const scheduleList = document.getElementById('scheduleList');

async function loadSchedules() {
  const snapshot = await getDocs(collection(db, 'schedules'));
  scheduleList.innerHTML = '';

  snapshot.forEach(docSnap => {
    const data = docSnap.data();
    const card = document.createElement('div');
    card.className =
      "p-5 bg-white border border-gray-200 rounded-xl shadow hover:shadow-lg hover:border-blue-400 transition cursor-pointer";

    card.innerHTML = `
      <h3 class="text-xl font-semibold text-blue-700 mb-1 hover:underline">
        <i class="fas fa-user-md text-blue-500 mr-1"></i>
        <a href="#">Dr. ${data.doctorName}</a>
      </h3>
      <p class="text-sm text-gray-700 mb-1">
        <i class="fas fa-user-injured text-green-600 mr-2"></i>
        Patient: <strong>${data.patientName}</strong>
      </p>
      <p class="text-sm text-gray-700 mb-1">
        <i class="fas fa-calendar-day text-purple-500 mr-2"></i>
        Date: ${data.date} &nbsp; <i class="fas fa-clock text-orange-500 ml-4 mr-2"></i>Time: ${data.time}
      </p>
      <p class="text-sm text-gray-700 mb-1">
        <i class="fas fa-syringe text-red-500 mr-2"></i>
        Anesthesia: ${data.anesthesiaType || 'N/A'}
      </p>
      <p class="text-sm text-gray-600 mt-2">
        <i class="fas fa-toolbox text-gray-500 mr-2"></i>
        Materials: ${data.materials || '—'}
      </p>
    `;

    scheduleList.appendChild(card);
  });
}

loadSchedules();
}).catch(() => {
  document.body.innerHTML = `
    <div class="text-center mt-20 text-red-600 text-lg font-semibold">
      Access denied. Please <a href="/index.html" class="underline text-blue-500">login</a> to continue.
    </div>
  `;
});