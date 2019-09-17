import * as type from '../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    errorMessesage: null
}
export default (state = DEFAULT_STATE, action) => {
    switch (action.type) {

        case type.STATE_POST_TO_DEFAULT:
            return {
                ...state,
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                errorMessesage: null
            }

        case type.POST_ITEM_EXCEL_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_ITEM_EXCEL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

        default:
            return state;
    }
}