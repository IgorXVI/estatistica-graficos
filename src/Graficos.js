import React from 'react'
// import { useState } from 'react'

import { Container, Row, Col } from 'react-bootstrap'
import createPlotlyComponent from 'react-plotly.js/factory'

import dadosSorteados from './dados/dados_sorteados.json'

import Tabela from './Tabela'

const Plotly = window.Plotly
const Plot = createPlotlyComponent(Plotly)

const Graficos = () => {
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
    sortBy = "y"
  }) => {
    const arr = Object
      .keys(dados)
      .map(key => ({
        [nomeX]: key,
        [nomeY]: dados[key]
      }))
      .sort(sortBy === "x" ?
        sortByAttr(nomeX)
        : sortBy === "x" ?
          sortByAttr(nomeY)
          : () => 0)

    const x = arr.map(el => el[nomeX])
    const y = arr.map(el => el[nomeY])

    return {
      arr,
      x,
      y
    }
  }

  const dados = getDados({
    attr: "Computador",
    dadosSorteados: dadosSorteados
  })

  const {
    arr,
    x,
    y
  } = getArr({
    dados,
    nomeX: "Tem computador?",
    nomeY: "quantidade"
  })

  console.log(x)
  console.log(y)

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <Plot
            data={[
              {
                type: 'pie',
                labels: x,
                values: y,
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
  )
}

export default Graficos
