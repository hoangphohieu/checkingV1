import { put, takeEvery } from 'redux-saga/effects';
import getTotalPageAPI from './../fetchAPI/GetTotalPageAPI';
import postItemExcelAPI from './../fetchAPI/PostItemExcelAPI';
import patchPrintStatusItemAPI from './../fetchAPI/PatchPrintStatusItemAPI';
import patchItemCheckingPropertiesAPI from './../fetchAPI/PatchItemCheckingPropertiesAPI';
import deleteItemCheckingAPI from './../fetchAPI/DeleteItemCheckingAPI';
import itemsPrintFalseAPI from './../fetchAPI/ItemsPrintFalseAPI';
import patchItemsExcelFailAPI from './../fetchAPI/PatchItemsExcelFailAPI';
import * as type from './../constants';

function* getChecking(param) {     // lấy total page
    console.log(param);
    try {
        let res1 = yield getTotalPageAPI(param.payload); //gọi API
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
        let res1 = yield postItemExcelAPI(param.payload); //gọi API
        yield put({
            type: type.POST_ITEM_EXCEL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.POST_ITEM_EXCEL_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error
            }
        })
    }

}
function* patchItemsExcelFail(param) {     // lấy total page
    // console.log(param);
    try {  
        let res1 = yield patchItemsExcelFailAPI(param.payload); //gọi API
        yield put({
            type: type.POST_ITEM_EXCEL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: res1
        })
    } catch (error) {
        yield put({
            type: type.POST_ITEM_EXCEL_RFAILURE, // trigger itemsReducer
            payload: {
                errorMessage: error
            }
        })
    }

}


function* patchPrintStatusItem(param) {     // lấy total page
    console.log(param);

    try {
        let res1 = yield patchPrintStatusItemAPI(param.payload); //gọi API
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

function* patchItemCheckingProperties(param) {     // lấy total page

    try {
        // console.log(param);

        let res1 = yield patchItemCheckingPropertiesAPI(param.payload); //gọi API
        console.log(res1);

        yield put({
            type: type.GET_CHECKING_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
            payload: [res1]
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


function* deleteItemChecking(param) {     // lấy total page

    try {
        let res1 = yield deleteItemCheckingAPI(param.payload); //gọi API
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



function* itemsPrintFalse() {     // lấy total page

    try {
        let res1 = yield itemsPrintFalseAPI(); //gọi API
        console.log(res1);

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
    takeEvery(type.GET_CHECKING_REQUEST, getChecking),
    takeEvery(type.POST_ITEM_EXCEL_REQUEST, postItemExcel),
    takeEvery(type.PATCH_ITEM_EXCEL_FAIL_REQUEST, patchItemsExcelFail),
    takeEvery(type.CHANGE_PRINT_STATUS_REQUEST, patchPrintStatusItem),
    takeEvery(type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST, patchItemCheckingProperties),
    takeEvery(type.DELETE_ITEM_CHECKING_REQUEST, deleteItemChecking),
    takeEvery(type.ITEMS_PRINT_FALSE_REQUEST, itemsPrintFalse),
];   