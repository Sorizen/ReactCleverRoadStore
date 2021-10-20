import {combineReducers, createStore} from "redux";
import {loginReducer} from "./LoginReducer";
import {AddProductReducer} from "./AddProductsReducer";
import {ProductsReducer} from "./ProductsReducer";
import {EditProductReducer} from "./EditProductReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    newProduct: AddProductReducer,
    products: ProductsReducer,
    forEdit: EditProductReducer
})

export const store = createStore(rootReducer);