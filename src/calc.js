const PIsao = arr => arr.reduce((total, numero) => total * Math.pow(numero.valor, numero.peso), 1)

const somaPeso = arr => arr.reduce((total, numero) => total + numero.peso, 0)

const calcMediaGeometrica = arr => {
    const trueArr = arr.map(num => num.peso !== undefined ?
        num
        : ({
            valor: num,
            peso: 1
        })
    )

    return Math.pow(PIsao(trueArr), 1 / somaPeso(trueArr))
}

const calcMedia = arr => arr.reduce((total, numero) => total + numero, 0) / arr.length

const ordenar = arr => [...arr].sort((a, b) => a - b)

const calcMediana = ordenado => ordenado.length % 2 === 0 ?
    (ordenado[ordenado.length / 2] + ordenado[(ordenado.length / 2) - 1]) / 2
    : ordenado[(ordenado.length - 1) / 2]

const calcVariancia = (arr, m, amostral = false) => {
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

    return ord.length === 0 ? "Indefinido" : ord[0].value
}

const calcAmplitude = ordenado => ordenado[ordenado.length - 1] - ordenado[0]

const calcNumeroClasse = arr => 1 + 3.22 * Math.log10(arr.length)

const calcAmplitudeIntervaloClasse = (amplitude, numeroClasse) => Math.ceil(amplitude / numeroClasse)

const calcDistribuicaoFrequenciaPrimeiraParte = (ordenado, amplitude) => {
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
            Fi: ordenado.filter(num => num >= el[0] && num < el[1]).length
        }))
}

const calcDistribuicaoFrequencia = ({
    precisao = 2,
    ordenado,
    amplitude,
    intervaloQuantidade
}) => {
    const lista = intervaloQuantidade !== undefined && intervaloQuantidade !== null ?
        intervaloQuantidade
        : calcDistribuicaoFrequenciaPrimeiraParte(ordenado, amplitude)

    const comprimento = lista.reduce((total, el) => total + el.Fi, 0)

    const result = lista.map((el, index, arr) => {
        const Fac = el.Fi + (index === 0 ?
            0
            : arr.reduce((total, subEl, subIndex) => subIndex < index ?
                total + subEl.Fi
                : total, 0))

        return ({
            intervalo: el.intervalo.join(" -| "),
            Fi: el.Fi,
            xi: calcMedia(el.intervalo).toFixed(precisao),
            Fac,
            fi: (100 * el.Fi / comprimento).toFixed(precisao),
            FacR: (100 * Fac / comprimento).toFixed(precisao)
        })
    })

    const somarElsAtts = attr => result.reduce((total, el) => total + parseFloat(el[attr]), 0)
    
    const addPerc = value => `${value}%`

    const foot = {
        intervalo: "Total",
        Fi: somarElsAtts("Fi"),
        xi: "-",
        Fac: "-",
        fi: addPerc(somarElsAtts("fi").toFixed(precisao)),
        FacR: "-"
    }

    return result
        .map(el => ({
            ...el,
            fi: addPerc(el.fi),
            FacR: addPerc(el.FacR)
        }))
        .concat([
            foot
        ])
}

const processArr = input => input
    .split(" ")
    .map(num => parseFloat(num))

module.exports = {
    calcMediaGeometrica,
    calcDesvioPadrao,
    calcMedia,
    ordenar,
    calcVariancia,
    calcAmplitude,
    calcMediana,
    processArr,
    calcModa,
    calcCoeficienteVariacao,
    calcDistribuicaoFrequencia
}