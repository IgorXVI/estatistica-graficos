import React from 'react'
import { Table } from 'react-bootstrap'

const Tabela = props => {
    const heads = Object.keys(props.arr[0])
    const foot = [props.arr[props.arr.length - 1]]
    const rest = props.arr
        .filter((el, index) => index < props.arr.length - 1)

    const createRows = arr => arr.map((el, index) => <tr key={index}>{
        heads.map((head, subIndex) => <td key={`${index}:${subIndex}`}>{
            el[head]
        }</td>)
    }</tr>)

    return (
        <div className="Tabela">
            <h2>{props.titulo}</h2>
            <Table bordered hover size="sm" responsive="sm">
                <thead className="number_table_header">
                    <tr>
                        {heads.map((key, index) => <th key={index}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {createRows(rest)}
                </tbody>
                <tfoot className="number_table_header">
                    {createRows(foot)}
                </tfoot>
            </Table>
        </div>
    )
}

export default Tabela