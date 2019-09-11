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

            case type.GET_LIST_BY_ID_SUCSESS:
                  return {
                        ...state,
                        isFetching: false,
                        dataFetched: true,
                        error: false,
                        type: action.payload[0].id,
                        errorMessesage: null,
                        listItem: action.payload
                  }


            case type.GET_LIST_BY_ID_RFAILURE:
                  return {
                        ...state,
                        isFetching: false,
                        error: true,
                        type: null,
                        errorMessesage: action.payload.errorMessesage
                  }

            default:
                  return state;
      }
}