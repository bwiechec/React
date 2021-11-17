import classes from './App.module.css'
import ProductData from './Util/ProductData';
import ProductPreview from './ProductPreview/ProductPreview';
import ProductDetails from './ProductDetails/ProductDetails';
import Topbar from './Topbar/Topbar';
import React from 'react';

class App extends React.Component {
  state = {
    productData: ProductData,
    currentPrevImg: ProductData.colorOptions[1].imageUrl,
    currentPrevImgPos: 1,
    currentSelectedFeature: 1
  }

  onChangeFeature = (pos) =>{
    this.setState({
      currentSelectedFeature: pos
    })
  }

  onChangePrevImg = (pos) =>{
    const updatedPrevImg = this.state.productData.colorOptions[pos].imageUrl;
    this.setState({
      currentPrevImg: updatedPrevImg,
      currentPrevImgPos: pos
    })
  }

  render(){
    return (
      <div className="App">
          <Topbar />
        <div className={classes.MainContainer}>
          
          <div className={classes.ProductPreview}>
            <ProductPreview currentPrevImg={this.state.currentPrevImg}
            currentSelectedFeature = {this.state.currentSelectedFeature}/>
          </div>
  
          <div className={classes.ProductData}>
            <ProductDetails data={this.state.productData} 
            currentPrevImgPos={this.state.currentPrevImgPos}
            currentSelectedFeature = {this.state.currentSelectedFeature}
            onChangeFeature={this.onChangeFeature}
            onChangePrevImg={this.onChangePrevImg}/>
          </div>        
        </div>
      </div>
    );
  }
}

export default App;
