import styles from "./buttonIcon.module.scss";
import Image from "next/image";
import { ButtonStyle } from "../ButtonStyles"; 

interface Props {
  title?: string;
  icon: string;  
  onClick: () => void;
  style: ButtonStyle;  
}

const ButtonIcon = (props: Props) => {
  let styleClass = styles.White;  // Default style

  // Determine the button style based on the ButtonStyle enum
  if (props.style === ButtonStyle.Red) {
    styleClass = styles.Red;
  } else if (props.style === ButtonStyle.Dark) {
    styleClass = styles.Dark;
  } else if (props.style === ButtonStyle.Black) {
    styleClass = styles.Black;
  }

  const classes = [styles.button, styleClass].join(" ").trim(); // Combine the base button class and style-specific class

  return (
    <button className={classes} onClick={props.onClick}>
      {/* Icon */}
      <Image src={`/Icons/${props.icon}.svg`} alt="icon" width={24} height={24} />
      
      {/* Display title if provided */}
      {props.title && <span>{props.title}</span>}
    </button>
  );
};

export default ButtonIcon;
