import React, {useEffect} from "react";
import './Header.css';
import {useDispatch, useSelector} from "react-redux";
import {fireBase} from "../../fireBase";
import {NavLink, useHistory} from "react-router-dom";
const Header = (props) =>{
    const history = useHistory();
    const dispatch = useDispatch();
    const email = useSelector(state => state.login.email);
    const password = useSelector(state => state.login.password);
    const handleLogOut = () =>{
        fireBase.auth().signOut(email, password);
    }
    return(
        <header className={'header'}>
            <nav>
                <NavLink className={'header-text'} to={'/'}>CLEVEROAD STORE</NavLink>
                <div className={'header-buttons-wrapper'}>
                    <button className={'header-add-new-product'} onClick={() => history.push('/add-products')}>Add new product</button>
                    <button onClick={handleLogOut}>Logout</button>
                </div>
            </nav>
        </header>
    )
}
export default Header