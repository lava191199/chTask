import React, { useContext, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { SuperParentContext } from '../container/cotext';
import { addButton } from '../../../store/actions';
import { Button, FormGroup, Input, Label, Row, Col, Table } from 'reactstrap';
import { searchKey } from '../../../store/actions';

function ActionComp() {
    const context = useContext(SuperParentContext);

    const dispatch = useDispatch();
    const actionType = useSelector((state) => state?.taskReducer?.actionType) || "unselect";
    console.log("Parent__ParentContext", actionType);
    return (
        <>
            {(actionType === 'add' || actionType === "edit" || actionType === "view" || actionType === "preview") ? <>
                <Row className="h-40">
                    <Col md={8}>
                        <context.actionComp />
                    </Col>
                    {actionType === 'view ' && <Col md={4}>
                        <context.view />
                    </Col>}
                    {actionType === 'preview' && <Col md={4}>
                        <context.view />
                    </Col>}
                </Row>

            </> : <>
                <Row sm="4" className="flexLayout">
                    <Col>
                        <Button onClick={() => dispatch(addButton('add', null))}>Add Student</Button>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Input id="search" placeholder="Search With Student Name Or E-Mail" onChange={(e) => dispatch(searchKey(e.target.value))} />
                        </FormGroup>
                    </Col>
                </Row>
                <Row className="h-100">
                    <context.taskManager />
                </Row>
            </>}
        </>
    )
}

export default ActionComp