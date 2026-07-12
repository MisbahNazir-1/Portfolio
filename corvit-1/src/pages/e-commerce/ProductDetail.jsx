import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';

const ProductDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(1);

  const imgbasedURL = "VITE_ECOBAZAR_API_URL";

  useEffect(() => {
    const getProductDetail = async () => {
      if (location.state?.product) {
        setProduct(location.state.product);
        setIsLoading(false);
        return;
      }

      // Step 2: Agar direct URL par aaye hain, toh API se fetch karein
      try {
        const response = await fetch("VITE_ECOBAZAR_API_URL/api/products");
        const data = await response.json();
        
        if (data?.products) {
          // FIX: Number aur String ka farq khatam karne ke liye == use karein
          const foundProduct = data.products.find(p => p.id == id);
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
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className='spinner-grow text-success' role="status"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="p-5 shadow-sm rounded-4 bg-white text-center" style={{ maxWidth: '500px' }}>
          <h1 className="display-1 text-muted">404</h1>
          <h3 className="fw-bold">Oops! Product Not Found</h3>
          <p>ID searched: {id}</p>
          <Link to="/" className="btn btn-success px-4 rounded-pill mt-3">Return to Shop</Link>
        </div>
      </div>
    );
  }

  // API mein 'producname' (without 't') hai, usay handle kiya
  const pName = product.producname || product.productname || "Product";

  const styles = {
    wrapper: { backgroundColor: '#f8f9fa', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' },
    card: { borderRadius: '24px', border: 'none', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.08)', maxWidth: '1000px', width: '100%' },
    badge: { backgroundColor: '#e6f7e7', color: '#00b207', padding: '8px 16px', borderRadius: '50px', fontWeight: 'bold', fontSize: '0.8rem' },
    price: { color: '#00b207', fontWeight: 'bold', margin: 0 },
    discount: { fontSize: '1.2rem', color: '#6c757d', textDecoration: 'line-through' },
    quantityBox: { display: 'flex', alignItems: 'center', border: '2px solid #eee', borderRadius: '12px', backgroundColor: '#f8f9fa' },
    addToCartBtn: { backgroundColor: '#00b207', border: 'none', padding: '16px', fontWeight: 'bold', borderRadius: '12px', transition: '0.3s', color: 'white' }
  };

  return (
    <div style={styles.wrapper}>
      <div className="container p-0">
        <nav className="mb-3 ps-2">
          <ol className="breadcrumb bg-transparent p-0 m-0">
            <li className="breadcrumb-item"><Link to="/" className="text-success text-decoration-none fw-medium">Shop</Link></li>
            <li className="breadcrumb-item active text-dark">{pName}</li>
          </ol>
        </nav>

        <div className="card" style={styles.card}>
          <div className="row g-0">
            <div className="col-md-6 d-flex align-items-center justify-content-center bg-light p-4" style={{ minHeight: '450px' }}>
              <div style={{ 
                padding: '15px', backgroundColor: '#fff', borderRadius: '20px', 
                boxShadow: '0 10px 25px rgba(0,0,0,0.1)', width: 'fit-content'
              }}>
                <img 
                  src={imgbasedURL + product.image} 
                  alt={pName}
                  className="img-fluid transition-up"
                  style={{ maxHeight: '350px', width: 'auto', borderRadius: '12px' }}
                />
              </div>
            </div>

            <div className="col-md-6 p-4 p-lg-5 bg-white d-flex flex-column justify-content-center">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span style={styles.badge}>IN STOCK</span>
                <span className="text-muted small">SKU: #00{product.id}</span>
              </div>
              
              <h1 className="fw-bold mb-3 text-dark" style={{ fontSize: '2.5rem' }}>{pName}</h1>
              
              <div className="d-flex align-items-center gap-3 mb-4">
                <h2 style={styles.price}>${product.actualprice}</h2>
                {product.discountprice > 0 && (
                  <span style={styles.discount}>${product.discountprice}</span>
                )}
              </div>

              <p className="text-secondary mb-4" style={{ lineHeight: '1.7', fontSize: '1.1rem' }}>
                Premium organic <strong>{pName}</strong>. Hand-picked for the highest quality and nutritional value. 
              </p>

              <div className="row g-3 align-items-center mt-auto">
                <div className="col-auto">
                  <div style={styles.quantityBox}>
                    <button className="btn border-0 px-3 py-2" onClick={() => count > 1 && setCount(count-1)}>-</button>
                    <span className="fw-bold px-2">{count}</span>
                    <button className="btn border-0 px-3 py-2" onClick={() => setCount(count+1)}>+</button>
                  </div>
                </div>

                <div className="col">
                  <button className="btn w-100 shadow-sm hover-grow" style={styles.addToCartBtn}>
                    Add to Cart — ${(product.actualprice * count).toFixed(2)}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        .transition-up:hover { transform: scale(1.05); transition: 0.4s ease; }
        .hover-grow:hover { filter: brightness(1.1); transform: translateY(-2px); }
      `}</style>
    </div>
  );
};

export default ProductDetail;
