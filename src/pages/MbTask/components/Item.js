import React, { useContext } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { addButton, deleteStudentDetailsRequest } from '../../../store/actions';
import { ParentContext } from '../container/cotext';
import {  Button } from 'reactstrap';

function Item() {
    const context = useContext(ParentContext);
    const dispatch = useDispatch();
    const dataObject = useSelector((state) => state?.taskReducer?.totalData?.find((item) => item?.id === context?.id))
    console.log("ASDFC",dataObject);
    return (
        <tbody >
            <tr className='item-card'>
                <th scope="row">
                    {context?.index + 1}
                </th>
                <td>
                    {dataObject?.firstName}
                </td>
                <td>
                    {dataObject?.lastName}
                </td>
                <td>
                    {dataObject?.company}
                </td>
                <td>
                    {`${dataObject?.streetName}, ${dataObject?.city}, ${dataObject?.state}.`}
                </td>
                <td   >
                    <Button onClick={() => dispatch(addButton("view", dataObject))} color="info" outline> View </Button>
                </td>
                <td   >
                    <Button onClick={() => dispatch(addButton("edit", dataObject))} color="warning" outline> Edit </Button>
                </td>
                <td >
                    <Button onClick={()=> dispatch(deleteStudentDetailsRequest(dataObject?.id))} color="danger" outline> Delete </Button>
                </td>

            </tr>
        </tbody>
    )
}

export default Item