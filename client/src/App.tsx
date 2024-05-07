import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import * as netlifyIdentity from 'netlify-identity-widget'
import Header from './components/header'

function App() {


  useEffect(()=>{
    // netlifyIdentity.init({
    //   // container: '#netlify',
    //   locale: 'en' // defaults to 'en'
    // });
    
    // const user = netlifyIdentity.currentUser();
    // console.log(user)
  })

  return (
    <>
      <Header/>
      <h1></h1>
      <div className="card">
        <button onClick={() => {
          // netlifyIdentity.on('login')
          netlifyIdentity.init()
          netlifyIdentity.open('signup')
          console.log('<, cl')
          }}>
            login
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
