import React from "react";
import Headers from "../components/header";
import Footer from "../components/footer";
import { Link } from "react-router-dom";
import Mimg from "../assets/images/Banner.png";
import cat1 from "../assets/images/category001.png";
import cat2 from "../assets/images/category002.png";
import cat3 from "../assets/images/category003.png";
import cat4 from "../assets/images/category004.png";

import pls from "../assets/images/plus.svg";
import of1 from "../assets/images/offer001.png";
import of2 from "../assets/images/offer002.png";
import of3 from "../assets/images/offer003.png";
import of4 from "../assets/images/offer004.png";
// import { getProducts } from "../redux/products/selectors";
// import { useSelector } from "react-redux";

const Home = () => {
  // const selector = useSelector((state) => state);

  // const products = getProducts(selector);
  return (
    <>
      <header>
        <Headers />
        <div class="banner">
          <img src={Mimg} alt="banner" />
          <div class="bannertxt">
            <h1>
              Clothing Divine Getting
              <br />
              Everyone's Favorites
            </h1>
            <h2>This Season's most -- loved styles</h2>
          </div>
        </div>
      </header>
      <main>
        <div class="discount">
          <p>
            Get up to 50% off!
            <br />
            on all products and brands
          </p>
          <div class="shop">
            <Link to="/products?gender=Women">Shop Women's</Link>
            <Link to="/products?gender=Men">Shop Men's</Link>
          </div>
        </div>
        <div class="p">
          <h1>Categories</h1>
        </div>
        <div class="hold">
          <div class="cat">
            <div class="category-item">
              <img src={cat1} alt="shirt" />
              <div class="filter">
                {/* <img src={crect} alt="rect" /> */}
              </div>
              <div class="plus">
                <Link to="/products?category=2">
                  <img src={pls} alt="add" />
                </Link>
              </div>
              <div class="name">
                <p>T-Shirts</p>
              </div>
            </div>
            <div class="category-item">
              <img src={cat2} alt="shirt" />
              <div class="filter">
                {/* <img src={crect} alt="rect" /> */}
              </div>
              <div class="plus">
                <Link to="/products?category=3">
                  <img src={pls} alt="add" />
                </Link>
              </div>
              <div class="name">
                <p>Shirts</p>
              </div>
            </div>
            <div class="category-item">
              <img src={cat3} alt="clothing" />
              <div class="filter">
                {/* <img src={crect} alt="rect" /> */}
              </div>
              <div class="plus">
                <Link to="/products?category=4">
                  <img src={pls} alt="add" />
                </Link>
              </div>
              <div class="name">
                <p>Bottoms</p>
              </div>
            </div>
            <div class="category-item">
              <img src={cat4} alt="clothig" />
              <div class="filter">
                {/* <img src={crect} alt="rect" /> */}
              </div>
              <div class="plus">
                <Link to="/products?category=5">
                  <img src={pls} alt="add" />
                </Link>
              </div>
              <div class="name">
                <p>Caps</p>
              </div>
            </div>
          </div>
        </div>
        <div className="items"></div>
        <div class="offers">
          <h1>Offers</h1>
        </div>

        <div class="offer-grid">
          <div class="offer-item">
            <img src={of1} alt="offers" />
            <div class="offer-text">
              <p>Up to 50% Off</p>
              <p>
                On all the <br />
                T-shirt brands
              </p>
            </div>
            <div class="btn">
              <Link to="/products?category=2">Get now</Link>
            </div>
          </div>

          <div class="offer-item">
            <img src={of2} alt="offers" />
            <div class="offer-text">
              <p>Up to 25% Off</p>
              <p>
                On all the <br />
                Hat brands
              </p>
            </div>
            <div class="btn">
              <Link to="/products?category=5">Get now</Link>
            </div>
          </div>
          <div class="offer-item">
            <img src={of3} alt="offers" />
            <div class="offer-text">
              <p>Up to 50% Off</p>
              <p>
                On all the <br />
                Bottom brands
              </p>
            </div>
            <div class="btn">
              <Link to="/products?category=4">Get now</Link>
            </div>
          </div>
          <div class="offer-item">
            <img src={of4} alt="offers" />
            <div class="offer-text">
              <p>Up to 30% off</p>
              <p>
                On all all the <br />
                Shirts brands
              </p>
            </div>
            <div class="btn">
              <Link to="/products?category=3">Get now</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;