import React, { Fragment } from "react";
import styles from "./Header.module.css";

import meals from "../../asset/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";

const Header = (props) => {
  return (
    <Fragment>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={props.onShowCartModal}>
          Cart
        </HeaderCartButton>
      </header>
      <div className={styles["main-image"]}>
        <img src={meals} alt="meals-banner-image" />
      </div>
    </Fragment>
  );
};

export default Header;
