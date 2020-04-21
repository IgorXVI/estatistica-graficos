import './App.css'

import React from 'react'

import Graficos from './Graficos'
import Numeros from './Numeros'

const App = () => {
  return (
    <div className="App">
      <h1>Resolver de exercícios de estatística</h1>
      <Graficos></Graficos>
      <Numeros></Numeros>
    </div>
  )
}

export default App
