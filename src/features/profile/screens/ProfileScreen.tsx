import { View, ImageBackground } from 'react-native';
import React, { useCallback } from 'react';
import { createStyles } from '@/shared/theme/create-styles';
import { useTheme } from '@/shared/theme/use-theme';
import { AppIcon, Avatar, CustomText } from '@/components';
import LeverIdentity from '@/components/base/LeverIdentity';
import { WingBlank } from '@ant-design/react-native';
import ItemDriver from '../components/ItemDriver';
import HeaderAction from '@/components/base/HeaderAction';
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = () => {
  const theme = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();
  // const insets = useSafeAreaInsets(); // Removed as HeaderAction handles it

  // Mock user data for display // TODO: Replace with actual user data from store
  const user = {
    id: '1',
    username: 'vanquyet',
    email: 'quyet@example.com',
    displayName: 'Văn Quyết',
    role: 'user',
    status: 'active',
    avatar:
      'https://hoanghamobile.com/tin-tuc/wp-content/uploads/2024/06/anh-dai-dien-mac-dinh-18.jpg',
    phone: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    lastLoginAt: null,
  } as const;

  const handleBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('@/assets/images/imgbgrheader.jpg')}
        style={styles.header}
        imageStyle={styles.imageStyle}
      >
        {/* <View style={styles.headerContent}> */}
        <HeaderAction
          title="Thông tin cá nhân"
          styleIconButton={styles.iconButton}
          titleStyle={styles.title}
          onIconLeftPress={handleBack}
        />
        <Avatar user={user} size={100} accentBorder />
        <CustomText variant="h6" color="white">
          {user.displayName}
        </CustomText>
        <LeverIdentity lever={2} />
        {/* </View> */}
      </ImageBackground>
      <ScrollView>
        <WingBlank size="md" style={styles.body}>
          <ItemDriver title="Số định danh cá nhân" value={'12345689012'} />
          <ItemDriver title="Giới tính" value={'Nam'} />
          <ItemDriver title="Ngày sinh" value={'01/01/2000'} />
          <ItemDriver title="Số điện thoại" value={'123456789'} />
          <ItemDriver title="Email" value={'quyet@example.com'} />
          <ItemDriver title="Nơi thường trú" value={'123 Main St, City'} />
        </WingBlank>
      </ScrollView>
    </View>
  );
};

const useStyles = createStyles(theme => {
  return {
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      backgroundColor: theme.colors.primary, // Removed in favor of gradient
      alignItems: 'center',
      borderBottomLeftRadius: theme.radius['3xl'],
      borderBottomRightRadius: theme.radius['3xl'],
      paddingBottom: theme.spacing[10],
    },
    imageStyle: {
      borderBottomLeftRadius: theme.radius['3xl'],
      borderBottomRightRadius: theme.radius['3xl'],
    },
    body: {
      marginVertical: theme.spacing[4],
    },
    iconButton: {
      backgroundColor: theme.colors.scrim, // Optional: slight scrim for better visibility
    },
    title: {
      color: theme.colors.white,
    },
  };
}, true);

export default ProfileScreen;
