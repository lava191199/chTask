import React from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { Button, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Select from 'react-select';
import moment from 'moment';
import * as Yup from 'yup';
import DatePicker from "react-datepicker";
import { addButton, addOrUpdateStudentDetailsRequest } from '../../../store/actions';
import 'react-datepicker/dist/react-datepicker.css'


function ActionComp() {
    const dispatch = useDispatch();
    const actionData = useSelector((state) => state?.taskReducer?.actionData);
    const actionType = useSelector((state) => state?.taskReducer?.actionType) || "unselect";
    return (
        <Formik
            initialValues={{
                firstName: actionData?.firstName || '',
                lastName: actionData?.lastName || '',
                company: actionData?.company || '',
                email: actionData?.email || '',
                password: "",
                confirmPassword: '',
                streetName: actionData?.streetName || '',
                city: actionData?.city || '',
                state: actionData?.state || '',
            }}
            onSubmit={(values) => {
                const reqObj = {
                    firstName: values?.firstName || '',
                    lastName: values?.lastName || '',
                    company: values?.company || '',
                    email: values?.email || '',
                    streetName: values?.streetName || '',
                    city: values?.city || '',
                    state: values?.state || '',
                    id: actionData?.id || Math.random() * 100
                }
                console.log("OnSubmitValuyes", values, reqObj);
                dispatch(addOrUpdateStudentDetailsRequest(actionType, reqObj))
            }}
            validationSchema={Yup.object().shape({
                firstName: Yup.string().min(2, "Must be more than 1 characters").max(25, "Must be less than 25 characters").required("This field is requried")
                    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
                lastName: Yup.string().min(2, "Must be more than 1 characters").max(25, "Must be less than 25 characters").required("This field is requried")
                    .matches(/^[aA-zZ\s]+$/, "Only alphabets are allowed for this field "),
                company: Yup.string().min(2, "Must be more than 1 characters").max(50, "Must be less than 50 characters").required("This field is requried"),
                email: Yup.string().email("Invalid Email Formate").max(50, "Must be less than 50 characters").required("This field is required"),
                streetName: Yup.string().max(75, "Must be less than 75 characters").required("This field is requried"),
                city: Yup.string().max(50, "Must be less than 50 characters").required("This field is requried"),
                state: Yup.string().max(50, "Must be less than 50 characters").required("This field is requried"),
                password: Yup.string().max(16, "Must be less than 16 characters").required('Please Enter your password').matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/,
                    "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
                ),
                confirmPassword: Yup.string()
                    .oneOf([Yup.ref('password'), null], 'Passwords must match')
            })}
        >
            {({ values, errors, setFieldValue, setFieldTouched, touched, isValid }) => {
                console.log("Adsfgfsaedfsgd", values);
                return <Form>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="firstName">First Name </Label>
                                <Field id="firstName" name="firstName" placeholder="Enter First Name" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='firstName' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="lastName">Last Name </Label>
                                <Field id="lastName" name="lastName" placeholder="Enter Last Name" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='lastName' /></div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row >
                        <Col md={8}>
                            <FormGroup>
                                <Label for="company">Company</Label>
                                <Field id="company" name="company" placeholder="Enter Company" className={'form-control ' + (errors.phone && touched.phone ? 'is-invalid' : '')} />
                                <div className='error-message'><ErrorMessage name='company' /></div>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={8}>
                            <FormGroup>
                                <Label for="exampleEmail">Email</Label>
                                <Field id="exampleEmail" name="email" placeholder="Enter Email" className={'form-control ' + (errors.email && touched.email ? 'is-invalid' : '')} type="email" />
                                <div className='error-message'><ErrorMessage name='email' /></div>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="password">Password </Label>
                                <Field id="password" name="password" placeholder="Enter Password" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='password' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="confirmPassword">Confirm Password </Label>
                                <Field id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" className={'form-control ' + (errors.name && touched.name ? 'is-invalid' : '')} type="text" />
                                <div className='error-message'><ErrorMessage name='confirmPassword' /></div>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <Label for="streetName"> Address</Label>
                                <Field id="streetName" name="streetName" placeholder="Enter Address" className={'form-control ' + (errors.streetName && touched.streetName ? 'is-invalid' : '')} />
                                <div className='error-message'> <ErrorMessage name='streetName' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleCity"> City </Label>
                                <Field id="exampleCity" name="city" placeholder="Enter City" className={'form-control ' + (errors.city && touched.city ? 'is-invalid' : '')} />
                                <div className='error-message'>  <ErrorMessage name='city' /></div>
                            </FormGroup>
                        </Col>
                        <Col md={3}>
                            <FormGroup>
                                <Label for="exampleState"> State </Label>
                                <Field id="exampleState" name="state" placeholder="Enter State" className={'form-control ' + (errors.state && touched.state ? 'is-invalid' : '')} />
                                <div className='error-message'> <ErrorMessage name='state' /></div>
                            </FormGroup>
                        </Col>

                    </Row>
                    <Row>
                        <Col>
                            {actionType !== 'view' &&<Button type='submit'>{actionType === 'add' ? "Save" : "Update"}  </Button>}
                        </Col>
                        <Col>
                            <Button onClick={() => dispatch(addButton('unselect', null))}> Back </Button>
                        </Col>
                        <Col>
                            {actionType !== 'view'&&<Button onClick={() => {
                                const reqObj = {
                                    firstName: values?.firstName || '',
                                    lastName: values?.lastName || '',
                                    company: values?.company || '',
                                    email: values?.email || '',
                                    streetName: values?.streetName || '',
                                    city: values?.city || '',
                                    state: values?.state || '',

                                }
                                dispatch(addButton('preview', reqObj));
                            }} > Preview </Button>}
                        </Col>
                    </Row>
                </Form>
            }}
        </Formik>
    )
}
export default ActionComp