import React, { memo, useMemo } from 'react';
import { Pressable, View } from 'react-native';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';
import { CustomText } from './CustomText';
import AppIcon from '@/components/base/AppIcon';

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
            backgroundColor: theme.colors.surface,
            textColor: theme.colors.text,
            iconBackgroundColor: theme.colors.infoLight,
            iconBorderColor: theme.colors.info,
            iconColor: theme.colors.info,
          };
        case 'video':
          return {
            icon: 'video' as const,
            label: label || 'Quay video',
            backgroundColor: theme.colors.surface,
            textColor: theme.colors.text,
            iconBackgroundColor: theme.colors.errorLight,
            iconBorderColor: theme.colors.error,
            iconColor: theme.colors.error,
          };
        case 'file':
          return {
            icon: 'paperclip' as const,
            label: label || 'Tải file từ thiết bị',
            backgroundColor: theme.colors.surface,
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
                styles.iconCamera,
              ]}
            >
              <AppIcon name="camera" size={24} color={theme.colors.info} />
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
                styles.iconVideo,
              ]}
            >
              <AppIcon name="video" size={24} color={theme.colors.error} />
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
                styles.iconFile,
              ]}
            >
              <AppIcon
                name="paperclip"
                size={24}
                color={theme.colors.warning}
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
            config.iconBackgroundColor && [
              styles.customIconBox,
              {
                backgroundColor: config.iconBackgroundColor,
                borderColor: config.iconBorderColor,
              },
            ],
          ]}
        >
          <AppIcon
            name={config.icon}
            size={config.isFullWidth ? 20 : 28}
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
  (theme, rs) => ({
    // Button cho photo và video (dạng vuông)
    button: {
      width: rs.scale(156),
      height: rs.moderateVerticalScale(120),
      borderRadius: rs.moderateScale(12),
      justifyContent: 'center',
      alignItems: 'center',
      padding: rs.moderateScale(16),
      // Shadow để nổi lên
      ...theme.shadows.md,
      elevation: 4,
    },
    // Button cho file (dạng ngang full width)
    fileButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center', // Căn giữa nội dung
      paddingVertical: rs.moderateVerticalScale(14),
      paddingHorizontal: rs.scale(16),
      borderRadius: rs.moderateScale(12),
      borderWidth: 1,
      borderStyle: 'dashed', // Dashed border
      borderColor: theme.colors.border,
      // Shadow để nổi lên
      ...theme.shadows.sm,
      elevation: 2,
    },
    iconContainer: {
      marginBottom: rs.moderateVerticalScale(12),
    },
    fileIconContainer: {
      marginRight: rs.scale(12),
    },
    label: {
      textAlign: 'center',
    },
    disabled: {
      opacity: 0.5,
    },
    // Group Styles
    groupContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: rs.radius(16),
      paddingVertical: rs.moderateVerticalScale(20),
      paddingHorizontal: rs.scale(12),
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      // Shadow
      ...theme.shadows.sm,
      elevation: 2,
      borderWidth: 1,
      borderColor: theme.colors.borderLight,
    },
    groupItem: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    groupIconContainer: {
      width: rs.moderateScale(56),
      height: rs.moderateScale(56),
      borderRadius: rs.moderateScale(28), // Circle
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: rs.moderateVerticalScale(8),
      borderWidth: 0, // No border by default, colors applied inline
    },
    groupLabel: {
      color: theme.colors.textSecondary,
      // fontSize và fontWeight đã được set bởi variant="caption"
    },
    divider: {
      width: 1,
      height: rs.moderateVerticalScale(40),
      backgroundColor: theme.colors.borderLight,
      marginHorizontal: rs.scale(4),
    },
    iconCamera: {
      backgroundColor: theme.colors.infoLight,
      borderColor: theme.colors.info,
    },
    iconVideo: {
      backgroundColor: theme.colors.errorLight,
      borderColor: theme.colors.error,
    },
    iconFile: {
      backgroundColor: theme.colors.warningLight,
      borderColor: theme.colors.warning,
    },
    customIconBox: {
      borderWidth: 2,
      borderRadius: rs.moderateScale(12),
      padding: rs.moderateScale(12),
    },
  }),
);

export default MediaUploadButton;
