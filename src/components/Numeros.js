import React from 'react'
import { useState } from 'react'
import { Row, Container, Button, Form, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

import Tabela from './Tabela'
import Histograma from './Histograma'
import PoligonoFrequencias from './PoligonoFrequencias'
import Ogiva from './Ogiva'

import * as calc from "../modules/calc"

const Numeros = () => {
  const [input, setInput] = useState([
    1,
    1,
    2,
    3,
    4
  ])

  const [info, setInfo] = useState(null)

  const [precision, setPrecision] = useState(2)

  const [format, setFormat] = useState(",")

  const [mode, setMode] = useState("tree")

  const [tmode, setTMode] = useState("tree")

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

      const max = ordenado[ordenado.length - 1]

      const min = ordenado[0]

      const arrayFirstHalf = ordenado.slice(0, Math.floor(ordenado.length / 2))
      const arraySecondHalf = ordenado.slice(Math.ceil(ordenado.length / 2), ordenado.length)

      const quartil1 = calc.calcMediana(arrayFirstHalf).toFixed(precision)
      const quartil2 = calc.calcMediana(arraySecondHalf).toFixed(precision)

      const lastDF = distribuicaoFrequencia[distribuicaoFrequencia.length - 1]
      const mediaPonderada = (lastDF.xiFi / lastDF.Fi).toFixed(precision)


      setInfo({
        mediaPonderada,
        quartil1,
        quartil2,
        max,
        min,
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
  let histograma = null
  let poligonoFrequencia = null
  let ogiva = null

  let editor
  if (mode !== null) {
    editor = <Editor
      id="JSONEditor"
      mode={mode}
      value={input}
      onChange={setInput}
    />
  }

  if (info !== null) {
    const {
      amplitude,
      mediaPonderada,
      min,
      max,
      distribuicaoFrequencia,
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

    const histogramaDados = distribuicaoFrequencia.reduce((hash, el, index) => {
      if (index < distribuicaoFrequencia.length - 1) {
        hash[el.intervalo] = el.Fi
      }
      return hash
    }, {})

    histograma = <Histograma dados={histogramaDados}></Histograma>

    poligonoFrequencia = <PoligonoFrequencias dados={histogramaDados}></PoligonoFrequencias>

    const ogivaDados = distribuicaoFrequencia.reduce((hash, el, index) => {
      if (index < distribuicaoFrequencia.length - 1) {
        hash[el.intervalo] = el.Fac
      }
      return hash
    }, {})

    ogiva = <Ogiva dados={ogivaDados}></Ogiva>

    const resto = {
      media,
      "media geometrica": mediaGeometrica,
      "media ponderada": mediaPonderada,
      mediana,
      "quartil 1": quartil1,
      "quartil 2": quartil2,
      moda,
      variancia,
      "desvio padrão": desvioPadrao,
      "variancia da amostra": vairanciaAmostra,
      "desvio padrão da amostra": desvioPadraoAmostra,
      "coefieciente de variação da amostra": coeficienteVariacao,
      min,
      max,
      amplitude
    }

    tabelaResto = <Tabela titulo="Tabela de informações sobre os números" arr={[
      ...Object.keys(resto).map(key => ({
        tipo: key,
        valor: resto[key]
      })),
      {}
    ]}></Tabela>

  }

  return (
    <Container fluid="sm">
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="numeros">
              <Form.Label>Dados:</Form.Label>
              {editor}
            </Form.Group>
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}
              value={mode}
              onClick={() => setMode(null)}
              onChange={value => setMode(value)}>
              {['code', 'tree'].map((value, id) =>
                <ToggleButton key={id} value={value}>{value}</ToggleButton>)}
            </ToggleButtonGroup>
            <Form.Row>
              <Form.Group as={Col} controlId="precisao">
                <Form.Label>Precisão:</Form.Label>
                <Form.Control
                  type="number"
                  value={precision}
                  onInput={e => setPrecision(e.target.value)}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="format">
                <Form.Label>Caractere para dividir a string (só funciona se os dados for uma string):</Form.Label>
                <Form.Control
                  type="text"
                  value={format}
                  onInput={e => setFormat(e.target.value)}
                />
              </Form.Group>
            </Form.Row>

            <Form.Group controlId="button">
              <Button
                variant="primary"
                type="submit"
                onClick={e => {
                  setTMode(mode)
                  setMode(null)
                  e.preventDefault()
                  injectTabela()
                }}
                onMouseLeave={
                  () => {
                    if (mode === null) {
                      setMode(tmode)
                    }
                  }
                }
              >Calcular</Button>
            </Form.Group>

          </Form>
        </Col>
      </Row>
      <Row>
        <Col>{tabela}</Col>
      </Row>
      <Row>
        <Col>{tabelaResto}</Col>
      </Row>
      <Row>
        <Col>{histograma}</Col>
        <Col>{poligonoFrequencia}</Col>
        <Col>{ogiva}</Col>
      </Row>
    </Container>
  )
}

export default Numeros
