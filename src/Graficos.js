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
    dados
  }) => dados
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

  const dados = {
    "145 -| 152": 2,
    "152 -| 159": 7,
    "159 -| 166": 15,
    "166 -| 173": 10,
    "173 -| 180": 6,
    "180 -| 187": 2
  }

  const {
    arr,
    x,
    y
  } = getArr({
    dados,
    nomeX: "intervalo",
    nomeY: "frequencia"
  })

  const xString = x
    .map(xi => xi.split(" -| ")[0])
    .reduce((arr, subArr) => arr.concat(subArr), [])
    .concat([
      x[x.length - 1].split(" -| ")[1]
    ])
    .join("          .          ")

  const chartData = x.map((xi, i) => ({
    histfunc: "sum",
    y: [y[i]],
    x: [xString],
    type: "histogram",
    name: xi
  }))

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <Plot
            data={chartData}
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
