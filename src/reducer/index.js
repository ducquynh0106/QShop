import {combineReducers} from 'redux'
import auth from './auth'
import categories from './categories'
import product from './product'
import shop from './shop'
import cart from './cart'
import order from './order'
export default combineReducers({
   auth,
   categories,
   product,
   shop,
   cart,
   order
})