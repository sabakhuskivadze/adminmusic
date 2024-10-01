import styles from "./ButtonArrows.module.scss";
import Image from "next/image";

interface ArrowButtonProps {
  direction: "left" | "right";
  icon: string;
  onClick: () => void;
}

const ButtonArrows = ({ direction, onClick, icon }: ArrowButtonProps) => {
  const directionClass = direction === "left" ? styles.left : styles.right;
  const classes = [styles.button, directionClass].join(" ").trim();

  return (
    <button className={classes} onClick={onClick}>
      <Image src={icon} alt={`${direction} arrow`} width={24} height={24} />
    </button>
  );
};

export default ButtonArrows;
