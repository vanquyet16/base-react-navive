// import React from 'react';
// import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialIcons';
// import {COLORS, HEADER_HEIGHT, SCREEN_PADDING} from '@/shared/constants';
// import Avatar from '@/shared/components/Avatar';

// interface HeaderProps {
//   title: string;
//   showProfile?: boolean;
//   showBack?: boolean;
//   onBack?: () => void;
//   rightComponent?: React.ReactNode;
// }

// const Header: React.FC<HeaderProps> = ({
//   title,
//   showProfile = false,
//   showBack = false,
//   onBack,
//   rightComponent,
// }) => {
//   const user = useUser();

//   return (
//     <View style={styles.container}>
//       <View style={styles.leftSection}>
//         {showBack ? (
//           <TouchableOpacity onPress={onBack} style={styles.backButton}>
//             <Icon name="arrow-back" size={24} color={COLORS.text} />
//           </TouchableOpacity>
//         ) : null}
//       </View>

//       <View style={styles.centerSection}>
//         <Text style={styles.title} numberOfLines={1}>
//           {title}
//         </Text>
//       </View>

//       <View style={styles.rightSection}>
//         {rightComponent}
//         {showProfile && user && (
//           <TouchableOpacity style={styles.profileButton}>
//             <Avatar user={user} size={36} />
//           </TouchableOpacity>
//         )}
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     height: HEADER_HEIGHT,
//     backgroundColor: COLORS.background,
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: SCREEN_PADDING,
//     borderBottomWidth: 1,
//     borderBottomColor: COLORS.border,
//   },
//   leftSection: {
//     width: 50,
//     justifyContent: 'center',
//   },
//   centerSection: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   rightSection: {
//     width: 50,
//     alignItems: 'flex-end',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: '600',
//     color: COLORS.text,
//   },
//   backButton: {
//     padding: 4,
//   },
//   profileButton: {
//     padding: 2,
//   },
// });

// export default Header;
