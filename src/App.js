import React from 'react'
import { useState } from 'react'
import './App.css'
import { Container, Row, Col } from 'react-bootstrap'

import NumerosForm from './NumerosForm'
import Tabela from './Tabela'
import * as calc from "./calc"

const App = () => {
  const [input, setInput] = useState([1, 2, 3, 4])

  const [info, setInfo] = useState(null)

  const [precision, setPrecision] = useState(2)

  const [format, setFormat] = useState("x => x")

  const injectTabela = () => {
    if(input[0].intervalo !== undefined){
      const distribuicaoFrequencia = calc.calcDistribuicaoFrequencia({
        precisao: precision,
        intervaloQuantidade: input
      })

      setInfo({
        distribuicaoFrequencia
      })
    }
    else {
      const formatFun = eval(format)

      const arr = formatFun(input)
        .map(num => typeof num === "number" ? num : parseFloat(num))
  
      const ordenado = calc.ordenar(arr)
  
      const amplitude = calc.calcAmplitude(ordenado)

      const distribuicaoFrequencia = calc.calcDistribuicaoFrequencia({
        precisao: precision,
        amplitude,
        ordenado
      })
  
      const media = calc.calcMedia(ordenado).toFixed(precision)
  
      const moda = calc.calcModa(ordenado)
  
      const mediana = calc.calcMediana(ordenado).toFixed(precision)
  
      const variancia = calc.calcVariancia(ordenado, media).toFixed(precision)
  
      const desvioPadrao = calc.calcDesvioPadrao(ordenado, media, variancia).toFixed(precision)
  
      const vairanciaAmostra = calc.calcVariancia(ordenado, media, true).toFixed(precision)
  
      const desvioPadraoAmostra = calc.calcDesvioPadrao(ordenado, media, vairanciaAmostra).toFixed(precision)
  
      const coeficienteVariacao = calc.calcCoeficienteVariacao(ordenado, media, vairanciaAmostra).toFixed(precision)
  
      const mediaGeometrica = calc.calcMediaGeometrica(ordenado).toFixed(precision)
  
      setInfo({
        mediaGeometrica,
        variancia,
        vairanciaAmostra,
        ordenado,
        amplitude,
        distribuicaoFrequencia,
        coeficienteVariacao,
        moda,
        media,
        mediana,
        desvioPadrao,
        desvioPadraoAmostra
      })
    }

  }

  let tabela = null
  let tabelaResto = null

  if (info !== null) {
    tabela = <Tabela titulo="Tabela de distribuição de frequencias" arr={info.distribuicaoFrequencia}></Tabela>

    const {
      mediaGeometrica,
      variancia,
      vairanciaAmostra,
      moda,
      media,
      mediana,
      desvioPadrao,
      coeficienteVariacao,
      desvioPadraoAmostra
    } = info

    tabelaResto = <Tabela titulo="Tabela de informações sobre os números" arr={[
      {
        media,
        "media geometrica": mediaGeometrica,
        moda,
        mediana,
        variancia,
        "variancia da amostra": vairanciaAmostra,
        "desvio padrão da amostra": desvioPadraoAmostra,
        "desvio padrão": desvioPadrao,
        "coefieciente de variação da amostra": coeficienteVariacao
      },
      {}
    ]}></Tabela>
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
        <Row>
          <Col>{tabelaResto}</Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
