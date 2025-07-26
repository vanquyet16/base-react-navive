import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {useAuthStore} from '@/stores/authStore';
import AuthStack from './AuthStack';
import MainTabs from './MainTabs';
import LoadingScreen from '@/components/common/LoadingScreen';

const Stack = createStackNavigator();

const RootNavigator: React.FC = () => {
  const {isAuthenticated, isLoading} = useAuthStore();

  // Log trạng thái authentication cho debug
  useEffect(() => {
    console.log('Auth State:', {isAuthenticated, isLoading});
  }, [isAuthenticated, isLoading]);

  // Hiển thị loading khi đang kiểm tra authentication
  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAuthenticated ? (
          // Đã đăng nhập -> Hiển thị MainTabs
          <Stack.Screen name="MainTabs" component={MainTabs} />
        ) : (
          // Chưa đăng nhập -> Hiển thị AuthStack
          <Stack.Screen name="Auth" component={AuthStack} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
