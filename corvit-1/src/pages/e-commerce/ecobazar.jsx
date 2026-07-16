import { useEffect, useState } from "react";
import "./ecobazar.css";
import { 
  FaHeart, FaPhone, FaShoppingBag, FaTruck, FaShieldAlt, 
  FaUndo, FaHeadset, FaShoppingCart 
} from 'react-icons/fa';
import { 
  FiStar, FiLayers, FiUser, FiMessageSquare 
} from 'react-icons/fi';
import { useNavigate } from "react-router-dom";
import logo from "../../assets/ecobazar-imgs/logo.png";
import greenapple from '../../assets/ecobazar-imgs/greenapple.jpg'
import brinjal from '../../assets/ecobazar-imgs/brinjal.png';
import lettuce from '../../assets/ecobazar-imgs/lettuce.png';
import rf from '../../assets/ecobazar-imgs/rf.jpg';
import ep from '../../assets/ecobazar-imgs/ep.jpg';
import dr from '../../assets/ecobazar-imgs/dr.jpg';
import cabbage from '../../assets/ecobazar-imgs/cabbage.png';
import cauliflower from '../../assets/ecobazar-imgs/cauliflower.png';
import capsicum from '../../assets/ecobazar-imgs/capsicum.jpg';
import greenchilli from '../../assets/ecobazar-imgs/greenchilli.png';
import girlimg from "../../assets/ecobazar-imgs/girl-img.jpg";
import imggreen from '../../assets/ecobazar-imgs/img-3.jpg';
import imggrey from '../../assets/ecobazar-imgs/img-2.jpg';
import fruits from "../../assets/ecobazar-imgs/fresh-fruits.png";
import vege from "../../assets/ecobazar-imgs/fresh-vege.png";
import beauty from "../../assets/ecobazar-imgs/beauty.png";
import snacks from "../../assets/ecobazar-imgs/snacks.png";
import meat from "../../assets/ecobazar-imgs/meat&fish.png";
import beverage from "../../assets/ecobazar-imgs/beverage.png";
import Bread from "../../assets/ecobazar-imgs/bread&bakery.png";
import cooking from "../../assets/ecobazar-imgs/cooking.png";
import food from "../../assets/ecobazar-imgs/Diabeticfood.png";
import baking from "../../assets/ecobazar-imgs/bakingneeds.png";

function Ecobazar() {
  const [news, setNews] = useState({ products: [] });
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const imgbasedURL = (import.meta.env.VITE_ECOBAZAR_API_URL || 'http://localhost:3000/api').replace('/api', '');

  const NavigateToProductDetail = (item) => {
    navigate(`/productdetail/${item.id}`, { state: { product: item } });
  };

  const getNews = async () => {
    try {
      const ECOBAZAR_API_URL ='https://ecobazar-ruby.vercel.app/api';
      const response = await fetch(`${ECOBAZAR_API_URL}/products`);
      const data = await response.json();
      setNews(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Fetch error:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getNews();
  }, []);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <>
      <header className="top-nav">
        <div className="logo">
          <img src={logo} alt="Logo.png" /> ECOBAZAR
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="icons"><FaShoppingBag/> $57.00 | <FaHeart/></div>
      </header>
      <nav className="main-nav">
        <ul className="nav-links">
          <li>Home ▾</li>
          <li>Shop ▾</li>
          <li>Pages ▾</li>
          <li>Blog ▾</li>
          <li>About Us</li>
          <li>Contact Us</li>
        </ul>
        <div className="phone"><FaPhone/> (219) 555-0114</div>
      </nav>
      <section className="hero-container">
        <div className="main-hero">
          <h1 className="fs-bolder fx-6">
            <span className="line">Fresh & Healthy</span>
            <span className="line">Organic Food</span>
          </h1>
          <span className="badge fs-bold">Sale up to <span className="text-orange">30% OFF</span></span>
          <p>Free shipping on all your orders.</p>
          <br />
          <button className="btn-white">Shop now →</button>
        </div>
        <div className="side-banners">
          <div className="banner summer">
            <small>SUMMER SALE</small>
            <h3>75% OFF</h3>
            <p>Only Fruit & Vegetable</p>
            <a href="#">Shop Now →</a>
          </div>
          <div className="banner deal">
            <small>BEST DEAL</small>
            <h3>
              Special Products <br /> Deal of the Month
            </h3>
            <a href="#">Shop Now →</a>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="feature-item">
          <h4><FaTruck className="icon-style"/>Free Shipping</h4>
          <p>Free shipping on all your order</p>
        </div>
        <div className="feature-item">
          <h4><FaHeadset className="icon-style"/>Customer Support 24/7</h4>
          <p>Instant access to support</p>
        </div>
        <div className="feature-item">
          <h4><FaShieldAlt className="icon-style"/>100% Secure Payment</h4>
          <p>We ensure your money is safe</p>
        </div>
        <div className="feature-item">
          <h4><FaUndo className="icon-style"/>Money-Back Guarantee</h4>
          <p>30 Days Money-Back Guarantee</p>
        </div>
      </section>
      <div className="section-header">
        <h2>Popular Categories</h2>
        <a href="#" className="view-all">
          View All →
        </a>
      </div>
      <div className="category-grid">
        <div className="category-card">
          <img src={fruits} alt="Fruit" />
          <p>Fresh Fruit</p>
        </div>
        <div className="category-card active">
          <img src={vege} alt="Veg" />
          <p>Fresh Vegetables</p>
        </div>
        <div className="category-card">
          <img src={meat} alt="Meat" />
          <p>Meat & Fish</p>
        </div>
        <div className="category-card">
          <img src={snacks} alt="Snacks" />
          <p>Snacks</p>
        </div>
        <div className="category-card">
          <img src={beverage} alt="Bev" />
          <p>Beverages</p>
        </div>
        <div className="category-card">
          <img src={beauty} alt="Health" />
          <p>Beauty & Health</p>
        </div>
        <div className="category-card">
          <img src={baking} alt="Baking Needs" />
          <p>Baking Needs</p>
        </div>
        <div className="category-card">
          <img src={Bread} alt="Breads" />
          <p>Bread & Bakery</p>
        </div>
        <div className="category-card">
          <img src={cooking} alt="Cooking" />
          <p>Cooking</p>
        </div>
        <div className="category-card">
          <img src={food} alt="Food" />
          <p>Diabetic Food</p>
        </div>
      </div>
          <div className="popular-products-wrapper">
        <div className="section-header">
          <h2>Popular Products</h2>
        </div>

        <div className="category-grid">
          {news.products.map((product) => (
            <div
              className="product-card"
              key={product.id}
              onClick={() => NavigateToProductDetail(product)} 
            >
              {product.discountprice > 0 && (
                <span className="sale-badge">Sale</span>
              )}

              <img
                src={`${imgbasedURL}${product.image}`}
                alt={product.producname}
              />

              <p className="product-name">{product.producname}</p>
              <p className="price">${product.actualprice}</p>

              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="star-filled" />
                ))}
              </div>
              <button className="cart-btn" onClick={(e) => e.stopPropagation()}>
                <FaShoppingCart />
              </button>
            </div>
          ))}
        </div>
      </div>

      <section className="promo-banners">
        <div className="promo-card blue">
          <small>BEST DEALS</small>
          <h3>Sale of the Month</h3>
          <div className="timer-grid">
            <b>00:02:18:46</b>
          </div>
          <a href="#" className="promo-btn">
            Shop Now →
          </a>
        </div>
        <div className="promo-card black">
          <small>85% FAT FREE</small>
          <h3>Low-Fat Meat</h3>
          <p>
            Started at <span className="text-yellow">$79.99</span>
          </p>
          <a href="#" className="promo-btn">
            Shop Now →
          </a>
        </div>
        <div className="promo-card yellow">
          <small>SUMMER SALE</small>
          <h3>100% Fresh Fruit</h3>
          <p>
            Up to <b className="blk-clr">64% OFF</b>
          </p>
          <a href="#" className="promo-btn">
            Shop Now →
          </a>
        </div>
      </section>

      <div className="section-header">
        <h2>Hot Deals</h2>
        <a href="#" className="view-all-link">
          View All →
        </a>
      </div>

      <section className="deals-container">
        <div className="featured-product">
          <img src={greenapple} alt="Green Apples" />
          <button className="add-to-cart-btn">Add to Cart <FaShoppingCart/></button>
          <h3>Green Apple</h3>
          <p className="price">
            <b>$12.00</b>{" "}
            <span className="old-price-text">
              $24.00
            </span>
          </p>
          <div className="feedback-stars">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} className="star-filled" />
            ))}
            <span className="feedback-count">(524 Feedback)</span>
          </div>
          <p className="ends-text">
            Hurry up! Offer ends in:
          </p>
          <div className="timer-grid">
            <div className="timer-box">
              <b>01</b>DAYS
            </div>
            <div className="timer-box">
              <b>23</b>HOURS
            </div>
            <div className="timer-box">
              <b>34</b>MINS
            </div>
            <div className="timer-box">
              <b>57</b>SECS
            </div>
          </div>
        </div>

        <div className="product-grid">
          <div className="small-card">
            <img src={cabbage} alt="Cabbage" />
            <h4>Chinese cabbage</h4>
            <div className="price">$12.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
          <div className="small-card">
            <img src={lettuce} alt="Lettuce" />
            <h4>Green Lettuce</h4>
            <div className="price">$9.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
          <div className="small-card">
            <img src={brinjal} alt="Eggplant" />
            <h4>Eggplant</h4>
            <div className="price">$34.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
          <div className="small-card">
            <img src={cauliflower} alt="Cauliflower" />
            <h4>Fresh Cauliflower</h4>
            <div className="price">$12.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
          <div className="small-card">
            <img src={capsicum} alt="Capsicum" />
            <h4>Green Capsicum</h4>
            <div className="price">$9.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
          <div className="small-card">
            <img src={greenchilli} alt="Chili" />
            <h4>Green Chili</h4>
            <div className="price">$34.00</div>
            <div className="cart-icon"><FaShoppingCart/></div>
          </div>
        </div>
      </section>

      <div className="container">
        <h2 className="section-title">Latest News</h2>
        <div className="news-grid">
          <div className="news-card">
            <div className="news-image-1">
              <div className="date-badge">
                18 <span>Nov</span>
              </div>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span><FiLayers /> Food</span> <span><FiUser /> By Admin</span> <span><FiMessageSquare /> 65</span>
              </div>
              <h3>Curabitur porttitor orci eget neque accumsan venenatis.</h3>
              <a href="#" className="read-more">
                Read More →
              </a>
            </div>
          </div>

                <div className="news-card">
            <div className="news-image-2">
              <div className="date-badge">
                29 <span>Jan</span>
              </div>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span><FiLayers /> Food</span> <span><FiUser /> By Admin</span> <span><FiMessageSquare /> 65</span>
              </div>
              <h3>Eget lobortis lorem lacinia. Vivamus pharetra semper.</h3>
              <a href="#" className="read-more">
                Read More →
              </a>
            </div>
          </div>
          <div className="news-card">
            <div className="news-image-3">
              <div className="date-badge">
                21 <span>Feb</span>
              </div>
            </div>
            <div className="news-content">
              <div className="news-meta">
                <span><FiLayers /> Food</span> <span><FiUser /> By Admin</span> <span><FiMessageSquare /> 65</span>
              </div>
              <h3>Maecenas blandit risus elementum mauris malesuada.</h3>
              <a href="#" className="read-more">
                Read More →
              </a>
            </div>
          </div>
        </div>
      </div>

      <section className="testimonial-section">
        <div className="testimonial-header">
          <h2>Client Testimonials</h2>
          <div className="nav-arrows">
            <button className="nav-arrow-left">
              ←
            </button>
            <button className="nav-arrow-right">
              →
            </button>
          </div>
        </div>
        <div className="testimonial-grid">
          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <p className="testimonial-text">
              Pellentesque eu nibh eget mauris congue mattis vitae nec tellus.
              Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
              sodales.
            </p>
            <div className="client-info">
              <div className="client-profile">
                <img src={rf} alt="Robert pic" />
                <div className="client-name">
                  <h4>Robert Fox</h4>
                  <p>Customer</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="star-filled" />
                ))}
              </div>
            </div>
          </div>
          
          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <p className="testimonial-text">
              Pellentesque eu nibh eget mauris congue mattis vitae nec tellus.
              Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
              sodales.
            </p>
            <div className="client-info">
              <div className="client-profile">
                <img src={dr} alt="Dianne pic" />
                <div className="client-name">
                  <h4>Dianne Russell</h4>
                  <p>Customer</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="star-filled" />
                ))}
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="quote-icon">“</div>
            <p className="testimonial-text">
              Pellentesque eu nibh eget mauris congue mattis vitae nec tellus.
              Phasellus imperdiet elit eu magna dictum, bibendum cursus velit
              sodales.
            </p>
            <div className="client-info">
              <div className="client-profile">
                <img src={ep} alt="Eleanor pic" />
                <div className="client-name">
                  <h4>Eleanor Pena</h4>
                  <p>Customer</p>
                </div>
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} className="star-filled" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="brand-logos">
        <div className="brand-step-highlight">steps</div>
        <div>MANGO</div>
        <div>food</div>
        <div>FOOD</div>
        <div>BOOK OFF</div>
        <div>G Series</div>
      </div>

      <div className="container insta-section">
        <h2>Follow us on Instagram</h2>
        <div className="insta-grid">
          <div
            className="insta-img insta-img-1"
            style={{ backgroundImage: `url(${insta1})` }}
          />
          <div
            className="insta-img insta-img-2"
            style={{ backgroundImage: `url(${insta2})` }}
          />
          <div
            className="insta-img insta-img-3"
            style={{ backgroundImage: `url(${insta3})` }}
          />
          <div
            className="insta-img insta-img-4"
            style={{ backgroundImage: `url(${insta4})` }}
          />
          <div
            className="insta-img insta-img-5"
            style={{ backgroundImage: `url(${insta5})` }}
          />
          <div
            className="insta-img insta-img-6"
            style={{ backgroundImage: `url(${insta6})` }}
          />
        </div>
      </div>
      <section className="newsletter-bar">
        <div className="newsletter-text">
          <h3>Subscribe our Newsletter</h3>
          <p>
            Pellentesque eu nibh eget mauris congue mattis vitae nec tellus.
            Phasellus imperdiet elit eu magna.
          </p>
        </div>
        <div className="newsletter-input">
          <input type="email" placeholder="Your email address" />
          <button>Subscribe</button>
        </div>
        <div className="social-icons">
          <span>f</span> <span>t</span> <span>p</span> <span>i</span>
        </div>
      </section>

      <footer>
        <div className="footer-grid">
          <div className="footer-about">
            <div className="footer-logo">
              <span><img src={logo} alt="logo"/></span> Ecobazar
            </div>
            <p>
              Morbi cursus porttitor enim lobortis molestie. Duis gravida turpis
              velit, eget vulputate magna congue nec.
            </p>
            <div className="footer-contact">
              <span>(219) 555-0114</span> or <span>Proxy@gmail.com</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>My Account</h4>
            <ul>
              <li>
                <a href="#">My Account</a>
              </li>
              <li>
                <a href="#">Order History</a>
              </li>
              <li>
                <a href="#">Shopping Cart</a>
              </li>
              <li>
                <a href="#">Wishlist</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Helps</h4>
            <ul>
              <li>
                <a href="#">Contact</a>
              </li>
              <li>
                <a href="#">Faqs</a>
              </li>
              <li>
                <a href="#">Terms & Condition</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Proxy</h4>
            <ul>
              <li>
                <a href="#">About</a>
              </li>
              <li>
                <a href="#">Shop</a>
              </li>
              <li>
                <a href="#">Product</a>
              </li>
              <li>
                <a href="#">Track Order</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Categories</h4>
            <ul>
              <li>
                <a href="#">Fruit & Vegetables</a>
              </li>
              <li>
                <a href="#">Meat & Fish</a>
              </li>
              <li>
                <a href="#">Bread & Bakery</a>
              </li>
              <li>
                <a href="#">Beauty & Health</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Ecobazar eCommerce © 2021. All Rights Reserved</p>
          <div className="payment-methods">
            ApplePay | Visa | Discover | Mastercard | Secure
          </div>
        </div>
      </footer>
    </>
  );
}

export default Ecobazar;
