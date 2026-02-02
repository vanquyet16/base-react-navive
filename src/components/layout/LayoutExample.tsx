import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
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
        <Text>Content với header (tabs disabled cho demo)</Text>
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
        <Text>Content chỉ có header</Text>
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
        <Text>Content example (tabs disabled cho demo)</Text>
      </View>
    </MainLayout>
  );
};

// Example 4: Content only, không có header và tabs
export const ContentOnlyExample = () => {
  const styles = useStyles();
  return (
    <MainLayout showHeader={false} showTabs={false}>
      <View style={styles.content}>
        <Text>Content thuần, không có header và tabs</Text>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Action Button</Text>
        </TouchableOpacity>
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
      fontSize: 16,
      fontWeight: '600',
    },
  }),
  true,
);
