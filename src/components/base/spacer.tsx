/**
 * SPACER COMPONENT
 * ================
 * Flexible spacer component cho layout.
 * Supports horizontal và vertical spacing từ theme.
 *
 * @senior-pattern Layout helper với theme spacing scale
 */

import React from 'react';
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
 * @example
 * // Vertical spacer 16px
 * <Spacer size={4} />
 *
 * // Horizontal spacer 24px
 * <Spacer size={6} horizontal />
 */
export const Spacer: React.FC<SpacerProps> = ({ size = 4, horizontal = false }) => {
  const spacingValue = spacingScale[size];

  const style: ViewStyle = horizontal ? { width: spacingValue } : { height: spacingValue };

  return <View style={style} />;
};

/**
 * Convenience components
 */

/** Small vertical space (8px) */
export const SpacerSm: React.FC = () => <Spacer size={2} />;

/** Medium vertical space (16px) */
export const SpacerMd: React.FC = () => <Spacer size={4} />;

/** Large vertical space (24px) */
export const SpacerLg: React.FC = () => <Spacer size={6} />;

/** XLarge vertical space (32px) */
export const SpacerXl: React.FC = () => <Spacer size={8} />;
