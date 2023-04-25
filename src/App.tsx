import React, { useEffect, useState } from 'react'
import './App.css'
import SignIn from './Modules/General/SignIn';
import SignUp from './Modules/General/SignUp';
import { BrowserRouter as Router } from 'react-router-dom';
import { ILoginData, IUserLoginData } from './Common/ContextStore/ContaxtStore'
import { CircularProgress } from '@mui/material';
import NotesComponent from './Modules/Notes/NotesComponent';
export const Context = React.createContext<any>(ILoginData);

function App() {
  const [context, setContext] = useState<IUserLoginData>(ILoginData);
  useEffect(() => {
    var UserData =  localStorage.getItem('UserData');
    if(UserData !== null) {
      var temp: any = JSON.parse(UserData)
      setContext(temp)
    }
  },[])
  return (
    <Context.Provider value={[context, setContext]}>
      <div>
      { context.Spin ? <CircularProgress /> : <></>}
          <Router>
            {
              context.LoginUserID !== 0 ? <NotesComponent/> : <SignIn />
            }
          </Router>
      </div>
    </Context.Provider>
  )
}

export default App