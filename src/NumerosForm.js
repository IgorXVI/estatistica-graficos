import React from 'react'
import { Button, Form, Col, ToggleButtonGroup, ToggleButton } from 'react-bootstrap'
import { useState } from 'react'
import { JsonEditor as Editor } from 'jsoneditor-react'
import 'jsoneditor-react/es/editor.min.css'

const NumerosForm = props => {
    const [mode, setMode] = useState("tree")

    let editor
    if (mode !== null) {
        editor = <Editor
            id="JSONEditor"
            mode={mode}
            value={props.fieldValue}
            onChange={props.onFieldInput}
        />
    }

    return (
        <div className="NumerosForm">
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
                            value={props.precisionValue}
                            onInput={e => props.onPrecisionInput(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group as={Col} controlId="format">
                        <Form.Label>Caractere para dividir a string (só funciona se os dados for uma string):</Form.Label>
                        <Form.Control
                            type="text"
                            value={props.formatValue}
                            onInput={e => props.onFormatInput(e.target.value)}
                        />
                    </Form.Group>
                </Form.Row>

                <Form.Group controlId="button">
                    <Button 
                    variant="primary" 
                    type="submit" 
                    onClick={e => {
                        e.preventDefault()
                        props.onButtonClick()
                    }}>Calcular</Button>
                </Form.Group>

            </Form>
        </div>
    )
}
export default NumerosForm