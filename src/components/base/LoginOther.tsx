import React, { memo } from 'react';
import {  Pressable, View } from 'react-native';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { CustomText } from '@/components/base/CustomText';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { WingBlank } from '@ant-design/react-native';

export type BiometricType = 'face' | 'fingerprint';

interface LoginOtherProps {
  /** Title của nút chính (VD: VNeID) */
  title: string;
  /** Icon hoặc hình ảnh của nút chính */
  icon?: React.ReactNode;
  /** Action khi nhấn nút chính */
  onPress?: () => void;

  /** Loại biometric (nếu có). Nếu null/undefined sẽ ẩn nút biometric */
  biometricType?: BiometricType;
  /** Custom icon cho nút biometric (ghi đè icon mặc định) */
  biometricIcon?: React.ReactNode;
  /** Action khi nhấn nút biometric */
  onBiometricPress?: () => void;
}

const LoginOther: React.FC<LoginOtherProps> = ({
  title,
  icon,
  onPress,
  biometricType,
  biometricIcon,
  onBiometricPress,
}) => {
  const theme = useTheme();
  const styles = useStyles();

  const biometricIconName =
    biometricType === 'face' ? 'face-recognition' : 'fingerprint';

  return (
    <WingBlank size="lg">
      <View style={styles.container}>
        {/* Main Login Button (e.g., VNeID) */}
        <Pressable
          style={({ pressed }) => [
            styles.mainButton,
            { opacity: pressed ? 0.7 : 1 },
          ]}
          onPress={onPress}
        >
          {icon && <View style={styles.logoContainer}>{icon}</View>}
          <CustomText style={styles.mainButtonText}>{title}</CustomText>
        </Pressable>

        {/* Biometric Login Button (Optional) */}
        {biometricType && (
          <>
            <View style={styles.spacer} />
            <Pressable
              style={({ pressed }) => [
                styles.biometricButton,
                { opacity: pressed ? 0.7 : 1 },
              ]}
              onPress={onBiometricPress}
            >
              {biometricIcon ? (
                biometricIcon
              ) : (
                <Icon
                  name={biometricIconName}
                  size={28}
                  color={theme.colors.primary}
                />
              )}
            </Pressable>
          </>
        )}
      </View>
    </WingBlank>
  );
};

const useStyles = createStyles((theme, rs) => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  mainButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: rs.scale(50),
    backgroundColor: theme.colors.background,
    borderRadius: rs.radius(16), // Match input radius
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    // Shadow
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    position: 'relative', // Changed for absolute icon positioning
  },
  mainButtonText: {
    fontSize: rs.fontSize(16),
    fontWeight: 'bold',
    color: theme.colors.textSecondary,
    // Removed marginLeft since icon is absolute
  },
  logoContainer: {
    position: 'absolute',
    left: 0, // Anchor to left
    justifyContent: 'center',
    alignItems: 'center',
  },
  spacer: {
    width: rs.scale(16),
  },
  biometricButton: {
    width: rs.scale(50),
    height: rs.scale(50),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    borderRadius: rs.radius(16),
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    // Shadow
    shadowColor: theme.colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
}));

export default memo(LoginOther);
