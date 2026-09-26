import { createStyles } from '@/shared/theme/create-styles';
import React from 'react';
import { Pressable, View } from 'react-native';

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
        leftIcon={<AppIcon name="search" size={16} />}
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
        <AppIcon name="sliders" size={20} />
      </Pressable>
    </View>
  );
};

const useStyles = createStyles((theme, rs) => {
  return {
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: rs.gap(10),
    },
    inputSearch: {
      borderRadius: rs.radius(20),
      width: '80%',
    },
    filterContainer: {
      backgroundColor: theme.colors.surface,
      padding: rs.padding(8),
      borderRadius: 9999,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 3,
      elevation: 2,
    },
  };
});

export default CustomSearchFilter;
