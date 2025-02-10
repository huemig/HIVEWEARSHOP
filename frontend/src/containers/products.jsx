import React from "react";
import { agregar, fetchCart, updateCart } from "../redux/cart/cartslice";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import Headers from "../components/header";
import Footer from "../components/footer";
import down from "../assets/images/arrow_drop_down_white_24dp.svg";
import { fetchProducts } from "../redux/products/productslice";
import { useLocation, Link, useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const products = useSelector((state) => state.products.results);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCart());
  }, [dispatch]);

  const searchParams = new URLSearchParams(location.search);
  const category = (searchParams.get("category") || "all").trim();
  const gender = (searchParams.get("gender") || "all").trim();


  const filteredProducts = products.filter(
    (product) =>
      (category === "all" || product.category === parseInt(category, 10)) &&
      (gender === "all" ||
        product.gender.toLowerCase() === gender.toLowerCase())
  );
  console.log("filtered products:", filteredProducts);

  const handleAddToCart = (product) => {
  
    if (!product || !product.id) {
      console.error("Invalid product data before dispatch:", product);
      return;
    }
  
    const existingCartItem = cartItems.find((item) => item.product.id === product.id);
  
    if (existingCartItem) {
      const newQuantity = existingCartItem.quantity + 1;
      dispatch(updateCart({ product: existingCartItem.id, quantity: newQuantity }));
    } else {
      console.log("Dispatching agregar with:", { product: product.id, quantity: 1 });
      dispatch(agregar({ product: product.id, quantity: 1 }));
    }
  };
  const genderSelect = (e) => {
    const selectedGender = e.target.value;
    searchParams.set("gender", selectedGender);
    navigate({ search: searchParams.toString() });
  };

  return (
    <div class="content">
      <Headers />

      <div class="filter-cat">
        <div class="filterlist">
          <select name="category" id="cat" onChange={genderSelect}>
            <option value="all">Filter By Gender</option>
            <option value="Men">Men</option>
            <option value="Women">Women</option>
          </select>
        </div>
        {user.isLoggedin ? <h1>Products</h1> : <h1>Welcome {user.name}</h1>}
      </div>

      <div class="bi-section">
        <div class="cat-list">
          <div class="heading">
            <h1>Category List</h1>
          </div>
          <div class="list">
            <div class="cat-drop">
              <p>All</p>
              <Link to="/products">
                <img src={down} alt="down" />
              </Link>
            </div>
            <div class="cat-drop">
              <p>Shirts</p>
              <Link to="/products?category=2">
                <img src={down} alt="down" />
              </Link>
            </div>
            <div class="cat-drop">
              <p>T-Shirts</p>
              <Link to="/products?category=3">
                <img src={down} alt="down" />
              </Link>
            </div>
            <div class="cat-drop">
              <p>Bottoms</p>
              <Link to="/products?category=4">
                <img src={down} alt="down" />
              </Link>
            </div>
            <div class="cat-drop">
              <p>Caps</p>
              <Link to="/products?category=5">
                <img src={down} alt="down" />
              </Link>
            </div>
          </div>
        </div>

        <div class="tshirt-grid-cont">
          <div class="heading">
            <h1>Men's</h1>
          </div>

          <div class="wheading">
            <h1>T-Shirt</h1>
          </div>

          <div class="tshirt-grid">
            {filteredProducts &&
              filteredProducts.map((product) => (
                <div class="grid-item">
                  <div class="image">
                    <img src={product.image} alt="item" />
                  </div>
                  <div class="info">
                    <p class="name">{product.name}</p>
                    <p>{product.description}</p>
                  </div>
                  <div class="price">
                    <button onClick={() => handleAddToCart(product)}>
                      Add +
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <div class="pages">
        <button>
          <a href="/">1</a>
        </button>

        <button>
          <a href="/">2</a>
        </button>

        <button>
          <a href="/">3</a>
        </button>

        <button>
          <a href="/">4</a>
        </button>

        <button>
          <a href="/">5</a>
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Products;
