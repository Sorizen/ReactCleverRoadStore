const stateDef = {
    title: '',
    description: '',
    price: '',
    image: null,
    sale: '',
    saleEnds: '',
    uploadError: '',
    successMessage: '',
    imgError: '',
}
export const AddProductReducer = (state = stateDef, action) =>{
    switch (action.type){
        case "SET_NEW_PRODUCT_TITLE":
            return {...state, title: action.newTitle}
        case "SET_NEW_PRODUCT_DESCRIPTION":
            return {...state, description: action.newDescription}
        case "SET_NEW_PRODUCT_PRICE":
            return {...state, price: action.newPrice}
        case "SET_NEW_PRODUCT_IMAGE":
            return {...state, image: action.newImage}
        case "SET_NEW_PRODUCT_SALE":
            return {...state, sale: action.newSale}
        case "SET_NEW_PRODUCT_SALE_ENDS":
            return {...state, saleEnds: action.newSaleEnds}
        case "SET_NEW_PRODUCT_UPLOAD_ERROR":
            return {...state, uploadError: action.newUploadError}
        case "SET_NEW_PRODUCT_SUCCESS_MESSAGE":
            return {...state, successMessage: action.newSuccessMessage}
        case "SET_NEW_PRODUCT_IMG_ERROR":
            return {...state, imgError: action.newImgError}
        default:
            return state;
    }
}