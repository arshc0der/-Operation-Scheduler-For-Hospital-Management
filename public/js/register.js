import { auth, db } from './firebase.js';
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;
    await setDoc(doc(db, 'users', uid), {
      email: email,
      role: 'user'
    });
    alert('Registered! You can now login.');
    window.location.href = '/index.html';
  } catch (error) {
    alert(error.message);
  }
});
