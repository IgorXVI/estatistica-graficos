import React from 'react'
import { Button, Form, Col } from 'react-bootstrap'
import JSONEditorReact from './JSONEditorReact'

const schema = {
    title: 'Example Schema',
    type: 'object',
    properties: {
        array: {
            type: 'array',
            items: {
                type: 'number'
            }
        },
        boolean: {
            type: 'boolean'
        },
        number: {
            type: 'number'
        }
    },
    required: ['array', 'string', 'boolean']
}

const NumerosForm = props => {


    return (
        <div className="NumerosForm">
            <Form>
                <Form.Group controlId="numeros">
                    <Form.Label>JSON:</Form.Label>
                    <JSONEditorReact
                        schema={schema}
                        text={props.fieldValue}
                        mode="code"
                        indentation={4}
                        onChangeText={props.onFieldInput}
                    />
                </Form.Group>
                <Form.Row>
                    <Form.Group as={Col} controlId="precisao">
                        <Form.Label>Precisão:</Form.Label>
                        <Form.Control
                            type="number"
                            value={props.precisionValue}
                            onInput={e => props.onPrecisionInput(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="format">
                        <Form.Label>Função de formatação:</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.formatValue}
                            onInput={e => props.onFormatInput(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="button">
                    <Button variant="primary" type="submit" onClick={e => {
                        e.preventDefault()
                        props.onButtonClick()
                    }}>Calcular</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default NumerosForm