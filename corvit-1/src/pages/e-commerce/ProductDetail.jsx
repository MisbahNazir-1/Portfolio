import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f9fafb' }}>
        <div style={{ width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #10b981', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#f8f9fa', padding: '20px' }}>
        <div style={{ padding: '40px', textAlign: 'center', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', borderRadius: '20px', backgroundColor: '#fff', maxWidth: '400px', width: '100%' }}>
          <h1 style={{ fontSize: '3rem', color: '#10b981', margin: '0 0 10px 0', opacity: 0.3 }}>404</h1>
          <h3 style={{ fontWeight: '700', color: '#1f2937', marginBottom: '10px' }}>Item Not Found</h3>
          <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '20px' }}>ID: {id}</p>
          <Link to="/" style={{ display: 'block', backgroundColor: '#10b981', color: '#fff', textDecoration: 'none', padding: '12px', borderRadius: '10px', fontWeight: '500' }}>Back to Shop</Link>
        </div>
      </div>
    );
  }

  const pName = product.producname || product.productname || "Premium Item";

  return (
    <div style={{ backgroundColor: '#f3f4f6', minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '15px', boxSizing: 'border-box', fontFamily: 'system-ui, sans-serif' }}>
      
      <div style={{ width: '100%', maxWidth: '950px', backgroundColor: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'row', flexWrap: 'wrap', overflow: 'hidden', minHeight: '500px' }}>
        
        {/* Left Side: Product Image Canvas */}
        <div style={{ flex: '1 1 400px', backgroundColor: '#f9fafb', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '30px', position: 'relative', borderRight: '1px solid #f1f5f9' }}>
          <img 
            src={imgbasedURL + product.image} 
            alt={pName}
            style={{ maxHeight: '320px', maxWidth: '100%', objectFit: 'contain', filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.03))' }}
          />
        </div>

        {/* Right Side: Product Details & CTA */}
        <div style={{ flex: '1 1 450px', padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
          
          <div>
            {/* Header info */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 14px', borderRadius: '50px', fontWeight: '600', fontSize: '0.75rem', letterSpacing: '0.5px' }}>IN STOCK</span>
              <span style={{ color: '#9ca3af', fontSize: '0.8rem', fontWeight: '500' }}>SKU: #00{product.id || 'N/A'}</span>
            </div>

            {/* Product Title */}
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#111827', margin: '0 0 15px 0', lineHeight: '1.2' }}>{pName}</h1>

            {/* Price section */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '25px' }}>
              <span style={{ color: '#10b981', fontSize: '2.4rem', fontWeight: '800' }}>${product.actualprice}</span>
              {product.discountprice > 0 && (
                <span style={{ color: '#9ca3af', textDecoration: 'line-through', fontSize: '1.2rem' }}>${product.discountprice}</span>
              )}
            </div>

            {/* Description */}
            <p style={{ color: '#4b5563', fontSize: '1rem', lineHeight: '1.6', margin: '0 0 30px 0' }}>
              Premium organic <strong>{pName}</strong>. Hand-picked at peak maturity to maintain unparalleled organic quality standards and dynamic freshness delivered straight for consumption.
            </p>
          </div>

          {/* Bottom Action Section */}
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center', width: '100%' }}>
            
            {/* Counter Stepper */}
            <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f3f4f6', borderRadius: '12px', padding: '2px' }}>
              <button onClick={() => count > 1 && setCount(count-1)} style={{ border: 'none', background: 'none', padding: '12px 18px', fontSize: '1.2rem', fontWeight: '600', color: '#4b5563', cursor: 'pointer' }}>−</button>
              <span style={{ fontSize: '1rem', fontWeight: '700', color: '#111827', minWidth: '30px', textAlign: 'center' }}>{count}</span>
              <button onClick={() => setCount(count+1)} style={{ border: 'none', background: 'none', padding: '12px 18px', fontSize: '1.2rem', fontWeight: '600', color: '#4b5563', cursor: 'pointer' }}>+</button>
            </div>

            {/* Add To Cart CTA Button */}
            <button style={{ flex: 1, backgroundColor: '#10b981', color: '#ffffff', border: 'none', borderRadius: '12px', height: '52px', fontWeight: '600', fontSize: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 24px', cursor: 'pointer', boxShadow: '0 10px 15px -3px rgba(16, 185, 129, 0.2)', transition: 'transform 0.2s' }}>
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
