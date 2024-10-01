import FooterItems from "@/public/Consts/FooterImage";
import { useState } from "react";
import styles from "./MobileFooter.module.scss";
import Image from "next/image"; // Import Image from next/image

const MobileFooter = () => {
  const [activeBadge, setActiveBadge] = useState<number>(FooterItems[0].id);

  return (
    <div className={styles.badgeContainer}>
      {FooterItems.map((item) => (
        <div
          className={styles.badgeMap}
          key={item.id}
          onClick={() => setActiveBadge(item.id)}
        >
          <div className={styles.badgeNames}>
            <span className={item.id === activeBadge ? styles.active : ""}>
              {item.name}
            </span>
          </div>
          <div className={styles.footer}>
            <div className={styles.badgePhotos}>
              <Image
                src={item.id === activeBadge ? item.activePhoto : item.photo}
                alt={item.name}
                width={100} 
                height={100}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileFooter;
