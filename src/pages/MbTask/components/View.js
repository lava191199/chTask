import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { addButton } from '../../../store/actions';


function View() {
    const dispatch = useDispatch();
    const actionData = useSelector((state) => state?.taskReducer?.actionData);
    console.log("ActionDAta_view", actionData);
    return (
        <React.Fragment className='previewCard'>
            <Row>
                <h3>Preview</h3>
            </Row>
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="firstName">First Name </Label>
                        <Input id="firstName" name="firstName" value={actionData?.firstName} placeholder="Enter First Name"  type="text" disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={6}>
                    <FormGroup>
                        <Label for="lastName">Last Name </Label>
                        <Input id="lastName" name="lastName" value={actionData?.lastName} placeholder="Enter Last Name" disabled={true} type="text" />
                    </FormGroup>
                </Col>
            </Row>
            <Row >
                <Col md={8}>
                    <FormGroup>
                        <Label for="company">Company</Label>
                        <Input id="company" name="company" value={actionData?.company} placeholder="Enter Company" disabled={true}  />
                    </FormGroup>
                </Col>

            </Row>
            <Row>
                <Col md={8}>
                    <FormGroup>
                        <Label for="exampleEmail">Email</Label>
                        <Input id="exampleEmail" name="email" value={actionData?.email} placeholder="Enter Email"  type="email" disabled={true} />
                    </FormGroup>
                </Col>

            </Row>
            
            <Row>
                <Col md={6}>
                    <FormGroup>
                        <Label for="streetName"> Address</Label>
                        <Input id="streetName" name="streetName"value={actionData?.streetName} placeholder="Enter Address" disabled={true}  />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="exampleCity"> City </Label>
                        <Input id="exampleCity" name="city"value={actionData?.city} placeholder="Enter City" disabled={true} />
                    </FormGroup>
                </Col>
                <Col md={3}>
                    <FormGroup>
                        <Label for="exampleState"> State </Label>
                        <Input id="exampleState" name="state" value={actionData?.state} placeholder="Enter State" disabled={true} />
                    </FormGroup>
                </Col>

            </Row>
            
            <Row>
                <Col>
                    <Button onClick={() => dispatch(addButton('add', null))}> Undo </Button>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default View