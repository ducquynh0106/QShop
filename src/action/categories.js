
export const CategoriesTypes={
    getCategoriesRequest: "getcategoriesrequest",
	getCategoriesSuccess: "getcategoriessuccess",
    getCategoriesFailure: "getcategoriesfailure",
    getCategoryRequest: "getcategoryrequest",
	getCategorySuccess: "getcategorysuccess",
    getCategoryFailure: "getcategoryfailure",
    changeField:"changeField",
}

const getCategories=()=>{
    return{
        type:CategoriesTypes.getCategoriesRequest
    }
}
const getCategory=()=>{
    return{
        type:CategoriesTypes.getCategoryRequest
    }
}
const changeField=(key,value)=>{
    return{
        type:CategoriesTypes.changeField,
        key,
        value
    }
}
export default{
    getCategories, 
    getCategory,
    changeField
}