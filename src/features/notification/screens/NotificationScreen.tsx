import { StyleSheet, View } from 'react-native';
import React from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import { moderateVerticalScale } from 'react-native-size-matters';
import { CustomTabNavigator } from '@/components';
import TabNotifiAccount from '../components/tabs/TabNotifiAccount';
import TabNotifiApp from '../components/tabs/TabNotifiApp';
import TabNotifiNews from '../components/tabs/TabNotifiNews';

const NotificationScreen = () => {
  const styles = useStyles();
  return (
    <View style={styles.container}>
      <CustomTabNavigator
        tabType="underline"
        screens={[
          {
            name: 'NotificationAccApp',
            component: TabNotifiAccount,
            label: 'Tài khoản',
          },
          {
            name: 'NotificationApp',
            component: TabNotifiApp,
            label: 'Ứng dụng',
          },
          {
            name: 'NotificationNews',
            component: TabNotifiNews,
            label: 'Tin tức',
          },
        ]}
      />
    </View>
  );
};

export default NotificationScreen;

const useStyles = createStyles(
  theme => ({
    container: {
      flex: 1,
      paddingBottom: moderateVerticalScale(50),
    },
  }),
  true,
);
