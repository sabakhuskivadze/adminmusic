import React from "react";
import styles from "./NavItem.module.scss";

type Props = {
  visible: boolean;
  navContent: string;
  backgroundColor: string;
};

const NavItem = (props: Props) => {
  return (
    <div className={props.visible ? styles.sale : styles.hidden}>
      {props.visible && (
        <div className={styles.nav}>
          <div className={styles.navContent}>
            <div
              className={styles.navItem}
              style={{ backgroundColor: props.backgroundColor }}
            >
              <span>{props.navContent}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavItem;
