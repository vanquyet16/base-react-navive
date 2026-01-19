/**
 * CUSTOM ANT DESIGN COMPONENTS
 * =============================
 * Custom wrappers cho Ant Design React Native components
 * Tích hợp theme system và thêm custom behaviors
 * 
 * Usage:
 * import { CustomButton, CustomCard } from '@/components/custom-antd';
 */

// Export custom wrappers
export { CustomButton } from './CustomButton';
export { CustomInput } from './CustomInput';
export { CustomCard } from './CustomCard';
export { CustomModal } from './CustomModal';
export { CustomList } from './CustomList';
export { CustomSwitch } from './CustomSwitch';
export { CustomPicker } from './CustomPicker';
export { CustomToast } from './CustomToast';

// Re-export original Ant Design components nếu cần
export {
  Button,
  InputItem,
  Card,
  Modal,
  List,
  Switch,
  Picker,
  Toast,
  WhiteSpace,
  WingBlank,
  ActivityIndicator,
  Checkbox,
  Radio,
  Tabs,
  Accordion,
  Icon,
  Badge,
  Tag,
  Progress,
  Slider,
  Steps,
  NoticeBar,
  Popover,
  SearchBar,
  SegmentedControl,
  Stepper,
  SwipeAction,
  Flex,
  Grid,
  ActionSheet,
  DatePicker,
  Drawer,
  ImagePicker,
  Pagination,
  Portal,
  Provider,
  Result,
  TextareaItem,
} from '@ant-design/react-native';

/**
 * DESIGN GUIDE
 * ============
 * 
 * 1. Luôn dùng CustomXXX components thay vì Ant Design trực tiếp
 * 2. CustomXXX components đã tích hợp theme system
 * 3. Có thể override styles qua prop `style`
 * 
 * Example:
 * ```tsx
 * import { CustomButton, CustomCard } from '@/components/custom-antd';
 * 
 * <CustomCard elevation={3}>
 *   <CustomButton type="primary" onPress={handlePress}>
 *     Click me
 *   </CustomButton>
 * </CustomCard>
 * ```
 */
