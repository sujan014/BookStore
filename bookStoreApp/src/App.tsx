import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'
import Books from './books/Books'
import { baseUrl } from './values'
import { AddNew, AddNewBlock } from './books/AddBook'

function App() {
  const [initMsg, setInitMsg] = useState('')

  const initFunction = async() => {
    try {
      var response = await axios.get(baseUrl);
      if (response.status === 200){
        setInitMsg(response.data.mssg)
      }      
    }
    catch (e){
      setInitMsg(`Unable to connect to ${baseUrl}`);      
    }
  }
  
  useEffect(() => {
    initFunction();    
  }, [])

  return (
    <>
      <header>
        {initMsg}
      </header>
      <AddNewBlock />
      <Books />            
    </>
  )
}

export default App
