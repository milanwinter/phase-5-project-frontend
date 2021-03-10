import React, {Component} from 'react' 
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ReviewForm from './ReviewForm'

class FormModal extends Component {


    render() {
        return (
            <div>
                <Modal
                    show={true}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    animation
                    >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Modal heading
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ReviewForm errors={this.props.errors} changeRating={this.props.changeRating} handleChange={this.props.handleChange} rating={this.props.rating} resort={this.props.resort} handleSubmit={this.props.handleSubmit} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button onClick={()=> this.props.hideForm()}>Close</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default FormModal