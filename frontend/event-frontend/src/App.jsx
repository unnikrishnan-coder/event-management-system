import React, { useState } from 'react';
import router from '../Router';
import { RouterProvider } from 'react-router-dom';
import Alert from './components/Alert';
import Router from '../Router';

function App() {

  const [alertData,setAlertData] = useState({});
  const [alertState,setAlertState] = useState(false);

  const setAlert = (data,state)=>{
    console.log(data,state);
    setAlertData(data);
    setAlertState(state);
  }
  return (
    <>
      {/* <Alert p={alertData} state={alertState}/> */}
      <Router setAlert={setAlert}/>
    </>
  )
}

export default App