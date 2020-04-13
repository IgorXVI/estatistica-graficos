import React from 'react'
import { Table } from 'react-bootstrap'

const Tabela = props => {
    const heads = Object.keys(props.arr[0])

    return (
        <div className="Tabela">
            <h2>Tabela de distribuição de frequencias</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        {heads.map((key, index) => <th key={index}>{key}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {props.arr.map((el, index) => <tr key={index}>{
                        heads.map((head, subIndex) => <td key={`${index}:${subIndex}`}>{
                            el[head]
                        }</td>)
                    }</tr>)}
                </tbody>
            </Table>
        </div>
    )
}

export default Tabela