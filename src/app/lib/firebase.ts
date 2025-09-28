// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Configuração padrão para evitar erros durante o build
const defaultConfig = {
  apiKey: "default-api-key",
  authDomain: "default-project.firebaseapp.com",
  projectId: "default-project",
  storageBucket: "default-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:default",
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || defaultConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || defaultConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || defaultConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || defaultConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || defaultConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || defaultConfig.appId,
};

// Inicializa o Firebase apenas uma vez
let app;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.warn("Firebase initialization failed, using default config:", error);
  app = !getApps().length ? initializeApp(defaultConfig) : getApp();
}

// Inicializa Authentication com persistência local (apenas no cliente)
let auth;
let db;

if (typeof window !== 'undefined') {
  try {
    auth = getAuth(app);
    setPersistence(auth, browserLocalPersistence).catch((error) => {
      console.error("Erro ao configurar persistência:", error);
    });
    db = getFirestore(app);
  } catch (error) {
    console.warn("Firebase auth/db initialization failed:", error);
    // Criar objetos mock para evitar erros durante SSR
    auth = null;
    db = null;
  }
} else {
  // No servidor, usar valores null para evitar erros
  auth = null;
  db = null;
}

export { app, auth, db };