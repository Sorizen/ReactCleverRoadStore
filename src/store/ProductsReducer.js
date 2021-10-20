const stateDef = {
    products: [],
}
export const ProductsReducer = (state = stateDef, action) =>{
    switch (action.type){
        case "SET_NEW_PRODUCTS":
            return {...state, products: action.newProducts}
        case "DELETE_ITEM_FROM_PRODUCTS":
            state.products.splice(action.indexDelete, 1);
            return {...state}
        default:
            return state;
    }
}