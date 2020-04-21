import './App.css'

import React from 'react'
// import { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import createPlotlyComponent from 'react-plotly.js/factory'

import dadosSorteados from './dados/dados_sorteados.json'

import Tabela from './Tabela'

const Plotly = window.Plotly
const Plot = createPlotlyComponent(Plotly)

const App = () => {
  const sortByAttr = attr => (a, b) => b[attr] - a[attr]

  const getDados = ({
    attr,
    dadosSorteados
  }) => dadosSorteados
    .sort(sortByAttr(attr))
    .reduce((hash, el) => {
      if (!hash[el[attr]]) {
        hash[el[attr]] = 0
      }

      hash[el[attr]] += 1

      return hash
    }, {})

  const getArr = ({
    dados,
    nomeX,
    nomeY,
    sortByX = false
  }) => {
    const arr = Object
      .keys(dados)
      .map(ano => ({
        [nomeX]: ano,
        [nomeY]: dados[ano]
      }))
      .sort(sortByX === true ?
        sortByAttr(nomeX)
        : sortByAttr(nomeY))

    const x = arr.map(el => el[nomeX])
    const y = arr.map(el => el[nomeY])

    return {
      arr,
      x,
      y
    }
  }

  const dados = getDados({
    attr: "AnoNascimento",
    dadosSorteados: dadosSorteados
      .map(el => {
        el.AnoNascimento = parseInt(el.AnoNascimento)
        return el
      })
      .filter(el => el.AnoNascimento > 1990)
  })

  const {
    arr,
    x,
    y
  } = getArr({
    dados,
    nomeX: "Ano de Nascimento",
    nomeY: "quantidade",
    sortByX: false
  })

  console.log(x)
  console.log(y)

  return (
    <div className="App">
      <h1>Resolver de exercícios de estatística</h1>
      <Container fluid="sm">
        <Row>
          <Col>
            <Plot
              data={[
                {
                  type: 'bar',
                  x,
                  y,
                  line: { color: "green", width: 2 }
                },
              ]}
              layout={{
                xaxis: {
                  tickmode: "linear"
                },
                yaxis: {
                  tickmode: "linear"
                },
                width: 1000,
                height: 500,
                font: { size: 12 }
              }}
              config={{ responsive: true }}
            ></Plot>
          </Col>
        </Row>
        <Row>
          <Col>
            <Tabela arr={arr
              .concat([{}])}></Tabela>
          </Col>
        </Row>
      </Container>
      {/* <Numeros></Numeros> */}
    </div>
  )
}

export default App
