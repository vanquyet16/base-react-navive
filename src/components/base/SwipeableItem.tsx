import React, { memo, useCallback, useRef, ReactNode, useMemo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import Animated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { createStyles } from '@/shared/theme/create-styles';
import {
  moderateScale,
  moderateVerticalScale,
  scale,
} from 'react-native-size-matters';
import { AppIcon, CustomText } from '@/components';

/**
 * SwipeableItem Component - Reusable swipe-to-delete wrapper
 *
 * @description
 * Wrap bất kỳ children nào để thêm swipe-to-delete functionality.
 * Swipe từ phải sang trái hoặc long press để hiện delete button.
 *
 * @example
 * ```tsx
 * <SwipeableItem
 *   rightAction={{
 *     onPress: () => handleDelete(item),
 *     text: 'Xóa',
 *     icon: 'trash',
 *   }}
 * >
 *   <YourCustomContent />
 * </SwipeableItem>
 * ```
 *
 * @performance
 * - Memoized với React.memo
 * - useAnimatedStyle cho smooth 60fps animation
 * - Reanimated Swipeable (không dùng deprecated version)
 */

/**
 * Swipe action configuration
 */
export interface SwipeableAction {
  onPress: () => void;
  text?: string;
  icon?: string;
  width?: number;
  backgroundColor?: string;
}

/**
 * @deprecated Use SwipeableAction instead
 */
export type SwipeableRightAction = SwipeableAction;

interface SwipeableItemProps {
  children: ReactNode;
  rightAction?: SwipeableAction | SwipeableAction[]; // Single or multiple actions
  leftAction?: SwipeableAction | SwipeableAction[]; // Single or multiple actions
  friction?: number;
  disabled?: boolean;
  onPress?: () => void;
}

/**
 * Swipe action component (reusable for left/right)
 * Separated component để tuân thủ React Hooks rules
 */
// Swipe action component
interface SwipeActionViewProps {
  progress: SharedValue<number>;
  action: SwipeableAction;
  direction: 'left' | 'right';
  totalActions?: number;
  index?: number;
}

const SwipeActionView = memo<SwipeActionViewProps>(
  ({ progress, action, direction, totalActions = 1, index = 0 }) => {
    const styles = useStyles();

    // Width of this specific action button
    const btnWidth = scale(action.width || 80);

    const animatedStyle = useAnimatedStyle(() => {
      'worklet';
      // Removed complex translation to fix jitter ("sóc sóc")
      // Returning to standard "Reveal" effect which is native-smooth
      return {};
    });

    // Custom action style
    const customStyle = useMemo(
      () => ({
        ...(action.backgroundColor && {
          backgroundColor: action.backgroundColor,
        }),
        width: btnWidth,
      }),
      [action.backgroundColor, btnWidth],
    );

    return (
      <Animated.View
        style={[styles.actionContainer, customStyle, animatedStyle]}
      >
        <TouchableOpacity
          style={styles.actionButton}
          onPress={action.onPress}
          activeOpacity={0.7}
        >
          <AppIcon
            name={action.icon || (direction === 'right' ? 'trash' : 'check')}
            size={moderateScale(24)}
            color="#FFF"
          />
          <CustomText variant="caption" style={styles.actionText}>
            {action.text || (direction === 'right' ? 'Xóa' : 'Đánh dấu')}
          </CustomText>
        </TouchableOpacity>
      </Animated.View>
    );
  },
);

SwipeActionView.displayName = 'SwipeActionView';

/**
 * Right swipe actions container
 */
interface RightSwipeActionsProps {
  drag: SharedValue<number>;
  progress: SharedValue<number>;
  action: SwipeableAction | SwipeableAction[];
}

const RightSwipeActions = memo<RightSwipeActionsProps>(
  ({ progress, action }) => {
    const actions = Array.isArray(action) ? action : [action];
    const totalWidth = actions.reduce(
      (sum, act) => sum + scale(act.width || 80),
      0,
    );

    return (
      <View style={{ flexDirection: 'row', width: totalWidth }}>
        {actions.map((act, index) => (
          <SwipeActionView
            key={index}
            progress={progress}
            action={act}
            direction="right"
            totalActions={actions.length}
            index={index}
          />
        ))}
      </View>
    );
  },
);

RightSwipeActions.displayName = 'RightSwipeActions';

/**
 * Left swipe actions container
 */
interface LeftSwipeActionsProps {
  drag: SharedValue<number>;
  progress: SharedValue<number>;
  action: SwipeableAction | SwipeableAction[];
}

const LeftSwipeActions = memo<LeftSwipeActionsProps>(({ progress, action }) => {
  const actions = Array.isArray(action) ? action : [action];
  const totalWidth = actions.reduce(
    (sum, act) => sum + scale(act.width || 80),
    0,
  );

  return (
    <View style={{ flexDirection: 'row', width: totalWidth }}>
      {actions.map((act, index) => (
        <SwipeActionView
          key={index}
          progress={progress}
          action={act}
          direction="left"
          totalActions={actions.length}
          index={index}
        />
      ))}
    </View>
  );
});

LeftSwipeActions.displayName = 'LeftSwipeActions';

/**
 * SwipeableItem - Main component
 */
const SwipeableItem: React.FC<SwipeableItemProps> = ({
  children,
  rightAction,
  leftAction,
  friction = 1.5,
  disabled = false,
  onPress,
}) => {
  const swipeableRef = useRef<React.ElementRef<typeof Swipeable>>(null);

  // Handle right action (only for single action long press fallback)
  const handleRightAction = useCallback(() => {
    swipeableRef.current?.close();
    if (!Array.isArray(rightAction) && rightAction?.onPress) {
      rightAction.onPress();
    }
  }, [rightAction]);

  // Handle left action (only for single action long press fallback)
  const handleLeftAction = useCallback(() => {
    swipeableRef.current?.close();
    if (!Array.isArray(leftAction) && leftAction?.onPress) {
      leftAction.onPress();
    }
  }, [leftAction]);

  // Handle long press to open swipeable
  const handleLongPress = useCallback(() => {
    if (!disabled && rightAction) {
      swipeableRef.current?.openRight();
    } else if (!disabled && leftAction) {
      swipeableRef.current?.openLeft();
    }
  }, [disabled, rightAction, leftAction]);

  // Memoize wrapped Right Actions to prevent flickering (stable ref)
  const wrappedRightActions = useMemo(() => {
    if (!rightAction) return undefined;

    // Helper to wrap single action
    const wrapHandler = (act: SwipeableAction) => ({
      ...act,
      onPress: () => {
        swipeableRef.current?.close();
        act.onPress?.();
      },
    });

    return Array.isArray(rightAction)
      ? rightAction.map(wrapHandler)
      : wrapHandler(rightAction);
  }, [rightAction]);

  // Memoize wrapped Left Actions
  const wrappedLeftActions = useMemo(() => {
    if (!leftAction) return undefined;

    const wrapHandler = (act: SwipeableAction) => ({
      ...act,
      onPress: () => {
        swipeableRef.current?.close();
        act.onPress?.();
      },
    });

    return Array.isArray(leftAction)
      ? leftAction.map(wrapHandler)
      : wrapHandler(leftAction);
  }, [leftAction]);

  // Render right swipe actions (swipe left to show)
  const renderRightActions = useCallback(
    (progress: SharedValue<number>, drag: SharedValue<number>) => {
      if (!wrappedRightActions) return null;

      return (
        <RightSwipeActions
          drag={drag}
          progress={progress}
          action={wrappedRightActions}
        />
      );
    },
    [wrappedRightActions],
  );

  // Render left swipe actions (swipe right to show)
  const renderLeftActions = useCallback(
    (progress: SharedValue<number>, drag: SharedValue<number>) => {
      if (!wrappedLeftActions) return null;

      return (
        <LeftSwipeActions
          drag={drag}
          progress={progress}
          action={wrappedLeftActions}
        />
      );
    },
    [wrappedLeftActions],
  );

  // Content wrapper (memoized)
  const renderContent = useCallback(() => {
    // If onPress is provided, we wrap in TouchableOpacity
    // If not, we just render children (assuming children handle touches or are static)

    // Optimization: If disabled and no onPress, just View wrapper
    if (disabled && !onPress) {
      return <>{children}</>;
    }

    return (
      <TouchableOpacity
        activeOpacity={onPress ? 0.7 : 1}
        onPress={onPress}
        onLongPress={
          !disabled && (rightAction || leftAction) ? handleLongPress : undefined
        }
        delayLongPress={500}
      >
        {children}
      </TouchableOpacity>
    );
  }, [disabled, onPress, children, rightAction, leftAction, handleLongPress]);

  if (disabled || (!rightAction && !leftAction)) {
    return renderContent();
  }

  return (
    <Swipeable
      ref={swipeableRef}
      renderRightActions={renderRightActions}
      renderLeftActions={renderLeftActions}
      overshootRight={false}
      overshootLeft={false}
      friction={friction}
      enableTrackpadTwoFingerGesture
    >
      {renderContent()}
    </Swipeable>
  );
};

export default memo(SwipeableItem);

const useStyles = createStyles(
  theme => ({
    // Swipe Action Container
    actionContainer: {
      backgroundColor: theme.colors.error,
      justifyContent: 'center',
      alignItems: 'center',
      width: scale(80),
      height: '100%',
      flexDirection: 'column',
    },
    actionButton: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      paddingVertical: moderateVerticalScale(12),
    },
    actionText: {
      color: '#FFF',
      fontWeight: '600',
      marginTop: moderateVerticalScale(4),
    },
  }),
  true,
);
