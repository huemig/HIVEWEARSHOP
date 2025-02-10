import React from "react";
import Headers from "../components/header";
import Footer from "../components/footer";

const Thankyou = () => {
  return (
    <>
      <Headers />
      <div class="TY">
        <p>Thank You for choosing HTW_Shop</p>
        <div className="links">
          <a href="https://github.com/huemig">
            <i class="ci ci-github ci-2x"> </i>
          </a>
          <a href="https://www.linkedin.com/in/miguel-huerta-6a2137267/">
            <i class="ci ci-linkedin ci-2x"> </i>
          </a>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Thankyou;
