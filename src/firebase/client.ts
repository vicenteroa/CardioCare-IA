import { initializeApp } from 'firebase/app'

// Tus credenciales de la aplicación web
const firebaseConfig = {
  apiKey: 'AIzaSyDQrE5TjzQl63pJdP1AAtoKz1OSCqi3q1k',
  authDomain: 'cardiocare-ia.firebaseapp.com',
  projectId: 'cardiocare-ia',
  storageBucket: 'cardiocare-ia.appspot.com',
  messagingSenderId: '907490321914',
  appId: '1:907490321914:web:379272b9298c85b7bd3043',
  measurementId: 'G-28Y51VB76D'
}

// Inicializa Firebase
export const app = initializeApp(firebaseConfig)
