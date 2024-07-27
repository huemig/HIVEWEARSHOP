import React from "react";
import facebook from "../../src/assets/images/icons8-facebook-150.svg";
import instagram from "../assets/images/icons8-instagram-150.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div class="blackfooter">
        <div class="flexfooter">
          <div class="learn">
            <h3>Shop and learn</h3>
            <li>
              <Link to="signin/">Sign-in</Link>
            </li>
            <li>
              <Link to="signout/">Sign-Out</Link>
            </li>
            <li>
              <Link to="/">Item list</Link>
            </li>
          </div>
          <div class="support">
            <h3>Support</h3>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
          </div>
        </div>

        <div class="followus">
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" />
        </div>
        <hr />
        <div class="copyright">
          <p>
            COPYRIGHT @ 2021 HIVE Techwear. All rights reserved. Privacy Policy
            Sales Policy Terms of use Legl Site Map
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;