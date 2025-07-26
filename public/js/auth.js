import { auth, db } from './firebase.js';
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    // Step 1: Sign in with Firebase Auth
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    // Step 2: Get Firestore document from `users` collection
    const userDocRef = doc(db, 'users', uid);
    const userDoc = await getDoc(userDocRef);

    // ✅ Step 3: Check if document exists
    if (!userDoc.exists()) {
      alert("No user role found in Firestore. Please contact admin.");
      return;
    }

    // Step 4: Check user role
    const role = userDoc.data().role;

    if (role === 'admin') {
      window.location.href = '/dashboard_admin.html';
    } else {
      window.location.href = '/dashboard_user.html';
    }

  } catch (error) {
    document.getElementById('loginError').textContent = error.message;
    document.getElementById('loginError').classList.remove('hidden');
  }
});
