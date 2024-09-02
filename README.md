# DO IT - API

## Running the project

1. Clone the repository by running
   ```bash
   git clone https://github.com/marcoslima12/to-do-app.git
   
2. Create a firebase/fiebase.ts at the root and copy the following content to it:
   
     ```.env
      import { initializeApp } from "firebase/app";
      import { getAuth } from "firebase/auth";
      
      const firebaseConfig = {
        apiKey: "AIzaSyDa_3TxqVfIMzbnw0Au9YwUn68Wf_GSoEg",
        authDomain: "to-do-cd808.firebaseapp.com",
        projectId: "to-do-cd808",
        storageBucket: "to-do-cd808.appspot.com",
        messagingSenderId: "895975438842",
        appId: "1:895975438842:web:9dff5d735d12d6fe578c43",
        measurementId: "G-LLSBLPTG8V",
      };
      
      // Initialize Firebase
      const app = initializeApp(firebaseConfig);
      const auth = getAuth(app);
      
      export { app, auth };

     ```

3. To run the development server, run
   ````bash
    npm run dev
 
