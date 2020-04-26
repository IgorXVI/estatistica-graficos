import React from 'react'
// import { useState } from 'react'

import createPlotlyComponent from 'react-plotly.js/factory'

const Plotly = window.Plotly
const Plot = createPlotlyComponent(Plotly)

const Graficos = ({
  dados
}) => {
  const sortByAttr = attr => (a, b) => b[attr] - a[attr]

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

  //   const dados = {
  //     "145 -| 152": 2,
  //     "152 -| 159": 7,
  //     "159 -| 166": 15,
  //     "166 -| 173": 10,
  //     "173 -| 180": 6,
  //     "180 -| 187": 2
  //   }

  const {
    x,
    y
  } = getArr({
    dados,
    nomeX: "intervalo",
    nomeY: "frequencia"
  })

  const chartData = x.map((xi, i) => ({
    histfunc: "sum",
    y: [y[i]],
    x: [""],
    type: "histogram",
    name: xi
  }))

  return (
    <Plot
      data={chartData}
      layout={{
        title: "Histograma",
        width: 1000,
        height: 500,
        font: { size: 12 }
      }}
      config={{ responsive: true }}
    ></Plot>
  )
}

export default Graficos