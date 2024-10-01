
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
      height={height ? parseInt(height) : 24} 
      width={width ? parseInt(width) : 24}   
      alt={name}
      onClick={onClick}
    />
  );
};

export default Icon;
