import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { CustomText } from '@/components/base/CustomText';
import { MainLayout } from '@/components/layout/MainLayout';
import { AppHeader } from '@/components/layout/AppHeader';
import { createStyles } from '@/shared/theme/create-styles';

// Ảnh nền header
const HEADER_BG = require('@/assets/images/imgbgrheader.jpg');

/**
 * HomeScreen
 * Màn hình tự quyết định layout (header, scroll) — navigator chỉ khai báo route.
 */
const HomeScreen: FC = memo(() => {
  const styles = useStyles();

  return (
    <MainLayout
      enableScroll
      headerNode={
        <AppHeader
          title="Trang chủ"
          subtitle="Cổng dịch vụ thông minh"
          leftAction="menu"
          backgroundImage={HEADER_BG}
        />
      }
    >
      <View style={styles.container}>
        <View style={styles.welcomeCard}>
          <CustomText variant="h6" weight="bold">
            Xin chào! 👋
          </CustomText>
          <CustomText variant="body" color="secondary" style={styles.subtitle}>
            Chào mừng bạn đến với ứng dụng.
          </CustomText>
        </View>
      </View>
    </MainLayout>
  );
});

HomeScreen.displayName = 'HomeScreen';

export default HomeScreen;

const useStyles = createStyles((theme, rs) => ({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: rs.px(16),
    paddingVertical: rs.py(16),
  },
  welcomeCard: {
    width: rs.containerWidth,
    padding: rs.padding(16),
    borderRadius: rs.radius(12),
    backgroundColor: theme.colors.surface,
    elevation: 2,
    shadowColor: theme.colors.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  subtitle: {
    marginTop: rs.verticalGap(8),
  },
}));
