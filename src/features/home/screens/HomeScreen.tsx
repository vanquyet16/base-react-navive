import React, { FC, memo, useMemo } from 'react';
import { View } from 'react-native';
import {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useSessionActions } from '@/shared/store/selectors';
import { useMainNavigation } from '@/shared/hooks/useNavigation';
import { createStyles } from '@/shared/theme/create-styles';
import HeaderHome from '../components/HeaderHome';
import ContentHome from '../components/ContentHome';
import { moderateVerticalScale } from 'react-native-size-matters';

const HomeScreen: FC = memo(() => {
  const navigation = useMainNavigation();
  const { clearSession } = useSessionActions();
  const styles = useStyles();

  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  const dataHome = useMemo(() => [], []);

  return (
    <View style={styles.container}>
      <HeaderHome scrollY={scrollY} />
      <ContentHome
        dataHome={dataHome}
        onScroll={scrollHandler}
        scrollY={scrollY}
      />
    </View>
  );
});

export default HomeScreen;

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      paddingBottom: moderateVerticalScale(50),
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing[6],

      flexGrow: 1, // ✅ Fill remaining space
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing[4], // Thay thế WingBlank
      paddingVertical: theme.spacing[4],
    },
  }),
  true,
);
