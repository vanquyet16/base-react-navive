import React from 'react';
import { View, Pressable } from 'react-native';
import { CustomText } from '@/components/base/CustomText';
import MainLayout from './MainLayout';
import { useTheme } from '@/shared/theme/use-theme';
import { createStyles } from '@/shared/theme/create-styles';

// Example 1: Full layout với header và tabs
export const FullLayoutExample = () => {
  const styles = useStyles();
  return (
    <MainLayout
      showHeader={true}
      showTabs={false} // Simplified for demo
      headerProps={{
        title: 'Full Layout',
        showProfile: true,
        showSearch: true,
        showNotification: true,
        notificationCount: 5,
      }}
    >
      <View style={styles.content}>
        <CustomText>Content với header (tabs disabled cho demo)</CustomText>
      </View>
    </MainLayout>
  );
};

// Example 2: Chỉ có header, không có tabs
export const HeaderOnlyExample = () => {
  const styles = useStyles();
  return (
    <MainLayout
      showHeader={true}
      showTabs={false}
      headerProps={{
        title: 'Header Only',
        type: 'minimal',
        showBack: true,
        onBack: () => console.log('Back pressed'),
      }}
    >
      <View style={styles.content}>
        <CustomText>Content chỉ có header</CustomText>
      </View>
    </MainLayout>
  );
};

// Example 3: Chỉ có tabs, không có header
export const TabsOnlyExample = () => {
  const styles = useStyles();
  return (
    <MainLayout showHeader={false} showTabs={false}>
      <View style={styles.content}>
        <CustomText>Content example (tabs disabled cho demo)</CustomText>
      </View>
    </MainLayout>
  );
};

// Example 4: Content only, không có header và tabs
export const ContentOnlyExample = () => {
  const styles = useStyles();
  const theme = useTheme();

  return (
    <MainLayout showHeader={false} showTabs={false}>
      <View style={styles.content}>
        <CustomText>Content thuần, không có header và tabs</CustomText>
        <Pressable
          style={({ pressed }) => [
            styles.button,
            { opacity: pressed ? 0.7 : 1 },
          ]}
        >
          <CustomText
            variant="body"
            weight="semibold"
            style={styles.buttonText}
          >
            Action Button
          </CustomText>
        </Pressable>
      </View>
    </MainLayout>
  );
};

const useStyles = createStyles(
  theme => ({
    content: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    button: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
    },
  }),
  true,
);
