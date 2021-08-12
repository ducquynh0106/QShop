import { Record } from "immutable";

export default new Record({
	error:null,
	isLoading:false,
	selectCategory:"",
	categories: new Record({
		Name:"",
		UID_Cat:"",
		Image:"",
	})(),
	category: new Record({
		Name:"",
		UID_Cat:"",
		UID_Parent:"",
		Image:"",
	})(),
})();
