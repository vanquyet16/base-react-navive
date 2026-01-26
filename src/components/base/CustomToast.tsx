/**
 * CUSTOM TOAST (ANTD WRAPPER)
 * ============================
 * Custom wrapper cho Ant Design Toast với theme integration
 * Thêm helper methods để show toast dễ dàng hơn
 */

import { Toast } from '@ant-design/react-native';

/**
 * CustomToast - Helper methods cho Toast
 * 
 * @example
 * CustomToast.success('Thành công!');
 * CustomToast.error('Có lỗi xảy ra!');
 * CustomToast.loading('Đang xử lý...');
 */
export const CustomToast = {
  /**
   * Show success toast
   */
  success: (message: string, duration = 2) => {
    Toast.success(message, duration);
  },

  /**
   * Show error toast
   */
  error: (message: string, duration = 3) => {
    Toast.fail(message, duration);
  },

  /**
   * Show info toast
   */
  info: (message: string, duration = 2) => {
    Toast.info(message, duration);
  },

  /**
   * Show loading toast
   */
  loading: (message = 'Đang tải...', duration = 0) => {
    Toast.loading(message, duration);
  },

  /**
   * Hide current toast (alias for removeAll)
   */
  hide: () => {
    Toast.removeAll();
  },
};

export default CustomToast;
