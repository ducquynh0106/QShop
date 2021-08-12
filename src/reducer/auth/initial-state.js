import { Record } from "immutable";

export default new Record({
	user: null,
	error:null,
	logoutState:false,
	registerState:false,
	isLoadingProfile:false,
	userform: new Record({
		Image:""
	})(),
	form: new Record({
		email: "",
		emailError: "",
		password: "",
		passwordError: "",
		username:"",
        confirm:"",
		confirmError:"",
		phone:"",
		phoneError:"",
		city:"",
		district:"",
		ward:"",
		type:"",
	})()
})();
