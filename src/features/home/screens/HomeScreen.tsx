import React, { FC, memo } from 'react';
import { View } from 'react-native';
import { CustomText } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';

/**
 * HomeScreen - Pure Screen View
 * Trách nhiệm: Render nội dung UI của Home với khả năng thích ứng màn hình (Phone + iPad/Tablet).
 * Tầng Navigation (MainTabs) phụ trách bọc MainLayout và Header.
 */
const HomeScreen: FC = memo(() => {
  const styles = useStyles();

  return (
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
    backgroundColor: theme.colors.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  subtitle: {
    marginTop: rs.verticalGap(8),
  },
}));
