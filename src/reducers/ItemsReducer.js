import * as type from './../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessesage: null
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {
        // get page items
        case type.GET_CHECKING_REQUEST:
            return {
                ...state,
                isFetching: true,
                listItem: action.payload
            }
        case type.GET_TOTAL_PAGE_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload
            }

        case type.GET_TOTAL_PAGE_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                errorMessesage: action.payload.errorMessesage
            }
            
        default:
            return state;
    }
}