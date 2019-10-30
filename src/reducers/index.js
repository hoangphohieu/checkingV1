// file này để combine các reducer lại
import { combineReducers } from 'redux';
import checkingControlReducer from './checkingControlReducer';
import ItemExcelPost from './ItemExcelPostReducer';
import ItemsPartner from './PartnerControlReducer';
import TrackingReducer from './TrackingReducer';
import UseControl from './UsesReducer';
export default combineReducers({
      items: checkingControlReducer,
      ItemExcelPost: ItemExcelPost,
      itemsPartner: ItemsPartner,
      TrackingReducer: TrackingReducer,
      UseData: UseControl,
})
