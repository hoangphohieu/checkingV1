import { put, takeEvery } from 'redux-saga/effects';
import getTotalPageAPI from './../fetchAPI/GetTotalPageAPI';
import postItemExcelAPI from './../fetchAPI/PostItemExcelAPI';
import patchPrintStatusItemAPI from './../fetchAPI/PatchPrintStatusItemAPI';
import * as type from './../constants';

function* getChecking(param) {     // lấy total page
    console.log(param);
    try {
        let  res1 = yield getTotalPageAPI(param.payload); //gọi API
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


function* postItemExcel(param) {     // lấy total page
    // console.log(param);
    try {
        let  res1 = yield postItemExcelAPI(param.payload); //gọi API
        yield put({
            type: type.POST_ITEM_EXCEL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.POST_ITEM_EXCEL_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error.Message
            }
        })
    }

}

function* patchPrintStatusItem(param) {     // lấy total page
    console.log(param);
    
    try {
        let  res1 = yield patchPrintStatusItemAPI(param.payload); //gọi API
        yield put({
            type: type.GET_CHECKING_REQUEST, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1.id
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

export const IteamSaga = [
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.POST_ITEM_EXCEL_REQUEST, postItemExcel),
    takeEvery(type.CHANGE_PRINT_STATUS_REQUEST, patchPrintStatusItem),
];   