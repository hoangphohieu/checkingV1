import * as type from './../constants';
                                                            // valueToGetAPI:{
                                                            //     textSearch: ***,
                                                            //     activePage: ***,
                                                            //     totalPage: ***
                                                            // }
export function getCheckingAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_CHECKING_REQUEST,payload})    // payload:valueToGetAPI
}
