import React from 'react'
import classes from './ProductDetails.module.css'

const ProductDetails = (props) => {

    const colorOptions = props.data.colorOptions.map((item, pos) =>{
        const classArr = [classes.ProductImage];
        if(props.currentPrevImgPos == pos){
            classArr.push(classes.SelectedProductImage);
        }
        return(
            <img onClick={() => props.onChangePrevImg(pos)} key={pos} className={classArr.join(' ')} src={item.imageUrl} alt={item.styleName}/>
        )
    })

    const featureList = props.data.featureList.map((item, pos) =>{
        const classArr = [classes.FeatureItem];
        if(!props.currentSelectedFeature === pos){
            classArr.push(classes.SelectedFeatureItem);
        }
        else if(props.currentSelectedFeature === pos){
            classArr.push(classes.SelectedFeatureItem);
        }
        return (
            <button onClick={() => props.onChangeFeature(pos)} key={pos} className={classArr.join(' ')}>{item}</button>
        )
    })

    return(
        <div>
            <h1 className={classes.ProductTitle}>{props.data.title}</h1>

            <p className={classes.ProductDescription}>{props.data.description}</p>

            <h3 className={classes.SectionHeading}>Select Color</h3>

            <div>
                {colorOptions}
            </div>

            <h3 className={classes.SectionHeading}>Features</h3>

            <div>
                {featureList}
            </div>

            <button className={classes.PrimaryButton}>Buy now</button>
        </div>
    );
}

export default ProductDetails;