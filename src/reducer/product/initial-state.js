import { Record } from "immutable";

export default new Record({
	error:null,
	isLoading:false,
	isLoadingAdd:false,
	isLoadingEdit:false,
	isLoadingDelete:false,
	isLoadingProductStore:false,
	isLoadingAddToCart:false,
	productform: new Record({
		Image:"",
		Name_Product:"",
		Information:"",
		Category:"",
		Price:"",
		UID_Product:"",
		UID_Store:"",
	})(),
	product: new Record({
		Image:"",
		Name_Product:"",
		Information:"",
		Category:"",
		Price:"",
		UID_Product:"",
		UID_Store:"",
	})(),
	productstore: [new Record({
		Image:"",
		Name_Product:"",
		Information:"",
		Category:"",
		Price:"",
		UID_Product:"",
		UID_Store:"",
	})()],
})();
