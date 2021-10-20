import React, {useEffect} from "react";
import './Login.css';
import {useDispatch, useSelector} from "react-redux";
import {fireBase} from "../../fireBase";

const Login = () => {
    const dispatch = useDispatch();
    const setUser = (newName) => {dispatch({type: 'SET_USER', newUser : newName})}
    const email = useSelector(state => state.login.email);
    const setEmail = (newEmail) => {dispatch({type: 'SET_EMAIL', newEmail : newEmail})}
    const password = useSelector(state => state.login.password);
    const setPassword = (newPassword) => {dispatch({type: 'SET_PASSWORD', newPassword : newPassword})}
    const emailError = useSelector(state => state.login.emailError);
    const setEmailError = (newEmailError) => {dispatch({type: 'SET_EmailError', newEmailError : newEmailError})}
    const passwordError = useSelector(state => state.login.emailError);
    const setPasswordError = (newPasswordError) => {dispatch({type: 'SET_PasswordError', newPasswordError : newPasswordError})}
    const hasAccount = useSelector(state => state.login.hasAccount);
    const setHasAccount = (newHasAccount) => {dispatch({type: 'SET_HasAccount', newHasAccount : newHasAccount})}
    useEffect(()=>{
        authListener();
    }, [])
    useEffect(()=>{
        setPasswordError('');
        setEmailError('');
        setPassword('');
        setEmail('');
    }, [hasAccount])
    const clearInputs = () =>{
        setPassword('');
        setEmail('');
    }
    const clearErrors = () =>{
        setPasswordError('');
        setEmailError('');
    }
    const handleLogin = () =>{
        clearInputs();
        fireBase.auth().signInWithEmailAndPassword(email, password).catch(err=>{
            switch (err.code){
                case 'auth/invalid-email':
                case 'auth/user-disabled':
                case 'auth/user-not-found':
                    setEmailError(err.message);
                    break
                case 'auth/wrong-password':
                    setPasswordError(err.message);
                    break
                default: break
            }
        })
    }
    const handleSignUp = () =>{
        clearErrors();
        fireBase.auth().createUserWithEmailAndPassword(email, password).catch(err=>{
            switch (err.code){
                case 'auth/email-already-in-use':
                case 'auth/invalid-email':
                    setEmailError(err.message);
                    break
                case 'auth/weak-password':
                    setPasswordError(err.message);
                    break
                default: break
            }
        })
    }
    const authListener = () =>{
        fireBase.auth().onAuthStateChanged(user =>{
            if(user){
                clearInputs();
                setUser(user);
            }
            else{
                setUser('');
            }
        })
    }
    return (
        <section className={'login'}>
            <div className="loginContainer">
                <label>Username</label>
                <input
                    type="text"
                    autoFocus
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <p className="errorMsg">{emailError}</p>
                <label>Password</label>
                <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p className="errorMsg">{passwordError}</p>
                <div className="btnContainer">
                    {hasAccount ? (
                        <>
                            <button onClick={handleLogin}>Sign in</button>
                            <p>Don`t have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign up</span>
                            </p>
                        </>
                    ) : (
                        <>
                            <button onClick={handleSignUp}>Sign up</button>
                            <p>Do you already have an account? <span onClick={() => setHasAccount(!hasAccount)}>Sign in</span></p>
                        </>
                    )}
                </div>
            </div>
        </section>
    )
}
export default Login