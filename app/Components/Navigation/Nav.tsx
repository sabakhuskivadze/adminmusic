import React from "react";
import styles from "./Nav.module.scss";
import NavItem from "../NavItem/NavItem";

const Navigation = () => {
  return (
    <div className={styles.nav}>
      <div className={styles.navContent}>
        <NavItem
          navContent={"Personation"}
          backgroundColor={"yellow"}
          visible={true}
        />
        <NavItem
          navContent={"Personal information"}
          backgroundColor={"red"}
          visible={true}
        />
        <NavItem
          navContent={"Personal information"}
          backgroundColor={"yellow"}
          visible={true}
        />

        <NavItem
          navContent={"Personal information"}
          backgroundColor={"red"}
          visible={true}
        />
        <NavItem
          navContent={"Persoasdasdasdnal information"}
          backgroundColor={"yellow"}
          visible={true}
        />

        <NavItem
          navContent={"Personal information"}
          backgroundColor={"red"}
          visible={true}
        />
      </div>
    </div>
  );
};

export default Navigation;
