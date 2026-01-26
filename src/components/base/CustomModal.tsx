/**
 * CUSTOM MODAL (ANTD WRAPPER)
 * ============================
 * Custom wrapper cho Ant Design Modal với theme integration
 */

import React, { useMemo } from 'react';
import { Modal, type ModalProps } from '@ant-design/react-native';
import { useTheme } from '@/shared/theme/use-theme';

interface CustomModalProps extends ModalProps {
  /** Custom title style */
  titleColor?: string;
}

/**
 * CustomModal - Wrapper cho Ant Design Modal
 *
 * @optimized React.memo, useMemo
 * @example
 * <CustomModal
 *   visible={visible}
 *   title="Xác nhận"
 *   onClose={() => setVisible(false)}
 * >
 *   <Text>Modal content</Text>
 * </CustomModal>
 */
export const CustomModal: React.FC<CustomModalProps> = ({
  titleColor,
  style,
  ...props
}) => {
  const theme = useTheme();

  // Memoize custom style để avoid tạo array mới mỗi render
  const customStyle = useMemo(
    () => [{ backgroundColor: theme.colors.background }, style],
    [theme.colors.background, style],
  );

  return <Modal style={customStyle} {...props} />;
};

/**
 * Memoized export để prevent unnecessary re-renders
 */
export default React.memo(CustomModal);
