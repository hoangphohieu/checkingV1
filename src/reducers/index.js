// file này để combine các reducer lại
import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';      
import ItemExcelPost from './ItemExcelPostReducer';
export default combineReducers({
      items: ItemsReducer,
      ItemExcelPost:ItemExcelPost
})
