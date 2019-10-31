import * as type from './../constants';

export function getCheckingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_CHECKING_REQUEST, payload })    // payload:valueToGetAPI
}

export function postItemAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.POST_ITEM_EXCEL_REQUEST, payload })    // payload:valueToGetAPI
}

export function patchItemsExcelFailAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.PATCH_ITEM_EXCEL_FAIL_REQUEST, payload })    // payload:valueToGetAPI
}

export function changePrintStatusAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.CHANGE_PRINT_STATUS_REQUEST, payload })    // payload:valueToGetAPI
}

export function patchItemCheckingProperties(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST, payload })    // payload:valueToGetAPI
}

export function deleteItemChecking(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.DELETE_ITEM_CHECKING_REQUEST, payload })    // payload:valueToGetAPI
}

export function itemsPrintFalse(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.ITEMS_PRINT_FALSE_REQUEST, payload })    // payload:valueToGetAPI
}

export function getListById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_LIST_BY_ID_REQUEST, payload })    // payload:valueToGetAPI
}

export function getListDayById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_LIST_DAY_BY_ID_REQUEST, payload })    // payload:valueToGetAPI
}

export function stateImportExcelToDefault() {
    // gọi lên itemSaga và itemsReducer 
    return ({ type: type.STATE_POST_TO_DEFAULT })    // payload:valueToGetAPI
}
export function getListByCustom(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_LIST_BY_CUSTOM_REQUEST, payload })    // payload:valueToGetAPI
}

export function postListItemCountAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.POST_LIST_ITEM_COUNT_REQUEST, payload })    // payload:valueToGetAPI
}

export function patchListItemCountAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.PATCH_LIST_ITEM_COUNT_REQUEST, payload })    // payload:valueToGetAPI
}

export function postListItemCountPatchFailAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.POST_LIST_ITEM_COUNT_PATCH_FAIL_REQUEST, payload })    // payload:valueToGetAPI
}
export function getLastItemOflistItemCountPatch(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_REQUEST, payload })    // payload:valueToGetAPI
}

export function patchItemItemAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.PATCH_ITEM_TRACKING_CONTROL_REQUEST, payload })    // payload:valueToGetAPI
}
export function getItemTrackingFailAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_ITEM_TRACKING_FAIL_REQUEST, payload })    // payload:valueToGetAPI
}

export function postListTrackingCountAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.POST_LIST_TRACKING_COUNT_REQUEST, payload })    // payload:valueToGetAPI
}
export function getTrackingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_TRACKING_REQUEST, payload })    // payload:valueToGetAPI
}

export function setStateStoreToDefault() {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.SET_STATE_STORE_TO_DEFAULT })    // payload:valueToGetAPI
}

export function SearchOneTrackingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_ONE_TRACKING_REQUEST, payload })    // payload:valueToGetAPI
}

export function getUseAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_USE_INFO_REQUEST, payload })    // payload:valueToGetAPI
}

export function setStateUserToDefault(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.STATE_USER_TO_DEFAULT, payload })    // payload:valueToGetAPI
}

export function getListUserAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.GET_LIST_USER_REQUEST, payload })    // payload:valueToGetAPI
}

export function userGetListById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.USER_GET_LIST_BY_ID_REQUEST, payload })    // payload:valueToGetAPI
}

export function changeUserPropertiesAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.CHANGE_USE_PROPERTIES_REQUEST, payload })    // payload:valueToGetAPI
}

export function createUser(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.CREATE_USER_REQUEST, payload })    // payload:valueToGetAPI
}

export function deleteUser(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.DELETE_USER_REQUEST, payload })    // payload:valueToGetAPI
}
export function ExcelGetListById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({ type: type.EXCEL_GET_LIST_BY_ID_REQUEST, payload })    // payload:valueToGetAPI
}

