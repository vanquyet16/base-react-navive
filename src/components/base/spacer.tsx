/**
 * SPACER COMPONENT
 * ================
 * Flexible spacer component cho layout.
 * Supports horizontal và vertical spacing từ theme.
 *
 */

import React, { useMemo } from 'react';
import { View, type ViewStyle } from 'react-native';
import { spacing as spacingScale } from '@/shared/theme/tokens';

/**
 * Spacing size từ theme scale
 */
export type SpacingSize = keyof typeof spacingScale;

/**
 * Spacer Props
 */
export interface SpacerProps {
  /** Spacing size từ theme scale (default: 4 = 16px) */
  size?: SpacingSize;
  /** Horizontal spacer (default: vertical) */
  horizontal?: boolean;
}

/**
 * Spacer Component
 *
 * @optimized React.memo, useMemo
 * @example
 * // Vertical spacer 16px
 * <Spacer size={4} />
 *
 * // Horizontal spacer 24px
 * <Spacer size={6} horizontal />
 */
export const Spacer: React.FC<SpacerProps> = ({
  size = 4,
  horizontal = false,
}) => {
  const spacingValue = spacingScale[size];

  // Memoize style để avoid tạo object mới mỗi render
  const style = useMemo(
    () => (horizontal ? { width: spacingValue } : { height: spacingValue }),
    [horizontal, spacingValue],
  );

  return <View style={style} />;
};

/**
 * Memoized Spacer export
 */
const MemoizedSpacer = React.memo(Spacer);
export default MemoizedSpacer;

/**
 * Convenience components
 */

/** Small vertical space (8px) - Memoized */
export const SpacerSm: React.FC = React.memo(() => <Spacer size={2} />);

/** Medium vertical space (16px) - Memoized */
export const SpacerMd: React.FC = React.memo(() => <Spacer size={4} />);

/** Large vertical space (24px) - Memoized */
export const SpacerLg: React.FC = React.memo(() => <Spacer size={6} />);

/** XLarge vertical space (32px) - Memoized */
export const SpacerXl: React.FC = React.memo(() => <Spacer size={8} />);
