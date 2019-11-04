import { put, takeEvery } from 'redux-saga/effects';
import getByCustomAPI from '../fetchAPI/getByCustomAPI';
import PutItemAPI from '../fetchAPI/PutItemAPI';
import DeleteItemAPI from '../fetchAPI/DeleteItemAPI';
import * as type from '../constants';

function* getChecking(param) {     // lấy total page
    console.log(param);
    try {
        let res1 = yield getByCustomAPI(param.payload); //gọi API
        yield put({
            type: type.GET_CHECKING_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.GET_CHECKING_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}
function* patchPrintStatusItem(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield PutItemAPI(param.payload); //gọi API
        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1.name
        })
    } catch (error) {
        yield put({
            type: type.CHANGE_PRINT_STATUS_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}



function* deleteItemChecking(param) {     // lấy total page

    try {
        let res1 = yield DeleteItemAPI(param.payload); //gọi API
        console.log(res1);

        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: param.payload.id
        })
    } catch (error) {
        yield put({
            type: type.GET_CHECKING_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}


export const CheckingSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.CHANGE_PRINT_STATUS_REQUEST, patchPrintStatusItem),
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),
];   