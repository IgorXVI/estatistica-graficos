import React from 'react'
// import { useState } from 'react'

import createPlotlyComponent from 'react-plotly.js/factory'

import * as calc from "../modules/calc"

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

    const {
        x,
        y
    } = getArr({
        dados,
        nomeX: "intervalo",
        nomeY: "frequencia"
    })

    const chartData = [
        {
            mode: 'lines+markers',
            y: y,
            x: x.map(el => calc.calcMedia(el.split(" -| ").map(num => parseFloat(num))))
        }
    ]

    return (
        <Plot
            data={chartData}
            layout={{
                title: "Polígono de Frequências",
                width: 1000,
                height: 500,
                font: { size: 12 }
            }}
            config={{ responsive: true }}
        ></Plot>
    )
}

export default Graficos