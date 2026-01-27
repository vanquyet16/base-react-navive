import React, { useCallback, useMemo } from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { FlashList, FlashListProps, ContentStyle } from '@shopify/flash-list';
import { useTheme } from '@/shared/theme/use-theme';
import { moderateVerticalScale } from '@/shared/utils/sizeMatters';

interface CustomFlashListProps<T> extends FlashListProps<T> {
  /** Triggered when end of list is reached */
  onLoadMore?: () => void;
  /** Show loading spinner at footer */
  isLoadingMore?: boolean;
  /** Custom empty state message or component */
  emptyText?: string;
}

/**
 * CustomFlashList Component
 * =========================
 * Senior wrapper for @shopify/flash-list.
 */
export function CustomFlashList<T>(props: CustomFlashListProps<T>) {
  const theme = useTheme();

  const {
    onLoadMore,
    isLoadingMore = false,
    emptyText = 'Không có dữ liệu',
    ListEmptyComponent,
    ListFooterComponent,
    contentContainerStyle,
    ...rest
  } = props;

  const styles = useMemo(
    () =>
      StyleSheet.create({
        footer: {
          paddingVertical: moderateVerticalScale(20),
          alignItems: 'center',
          justifyContent: 'center',
        },
        emptyContainer: {
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          paddingTop: moderateVerticalScale(40),
        },
        emptyText: {
          color: theme.colors.textSecondary,
          fontSize: theme.typography.fontSizes.base,
          marginTop: moderateVerticalScale(8),
        },
      }),
    [theme],
  );

  // Combine custom footer with loader
  const renderFooter = useCallback(() => {
    if (isLoadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator color={theme.colors.primary} size="small" />
        </View>
      );
    }
    return ListFooterComponent ? (
      <>{ListFooterComponent}</>
    ) : (
      <View style={{ height: moderateVerticalScale(20) }} />
    );
  }, [isLoadingMore, theme, ListFooterComponent, styles.footer]);

  // Default Empty State
  const renderEmpty = useCallback(() => {
    if (ListEmptyComponent) return <>{ListEmptyComponent}</>;
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>{emptyText}</Text>
      </View>
    );
  }, [ListEmptyComponent, emptyText, styles, emptyText]);

  return (
    <FlashList
      {...rest}
      onEndReached={onLoadMore}
      onEndReachedThreshold={0.5}
      ListFooterComponent={renderFooter}
      ListEmptyComponent={renderEmpty}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: moderateVerticalScale(20),
        ...(contentContainerStyle as ViewStyle),
      }}
    />
  );
}
