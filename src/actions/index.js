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
 