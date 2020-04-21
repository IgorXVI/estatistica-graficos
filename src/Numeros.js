import React from 'react'
import { useState } from 'react'
import { Container, Row, Col } from 'react-bootstrap'

import NumerosForm from './NumerosForm'
import Tabela from './Tabela'
import * as calc from "./calc"
import deafultValues from "./deafault_values.json"

const Numeros = () => {
  const [input, setInput] = useState(deafultValues)

  const [info, setInfo] = useState(null)

  const [precision, setPrecision] = useState(2)

  const [format, setFormat] = useState(",")

  const injectTabela = () => {
    if (input[0].intervalo !== undefined) {
      const distribuicaoFrequencia = calc.calcDistribuicaoFrequencia({
        precisao: precision,
        intervaloQuantidade: input
      })

      setInfo({
        distribuicaoFrequencia
      })
    }
    else {
      const splitedInput = typeof input === "string" ?
        input.split(format.replace("\\n", "\n"))
        : input

      const arr = splitedInput
        .map(num => typeof num === "number" ? num : parseFloat(num))

      setInput(arr)

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

      const coeficienteVariacao = `${calc.calcCoeficienteVariacao(ordenado, media, vairanciaAmostra).toFixed(precision)}%`

      const mediaGeometrica = calc.calcMediaGeometrica(ordenado).toFixed(precision)

      const mudancaPercentual = calc.mudancaPercentual(ordenado, precision)

      const max = ordenado[ordenado.length - 1]

      const min = ordenado[0]

      const arrayFirstHalf = ordenado.slice(0, Math.floor(ordenado.length / 2))
      const arraySecondHalf = ordenado.slice(Math.ceil(ordenado.length / 2), ordenado.length)

      const quartil1 = calc.calcMediana(arrayFirstHalf).toFixed(precision)
      const quartil2 = calc.calcMediana(arraySecondHalf).toFixed(precision)

      setInfo({
        quartil1,
        quartil2,
        max,
        min,
        mudancaPercentual,
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
  let tMudancaPercentual = null

  if (info !== null) {
    const {
      min,
      max,
      distribuicaoFrequencia,
      mudancaPercentual,
      mediaGeometrica,
      variancia,
      vairanciaAmostra,
      moda,
      media,
      mediana,
      desvioPadrao,
      coeficienteVariacao,
      desvioPadraoAmostra,
      quartil1,
      quartil2
    } = info

    tabela = <Tabela titulo="Tabela de distribuição de frequencias" arr={distribuicaoFrequencia}></Tabela>

    const resto = {
      mediana,
      quartil1,
      quartil2,
      media,
      "media geometrica": mediaGeometrica,
      moda,
      variancia,
      "desvio padrão": desvioPadrao,
      "variancia da amostra": vairanciaAmostra,
      "desvio padrão da amostra": desvioPadraoAmostra,
      "coefieciente de variação da amostra": coeficienteVariacao,
      min,
      max
    }

    tabelaResto = <Tabela titulo="Tabela de informações sobre os números" arr={[
      ...Object.keys(resto).map(key => ({
        tipo: key,
        valor: resto[key]
      })),
      {}
    ]}></Tabela>

    if (mudancaPercentual !== undefined) {
      tMudancaPercentual = <Tabela titulo="Tabela de mudança percentual" arr={[
        ...Object.keys(mudancaPercentual).map(valores => ({
          valores,
          "mudança": mudancaPercentual[valores]
        })),
        {}
      ]}></Tabela>
    }

  }

  return (
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
        <Col>{tabelaResto}</Col>
      </Row>
      <Row>
        <Col>{tabela}</Col>
      </Row>
      <Row>
        <Col>{tMudancaPercentual}</Col>
      </Row>
    </Container>
  )
}

export default Numeros
