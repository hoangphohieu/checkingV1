// file này để combine các reducer lại
import { combineReducers } from 'redux';
import ItemsReducer from './ItemsReducer';      
import ItemExcelPost from './ItemExcelPostReducer';
import ItemsPartner from './PartnerControlReducer';
import ItemTracking from './TrackingImportReducer';
export default combineReducers({
      items: ItemsReducer,
      ItemExcelPost:ItemExcelPost,
      itemsPartner:ItemsPartner,
      ItemTracking:ItemTracking
})
