import * as type from './../constants';
let DEFAULT_STATE = {
      listItem: [],
      dataFetched: false,
      isFetching: false,
      error: false,
      type: null,
      errorMessesage: null
}
export default (state = DEFAULT_STATE, action) => {
      console.log(action);
      switch (action.type) {

            case type.GET_USE_INFO_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_USE_INFO_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.GET_LIST_USER_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_LIST_USER_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }

            case type.GET_USE_INFO_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_USE_INFO_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }








            case type.STATE_USER_TO_DEFAULT:
                  return {
                        listItem: [],
                        dataFetched: false,
                        isFetching: false,
                        error: false,
                        type: null,
                        errorMessesage: null
                  }



            default:
                  return state;
      }
}