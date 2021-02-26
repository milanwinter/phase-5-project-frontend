import React, {Component} from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class Resorts extends Component {


    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <h1>California/Nevada</h1>
                            <ul>
                                <li>shit goes here</li>
                            </ul>
                        </Col>
                        <Col>
                            <h1> Colorado </h1>
                        </Col>
                        <Col>
                            <h1>Utah/Wyoming</h1>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

export default Resorts