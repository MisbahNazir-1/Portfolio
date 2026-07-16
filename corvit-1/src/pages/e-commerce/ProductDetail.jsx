import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import "./productdetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);

  const imgbasedURL = (import.meta.env.VITE_ECOBAZAR_API_URL || 'http://localhost:3000/api').replace('/api', '');

  useEffect(() => {
    const getProductDetail = async () => {
      if (location.state?.product) {
        setProduct(location.state.product);
        setIsLoading(false);
        return;
      }

      try {
        const ECOBAZAR_API_URL = import.meta.env.VITE_ECOBAZAR_API_URL || 'http://localhost:3000/api';
        const response = await fetch(`${ECOBAZAR_API_URL}/products`);
        const data = await response.json();
        
        if (data?.products) {
          const foundProduct = data.products.find(p => p._id === id || p.id == id);
          setProduct(foundProduct);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setIsLoading(false);
      }
    };
    getProductDetail();
  }, [id, location.state]);

  if (isLoading) {
    return (
      <div className="pd-loader-wrapper">
        <div className="pd-spinner"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pd-notfound-wrapper">
        <div className="pd-notfound-card">
          <h1 className="pd-notfound-code">404</h1>
          <h3 className="pd-notfound-title">Item Not Found</h3>
          <p className="pd-notfound-id">ID: {id}</p>
          <Link to="/" className="pd-notfound-btn">Back to Shop</Link>
        </div>
      </div>
    );
  }

  const pName = product.producname || product.productname || "Premium Item";

  return (
    <div className="product-detail-root">
      <div className="product-detail-layout-container">
        
        <div className="product-detail-image-canvas">
          <img 
            src={imgbasedURL + product.image} 
            alt={pName}
            className="product-detail-main-img"
          />
        </div>

        <div className="product-detail-meta-panel">
          <div>
            <div className="product-detail-badge-row">
              <span className="product-detail-stock-tag">IN STOCK</span>
              <span className="product-detail-sku-tag">SKU: #00{product.id || 'N/A'}</span>
            </div>

            <h1 className="product-detail-title-text">{pName}</h1>

            <div className="product-detail-price-row">
              <span className="product-detail-current-price">${product.actualprice}</span>
              {product.discountprice > 0 && (
                <span className="product-detail-old-price">${product.discountprice}</span>
              )}
            </div>

            <p className="product-detail-desc-text">
              Premium organic <strong>{pName}</strong>. Hand-picked at peak maturity to maintain unparalleled organic quality standards and dynamic freshness delivered straight for consumption.
            </p>
          </div>

          <div className="product-detail-action-footer">
            <div className="product-detail-stepper">
              <button onClick={() => count > 1 && setCount(count-1)} className="stepper-btn">−</button>
              <span className="stepper-value">{count}</span>
              <button onClick={() => setCount(count+1)} className="stepper-btn">+</button>
            </div>

            <button className="product-detail-cart-cta" onClick={() => alert('Product added to cart successfully!')}>        
                    <span>Add to Cart</span>
              <span>${(product.actualprice * count).toFixed(2)}</span>
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetail;
