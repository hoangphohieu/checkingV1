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
        case type.PATCH_ITEM_TRACKING_CONTROL_SUCSESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "PATCH_ITEM_TRACKING_CONTROL_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.PATCH_ITEM_TRACKING_CONTROL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "PATCH_ITEM_TRACKING_CONTROL_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

        case type.GET_ITEM_TRACKING_FAIL_SUCSESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "GET_ITEM_TRACKING_FAIL_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.GET_ITEM_TRACKING_FAIL_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "GET_ITEM_TRACKING_FAIL_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

        case type.POST_LIST_TRACKING_COUNT_SUCSESS:
            return {
                ...state,
                isFetching: false,
                dataFetched: true,
                error: false,
                type: "POST_LIST_TRACKING_COUNT_SUCSESS",
                errorMessesage: null,
                listItem: action.payload
            }

        case type.POST_LIST_TRACKING_COUNT_RFAILURE:
            return {
                ...state,
                isFetching: false,
                error: true,
                type: "POST_LIST_TRACKING_COUNT_RFAILURE",
                dataFetched: false,
                errorMessesage: action.payload.errorMessesage
            }

        default:
            return state;
    }
}