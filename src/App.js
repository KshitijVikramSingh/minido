import './App.css';
import React, { useState } from 'react';
import firebase from './firestore';
import SignInModal from './SigninModal/signinmodal';
import SignOutModal from './SignoutModal/signoutmodal';

function App() {
  const [taskList, setTaskList] = useState([
    {id: 1, text: "Discover miniDo", checked: true},
    {id: 2, text: "Sign in to your account", checked: false},
    {id: 3, text: "Fall in love ♥", checked: false},
  ]);

  const [user, setUser] = useState();
  const [showSigninModal, setShowSigninModal] = useState(false);
  const [showSignoutModal, setShowSignoutModal] = useState(false);

  const deleteTaskHandler = (id) => {
    const items = taskList.filter(task => task.id !== id);
  
    if (user){
      const database = firebase.firestore();
      const userDoc = database.collection("users").doc(user.email);

      userDoc.get().then(function(doc) {
        userDoc.set({
          listItems: items
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }

    setTaskList(items);
  }

  const checkTaskHandler = (id) => {
    const items = taskList.map(task => task.id === id ? {id: task.id, text: task.text, checked: !task.checked} : task);
  
    if (user){
      const database = firebase.firestore();
      const userDoc = database.collection("users").doc(user.email);

      userDoc.get().then(function(doc) {
        userDoc.set({
          listItems: items
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }

    setTaskList(items);
  }

  const addTaskHandler = (text) => {
    const items = taskList.concat({id: taskList.length + 1, text, checked: false});

    if (user){
      const database = firebase.firestore();
      const userDoc = database.collection("users").doc(user.email);

      userDoc.get().then(function(doc) {
        userDoc.set({
          listItems: items
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });
      }).catch(function(error) {
        console.log("Error getting document:", error);
      });
    }

    setTaskList(items);
  }

  const signInHandler = (user) => {
    setShowSigninModal(false);
    setUser(user);

    const database = firebase.firestore();

    const userDoc = database.collection("users").doc(user.email);

    userDoc.get().then(function(doc) {
      if (doc.exists) {
        setTaskList(doc.data().listItems);
      } else {
        const items = [
          {id: 1, text: "Discover miniDo", checked: true},
          {id: 2, text: "Sign in to your account", checked: true},
          {id: 3, text: "Fall in love ♥", checked: true},
        ];

        userDoc.set({
          listItems: items
        })
        .then(function() {
          console.log("Document successfully written!");
        })
        .catch(function(error) {
          console.error("Error writing document: ", error);
        });

        setTaskList(items);
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }

  const signOut = () => {
    firebase.auth().signOut()      
    .then(function() {
      setShowSignoutModal(false);
      setUser();
      console.log("signOut");
    }, function(error) {
      console.log(error.message);
    });
}

  const userIcon = (
    user ? (
      <div className="userIcon" onClick={() => setShowSignoutModal(true)} style={{backgroundImage: `url(${user.photoURL})`}}/>
    ) : (
      <i className="bi bi-person-circle signinButton" onClick={() => setShowSigninModal(true)}/>
    )
  )

  return (
    <React.Fragment>
      <SignInModal show={showSigninModal} signInHandler={(user) => signInHandler(user)} onHide={() => setShowSigninModal(false)}/>
      <SignOutModal signOut={() => signOut()} show={showSignoutModal} onHide={() => setShowSignoutModal(false)}/>
      <div className="App">
        <div className="title">
          <i className="bi bi-journal-check"/>
          <h1 className="heading">miniDo</h1>
          {userIcon}
        </div>
        {taskList.map(task => <ListElement key={task.id} {...task} onDelete={(id) => deleteTaskHandler(id)} onCheck={(id) => checkTaskHandler(id)}/>)}
        <CreateTaskButton onAdd={(text) => addTaskHandler(text)}/>
      </div>
    </React.Fragment>
  );
}

function ListElement(props) {
  return (
    <div className={props.checked ? "listElement checkedElement" : "listElement"}>
      <i className={props.checked ? "check bi bi-check-circle-fill" : "check bi bi-check-circle"} onClick={() => props.onCheck(props.id)}/>
      <p className={props.checked ? "text checked" : "text"}>{props.text}</p>
      <i className="bi bi-trash trash" onClick={() => props.onDelete(props.id)}/>
    </div>
  )
}

function CreateTaskButton(props){
  const [taskText, setTaskText] = useState('');

  return (
    <div className="listElement">
      <input className="text" autoComplete="false" autoSave="false" type="text" value={taskText} placeholder="Add New Task" onChange={(e) => setTaskText(e.target.value)}/>
      <i class="addIcon bi bi-plus-circle" onClick={() => { if(taskText !== '') { props.onAdd(taskText); setTaskText(''); }}}/>
    </div>
  )
}

export default App;
