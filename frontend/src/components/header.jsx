import React from "react";
import search from "../../src/assets/images/search.png";
import cart from "../../src/assets/images/cart.png";
import { Link } from "react-router-dom";
import { logOut } from "../redux/users/userslice";
import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <header>
      <nav>
        <div class="left-nav">
          <Link to="/">
            Hive <br />
            Techware
          </Link>
        </div>
        <div class="right-nav">
          <div class="search">
            <input type="search" placeholder="Search" />
            <img src={search} alt="search" />
          </div>

          {user.isLoggedin ? (
            <button onClick={() => dispatch(logOut(user))}>logout</button>
          ) : (
            <>
              <Link to="/login">signin</Link> <Link to="/signup">SignUp</Link>
            </>
          )}
          <Link to="/cart">
            <img src={cart} alt="cart" />
          </Link>
        </div>
      </nav>
    </header>
  );
};
export default Header;