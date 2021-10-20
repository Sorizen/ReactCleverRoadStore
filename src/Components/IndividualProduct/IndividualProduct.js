import React from 'react';
import {firestore} from "../../fireBase";
import {useHistory} from "react-router-dom";
import {useDispatch} from "react-redux";
const IndividualProduct = (props) =>{
    const dispatch = useDispatch();
    const setTitle = (newTitle) => {dispatch({type: 'SET_NEW_PRODUCT_TITLE_FOR_EDIT', newTitle : newTitle})}
    const setDescription = (newDescription) => {dispatch({type: 'SET_NEW_PRODUCT_DESCRIPTION_FOR_EDIT', newDescription : newDescription})}
    const setPrice = (newPrice) => {dispatch({type: 'SET_NEW_PRODUCT_PRICE_FOR_EDIT',newPrice : newPrice})}
    const setImage = (newImage) => {dispatch({type: 'SET_NEW_PRODUCT_IMAGE_FOR_EDIT',newImage : newImage})}
    const setSale = (newSale) => {dispatch({type: 'SET_NEW_PRODUCT_SALE_FOR_EDIT', newSale : newSale})}
    const setSaleEnds = (newSaleEnds) => {dispatch({type: 'SET_NEW_PRODUCT_SALE_ENDS_FOR_EDIT', newSaleEnds : newSaleEnds})};
    const toDay = (dateEndSale) => {
        const dateEndSaleNewDate = new Date(dateEndSale);
        const DateNow = new Date();
        console.log(dateEndSaleNewDate);
        console.log(DateNow)
        const res = Math.trunc((dateEndSaleNewDate - DateNow) / 86400000);
        return (isNaN(res) || res < 1) ? 0 : res
    }
    const deleteItem = (productId, index) =>{
        firestore.collection('Products').doc(productId).delete().then(()=>{console.log('deleted')});
        document.querySelector(`.ProductsOutput-item-${index}`).remove();
    }
    const onEditClickHandler = (productId, index) =>{
        setTitle(props.product.title);
        setDescription(props.product.description.length > 0 ? props.product.description : '');
        setPrice(props.product.price);
        setImage(props.product.url);
        setSale(props.product.sale ? props.product.sale : '');
        setSaleEnds(props.product.saleEnds ? props.product.saleEnds : '');
        history.push('/edit-product');
        deleteItem(productId, index);
    }
    const history = useHistory();
    return(
        <div className={`ProductsOutput-item ProductsOutput-item-${props.index}`}>
            <div className={'ProductsOutput-img-wrapper'} >
                <img src={props.product.url} alt=""/>
            </div>
            <div className={'ProductsOutput-text-wrapper'}>
                <span className={'ProductsOutput-title'}>{props.product.title}</span>
                <span className={'ProductsOutput-description'}>{props.product.description}</span>
                <div className="ProductsOutput-price-wrapper">
                    {(!(props.product.sale) || toDay(props.product.saleEnds) === 0 ? (
                        <span className={'ProductsOutput-price'}>{props.product.price.toFixed(2)}$</span>
                    ) : (
                        <>
                            <span className={'ProductsOutput-price-grey'}>Price: {props.product.price.toFixed(2)}$</span>
                            <span className={'ProductsOutput-title-sale'}>Sale: {props.product.sale}%</span>
                            <span className={'ProductsOutput-price'}>New price: {(props.product.price * (1 - (props.product.sale / 100))).toFixed(2)}$</span>
                            <span className={'ProductsOutput-saleEnds'}>Sale will be over in {toDay(props.product.saleEnds)} days</span>
                        </>
                    ))}
                </div>
            </div>
            <div className={'ProductsOutput-buttons-wrapper'}>
                <button className={'ProductsOutput-button-delete'} onClick={() => deleteItem(props.product.ID, props.index)}>Delete item</button>
                <button className={'ProductsOutput-button-edit'} onClick={() => onEditClickHandler(props.product.ID, props.index)}>Edit item</button>
            </div>
        </div>
    )
}
export default IndividualProduct