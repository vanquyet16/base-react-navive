import React, { memo } from 'react';
import { View, StyleProp, ViewStyle } from 'react-native';
import { CustomText } from './CustomText';
import { createStyles } from '@/shared/theme/create-styles';

export interface LabelDividerProps {
  /** Text hiển thị ở giữa divider. Nếu không có thì chỉ hiển thị line. */
  text?: string;
  /** Custom container style */
  style?: StyleProp<ViewStyle>;
}

/**
 * LABEL DIVIDER COMPONENT
 * =======================
 * Divider line với optional text ở giữa.
 * Dùng để ngăn cách các section, ví dụ: "HOẶC ĐĂNG NHẬP BẰNG"
 */
export const LabelDivider: React.FC<LabelDividerProps> = memo(
  ({ text, style }) => {
    const styles = useStyles();

    return (
      <View style={[styles.container, style]}>
        <View style={styles.line} />
        {text && (
          <CustomText style={styles.text} variant="caption">
            {text}
          </CustomText>
        )}
        <View style={styles.line} />
      </View>
    );
  },
);

const useStyles = createStyles((_theme, rs) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: rs.my(16),
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#E5E7EB', // Gray-200
  },
  text: {
    marginHorizontal: rs.mx(12),
    color: '#9CA3AF', // Gray-400
    fontSize: rs.fontSize(12),
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
}));
