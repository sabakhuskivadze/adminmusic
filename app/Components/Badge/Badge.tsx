import styles from "./Badge.module.scss";
import React from "react";
import { BadgeItem } from "@/public/Interfaces/inter";
import Image from "next/image"; // Import the Image component from next/image

type Props = {
  badgeItem: BadgeItem;
  id: number;
  onClick: (value: number) => void;
  isActive: boolean;
};

const Badge = (props: Props) => {
  const { badgeItem, id, onClick, isActive } = props;

  // Ensure image source is defined and valid
  const imgSrc = isActive ? badgeItem.activePhoto : badgeItem.photo;
  const altText = `${badgeItem.name} badge`;

  return (
    <div
      className={isActive ? styles.active : styles.badgeContent}
      onClick={() => onClick(id)}
    >
      {badgeItem.name}
      {imgSrc && (
        <Image
          width={24} // Set width directly as a number
          height={24} // Set height directly as a number
          src={imgSrc}
          alt={altText}
          layout="fixed" // Use fixed layout to maintain size
        />
      )}
    </div>
  );
};

export default Badge;
