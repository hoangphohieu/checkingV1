import * as type from './../constants';
                                                            // valueToGetAPI:{
                                                            //     textSearch: ***,
                                                            //     activePage: ***,
                                                            //     totalPage: ***
                                                            // }
export function getCheckingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_CHECKING_REQUEST,payload})    // payload:valueToGetAPI
}
 
export function postItemAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.POST_ITEM_EXCEL_REQUEST,payload})    // payload:valueToGetAPI
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
 

