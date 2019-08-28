import { put, takeEvery } from 'redux-saga/effects';
import getTotalPageAPI from './../fetchAPI/GetTotalPageAPI';
import * as type from './../constants';

function* getTotalPage(param) {     // lấy total page
    console.log(param);
    try {
        const res1 = yield getTotalPageAPI(param.payload); //gọi API
        yield put({
            type: type.GET_TOTAL_PAGE_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: Math.ceil(res1.length / 5)
        })


    } catch (error) {
        yield put({
            type: type.GET_TOTAL_PAGE_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}



export const IteamSaga = [
    takeEvery(type.GET_TOTAL_PAGE_REQUEST, getTotalPage)
];   