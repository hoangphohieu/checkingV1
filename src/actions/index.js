import * as type from './../constants';

export function getCheckingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_CHECKING_REQUEST,payload})    // payload:valueToGetAPI
}
 
export function postItemAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.POST_ITEM_EXCEL_REQUEST,payload})    // payload:valueToGetAPI
}

export function patchItemsExcelFailAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.PATCH_ITEM_EXCEL_FAIL_REQUEST,payload})    // payload:valueToGetAPI
}

export function changePrintStatusAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.CHANGE_PRINT_STATUS_REQUEST,payload})    // payload:valueToGetAPI
}
 
export function patchItemCheckingProperties(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.PATCH_ITEM_CHECKING_PROPERTIES_REQUEST,payload})    // payload:valueToGetAPI
}
 
export function deleteItemChecking(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.DELETE_ITEM_CHECKING_REQUEST,payload})    // payload:valueToGetAPI
}
 
export function itemsPrintFalse(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.ITEMS_PRINT_FALSE_REQUEST,payload})    // payload:valueToGetAPI
}

export function getListById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_LIST_BY_ID_REQUEST,payload})    // payload:valueToGetAPI
}

export function getListDayById(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_LIST_DAY_BY_ID_REQUEST,payload})    // payload:valueToGetAPI
}

export function stateImportExcelToDefault(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.STATE_POST_TO_DEFAULT,payload})    // payload:valueToGetAPI
}
export function getListByCustom(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_LIST_BY_CUSTOM_REQUEST,payload})    // payload:valueToGetAPI
}


