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

const calcDistribuicaoFrequencia = (ordenado, amplitude, precisao = 2) => {
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
            intervalo: el.join(" -| "),
            xi: calcMedia(el).toFixed(precisao),
            Fi: ordenado.filter(num => num >= el[0] && num < el[1]).length
        }))
        .map((el, index, arr) => {
            const Fac = el.Fi + (index === 0 ?
                0
                : arr.reduce((total, subEl, subIndex) => subIndex < index ?
                    total + subEl.Fi
                    : total, 0)).toFixed(precisao)

            return ({
                ...el,
                fi: (100 * el.Fi / ordenado.length).toFixed(precisao),
                Fac,
                FacR: (100 * Fac / ordenado.length).toFixed(precisao)
            })
        })
}

const processArr = input => input
    .split(" ")
    .map(num => parseFloat(num))

module.exports = {
    ordenar,
    calcVariancia,
    calcAmplitude,
    calcMediana,
    processArr,
    calcModa,
    calcCoeficienteVariacao,
    calcDistribuicaoFrequencia
}