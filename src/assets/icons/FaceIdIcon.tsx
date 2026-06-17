import React from 'react';
import Svg, { Path, Rect } from 'react-native-svg';
import { moderateScale } from 'react-native-size-matters';

type FaceIdIconProps = {
  size?: number;
  color?: string;
};

export const FaceIdIcon = ({ size = 24, color = '#000' }: FaceIdIconProps) => {
  const iconSize = moderateScale(size);

  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none">
      <Path
        d="M8 3H7.8C6.12 3 5.28 3 4.64 3.33C4.07 3.61 3.61 4.07 3.33 4.64C3 5.28 3 6.12 3 7.8V8M8 21H7.8C6.12 21 5.28 21 4.64 20.67C4.07 20.39 3.61 19.93 3.33 19.36C3 18.72 3 17.88 3 16.2V16M21 8V7.8C21 6.12 21 5.28 20.67 4.64C20.39 4.07 19.93 3.61 19.36 3.33C18.72 3 17.88 3 16.2 3H16M21 16V16.2C21 17.88 21 18.72 20.67 19.36C20.39 19.93 19.93 20.39 19.36 20.67C18.72 21 17.88 21 16.2 21H16M7.5 8V9.5M16.5 8V9.5M11 12.6C11.8 12.6 12.5 11.9 12.5 11.1V8M15.2 15.2C13.4 17 10.5 17 8.7 15.2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
