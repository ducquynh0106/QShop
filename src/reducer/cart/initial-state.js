import { Record } from "immutable";
import { number } from "prop-types";

export default new Record({
	isLoadingCart:false,
	isLoadingPlaceOrder:false,
	error:null,
	cart:null,
	selectStore:"",
	selectCart: [new Record({
		UID_Product:"",
		Quanity:number,
	})()]
})();
