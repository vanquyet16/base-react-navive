/**
 * CUSTOM MODAL
 * ============
 * Wrapper around react-native-modal for consistent app-wide modals.
 * Supports 'center' (default) and 'bottom' (popup) modes.
 */

import React, { useMemo, memo } from 'react';
import {
  StyleSheet,
  ViewStyle,
  View,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import Modal, { ModalProps } from 'react-native-modal';
import { useTheme } from '@/shared/theme/use-theme';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';
import { AppIcon, CustomText } from '@/components';

interface CustomModalProps extends Partial<ModalProps> {
  visible: boolean;
  onClose: () => void;
  /**
   * Modal Type determines style & position:
   * - default: Center, margin 20 (Standard dialog)
   * - popup: Bottom sheet, margin 0 (Filter, ActionSheet)
   * - alert: Center, transparent content (System alert)
   * - toast: Top, auto-dismiss (Notification)
   * - fullscreen: Full screen, no margin
   */
  type?: 'default' | 'popup' | 'alert' | 'toast' | 'fullscreen';
  /** Override specific position if needed */
  position?: 'center' | 'bottom' | 'top';
  /** Background color for the content container */
  contentBackgroundColor?: string;
  /** Title for the built-in header */
  title?: string;
  /** Header content (optional) */
  header?: React.ReactNode;
  /** Footer content (optional) */
  footer?: React.ReactNode;
  /** Style for the inner content container */
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const CustomModalBase: React.FC<CustomModalProps> = ({
  visible,
  onClose,
  type = 'default',
  position,
  children,
  style,
  contentBackgroundColor,
  title,
  header,
  footer,
  contentContainerStyle,
  ...props
}) => {
  const theme = useTheme();

  // Determine effective position based on type
  const effectivePosition = useMemo(() => {
    if (position) return position;
    switch (type) {
      case 'popup':
        return 'bottom';
      case 'toast':
        return 'top';
      case 'fullscreen':
        return 'center';
      default:
        return 'center';
    }
  }, [type, position]);

  // Modal (Wrapper) Style - Controls Position
  const modalStyle = useMemo(() => {
    const baseStyle: any[] = [styles.modal];

    if (effectivePosition === 'bottom') baseStyle.push(styles.modalBottom);
    if (effectivePosition === 'top') baseStyle.push(styles.modalTop);
    if (type === 'fullscreen') baseStyle.push(styles.modalFullscreen);

    return [baseStyle, style] as any;
  }, [styles, effectivePosition, type, style]);

  // Content Container Style - Controls Look (White box, Radius)
  const containerStyle = useMemo(() => {
    const baseStyle: any[] = [
      styles.contentContainer,
      { backgroundColor: contentBackgroundColor ?? theme.colors.white },
    ];

    if (type === 'popup') baseStyle.push(styles.contentPopup);
    if (type === 'default') baseStyle.push(styles.contentDefault);
    if (type === 'fullscreen') baseStyle.push(styles.contentFullscreen);
    if (type === 'alert') baseStyle.push(styles.contentAlert);

    return [baseStyle, contentContainerStyle] as any;
  }, [
    styles,
    type,
    contentBackgroundColor,
    theme.colors.white,
    contentContainerStyle,
  ]);

  // Determine animations
  const animationIn = useMemo(() => {
    switch (effectivePosition) {
      case 'bottom':
        return 'slideInUp';
      case 'top':
        return 'slideInDown';
      default:
        return 'fadeIn';
    }
  }, [effectivePosition]);

  const animationOut = useMemo(() => {
    switch (effectivePosition) {
      case 'bottom':
        return 'slideOutDown';
      case 'top':
        return 'slideOutUp';
      default:
        return 'fadeOut';
    }
  }, [effectivePosition]);

  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      onSwipeComplete={type === 'popup' ? onClose : undefined}
      swipeDirection={type === 'popup' ? ['down'] : undefined}
      propagateSwipe={type === 'popup'}
      avoidKeyboard
      useNativeDriver
      hideModalContentWhileAnimating
      animationIn={animationIn || (type === 'popup' ? 'slideInUp' : 'fadeIn')}
      animationOut={
        animationOut || (type === 'popup' ? 'slideOutDown' : 'fadeOut')
      }
      animationInTiming={300}
      animationOutTiming={250}
      backdropTransitionInTiming={300}
      backdropTransitionOutTiming={250}
      style={modalStyle}
      {...props}
    >
      <View style={containerStyle}>
        {/* Built-in Header for Popup/Bottom Sheet */}
        {(title || type === 'popup') && !header && (
          <View style={styles.header}>
            {type === 'popup' && <View style={styles.dragHandle} />}
            <View style={styles.headerRow}>
              {title ? (
                <CustomText variant="h6" weight="bold">
                  {title}
                </CustomText>
              ) : (
                <View />
              )}

              <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
                <AppIcon
                  name="x"
                  size={moderateScale(20)}
                  color={theme.colors.textSecondary}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}

        {/* Custom Header Injection */}
        {header}

        {children}

        {footer}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  // Wrapper Styles
  modal: {
    margin: moderateScale(20),
    justifyContent: 'center',
  },
  modalBottom: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalTop: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: moderateScale(20),
  },
  modalFullscreen: {
    margin: 0,
    justifyContent: 'center',
  },

  // Content Styles
  contentContainer: {
    overflow: 'hidden',
  },
  contentDefault: {
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
  },
  contentPopup: {
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    paddingBottom: moderateVerticalScale(20), // Safe area handling usually
    width: '100%',
  },
  contentFullscreen: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  contentAlert: {
    backgroundColor: 'transparent',
  },

  // Header Styles
  header: {
    alignItems: 'center',
    paddingVertical: moderateVerticalScale(8),
  },
  dragHandle: {
    width: moderateScale(40),
    height: 4,
    backgroundColor: '#E0E0E0', // Hardcoded neutral gray or use theme.colors.divider if accessible in styles scope (it's not, styles is outside component)
    borderRadius: 2,
    marginBottom: moderateVerticalScale(12),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: moderateScale(16),
  },
  closeBtn: {
    padding: 4,
    backgroundColor: '#F5F5F5', // theme.colors.backgroundSecondary
    borderRadius: 50,
  },
});

export const CustomModal = memo(CustomModalBase);
export default CustomModal;
