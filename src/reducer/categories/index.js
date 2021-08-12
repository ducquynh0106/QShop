import {CategoriesTypes} from '../../action/categories'
import initialState from './initial-state'

export default ( state = initialState, action)=>{
    switch(action.type){
        case CategoriesTypes.getCategoriesRequest:
            return state
                .set("isLoading", true)
                .set("error", null);
		case CategoriesTypes.getCategoriesSuccess:
			return state
				.set("isLoading", false)
				.set("error", null)
				.set("categories", action.categories);
		case CategoriesTypes.getCategoriesFailure:
            return state
                .set("isLoading", false)
                .set("error", action.error);
        case CategoriesTypes.getCategoryRequest:
            return state
                .set("isLoading", true)
                .set("error", null);
        case CategoriesTypes.getCategorySuccess:
            return state
                .set("isLoading", false)
                .set("error", null)
                .set("category", action.category);
        case CategoriesTypes.getCategoryFailure:
            return state
                .set("isLoading", false)
                .set("error", action.error);
        case CategoriesTypes.changeField:
            return state.set(action.key, action.value);
		default:
			return state;
    }
}