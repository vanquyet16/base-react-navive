/**
 * EXAMPLE USAGE - Custom Ant Design Components
 * ==============================================
 * Ví dụ cách sử dụng các custom Ant Design components
 */

import React, { useState } from 'react';
import { View, ScrollView } from 'react-native';
import {
  CustomButton,
  CustomInput,
  CustomCard,
  CustomModal,
  CustomList,
  CustomSwitch,
  CustomToast,
  List,
  WhiteSpace,
} from '@/components/custom-antd';
import { AppText } from '@/components/base';
import { createStyles } from '@/theme/create-styles';
import { useTheme } from '@/theme/use-theme';

/**
 * Example Screen - Demo tất cả custom components
 */
export const CustomAntdExampleScreen: React.FC = () => {
  const theme = useTheme();
  const styles = useStyles(theme);

  // State examples
  const [modalVisible, setModalVisible] = useState(false);
  const [switchValue, setSwitchValue] = useState(false);
  const [inputValue, setInputValue] = useState('');

  // Handle button clicks
  const handlePrimaryClick = () => {
    CustomToast.success('Button clicked!');
  };

  const handleWarningClick = () => {
    CustomToast.error('Warning action!');
  };

  const handleLoadingClick = () => {
    CustomToast.loading('Đang xử lý...');
    setTimeout(() => {
      CustomToast.hide();
      CustomToast.success('Hoàn thành!');
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      {/* Section: Buttons */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>Buttons</AppText>
        <WhiteSpace />

        <CustomButton type='primary' onPress={handlePrimaryClick}>
          Primary Button
        </CustomButton>
        <WhiteSpace />

        <CustomButton variant='warning' onPress={handleWarningClick}>
          Warning Button
        </CustomButton>
        <WhiteSpace />

        <CustomButton type='ghost' onPress={handleLoadingClick}>
          Loading Demo
        </CustomButton>
      </CustomCard>

      <WhiteSpace size='lg' />

      {/* Section: Input */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>Input</AppText>
        <WhiteSpace />

        <CustomInput
          label='Email'
          placeholder='Nhập email của bạn'
          value={inputValue}
          onChange={setInputValue}
          errorMessage={inputValue.length < 5 ? 'Email quá ngắn' : undefined}
        />
      </CustomCard>

      <WhiteSpace size='lg' />

      {/* Section: Modal */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>Modal</AppText>
        <WhiteSpace />

        <CustomButton type='primary' onPress={() => setModalVisible(true)}>
          Open Modal
        </CustomButton>

        <CustomModal
          visible={modalVisible}
          title='Xác nhận'
          onClose={() => setModalVisible(false)}
          footer={[
            {
              text: 'Hủy',
              onPress: () => setModalVisible(false),
            },
            {
              text: 'OK',
              onPress: () => {
                setModalVisible(false);
                CustomToast.success('Đã xác nhận!');
              },
            },
          ]}>
          <AppText>Bạn có chắc chắn muốn thực hiện hành động này?</AppText>
        </CustomModal>
      </CustomCard>

      <WhiteSpace size='lg' />

      {/* Section: List */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>List</AppText>
        <WhiteSpace />

        <CustomList padded>
          <List.Item>Item 1</List.Item>
          <List.Item>Item 2</List.Item>
          <List.Item>Item 3</List.Item>
        </CustomList>
      </CustomCard>

      <WhiteSpace size='lg' />

      {/* Section: Switch */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>Switch</AppText>
        <WhiteSpace />

        <View style={styles.row}>
          <AppText>Dark Mode</AppText>
          <CustomSwitch checked={switchValue} onChange={setSwitchValue} />
        </View>
      </CustomCard>

      <WhiteSpace size='lg' />

      {/* Section: Toast Examples */}
      <CustomCard elevation={2}>
        <AppText variant='h3'>Toast Messages</AppText>
        <WhiteSpace />

        <CustomButton
          type='primary'
          onPress={() => CustomToast.success('Success message!')}>
          Show Success
        </CustomButton>
        <WhiteSpace />

        <CustomButton
          type='ghost'
          onPress={() => CustomToast.error('Error message!')}>
          Show Error
        </CustomButton>
        <WhiteSpace />

        <CustomButton
          type='ghost'
          onPress={() => CustomToast.info('Info message!')}>
          Show Info
        </CustomButton>
      </CustomCard>

      <WhiteSpace size='xl' />
    </ScrollView>
  );
};

const useStyles = createStyles(theme => ({
  container: {
    flex: 1,
    padding: theme.spacing[4],
    backgroundColor: theme.colors.backgroundSecondary,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
}));

export default CustomAntdExampleScreen;
