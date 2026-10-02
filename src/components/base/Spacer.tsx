import React, { useMemo, memo } from 'react';
import { View } from 'react-native';
import { useResponsiveSize } from '@/shared/hooks/useResponsiveSize';

/**
 * Spacing size chuẩn (bội số của 4)
 */
export type SpacingSize = 0 | 1 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16 | 20 | 24;

/**
 * Spacer Props
 */
export interface SpacerProps {
  /** Spacing size (default: 4 = 16px) */
  size?: SpacingSize;
  /** Horizontal spacer (default: vertical) */
  horizontal?: boolean;
}

/**
 * Spacer Component tích hợp responsive gap
 */
export const Spacer: React.FC<SpacerProps> = memo(
  ({ size = 4, horizontal = false }) => {
    const rs = useResponsiveSize();
    const spacingValue = horizontal ? rs.horizontalGap(size * 4) : rs.verticalGap(size * 4);

    const style = useMemo(
      () => (horizontal ? { width: spacingValue } : { height: spacingValue }),
      [horizontal, spacingValue],
    );

    return <View style={style} />;
  },
);

export default Spacer;

export const SpacerSm: React.FC = memo(() => <Spacer size={2} />);
export const SpacerMd: React.FC = memo(() => <Spacer size={4} />);
export const SpacerLg: React.FC = memo(() => <Spacer size={6} />);
export const SpacerXl: React.FC = memo(() => <Spacer size={8} />);
