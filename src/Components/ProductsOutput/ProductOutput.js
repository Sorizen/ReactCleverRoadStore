import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import './ProductsOutput.css';
import {firestore} from "../../fireBase";
import * as PropTypes from "prop-types";
import IndividualProduct from "../IndividualProduct/IndividualProduct";
const ProductOutput = () => {
    const products = useSelector(state => state.products.products);
    return (
        <div className={'ProductsOutput-wrapper'}>
            {products.map((product, index) => {
                    return (<IndividualProduct product={product} key={index} index={index}/>)
                })}
        </div>
    )
}
export default ProductOutput