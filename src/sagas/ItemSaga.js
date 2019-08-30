import { put, takeEvery } from 'redux-saga/effects';
import getTotalPageAPI from './../fetchAPI/GetTotalPageAPI';
import * as type from './../constants';

function* getChecking(param) {     // lấy total page
    console.log(param);
    try {
        const res1 = yield getTotalPageAPI(param.payload); //gọi API
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



export const IteamSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking)
];   