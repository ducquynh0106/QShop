import { Record } from "immutable";
import { number } from "prop-types";

export default new Record({
	error:null,
	order:null,
	orderNow: [],
	isLoadingPlaceOrderNow: false,
	isLoadingOrderNow:false,
	isLoadingMyOrder_Cus:false,
	isLoadingMyOrder:false,
	getOrderNow:null,
	orderProduct:[],
	MyOrder_Cus:[],
	myorder:[],
})();
