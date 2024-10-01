import React from "react";
import Image from "next/image"; // Import Image from next/image

type Props = {
  src: string;
  name: string;
  height?: string;
  width?: string;
  isActive: boolean;
  onClick: () => void;
};

const BadgeIcon = ({ src, name, height, width, isActive, onClick }: Props) => {
  return (
    <Image
      src={src}
      height={parseInt(height || "24")} // Default height to 24 if not provided
      width={parseInt(width || "24")} // Default width to 24 if not provided
      alt={name}
      onClick={onClick}
      style={{ cursor: "pointer" }}
      layout="fixed" // Use fixed layout to maintain size
    />
  );
};

export default BadgeIcon;
