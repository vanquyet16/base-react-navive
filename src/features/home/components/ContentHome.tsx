import React, { memo, useCallback } from 'react';
import { View, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { moderateVerticalScale } from 'react-native-size-matters';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/store/selectors';
import PublicServiceSection from './PublicServiceSection';
import TrackingSection from './TrackingSection';
import UtilitySection from './UtilitySection';
import NewsSection from './NewsSection';
import { useHomeAnimations } from '../animations/useHomeAnimations';

interface IHomeProps {
  dataHome: any;
  onScroll?: (event: NativeSyntheticEvent<NativeScrollEvent>) => void;
  scrollY?: SharedValue<number>;
}

const ContentHome = memo((props: IHomeProps) => {
  const { dataHome, onScroll, scrollY } = props;
  const styles = useStyles();
  const theme = useTheme();

  // Sync content position with header collapse using shared hook
  const { contentAnimatedStyle } = useHomeAnimations(scrollY);

  const handleSeeAll = useCallback(() => {
    // TODO: Implement navigation
  }, []);

  return (
    <Animated.ScrollView
      style={styles.scroll}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
      onScroll={onScroll}
      scrollEventThrottle={16} // ✅ Optimized: 60fps (~16.67ms per frame)
      removeClippedSubviews={true} // ✅ Unload off-screen components
    >
      <Animated.View style={[styles.content, contentAnimatedStyle]}>
        <PublicServiceSection onSeeAll={handleSeeAll} />
        <TrackingSection onSeeAll={handleSeeAll} />
        <UtilitySection />
        <NewsSection onSeeAll={handleSeeAll} />
      </Animated.View>
    </Animated.ScrollView>
  );
});

export default ContentHome;

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
    },
    scroll: {
      flex: 1,
    },
    scrollContent: {
      paddingBottom: theme.spacing[6],
      paddingTop: moderateVerticalScale(370),
      flexGrow: 1,
    },
    content: {
      flex: 1,
      paddingHorizontal: theme.spacing[2],
      paddingVertical: theme.spacing[4],
    },
  };
}, true);
