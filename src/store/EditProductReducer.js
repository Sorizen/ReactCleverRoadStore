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
export const EditProductReducer = (state = stateDef, action) =>{
    switch (action.type){
        case "SET_NEW_PRODUCT_TITLE_FOR_EDIT":
            return {...state, title: action.newTitle}
        case "SET_NEW_PRODUCT_DESCRIPTION_FOR_EDIT":
            return {...state, description: action.newDescription}
        case "SET_NEW_PRODUCT_PRICE_FOR_EDIT":
            return {...state, price: action.newPrice}
        case "SET_NEW_PRODUCT_IMAGE_FOR_EDIT":
            return {...state, image: action.newImage}
        case "SET_NEW_PRODUCT_SALE_FOR_EDIT":
            return {...state, sale: action.newSale}
        case "SET_NEW_PRODUCT_SALE_ENDS_FOR_EDIT":
            return {...state, saleEnds: action.newSaleEnds}
        case "SET_NEW_PRODUCT_UPLOAD_ERROR_FOR_EDIT":
            return {...state, uploadError: action.newUploadError}
        case "SET_NEW_PRODUCT_SUCCESS_MESSAGE_FOR_EDIT":
            return {...state, successMessage: action.newSuccessMessage}
        case "SET_NEW_PRODUCT_IMG_ERROR_FOR_EDIT":
            return {...state, imgError: action.newImgError}
        default:
            return state;
    }
}