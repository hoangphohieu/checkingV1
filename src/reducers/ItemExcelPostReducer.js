import * as type from '../constants';
let DEFAULT_STATE = {
    listItem: [],
    dataFetched: false,
    isFetching: false,
    error: false,
    type: null,
    errorMessesage: null
}
export default (state = DEFAULT_STATE, action) => {
    // console.log(action);

    switch (action.type) {

        case type.STATE_POST_TO_DEFAULT:
            return {
                listItem: [],
                dataFetched: false,
                isFetching: false,
                error: false,
                type: "STATE_POST_TO_DEFAULT",
                errorMessesage: null
            }

        case type.POST_ITEM_EXCEL_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "POST_ITEM_EXCEL_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_ITEM_EXCEL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "POST_ITEM_EXCEL_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }
        case type.POST_LIST_ITEM_COUNT_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "POST_LIST_ITEM_COUNT_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_LIST_ITEM_COUNT_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "POST_LIST_ITEM_COUNT_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }
        case type.PATCH_LIST_ITEM_COUNT_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "PATCH_LIST_ITEM_COUNT_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.PATCH_LIST_ITEM_COUNT_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "PATCH_LIST_ITEM_COUNT_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }
        case type.POST_LIST_ITEM_COUNT_PATCH_FAIL_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "POST_LIST_ITEM_COUNT_PATCH_FAIL_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_LIST_ITEM_COUNT_PATCH_FAIL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "POST_LIST_ITEM_COUNT_PATCH_FAIL_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

        case type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "GET_LAST_ITEM_OF_LIST_ITEM_COUNT_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.GET_LAST_ITEM_OF_LIST_ITEM_COUNT_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "GET_LAST_ITEM_OF_LIST_ITEM_COUNT_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }


        // 
        case type.EXCEL_GET_LIST_BY_ID_SUCSESS:

            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "EXCEL_GET_LIST_BY_ID_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.EXCEL_GET_LIST_BY_ID_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "EXCEL_GET_LIST_BY_ID_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }










        default:
            return state;
    }
}