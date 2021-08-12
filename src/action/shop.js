
export const ShopTypes={
    getShopRequest: "getshoprequest",
	getShopsSuccess: "getshopssuccess",
    getShopFailure: "getshopfailure",
}

const getShops=()=>{
    return{
        type:ShopTypes.getShopRequest
    }
}
export default{
  getShops,
}