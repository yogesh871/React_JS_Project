import './TitleProduct.css';

const SingleProduct = (props) => {

    return (
        <>
         <div className="TitleProduct d-flex flex-column align-items-center justify-content-center ">
                <img src={props.image} alt=""  style={{width :  "80px"}}/>
                <p className='pt-2 '>{props.name}</p>
             </div>
        </>
    )

}
export default  SingleProduct;