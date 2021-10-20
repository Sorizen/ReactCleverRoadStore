import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {firestore, storage} from "../../fireBase";
import {useHistory} from "react-router-dom";
const EditProducts = () =>{
    const dispatch = useDispatch();
    const history = useHistory();
    const title = useSelector(state => state.forEdit.title);
    const description = useSelector(state => state.forEdit.description);
    const price = useSelector(state => state.forEdit.price);
    const image = useSelector(state => state.forEdit.image);
    const sale = useSelector(state => state.forEdit.sale);
    const saleEnds = useSelector(state => state.forEdit.saleEnds);
    const uploadError = useSelector(state => state.forEdit.uploadError);
    const setUploadError = (newUploadError) => {dispatch({type: 'SET_NEW_PRODUCT_UPLOAD_ERROR_FOR_EDIT', newUploadError : newUploadError})};
    const successMessage = useSelector(state => state.newProduct.successMessage);
    const setSuccessMessage = (newSuccessMessage) => {dispatch({type: 'SET_NEW_PRODUCT_SUCCESS_MESSAGE_FOR_EDIT', newSuccessMessage : newSuccessMessage})};
    const imgError = useSelector(state => state.newProduct.imgError);
    const setImgError = (newImgError) => {dispatch({type: 'SET_NEW_PRODUCT_IMG_ERROR_FOR_EDIT', newImgError : newImgError})};
    const setTitle = (newTitle) => {dispatch({type: 'SET_NEW_PRODUCT_TITLE_FOR_EDIT', newTitle : newTitle})}
    const setDescription = (newDescription) => {dispatch({type: 'SET_NEW_PRODUCT_DESCRIPTION_FOR_EDIT', newDescription : newDescription})}
    const setPrice = (newPrice) => {dispatch({type: 'SET_NEW_PRODUCT_PRICE_FOR_EDIT',newPrice : newPrice})}
    const setImage = (newImage) => {dispatch({type: 'SET_NEW_PRODUCT_IMAGE_FOR_EDIT',newImage : newImage})}
    const setSale = (newSale) => {dispatch({type: 'SET_NEW_PRODUCT_SALE_FOR_EDIT', newSale : newSale})}
    const setSaleEnds = (newSaleEnds) => {dispatch({type: 'SET_NEW_PRODUCT_SALE_ENDS_FOR_EDIT', newSaleEnds : newSaleEnds})};
    const [inputError, setInputError] = useState(false);
    const [imageDownload, setImageDownload] = useState(false);
    const types = ['image/jpeg', 'image/jpg', 'image/png', 'image/PNG'];
    const addImg = (e) =>{
        setImageDownload(true);
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setImage(selectedFile);
                setImgError('');
            }
            else{
                setImage(null);
                setImgError('Choose correct file!')
            }
        }
        else{
            console.log('Select file, please')
        }
    }
    const addProducts = (e) =>{
        e.preventDefault();
        const uploadTask = storage.ref(`product-images/${image.name}`).put(image);
        uploadTask.on('state_changed', snapshot => {
            const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100
        }, error => setUploadError(error.message), ()=>{
            storage.ref('product-images').child(image.name).getDownloadURL().then(url => {
                firestore.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    sale: Number(sale),
                    saleEnds,
                    url
                }).then(()=>{
                    setSuccessMessage('Success!');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    setSale('');
                    setSaleEnds('');
                    document.getElementById('file').value = '';
                    setImgError('');
                    setUploadError('');
                    setTimeout(()=>{setSuccessMessage('')}, 3000);
                }).catch(err=>setUploadError(err.message))
            })
        })
    }
    const addProductsDefaultImg = (e) =>{
        e.preventDefault()
                firestore.collection('Products').add({
                    title,
                    description,
                    price: Number(price),
                    sale: Number(sale),
                    saleEnds,
                    url: image,
                }).then(()=>{
                    setSuccessMessage('Success!');
                    setTitle('');
                    setDescription('');
                    setPrice('');
                    setSale('');
                    setSaleEnds('');
                    document.getElementById('file').value = '';
                    setImgError('');
                    setUploadError('');
                    setTimeout(()=>{setSuccessMessage('')}, 3000);
                    history.push('/');
                }).catch(err=>setUploadError(err.message))
    }
    const isInt = (n) =>{
        if(Number(n) % 1 === 0)
            return true
        else
            return false
    }
    const checkInput = (title, description, price, sale) =>{
        if((title.length > 19 && title.length < 60) && ((description.length > 0 && description.length < 200) || description === '') && (Number(price) > 0 && Number(price) < 100000000) && ((Number(sale) > 9 && Number(sale) && isInt(sale)) || sale === '')){
            return true
        }
        else{
            return false
        }
    }
    return(
        <div className={'AddProducts-wrapper'}>
            <h2 className={'AddProducts-header'}>Edit products</h2>
            {successMessage&&<h3>{successMessage}</h3>}
            <form autoComplete={'off'} className={'AddProducts-input-form'} onSubmit={checkInput(title, description, price, sale) ? (imageDownload ? addProducts : addProductsDefaultImg) : (e)=>{e.preventDefault();setInputError(true)}}>
                <label className={'AddProducts-product-title'}>Product title</label>
                <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" required className={'AddProducts-input-product-title'}/>
                <label className={'AddProducts-product-description'}>Product description</label>
                <input value={description} onChange={(e)=>setDescription(e.target.value)} type="text" className={'AddProducts-input-product-description'}/>
                <label className={'AddProducts-product-price'}>Product price (in $)</label>
                <input value={price} type={"number"} onChange={(e)=>setPrice(e.target.value)} required className={'AddProducts-input-product-price'}/>
                <label className={'AddProducts-product-sale'}>Product sale (in %)</label>
                <input value={sale} type={"number"} onChange={(e)=>setSale(e.target.value)} className={'AddProducts-input-product-sale'}/>
                <label className={'AddProducts-product-sale-ends'}>Product sale ends</label>
                <input value={saleEnds} type="date" id="start" name="trip-start" value={saleEnds} min={"2021-10-18"} max="2021-12-31" required={sale !== '' ? true : false} onChange={(e)=>setSaleEnds(e.target.value)} className={'AddProducts-input-product-sale-ends'}/>
                <label className={'AddProducts-product-photo'}>Product photo</label>
                <h3 style={{fontSize: '14px', width: '300px', marginBottom: '10px', color: 'grey'}}>If you do not want to change the photo - leave the field with the picture blank</h3>
                <input onChange={addImg} type="file" id={'file'} className={'AddProducts-input-product-photo'}/>
                {imgError&&<h3 className={'AddProducts-error'}>Error: {imgError}</h3>}
                {inputError ? <h3 className={'AddProducts-error'}>Error: wrong input</h3> : null}
                <div className={'AddProducts-button-wrapper'}>
                    <button className={'AddProducts-button'} type={'submit'}>Submit</button>
                </div>
            </form>
            {uploadError&&<h3 className={'AddProducts-error'}>Error: {uploadError}</h3>}
        </div>
    )
}
export default EditProducts