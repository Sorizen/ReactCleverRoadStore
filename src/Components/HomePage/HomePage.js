import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {database, firestore} from '../../fireBase';
import ProductOutput from "../ProductsOutput/ProductOutput";
import './HomePage.css';
const HomePage = () =>{
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const setProducts = (newProducts) => {dispatch({type: 'SET_NEW_PRODUCTS', newProducts: newProducts})};
    const getProducts = async () =>{
        const products = await firestore.collection('Products').get();
        const productsArr = [];
        products.docs.forEach(product => {
            const data = product.data();
            data.ID = product.id;
            productsArr.push({...data});
            if(productsArr.length === products.docs.length){
                setProducts(productsArr);
            }
        })
    }
    useEffect(()=>{
        getProducts();
    },[])
    return(
        <div className={'HomePage-products-wrapper'}>
            <h2 className={'HomePage-header-text'}>Our products</h2>
            {products.length > 0 ? (
                <ProductOutput/>
            ):(
                <div className={'Preloader'} style={{width: '44px', height: '44px', backgroundColor: 'black', marginLeft: 'auto', marginRight: 'auto', borderRadius: '50%', marginTop: '20px'}}>
                    <svg width="44" height="44" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#fff">
                        <g fill="none" fillRule="evenodd" strokeWidth="2">
                            <circle cx="22" cy="22" r="1">
                                <animate attributeName="r"
                                         begin="0s" dur="1.8s"
                                         values="1; 20"
                                         calcMode="spline"
                                         keyTimes="0; 1"
                                         keySplines="0.165, 0.84, 0.44, 1"
                                         repeatCount="indefinite" />
                                <animate attributeName="stroke-opacity"
                                         begin="0s" dur="1.8s"
                                         values="1; 0"
                                         calcMode="spline"
                                         keyTimes="0; 1"
                                         keySplines="0.3, 0.61, 0.355, 1"
                                         repeatCount="indefinite" />
                            </circle>
                            <circle cx="22" cy="22" r="1">
                                <animate attributeName="r"
                                         begin="-0.9s" dur="1.8s"
                                         values="1; 20"
                                         calcMode="spline"
                                         keyTimes="0; 1"
                                         keySplines="0.165, 0.84, 0.44, 1"
                                         repeatCount="indefinite" />
                                <animate attributeName="stroke-opacity"
                                         begin="-0.9s" dur="1.8s"
                                         values="1; 0"
                                         calcMode="spline"
                                         keyTimes="0; 1"
                                         keySplines="0.3, 0.61, 0.355, 1"
                                         repeatCount="indefinite" />
                            </circle>
                        </g>
                    </svg>
                </div>
            )}
        </div>
    )
}
export default HomePage