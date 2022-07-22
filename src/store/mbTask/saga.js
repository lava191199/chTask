import * as types from './actionTypes';
import * as actions from './actions';
import { all, fork, put, call, takeLeading, select } from "redux-saga/effects";
import axios from 'axios';

const mockDataA = [
    { id: 1, firstName: "Rahul", lastName: "KLL", email: "rahul@gmail.com", company:"Middlesbrough",  streetName: "tnhb colony", city: "tirupathi", state: "andhra pradesh", zip: "34596" },
    { id: 2, firstName: "Jane", lastName: "Hopper", email: "jane@gmail.com", company:"Emproto",  streetName: "kbr colony", city: "banglore", state: "karnataka", zip: "517501" },
    { id: 3, firstName: "Eleven", lastName: "El", email: "eleven@gmail.com", company:"Amazon",  streetName: "sth colony", city: "chennai", state: "tamil Nadu ", zip: "34596" },
    { id: 4, firstName: "Ragner", lastName: "Lb", email: "ragner@gmail.com", company:"Flipkart",  streetName: "lkd colony", city: "banglore", state: "karnataka", zip: "517501" },
    { id: 5, firstName: "Phani", lastName: "Bt", email: "phani@gmail.com", company:"Sunlighten",  streetName: "ngo colony", city: "tirupathi", state: "andhra pradesh", zip: "34596" },
    ]

function* getCollegeData(action) {
    console.log("getCollegeData_Start=>", action);
    let mockData;
    try {
       mockData = mockDataA;
    } catch (err) {
        const error = err;
        console.log("getCollegeData_ERROR=>", error);
    }
    console.log("getCollegeData_END",mockData );
    yield put(actions.getCollegeDataResponse( mockData));
};

function* addOrUpdateStudentDetails(action) {
    console.log("addOrUpdateStudentDetails_Start=>", action);
    const dataObject = action?.payload?.reqObj;
    let totalData = (yield select())["taskReducer"]?.totalData;
    if (action?.payload?.actionType === 'add') {
        try {
            totalData?.unshift(dataObject)
        } catch (error) {
            console.log("Error", error);
        }
        console.log("addOrUpdateStudentDetails_END", totalData);
        yield put(actions.addOrUpdateStudentDetailsResponse(totalData))
    }
    if (action?.payload?.actionType === 'edit') {
        try {
            const index = totalData?.findIndex((item) => item?.id === dataObject?.id);
            console.log("adsffdafsv", index, totalData, dataObject);
            if (index !== -1) {
                totalData?.splice(index, 1, dataObject);
            }
        } catch (error) {
            console.log("Error", error);
        }
        console.log("addOrUpdateStudentDetails_END", totalData);
        yield put(actions.addOrUpdateStudentDetailsResponse(totalData))
    }
}
function* deleteStudentDetails(action) {
    console.log("deleteStudentDetailss_Start=>", action);
    const id = action?.payload?.id;
    let totalData = (yield select())["taskReducer"]?.totalData;
    try {
        const index = totalData?.findIndex((item) => item?.id === id);
        console.log("adsffdafsv", index);
        if (index !== -1) {
            totalData?.splice(index, 1);
        }
    } catch (error) {
        console.log("Error", error);
    }
    console.log("deleteStudentDetails_END", totalData);
    yield put(actions.deleteStudentDetailsResponse(totalData))
}

export function* taskWatcher() {
    yield takeLeading(types.GET_COLLEGE_DATA_REQUEST, getCollegeData);
    yield takeLeading(types.ADD_OR_UPDATE_STUDENT_DETAILS_REQUEST, addOrUpdateStudentDetails);
    yield takeLeading(types.DELETE_STUDENT_DETAILA_REQUEST, deleteStudentDetails)
}

function* taskSaga() {
    yield all([fork(taskWatcher)]);
}
export default taskSaga;