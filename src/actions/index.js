import * as type from './../constants';
                                                            // valueToGetAPI:{
                                                            //     textSearch: ***,
                                                            //     activePage: ***,
                                                            //     totalPage: ***
                                                            // }
export function getTotalPageAPI(payload) {                  // gọi lên itemSaga và itemsReducer 
    return ({type: type.GET_TOTAL_PAGE_REQUEST,payload})    // payload:valueToGetAPI
}
