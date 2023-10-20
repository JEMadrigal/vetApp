import { initializeApp } from "firebase/app";
import { sendPasswordResetEmail } from 'firebase/auth';
import { getFirestore, doc, getDoc, addDoc, collection, Timestamp, getDocs, updateDoc } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyB2zQ8ZRSTj1nK6rV2t2k9LHpJsR6eQIug",
  authDomain: "vetapp-39e89.firebaseapp.com",
  projectId: "vetapp-39e89",
  storageBucket: "vetapp-39e89.appspot.com",
  messagingSenderId: "33017882742",
  appId: "1:33017882742:web:badb41eaf9ce951c34d757"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();

// Función para registrar un usuario
export const registerUser = (email, password) => {
    const auth = getAuth();
    return createUserWithEmailAndPassword(auth, email, password);
};
  
  // Función para iniciar sesión
export const loginUser = (email, password) => {
    const auth = getAuth();
    return signInWithEmailAndPassword(auth, email, password);
};

// Función para cerrar sesión
export const logoutUser = () => {
    const auth = getAuth();
    return signOut(auth);
};

// Función para obtener todos los anuncios desde Firestore
export const getAnimalInformation = async () => {
    const tasksCollection = collection(db, "animals");
    const querySnapshot = await getDocs(tasksCollection);
    const tasks = [];
  
    querySnapshot.forEach((doc) => {
      tasks.push({ id: doc.id, ...doc.data() });
    });
  
    return tasks;
};

export const createNewAnimal = async (animalData) => {
  const anunciosCollection = collection(db, "animals");
  try {
    await addDoc(anunciosCollection, {
      name: animalData.name,
      age: animalData.age,
      weight: animalData.weight,
    });
    console.log("Animal guardado exitosamente.");
  } catch (error) {
    console.error("Error al guardar el animal:", error);
    throw error;
  }
};

