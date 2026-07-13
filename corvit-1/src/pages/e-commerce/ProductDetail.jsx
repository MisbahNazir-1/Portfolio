import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);

  // Dynamic Image URL Base Path
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
        
        // MongoDB uses _id instead of id usually. Handled both just in case.
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

  // Loading Screen Layout
  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#fcfcfc' }}>
        <div className="spinner-border text-success" role="status" style={{ width: '3rem', height: '3rem' }}>
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  // 404 Product Not Found Layout
  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="p-5 text-center shadow-lg rounded-5 bg-white border-0" style={{ maxWidth: '480px', borderRadius: '24px' }}>
          <div className="display-1 fw-bold text-success mb-3" style={{ opacity: 0.15 }}>404</div>
          <h3 className="fw-bold text-dark mb-2">Product Not Found</h3>
          <p className="text-muted mb-4 small text-break">We couldn't retrieve details for ID: <code className="text-danger">{id}</code></p>
          <Link to="/" className="btn btn-success px-4 py-2.5 rounded-pill shadow-sm fw-medium border-0 w-100" style={{ backgroundColor: '#10b981' }}>
            Return to Marketplace
          </Link>
        </div>
      </div>
    );
  }

  // Fallback for naming variations
  const pName = product.producname || product.productname || "Premium Item";

  return (
    <div style={{ backgroundColor: '#f9fafb', minHeight: '100vh', padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '1140px' }}>
        
        {/* Elegant Minimal Breadcrumb */}
        <nav className="mb-4 ps-1">
          <ol className="breadcrumb m-0 p-0" style={{ fontSize: '0.9rem' }}>
            <li className="breadcrumb-item"><Link to="/" className="text-muted text-decoration-none hover-link">Shop</Link></li>
            <li className="breadcrumb-item active text-dark fw-semibold" aria-current="page">{pName}</li>
          </ol>
        </nav>

        {/* Premium Split Grid Layout */}
        <div className="row g-5 align-items-stretch">
          
          {/* Left Column: Image Canvas */}
          <div className="col-lg-6">
            <div className="d-flex align-items-center justify-content-center p-4 bg-white border border-light position-sticky" style={{ borderRadius: '24px', minHeight: '520px', top: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.02)' }}>
              <div className="image-container overflow-hidden position-relative w-100 h-100 d-flex justify-content-center align-items-center">
                <img 
                  src={imgbasedURL + product.image} 
                  alt={pName}
                  className="img-fluid main-product-img"
                  style={{ maxHeight: '400px', objectFit: 'contain', transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
                />
              </div>
            </div>
          </div>

          {/* Right Column: Product Content Configurator */}
          <div className="col-lg-6 d-flex flex-column justify-content-between py-2">
            <div>
              {/* Status Header */}
              <div className="d-flex align-items-center justify-content-between mb-3">
                <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '6px 14px', borderRadius: '50px', fontWeight: '600', fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                  IN STOCK
                </span>
                <span className="text-secondary tracking-wider" style={{ fontSize: '0.8rem', fontWeight: '500' }}>
                  SKU: #00{product.id || 'N/A'}
                </span>
              </div>
              
              {/* Product Title */}
              <h1 className="fw-extrabold text-dark mb-3" style={{ fontSize: '2.4rem', letterSpacing: '-0.5px', lineHeight: '1.2' }}>
                {pName}
              </h1>
              
              {/* Price Tier Block */}
              <div className="d-flex align-items-baseline gap-3 mb-4">
                <h2 className="m-0 fw-bold" style={{ color: '#10b981', fontSize: '2.2rem' }}>
                  ${product.actualprice}
                </h2>
                {product.discountprice > 0 && (
                  <span className="text-muted text-decoration-line-through fs-5" style={{ opacity: 0.7 }}>
                    ${product.discountprice}
                  </span>
                )}
              </div>

              {/* Separator Line */}
              <hr style={{ borderTop: '1px solid #e5e7eb', margin: '24px 0' }} />

              {/* Meta Specs Overview */}
              <p className="text-secondary mb-4" style={{ lineHeight: '1.75', fontSize: '1.05rem' }}>
                Experience premium tier selection with our meticulously sourced <strong>{pName}</strong>. Hand-picked at peak maturity to maintain unparalleled organic quality standards, dynamic freshness, and optimal nutrient integrity directly delivered for everyday consumption.
              </p>
            </div>

            {/* Functional Call To Action Section */}
            <div className="mt-4 pt-3">
              <div className="row g-3">
                {/* Quantity Control Stepper */}
                <div className="col-auto">
                  <div className="d-flex align-items-center bg-white border" style={{ borderRadius: '14px', padding: '4px', height: '56px', boxShadow: '0 2px 8px rgba(0,0,0,0.01)' }}>
                    <button className="btn border-0 px-3 py-1 font-monospace fw-bold text-secondary text-scale" onClick={() => count > 1 && setCount(count-1)} style={{ fontSize: '1.2rem' }}>−</button>
                    <span className="fw-bold px-3 text-dark" style={{ minWidth: '40px', textAlign: 'center', fontSize: '1.05rem' }}>{count}</span>
                    <button className="btn border-0 px-3 py-1 font-monospace fw-bold text-secondary text-scale" onClick={() => setCount(count+1)} style={{ fontSize: '1.2rem' }}>+</button>
                  </div>
                </div>

                {/* Primary Core Action Button */}
                <div className="col">
                  <button className="btn w-100 buy-btn fw-semibold d-flex justify-content-between align-items-center px-4" style={{ backgroundColor: '#10b981', color: '#fff', border: 'none', borderRadius: '14px', height: '56px', transition: 'all 0.3s ease', boxShadow: '0 10px 20px rgba(16, 185, 129, 0.2)' }}>
                    <span>Add to Cart</span>
                    <span>${(product.actualprice * count).toFixed(2)}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Styled Embed System */}
      <style>{`
        .hover-link:hover { color: #10b981 !important; transition: color 0.2s ease; }
        .image-container:hover .main-product-img { transform: scale(1.04); }
        .text-scale:hover { color: #10b981 !important; transform: scale(1.1); transition: all 0.2s ease; }
        .buy-btn:hover { background-color: #059669 !important; transform: translateY(-2px); box-shadow: 0 12px 24px rgba(5, 150, 105, 0.3) !important; }
        .buy-btn:active { transform: translateY(0); }
      `}</style>
    </div>
  );
};

export default ProductDetail;
