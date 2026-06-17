import { createStyles } from '@/shared/theme/create-styles';
import React from 'react';
import { Pressable, View } from 'react-native';

import { moderateScale } from 'react-native-size-matters';
import AppIcon from './AppIcon';
import CustomInput, { CustomInputProps } from './CustomInput';

interface CustomSearchFilterProps extends CustomInputProps {
  onFilter?: () => void;
}

const CustomSearchFilter = (props: CustomSearchFilterProps) => {
  const styles = useStyles();
  const { onFilter } = props;

  return (
    <View style={styles.container}>
      <CustomInput
        {...props}
        leftIcon={<AppIcon name="search" size={moderateScale(16)} />}
        placeholder="Tìm kiếm mã phản ánh, nội dung..."
        style={styles.inputSearch}
        borderRadius={20}
        width="85%"
      />
      <Pressable
        style={({ pressed }) => [
          styles.filterContainer,
          { opacity: pressed ? 0.7 : 1 },
        ]}
        onPress={onFilter}
      >
        <AppIcon name="sliders" size={moderateScale(20)} />
      </Pressable>
    </View>
  );
};

const useStyles = createStyles(theme => {
  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: theme.spacing[2.5],
    },
    inputSearch: {
      borderRadius: 20,
      width: '80%',
    },
    filterContainer: {
      backgroundColor: theme.colors.white,
      padding: theme.spacing[2],
      borderRadius: theme.radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
  };
}, true);

export default CustomSearchFilter;
