/**
 * CUSTOM MODAL (ANTD WRAPPER)
 * ============================
 * Custom wrapper cho Ant Design Modal với theme integration
 */

import React from 'react';
import { Modal, type ModalProps } from '@ant-design/react-native';
import { useTheme } from '@/theme/use-theme';

interface CustomModalProps extends ModalProps {
  /** Custom title style */
  titleColor?: string;
}

/**
 * CustomModal - Wrapper cho Ant Design Modal
 * 
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

  const customStyle = [
    { backgroundColor: theme.colors.background },
    style,
  ];

  return (
    <Modal
      style={customStyle}
      {...props}
    />
  );
};

export default CustomModal;
