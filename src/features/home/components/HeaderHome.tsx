import { AppIcon, CustomSwiper } from '@/components';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { View } from '@ant-design/react-native';
import React, { memo, useCallback } from 'react';
import FastImage from 'react-native-fast-image';
import { ImageBackground, TouchableOpacity } from 'react-native';
import Animated, { SharedValue } from 'react-native-reanimated';
import { Text } from 'react-native-gesture-handler';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
  verticalScale,
} from 'react-native-size-matters';
import {
  useHomeAnimations,
  HOME_ANIMATION_CONSTANTS,
} from '../animations/useHomeAnimations';
import { useMainNavigation } from '@/shared/hooks/useNavigation';

interface HeaderHomeProps {
  scrollY: SharedValue<number>;
}

const HeaderHome = ({ scrollY }: HeaderHomeProps) => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useMainNavigation();
  const insets = useSafeAreaInsets();

  const {
    containerAnimatedStyle,
    fullViewOpacityStyle,
    compactViewOpacityStyle,
    swiperStyle,
  } = useHomeAnimations(scrollY);

  const handleSearchPress = useCallback(() => {
    navigation.navigate('SearchScreen');
  }, [navigation]);

  const handleProfilePress = useCallback(() => {
    navigation.navigate('ProfileScreen');
  }, [navigation]);

  return (
    <Animated.View style={[styles.containerWrapper, containerAnimatedStyle]}>
      <ImageBackground
        source={require('@/assets/images/imgbgrheader.jpg')}
        style={styles.container}
        imageStyle={styles.image}
      >
        {/* FULL VIEW - Default State */}
        <Animated.View style={[styles.fullViewContainer, fullViewOpacityStyle]}>
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.dashboardTopRow}>
              <View style={styles.brandContainer}>
                <TouchableOpacity
                  style={styles.logoCircle}
                  onPress={handleProfilePress}
                >
                  <Text style={styles.logoText}>CS</Text>
                </TouchableOpacity>
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{'Văn quyết'}</Text>
                  <View style={styles.locationContainer}>
                    <AppIcon
                      name="map-pin"
                      size={10}
                      color={theme.colors.white}
                    />
                    <Text style={styles.brandLocation}>{'Hà Nội'}</Text>
                  </View>
                </View>
              </View>

              <View style={styles.dashboardRightActions}>
                <TouchableOpacity onPress={handleSearchPress}>
                  <AppIcon name="search" size={24} color={theme.colors.white} />
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </Animated.View>

        {/* COMPACT VIEW - Sticky State */}
        <Animated.View
          style={[styles.compactViewContainer, compactViewOpacityStyle]}
        >
          <SafeAreaView edges={['top']} style={styles.safeArea}>
            <View style={styles.compactRow}>
              <View style={styles.compactBrand}>
                <TouchableOpacity
                  style={styles.compactLogoCircle}
                  onPress={handleProfilePress}
                >
                  <Text style={styles.compactLogoText}>CS</Text>
                </TouchableOpacity>
                <View style={styles.brandInfo}>
                  <Text style={styles.brandName}>{'Văn quyết'}</Text>
                  <View style={styles.locationContainer}>
                    <AppIcon
                      name="map-pin"
                      size={10}
                      color={theme.colors.white}
                    />
                    <Text style={styles.brandLocation}>{'Hà Nội'}</Text>
                  </View>
                </View>
              </View>
              <TouchableOpacity onPress={handleSearchPress}>
                <AppIcon name="search" size={20} color={theme.colors.white} />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </Animated.View>
      </ImageBackground>

      {/* SWIPER - Anchored at the bottom of the header */}
      <Animated.View style={[styles.swiperContainer, swiperStyle]}>
        <CustomSwiper
          height={verticalScale(150)}
          autoplay={true}
          autoplayTimeout={3}
        >
          <View style={styles.slide}>
            <FastImage
              source={require('@/assets/images/noidung1.jpg')}
              style={styles.slideImage}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
          <View style={styles.slide}>
            <FastImage
              source={require('@/assets/images/noidung2.jpg')}
              style={styles.slideImage}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
          <View style={styles.slide}>
            <FastImage
              source={require('@/assets/images/noidung3.jpg')}
              style={styles.slideImage}
              resizeMode={FastImage.resizeMode.stretch}
            />
          </View>
        </CustomSwiper>
      </Animated.View>
    </Animated.View>
  );
};

export default memo(HeaderHome);

const useStyles = createStyles(
  theme => ({
    containerWrapper: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      // backgroundColor: theme.colors.background,
    },
    container: {
      flex: 1,
      // Removed fixed height here, height is controlled by animated style
    },
    image: {
      borderBottomLeftRadius: theme.radius['3xl'],
      borderBottomRightRadius: theme.radius['3xl'],
    },
    safeArea: {
      flex: 1,
    },
    // --- FULL VIEW STYLES ---
    fullViewContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      paddingHorizontal: theme.spacing[2],
      zIndex: 1,
    },
    dashboardTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: theme.spacing[2],
      height: 50,
    },
    brandContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    logoCircle: {
      width: HOME_ANIMATION_CONSTANTS.PROFILE_IMAGE_SIZE,
      height: HOME_ANIMATION_CONSTANTS.PROFILE_IMAGE_SIZE,
      borderRadius: HOME_ANIMATION_CONSTANTS.PROFILE_IMAGE_SIZE / 2,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: theme.typography.fontSizes.sm,
    },
    brandInfo: {
      marginLeft: scale(10),
    },
    brandName: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: 'bold',
      color: theme.colors.white,
      textTransform: 'uppercase',
    },
    locationContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    brandLocation: {
      fontSize: theme.typography.fontSizes.xs,
      color: theme.colors.white,
      marginLeft: scale(4),
      opacity: 0.9,
    },
    dashboardRightActions: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    // --- COMPACT VIEW STYLES ---
    compactViewContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 2,
      paddingHorizontal: theme.spacing[4],
      justifyContent: 'center',
      height: 50,
      marginTop: theme.spacing[2],
    },
    compactRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
    },
    compactBrand: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    compactLogoCircle: {
      width: HOME_ANIMATION_CONSTANTS.COMPACT_IMAGE_SIZE,
      height: HOME_ANIMATION_CONSTANTS.COMPACT_IMAGE_SIZE,
      borderRadius: HOME_ANIMATION_CONSTANTS.COMPACT_IMAGE_SIZE / 2,
      backgroundColor: theme.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: theme.spacing[2],
    },
    compactLogoText: {
      color: theme.colors.primary,
      fontWeight: 'bold',
      fontSize: theme.typography.fontSizes.xs,
    },
    compactTitle: {
      fontSize: theme.typography.fontSizes.sm,
      fontWeight: 'bold',
      color: theme.colors.white,
      textTransform: 'uppercase',
    },

    // --- SWIPER STYLES ---
    swiperContainer: {
      position: 'absolute',
      left: theme.spacing[2],
      right: theme.spacing[2],
      bottom: -moderateVerticalScale(90),
      height: verticalScale(150),
      borderRadius: theme.radius['lg'],
      overflow: 'hidden',
      elevation: 6,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
    },
    slide: {
      flex: 1,
    },
    slideImage: {
      width: '100%',
      height: '100%',
    },
  }),
  true,
);
