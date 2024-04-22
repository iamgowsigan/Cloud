import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js';
import { getFirestore , collection, setDoc ,updateDoc,doc ,getDoc,getDocs,deleteDoc } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js'
import { getStorage, ref ,uploadBytesResumable, getDownloadURL,deleteObject } from 'https://www.gstatic.com/firebasejs/10.11.0/firebase-storage.js';



const firebaseConfig = {
  apiKey: "AIzaSyC_TSoaQdZqxlpHx6nVf3f9l8LLvpCqmMM",
  authDomain: "cloud-842e8.firebaseapp.com",
  projectId: "cloud-842e8",
  storageBucket: "cloud-842e8.appspot.com",
  messagingSenderId: "996950546779",
  appId: "1:996950546779:web:2ceaf4e770fb8b123a627e",
  measurementId: "G-WSDF72XY9V"
};
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);
      // Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const storageRef = ref(storage);
      document.getElementById('submit').addEventListener("click", async () => {
          const name = document.getElementById('name').value;
          const email = document.getElementById('email').value;
          const rollno = document.getElementById('rollno').value;
          const college = document.getElementById('college').value;
          const branch = document.getElementById('branch').value;
          const year = document.getElementById('year').value;
          
          try {
              const docRef =setDoc(doc(db, "students", rollno), {
                  name: name,
                  email: email,
                  rollno: rollno,
                  college: college,
                  branch: branch,
                  year: year
              });
              console.log("Document written with ID: ", docRef.id);
              console.log("Student added successfully");
          } catch (error) {
              console.error("Error adding student: ", error);
          }
      });
      document.getElementById('submit3').addEventListener("click", async () => {
       
            const email = document.getElementById('email1').value;
            const rollno = document.getElementById('rollno1').value;
            
            console.log("Email:", email);
            console.log("Roll No:", rollno);
            
            
            const studentDocRef = doc(db, "students", rollno);
            console.log("Document Reference:", studentDocRef);
            console.log("Document Reference Path:", studentDocRef.path);

            const docSnap = await getDoc(studentDocRef);
            console.log("Document Snapshot:", docSnap.data());
            
            
                await updateDoc(studentDocRef, {
                    "email": email
                }).then(()=>{
                    console.log("Student details updated successfully");
                }) . catch ((error)=>{
            console.error("Error updating student details: ", error);
            });
        });
    
    document.getElementById('submit4').addEventListener("click", async () => {
        const querySnapshot = await getDocs(collection(db, "students"));
        const tableBody = document.getElementById("studentTableBody");
        tableBody.innerHTML = ""; 
    
        querySnapshot.forEach((doc) => {
            const student = doc.data();
            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            nameCell.textContent = student.name;
            row.appendChild(nameCell);
    
            const emailCell = document.createElement("td");
            emailCell.textContent = student.email;
            row.appendChild(emailCell);
    
            const rollnoCell = document.createElement("td");
            rollnoCell.textContent = student.rollno;
            row.appendChild(rollnoCell);
    
            const collegeCell = document.createElement("td");
            collegeCell.textContent = student.college;
            row.appendChild(collegeCell);
    
            const branchCell = document.createElement("td");
            branchCell.textContent = student.branch;
            row.appendChild(branchCell);
    
            const yearCell = document.createElement("td");
            yearCell.textContent = student.year;
            row.appendChild(yearCell);
            tableBody.appendChild(row);
        });
    });
    document.getElementById('submit5').addEventListener("click", async () => {
        const rollno = document.getElementById('rollno2').value;
    
        const studentDocRef = doc(db, "students", rollno);
        
        console.log("Document Reference:", studentDocRef);
         var p=document.getElementById("para");
        try {
            
            const docSnap = await getDoc(studentDocRef);
            
            // Check if the document exists
            if (docSnap.exists()) {
                // Log the data from the document
                console.log("Document Snapshot:", docSnap.data());
                p.innerText = JSON.stringify(docSnap.data());

            } else {
                console.log("No such document!");
                p.innerText = "No such document!";
            }
        } catch (error) {
            console.error("Error getting document:", error);
            p.innerText = "Error getting document: " + error.message;
        }
    });
    document.getElementById('submit6').addEventListener("click", async () => {
        const rollno = document.getElementById('rollno3').value;
        await deleteDoc(doc(db, "students", rollno)).then(()=>{
            console.log("delete document successfully!");
        }).catch((error)=>{console.log("delete document unsuccessfully!")});
    });
    document.getElementById('submit2').addEventListener("click", async () => {
        const file= document.getElementById('file').files[0];
        const storageRef = ref(storage, 'gs://cloud-842e8.appspot.com/student'+file.name);

const uploadTask = uploadBytesResumable(storageRef, file);


uploadTask.on('state_changed', 
  (snapshot) => {
    console.log(Date.now);

    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    
  }, 
  () => {
    
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        
      console.log('File available at', downloadURL);
    });
  }
)
    });
    document.getElementById('submit7').addEventListener("click", async () => {
        const file= document.getElementById('file').files[0];
        getDownloadURL(ref(storage, 'gs://cloud-842e8.appspot.com/student'+file.name))
        .then((url) => {
          // Or inserted into an <img> element
    const img = document.getElementById('my');
    img.setAttribute('src', url);
    const link = document.getElementById('downloadLink');
        link.setAttribute('href', url);
        
        link.setAttribute('download', file.name); // Set the filename for download
        link.innerHTML = 'Download Image'; // You can set any text you want for the link

        })
        .catch((error) => {
            console.log('File not available at');
        });
      
    });
    document.getElementById('submit8').addEventListener("click", async () => {
        const file= document.getElementById('file').files[0];
        const desertRef = ref(storage,  'gs://cloud-842e8.appspot.com/student'+file.name);

        // Delete the file
        deleteObject(desertRef).then(() => {
          // File deleted successfully
          console.log('File deleted successfully');
        }).catch((error) => {
          // Uh-oh, an error occurred!
          console.log('Uh-oh, an error occurred!');
        });      
    });