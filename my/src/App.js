import {app, database , storage } from './firebaseconfig';
import { useState} from 'react'
import {collection , addDoc, getDocs, onSnapshot , query , where} from 'firebase/firestore' 
import {  ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";


function App() {

  
  const [data,setdata] = useState({});

  const mycollection = collection(database,'users');

  const handleinput = (event) => {
    let newinput = {[event.target.name] : event.target.value}
    setdata({...data,...newinput})
  }

  const handlesubmit = (event) =>
  {
       addDoc(mycollection,{username : data.username ,age : data.age,email: data.email, password :data.password})
       .then((response)=>
       {
         alert('New user added successfully');
       })
       .catch((err)=>
       {
         {alert(err.message)};
       })
  }

  const namequery = query(mycollection,where("username","==","vaibhav"))
  const agequery = query(mycollection,where("age",">=","32"))
 

  const getdata = () =>
    {
      // getDocs(mycollection).then((response)=>
      // {
      //   console.log(response.docs.map((item)=>
      //   {
      //       return item.data();
      //   }))
      // })

      // onSnapshot(mycollection,(data)=>
      // {
      //   console.log(data.docs.map((item)=>
      //   {
      //     return item.data();
      //   }))
      // })

           onSnapshot(agequery,(data)=>
      {
        console.log(data.docs.map((item)=>
        {
          return item.data();
        }))
      })
    }


  const handlefilesubmit = ()=>
  {
    const storageRef = ref(storage, 'images/' + data.name);
    const uploadTask = uploadBytesResumable(storageRef, data);

    uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
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
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
);
    
  }

  return (

    <div className = "App">
      <input name  = "username" type = "text" placeholder ="Enter username" onChange={(event)=>handleinput(event)}/>
      <input name  = "age" type = "age" placeholder ="Enter age" onChange={(event)=>handleinput(event)}/>
         <input name  = "email" type = "email" placeholder ="Enter Email" onChange={(event)=>handleinput(event)}/>
        <input name  = "password" type = "password" placeholder ="Enter password" onChange={(event)=>handleinput(event)}/>
        <button onClick = {handlesubmit}>sign up</button>

        <button onClick = {getdata}>Get Data</button>

        <div>
          <input type  = 'file' onChange={(event)=>{setdata(event.target.files[0])}}/>
          <button onClick={handlefilesubmit}>add file</button>
        </div>
    </div>

  );
}

export default App;
