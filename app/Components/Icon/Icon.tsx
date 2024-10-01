import styles from './icon.module.scss';
import React from 'react';
import Image from 'next/image';

type Props = {
  name: string;
  height?: string;
  width?: string;
  isActive?: boolean;
  onClick?: () => void; 
};

const Icon = ({ name, height, width, isActive, onClick }: Props) => {
  const iconSrc = isActive ? `/Icons/${name}Active.svg` : `/Icons/${name}.svg`;
  
  return (
    <Image
      src={iconSrc}
      height={height ? parseInt(height) : 24} // Default height if not provided
      width={width ? parseInt(width) : 24}   // Default width if not provided
      alt={name}
      onClick={onClick}
    />
  );
};

export default Icon;
