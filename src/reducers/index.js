// file này để combine các reducer lại
import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';
import ItemExcelPost from './ItemExcelPostReducer';
import ItemsPartner from './PartnerControlReducer';
import TrackingReducer from './TrackingReducer';
import UseControl from './UsesReducer';
export default combineReducers({
      items: ItemsReducer,
      ItemExcelPost: ItemExcelPost,
      itemsPartner: ItemsPartner,
      TrackingReducer: TrackingReducer,
      UseData: UseControl,
})
