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
      // console.log(action);
      switch (action.type) {

            case type.GET_TRACKING_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_TRACKING_SUCSESS",
                        errorMessesage: null,
                        listItem: action.payload
                  }
            case type.GET_TRACKING_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: "GET_TRACKING_RFAILURE",
                        errorMessesage: null,
                        listItem: action.payload
                  }




            default:
                  return state;
      }
}