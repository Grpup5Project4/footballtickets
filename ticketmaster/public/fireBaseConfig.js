import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
  import { getDatabase,ref,set } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
  function StartFirebase(){
    const firebaseConfig = {
        apiKey: "AIzaSyDuwvkYgioHBYmdj9DFjxeDGsrU0mX5gaU",
        authDomain: "sportstest-cce07.firebaseapp.com",
        databaseURL: "https://sportstest-cce07-default-rtdb.firebaseio.com",
        projectId: "sportstest-cce07",
        storageBucket: "sportstest-cce07.appspot.com",
        messagingSenderId: "711166032395",
        appId: "1:711166032395:web:5ea52359588f844645650e"
      };
  

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
 return getDatabase(app);
}

export default StartFirebase;



