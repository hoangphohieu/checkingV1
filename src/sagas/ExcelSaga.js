import { put, takeEvery } from 'redux-saga/effects';
import postItemExcelAPI from './../fetchAPI/PostItemExcelAPI';
import patchItemsExcelFailAPI from './../fetchAPI/PatchItemsExcelFailAPI';
import postListItemCountAPI from './../fetchAPI/PostListItemCountAPI';
import patchListItemCountAPI from './../fetchAPI/PatchListItemCountAPI';
import postListItemCountPatchFailAPI from "./../fetchAPI/PostListItemCountPatchFailAPI";
import getListByIdAPI from './../fetchAPI/GetListByIdAPI';
import * as type from './../constants';

function* postItemExcel(param) {     // lấy total page
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

function* postListItemCount(param) {     // lấy total page
      try {
            let res1 = yield postListItemCountAPI(param.payload); //gọi API
            yield put({
                  type: type.POST_LIST_ITEM_COUNT_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.POST_LIST_ITEM_COUNT_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}

function* patchListItemCount(param) {     // lấy total page
      try {
            let res1 = yield patchListItemCountAPI(param.payload); //gọi API

            yield put({
                  type: type.PATCH_LIST_ITEM_COUNT_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            console.log(error);

            yield put({
                  type: type.PATCH_LIST_ITEM_COUNT_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }
}
function* postListItemCountPatchFail(param) {     // lấy total page
      try {
            let res1 = yield postListItemCountPatchFailAPI(param.payload); //gọi API
            yield put({
                  type: type.POST_LIST_ITEM_COUNT_PATCH_FAIL_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.POST_LIST_ITEM_COUNT_PATCH_FAIL_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }

}

function* getLastItemOflistItemCountPatch(param) {     // lấy total page
      try {
            let res1 = yield getListByIdAPI(param.payload.id); //gọi API
            yield put({
                  type: type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_SUCSESS, // trigger valueToGetAPIReducer , tính lại total Page
                  payload: res1
            })
      } catch (error) {
            yield put({
                  type: type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_RFAILURE, // trigger itemsReducer
                  payload: {
                        errorMessage: error
                  }
            })
      }

}
export const ExcelSaga = [
      takeEvery(type.POST_ITEM_EXCEL_REQUEST, postItemExcel),
      takeEvery(type.PATCH_ITEM_EXCEL_FAIL_REQUEST, patchItemsExcelFail),
      takeEvery(type.POST_LIST_ITEM_COUNT_REQUEST, postListItemCount),
      takeEvery(type.PATCH_LIST_ITEM_COUNT_REQUEST, patchListItemCount),
      takeEvery(type.POST_LIST_ITEM_COUNT_PATCH_FAIL_REQUEST, postListItemCountPatchFail),
      takeEvery(type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_REQUEST, getLastItemOflistItemCountPatch),


];   