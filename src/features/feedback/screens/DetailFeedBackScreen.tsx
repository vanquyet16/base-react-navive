import React, { useCallback, useMemo, memo } from 'react';
import { View } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import {
  FeedbackDetailHeader,
  FeedbackHeaderInfo,
  FeedbackInfoCard,
  FeedbackResponseCard,
  FeedbackTimelineCard,
  FeedbackActionFooter,
  TimelineEvent,
} from '../components';
import {
  useFeedbackDetailAnimations,
  FEEDBACK_ANIMATION_CONSTANTS,
} from '../animations/useFeedbackDetailAnimations';
import { moderateVerticalScale } from 'react-native-size-matters';
import { WingBlank } from '@ant-design/react-native';

const DetailFeedBackScreen = memo(() => {
  const theme = useTheme();
  const styles = useStyles();

  // Shared Value for scroll position
  const scrollY = useSharedValue(0);

  const { fullViewOpacityStyle, compactViewOpacityStyle, imageAnimatedStyle } =
    useFeedbackDetailAnimations(scrollY);

  const scrollHandler = useAnimatedScrollHandler(event => {
    scrollY.value = event.contentOffset.y;
  });

  // Mock Data
  const feedbackData = useMemo(
    () => ({
      title: 'Mất nắp hố ga tại đường Lê Lợi, Quận Hà Đông',
      status: 'ĐÃ TRẢ LỜI',
      imageUrl:
        'https://resource.kinhtedothi.vn/2023/06/29/z4472913434466-c9cbc91d48c094ad805b509aed6868fc.jpg',
      address: 'Số 45, Đường Lê Lợi, Phường Nguyễn Trãi, Quận Hà Đông, Hà Nội',
      code: 'PA-2026-001',
      createdAt: '24/05/2024',
      response: {
        content:
          'Kính gửi ông/bà, sau khi tiếp nhận phản ánh, Công ty Công trình Đô thị Hà Đông đã cử đội kỹ thuật xuống hiện trường để thay mới nắp hố ga vào lúc 15:30 cùng ngày. Hiện tại khu vực đã đảm bảo an toàn giao thông. Trân trọng.',
        responder: 'CƠ QUAN CHỨC NĂNG',
        images: [
          'https://resource.kinhtedothi.vn/2023/06/29/z4472913434466-c9cbc91d48c094ad805b509aed6868fc.jpg',
          'https://resource.kinhtedothi.vn/2023/06/29/z4472913434466-c9cbc91d48c094ad805b509aed6868fc.jpg',
        ],
      },
      timeline: [
        {
          title: 'Đã hoàn thành',
          time: '16:45 - 24/05/2024',
          description: 'Vấn đề đã được khắc phục hoàn toàn',
          status: 'completed',
        },
        {
          title: 'Đang xử lý hiện trường',
          time: '15:10 - 24/05/2024',
          description: 'Đội kỹ thuật đang có mặt tại địa điểm',
          status: 'current',
        },
        {
          title: 'Phê duyệt xử lý',
          time: '11:20 - 24/05/2024',
          status: 'pending',
        },
        {
          title: 'Tiếp nhận phản ánh',
          time: '10:30 - 24/05/2024',
          status: 'pending',
        },
      ] as TimelineEvent[],
    }),
    [],
  );

  const handleShare = useCallback(() => {
    console.log('Share pressed');
  }, []);

  const handleRate = useCallback(() => {
    console.log('Rate pressed');
  }, []);

  const handleComment = useCallback(() => {
    console.log('Comment pressed');
  }, []);

  return (
    <View style={styles.container}>
      {/* 1. Background Layer (Fixed) */}
      <FeedbackHeaderInfo
        title={feedbackData.title}
        status={feedbackData.status}
        imageUrl={feedbackData.imageUrl}
        containerStyle={fullViewOpacityStyle}
        imageStyle={imageAnimatedStyle}
      />

      {/* 2. Scroll Layer (Transparent, slides over background) */}
      <Animated.ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.scrollContent,
          {
            paddingTop: FEEDBACK_ANIMATION_CONSTANTS.HEADER_MAX_HEIGHT - 20, // Overlap slightly
          },
        ]}
        onScroll={scrollHandler}
        scrollEventThrottle={16} // ✅ Optimized: 60fps (~16.67ms per frame)
        removeClippedSubviews={true} // ✅ Unload off-screen components
        style={{ flex: 1 }}
      >
        <WingBlank size="md">
          <FeedbackInfoCard
            address={feedbackData.address}
            feedbackCode={feedbackData.code}
            createdAt={feedbackData.createdAt}
          />

          <FeedbackResponseCard
            content={feedbackData.response.content}
            responderName={feedbackData.response.responder}
            images={feedbackData.response.images}
          />

          <FeedbackTimelineCard events={feedbackData.timeline} />
        </WingBlank>
      </Animated.ScrollView>

      {/* 3. Transparent Navbar (Initial State, fades out) */}
      <FeedbackDetailHeader
        variant="transparent"
        onShare={handleShare}
        animatedStyle={fullViewOpacityStyle}
      />

      {/* 4. Sticky Navbar (Scrolled State, fades in) */}
      <FeedbackDetailHeader
        title={feedbackData.title}
        onShare={handleShare}
        animatedStyle={compactViewOpacityStyle}
      />
      <FeedbackActionFooter onRate={handleRate} onComment={handleComment} />
    </View>
  );
});

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContent: {
      paddingBottom: moderateVerticalScale(10),
    },
  }),
  true,
);

export default DetailFeedBackScreen;
