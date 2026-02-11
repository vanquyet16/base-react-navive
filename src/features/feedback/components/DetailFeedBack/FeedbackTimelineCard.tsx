import React, { memo } from 'react';
import { View } from 'react-native';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { CustomText, ShadowCard } from '@/components/base';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

export interface TimelineEvent {
  title: string;
  time: string;
  description?: string;
  status: 'completed' | 'current' | 'pending';
}

interface FeedbackTimelineCardProps {
  events: TimelineEvent[];
}

interface TimelineEventItemProps {
  event: TimelineEvent;
  isLast: boolean;
}

/**
 * TimelineEventItem Component
 * @optimized React.memo
 * Separated for performance optimization to avoid unnecessary re-renders
 */
const TimelineEventItem: React.FC<TimelineEventItemProps> = memo(
  ({ event, isLast }) => {
    const theme = useTheme();
    const styles = useStyles();

    const isCompleted = event.status === 'completed';
    const isCurrent = event.status === 'current';

    let dotColor = theme.colors.border;
    if (isCompleted) dotColor = theme.colors.success;
    if (isCurrent) dotColor = theme.colors.primary;

    return (
      <View style={styles.eventContainer}>
        <View style={styles.leftColumn}>
          <View style={[styles.dot, { backgroundColor: dotColor }]} />
          {!isLast && <View style={styles.line} />}
        </View>

        <View style={[styles.rightColumn, !isLast && styles.contentSpace]}>
          <CustomText
            variant="h8"
            weight={isCurrent ? 'bold' : 'normal'}
            color="primary"
            style={isCurrent ? { color: theme.colors.primary } : undefined}
          >
            {event.title}
          </CustomText>

          <CustomText variant="h10" color="secondary" style={styles.timeText}>
            {event.time}
          </CustomText>

          {event.description && (
            <View style={styles.descriptionBox}>
              <CustomText variant="h9" style={styles.descriptionText}>
                {event.description}
              </CustomText>
            </View>
          )}
        </View>
      </View>
    );
  },
  // Custom comparison function for optimization if needed
  // Default shallow comparison of props (event, isLast) is usually sufficient
  (prevProps, nextProps) => {
    return (
      prevProps.isLast === nextProps.isLast &&
      prevProps.event.title === nextProps.event.title &&
      prevProps.event.status === nextProps.event.status &&
      prevProps.event.time === nextProps.event.time &&
      prevProps.event.description === nextProps.event.description
    );
  },
);

const FeedbackTimelineCard: React.FC<FeedbackTimelineCardProps> = memo(
  ({ events }) => {
    const theme = useTheme();
    const styles = useStyles();

    return (
      <ShadowCard>
        <CustomText variant="h7" weight="bold" style={styles.headerTitle}>
          Tiến độ xử lý
        </CustomText>
        <View style={styles.timelineList}>
          {events.map((event, index) => (
            <TimelineEventItem
              key={`${event.time}-${event.title}`} // ✅ Stable unique key
              event={event}
              isLast={index === events.length - 1}
            />
          ))}
        </View>
      </ShadowCard>
    );
  },
);

const useStyles = createStyles(
  theme => ({
    // Container style removed as it is handled by ShadowCard
    headerTitle: {
      marginBottom: moderateVerticalScale(16),
    },
    timelineList: {
      paddingLeft: scale(4),
    },
    eventContainer: {
      flexDirection: 'row',
    },
    leftColumn: {
      alignItems: 'center',
      marginRight: scale(12),
      width: scale(16),
    },
    dot: {
      width: scale(12),
      height: scale(12),
      borderRadius: scale(6),
      marginTop: moderateVerticalScale(4),
    },
    line: {
      width: scale(2),
      flex: 1,
      backgroundColor: theme.colors.border,
      marginVertical: moderateVerticalScale(4),
    },
    rightColumn: {
      flex: 1,
    },
    contentSpace: {
      paddingBottom: moderateVerticalScale(24),
    },
    timeText: {
      marginTop: moderateVerticalScale(2),
    },
    descriptionBox: {
      marginTop: moderateVerticalScale(8),
      backgroundColor: theme.colors.background,
      padding: moderateScale(8),
      borderRadius: theme.radius.sm,
    },
    descriptionText: {
      color: theme.colors.textSecondary,
      fontStyle: 'italic',
    },
  }),
  true,
);

export default FeedbackTimelineCard;
