import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDHX2uEG26SLuYbPu2CBBYRXtb_WlpcDIQ",
  authDomain: "my-reads-app-redux.firebaseapp.com",
  databaseURL: "https://my-reads-app-redux-default-rtdb.firebaseio.com",
  projectId: "my-reads-app-redux",
  storageBucket: "my-reads-app-redux.appspot.com",
  messagingSenderId: "337935905383",
  appId: "1:337935905383:web:c80044dbfd688eb55f5ac2",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
