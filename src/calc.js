// const PIsao = arr => arr.reduce((total, numero) => total * Math.pow(numero.valor, numero.peso), 1)

// const somaPeso = arr => arr.reduce((total, numero) => total + numero.peso, 0)

// const G = arr => Math.pow(PIsao(arr), 1 / somaPeso(arr))

const calcMedia = arr => arr.reduce((total, numero) => total + numero, 0) / arr.length

const ordenar = arr => [...arr].sort((a, b) => a - b)

const calcMediana = ordenado => ordenado.length % 2 === 0 ?
    (ordenado[ordenado.length / 2] + ordenado[(ordenado.length / 2) - 1]) / 2
    : ordenado[(ordenado.length - 1) / 2]

const calcVariancia = (arr, m, amostral = true) => {
    const sumQuad = arr.reduce((total, num) => total + Math.pow(num - m, 2), 0)

    const div = amostral === true ? arr.length - 1 : arr.length

    return sumQuad / div
}

const calcDesvioPadrao = (arr, m, variancia) => Math.sqrt(variancia)

const calcCoeficienteVariacao = (arr, m, variancia) => 100 * calcDesvioPadrao(arr, m, variancia) / m

const calcModa = arr => {
    let hash = {}

    arr.forEach(num => {
        if (hash[num] === undefined) {
            hash[num] = 0
        }

        hash[num] += 1
    })

    const ord = Object
        .keys(hash)
        .map(num => ({
            value: num,
            count: hash[num]
        }))
        .sort((a, b) => b.count - a.count)
        .filter(el => el.count > 1)

    return ord.length === 0 ? null : ord[0].value
}

const calcAmplitude = ordenado => ordenado[ordenado.length - 1] - ordenado[0]

const calcNumeroClasse = arr => Math.round(1 + 3.22 * Math.log10(arr.length))

const calcAmplitudeIntervaloClasse = (amplitude, numeroClasse) => Math.ceil(amplitude / numeroClasse)

const calcDistribuicaoFrequencia = (ordenado, amplitude) => {
    const K = calcNumeroClasse(ordenado)

    const h = calcAmplitudeIntervaloClasse(amplitude, K)

    const first = ordenado[0]

    return Array
        .from({
            length: K
        }, (el, index) => [
            first + index * h,
            first + (index + 1) * h
        ])
        .map(el => ({
            intervalo: el,
            xi: calcMedia(el),
            Fi: ordenado.filter(num => num >= el[0] && num < el[1]).length
        }))
        .map((el, index, arr) => {
            const Fac = el.Fi + (index === 0 ?
                0
                : arr.reduce((total, subEl, subIndex) => subIndex < index ?
                    total + subEl.Fi
                    : total, 0))

            return ({
                ...el,
                fi: 100 * el.Fi / ordenado.length,
                Fac,
                FacR: 100 * Fac / ordenado.length
            })
        })
}

// let arr = process.argv
//     .filter((el, index) => index > 1)

// const convertToNumber = num => typeof num === "number" ? num : parseFloat(num)

// try {
//     const inputJSON = require(arr[0])

//     if (arr[1]) {
//         arr = inputJSON.map(el => convertToNumber(el[arr[1]]))
//     }
//     else {
//         arr = inputJSON.map(convertToNumber)
//     }
// }
// catch (error) {
//     arr = arr.map(convertToNumber)
// }

// const m = calcMedia(arr)

// const ordenado = ordenar(arr)

// const amplitude = calcAmplitude(ordenado)

// const variancia = calcVariancia(arr, m, false)

// const varianciaAmostral = calcVariancia(arr, m, true)

// console.log(JSON.stringify(calcDistribuicaoFrequencia(ordenado, amplitude), null, 2))

// console.log(`quantidade de números: ${arr.length}`)

// console.log(`amplitude: ${amplitude}`)

// console.log(`média: ${m.toFixed(2)}`)

// console.log(`moda: ${calcModa(arr)}`)

// console.log(`mediana: ${calcMediana(ordenado)}`)

// console.log(`variância: ${variancia.toFixed(2)}`)

// console.log(`desvio padrão: ${calcDesvioPadrao(arr, m, variancia).toFixed(2)}`)

// console.log(`coeficiente de variação: ${calcCoeficienteVariacao(arr, m, variancia).toFixed(2)}%`)

// console.log(`variância amostral: ${varianciaAmostral.toFixed(2)}`)

// console.log(`desvio padrão amostral: ${calcDesvioPadrao(arr, m, varianciaAmostral).toFixed(2)}`)

// console.log(`coeficiente de variação amostral: ${calcCoeficienteVariacao(arr, m, varianciaAmostral).toFixed(2)}%`)

module.exports = {
    calcDistribuicaoFrequencia
}