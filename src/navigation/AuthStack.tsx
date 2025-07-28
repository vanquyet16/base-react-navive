import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthStackParamList} from '@/types';
import {LazyScreen} from '@/components/common';

const Stack = createStackNavigator<AuthStackParamList>();

// Wrapper components với LazyScreen
const LoginScreenWrapper = () => (
  <LazyScreen component={() => import('@/screens/auth/LoginScreen')} />
);

const RegisterScreenWrapper = () => (
  <LazyScreen component={() => import('@/screens/auth/RegisterScreen')} />
);

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {backgroundColor: 'white'},
      }}>
      <Stack.Screen name="Login" component={LoginScreenWrapper} />
      <Stack.Screen name="Register" component={RegisterScreenWrapper} />
    </Stack.Navigator>
  );
};

export default AuthStack;
