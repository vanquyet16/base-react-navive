import { AppIcon, CustomButton, FormDropdown, FormInput } from '@/components';
import { useTheme } from '@/shared/theme/use-theme';
import { View } from '@ant-design/react-native';
import React, { memo, useMemo, useCallback } from 'react';
import {
  moderateScale,
  moderateVerticalScale,
} from 'react-native-size-matters';

export const FromCreateFeedBack = memo(() => {
  const theme = useTheme();

  const fieldOptions = useMemo(
    () => [
      { label: 'Giao thông', value: 'traffic' },
      { label: 'Môi trường', value: 'environment' },
      { label: 'Y tế', value: 'health' },
      { label: 'Giáo dục', value: 'education' },
      { label: 'An ninh', value: 'security' },
    ],
    [],
  );

  const handleSend = useCallback(() => {}, []);

  return (
    <>
      <FormInput
        label="Vấn đề phản ánh"
        required
        placeholder="Nhập vấn đề phản ánh"
      />
      <FormDropdown
        label="Lĩnh vực"
        placeholder="Chọn lĩnh vực"
        required
        options={fieldOptions}
      />
      <FormInput
        type="textarea"
        label="Mô tả chi tiết"
        placeholder="Nhập mô tả chi tiết"
      />
      <FormInput
        label="Vị trí hiện tại"
        required
        placeholder="Nhập vị trí hiện tại"
      />
      {/* <FormDatePicker value={null} onChange={() => {}} /> */}
      <View style={{ paddingBottom: moderateVerticalScale(0) }}>
        <CustomButton
          leftIcon={
            <AppIcon
              name="send"
              size={moderateScale(20)}
              color={theme.colors.white}
            />
          }
          title="Gửi phản ánh"
          onPress={handleSend}
        />
      </View>
    </>
  );
});
