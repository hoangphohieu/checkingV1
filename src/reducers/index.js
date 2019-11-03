// file này để combine các reducer lại
import { combineReducers } from 'redux';
import ItemReducer from './ItemReducer';
import ItemExcelPost from './ItemExcelPostReducer';
import ItemsPartner from './HomeReducer';
import TrackingReducer from './TrackingReducer';
import TrackingMoreReducer from './TrackingMoreReducer';
import UseControl from './UsesReducer';
export default combineReducers({
      items: ItemReducer,
      ItemExcelPost: ItemExcelPost,
      itemsPartner: ItemsPartner,
      TrackingReducer: TrackingReducer,
      UseData: UseControl,
      Tracking:TrackingMoreReducer
})
