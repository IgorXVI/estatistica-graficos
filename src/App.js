import React from 'react'
import { useState } from 'react'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap'
import NumerosForm from './NumerosForm'
import Tabela from './Tabela'
import * as calc from "./calc"

const App = () => {
  const [input, setInput] = useState(JSON.stringify({
    "data": [1, 2, 3, 4]
  }))

  const [distribuicaoFrequencia, setDistribuicaoFrequencia] = useState(null)

  const [precision, setPrecision] = useState(2)

  const [format, setFormat] = useState("x => x")

  const injectTabela = () => {
    const arr = eval(format)(JSON.parse(input).data).map(num => typeof num === "number" ? num : parseFloat(num))

    const ordenado = calc.ordenar(arr)

    const amplitude = calc.calcAmplitude(ordenado)

    setDistribuicaoFrequencia(calc.calcDistribuicaoFrequencia(ordenado, amplitude, precision))
  }

  let tabela = null

  if (distribuicaoFrequencia !== null) {
    tabela = <Tabela arr={distribuicaoFrequencia}></Tabela>
  }

  return (
    <div className="App">
      <h1>Resolver de exercícios de estatística</h1>
      <Container fluid="sm">
        <Row>
          <Col>
            <NumerosForm
              fieldValue={input}
              onFieldInput={setInput}
              onButtonClick={injectTabela}
              onPrecisionInput={setPrecision}
              precisionValue={precision}
              formatValue={format}
              onFormatInput={setFormat}>
            </NumerosForm>
          </Col>
        </Row>
        <Row>
          <Col>{tabela}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
