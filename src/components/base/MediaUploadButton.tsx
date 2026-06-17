import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { CustomText } from '@/components/base';
import AppIcon from '@/components/base/AppIcon';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';

type MediaUploadType = 'photo' | 'video' | 'file' | 'group';

interface MediaUploadButtonProps {
  /**
   * Loại media upload
   * - 'photo': Chụp ảnh
   * - 'video': Quay video
   * - 'file': Tải file từ thiết bị
   * - 'group': Hiển thị cả 3 options
   */
  type: MediaUploadType;
  /** Callback khi người dùng nhấn vào button (dùng cho single type) */
  onPress?: () => void;
  /** Callback cho photo (dùng cho group type) */
  onPhotoPress?: () => void;
  /** Callback cho video (dùng cho group type) */
  onVideoPress?: () => void;
  /** Callback cho file (dùng cho group type) */
  onFilePress?: () => void;

  /** Disable button */
  disabled?: boolean;
  /** Custom label (optional, sẽ dùng label mặc định nếu không truyền) */
  label?: string;
}

/**
 * MediaUploadButton Component
 * ============================
 * Component linh hoạt để upload media với 3 loại khác nhau hoặc group.
 */
export const MediaUploadButton: React.FC<MediaUploadButtonProps> = memo(
  ({
    type,
    onPress,
    onPhotoPress,
    onVideoPress,
    onFilePress,
    disabled = false,
    label,
  }) => {
    const theme = useTheme();
    const styles = useStyles();

    // Cấu hình cho từng loại single
    // Đã được chuyển lên trên để tránh lỗi Hook called conditionally
    const config = useMemo(() => {
      switch (type) {
        case 'photo':
          return {
            icon: 'camera' as const,
            label: label || 'Chụp ảnh',
            backgroundColor: '#FFFF',
            textColor: theme.colors.text,
            iconBackgroundColor: '#E3F2FD', // Light blue background
            iconBorderColor: '#2196F3', // Blue border
            iconColor: '#2196F3', // Blue icon
          };
        case 'video':
          return {
            icon: 'video' as const,
            label: label || 'Quay video',
            backgroundColor: '#FFFF',
            textColor: theme.colors.text,
            iconBackgroundColor: '#FFEBEE', // Light red background
            iconBorderColor: '#F44336', // Red border
            iconColor: '#F44336', // Red icon
          };
        case 'file':
          return {
            icon: 'paperclip' as const,
            label: label || 'Tải file từ thiết bị',
            backgroundColor: '#FFFFFF', // Màu trắng để nổi bật
            textColor: theme.colors.text,
            isFullWidth: true,
            iconColor: theme.colors.textSecondary,
          };
        default:
          return {
            icon: 'camera' as const,
            label: 'Upload',
            backgroundColor: theme.colors.primary,
            iconColor: theme.colors.white,
          };
      }
    }, [type, label, theme]);

    // Render Group Type
    if (type === 'group') {
      return (
        <View style={styles.groupContainer}>
          {/* Photo Action */}
          <Pressable
            style={({ pressed }) => [
              styles.groupItem,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onPhotoPress}
            disabled={disabled}
          >
            <View
              style={[
                styles.groupIconContainer,
                {
                  backgroundColor: '#E3F2FD', // Light Blue
                  borderColor: '#2196F3',
                },
              ]}
            >
              <AppIcon name="camera" size={moderateScale(24)} color="#2196F3" />
            </View>
            <CustomText variant="caption" style={styles.groupLabel}>
              Chụp ảnh
            </CustomText>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Video Action */}
          <Pressable
            style={({ pressed }) => [
              styles.groupItem,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onVideoPress}
            disabled={disabled}
          >
            <View
              style={[
                styles.groupIconContainer,
                {
                  backgroundColor: '#FFEBEE', // Light Red
                  borderColor: '#F44336',
                },
              ]}
            >
              <AppIcon name="video" size={moderateScale(24)} color="#F44336" />
            </View>
            <CustomText variant="caption" style={styles.groupLabel}>
              Quay video
            </CustomText>
          </Pressable>

          {/* Divider */}
          <View style={styles.divider} />

          {/* File Action */}
          <Pressable
            style={({ pressed }) => [
              styles.groupItem,
              { opacity: pressed ? 0.7 : 1 },
            ]}
            onPress={onFilePress}
            disabled={disabled}
          >
            <View
              style={[
                styles.groupIconContainer,
                {
                  backgroundColor: '#FFF8E1', // Light Yellow/Orange
                  borderColor: '#FFC107',
                },
              ]}
            >
              <AppIcon
                name="paperclip"
                size={moderateScale(24)}
                color="#FFA000" // Darker Orange for visibility
              />
            </View>
            <CustomText variant="caption" style={styles.groupLabel}>
              Tệp tin
            </CustomText>
          </Pressable>
        </View>
      );
    }

    return (
      <Pressable
        style={({ pressed }) => [
          config.isFullWidth ? styles.fileButton : styles.button,
          { backgroundColor: config.backgroundColor },
          disabled && styles.disabled,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onPress}
        disabled={disabled}
      >
        <View
          style={[
            config.isFullWidth
              ? styles.fileIconContainer
              : styles.iconContainer,
            config.iconBackgroundColor && {
              backgroundColor: config.iconBackgroundColor,
              borderWidth: 2,
              borderColor: config.iconBorderColor,
              borderRadius: moderateScale(12),
              padding: moderateScale(12),
            },
          ]}
        >
          <AppIcon
            name={config.icon}
            size={moderateScale(config.isFullWidth ? 20 : 28)}
            color={config.iconColor || theme.colors.white}
          />
        </View>
        <CustomText
          variant={config.isFullWidth ? 'body' : 'caption'}
          weight={config.isFullWidth ? 'normal' : 'medium'}
          style={[
            styles.label,
            config.textColor && { color: config.textColor },
          ]}
        >
          {config.label}
        </CustomText>
      </Pressable>
    );
  },
);

/**
 * Styles
 */
const useStyles = createStyles(
  theme => ({
    // Button cho photo và video (dạng vuông)
    button: {
      width: scale(156),
      height: moderateVerticalScale(120),
      borderRadius: moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      padding: moderateScale(16),
      // Shadow để nổi lên
      ...theme.shadows.md,
      elevation: 4,
    },
    // Button cho file (dạng ngang full width)
    fileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Căn giữa nội dung
      paddingVertical: moderateVerticalScale(14),
      paddingHorizontal: scale(16),
      borderRadius: moderateScale(12),
      borderWidth: 1,
      borderStyle: 'dashed', // Dashed border
      borderColor: theme.colors.border,
      // Shadow để nổi lên
      ...theme.shadows.sm,
      elevation: 2,
    },
    iconContainer: {
      marginBottom: moderateVerticalScale(12),
    },
    fileIconContainer: {
      marginRight: scale(12),
    },
    label: {
      textAlign: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    // Group Styles
    groupContainer: {
      backgroundColor: '#FFFFFF',
      borderRadius: moderateScale(16),
      paddingVertical: moderateVerticalScale(20),
      paddingHorizontal: scale(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // Shadow
      ...theme.shadows.sm,
      elevation: 2,
      borderWidth: 1,
      borderColor: '#F3F4F6', // Very light border
    },
    groupItem: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    groupIconContainer: {
      width: moderateScale(56),
      height: moderateScale(56),
      borderRadius: moderateScale(28), // Circle
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateVerticalScale(8),
      borderWidth: 0, // No border by default, colors applied inline
    },
    groupLabel: {
      color: theme.colors.textSecondary,
      // fontSize và fontWeight đã được set bởi variant="caption"
    },
    divider: {
      width: 1,
      height: moderateVerticalScale(40),
      backgroundColor: theme.colors.borderLight,
      marginHorizontal: scale(4),
    },
  }),
  true,
);

export default MediaUploadButton;
