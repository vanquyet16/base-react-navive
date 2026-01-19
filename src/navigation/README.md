# Navigation Documentation

> **Note:** This documentation covers the **legacy navigation configuration**. The project now uses a simpler AppNavigator pattern in `src/app/app-navigator.tsx`.

## 📁 Current Structure

```
src/navigation/
├── config/
│   ├── navigationConfig.ts  # Screen configs (reference/legacy)
│   └── index.ts
├── factories/
│   ├── screenFactory.ts    # Screen factory patterns (reference)
│   └── index.ts
├── MainTabs.tsx            # Bottom tabs (still in use)
├── index.ts
└── README.md              # This file
```

## ✅ Active Navigation

### Main Navigation (New)

The app now uses `src/app/app-navigator.tsx` with a simpler structure:

```typescript
// src/app/app-navigator.tsx
const AppNavigator = () => {
  const isAuthenticated = useIsAuthenticated();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
};
```

### Bottom Tabs (Active)

```typescript
// src/navigation/MainTabs.tsx
const MainTabs = () => {
  return (
    <Tab.Navigator tabBar={CustomTabBar}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="ResponsiveDemo" component={ResponsiveDemoScreen} />
    </Tab.Navigator>
  );
};
```

## ❌ Removed/Deprecated

The following files have been removed as part of the refactoring:

- ~~`RootNavigator.tsx`~~ → Replaced by `app/app-navigator.tsx`
- ~~`AuthStack.tsx`~~ → Simplified auth navigation in AppNavigator
- ~~`MainStack.tsx`~~ → Simplified main navigation in AppNavigator
- ~~`DrawerNavigator.tsx`~~ → Removed, using simpler stack navigation

## 📚 Reference Files (Keep for Patterns)

### Navigation Config

`config/navigationConfig.ts` contains:

- Screen configurations with lazy loading
- Navigation keys constants
- Header configuration patterns
- Screen metadata

**Use case:** Reference for screen config patterns when adding new screens.

### Screen Factory

`factories/screenFactory.ts` contains:

- Factory pattern for creating screen wrappers
- MainLayout integration patterns
- Batch creation utilities

**Use case:** Reference for creating screen wrapper patterns.

## 🆕 Adding New Screens

### Old Way (Deprecated)

```typescript
// In navigationConfig.ts
MAIN_STACK_SCREENS: {
  NewScreen: {
    title: 'New Screen',
    component: () => import('@/screens/NewScreen'),
    // ...config
  }
}
```

### New Way (Current)

1. Create screen component in `src/features/my-feature/screens/`
2. Add to AppNavigator directly:

```typescript
// src/app/app-navigator.tsx
<Stack.Screen
  name="NewScreen"
  component={NewScreen}
  options={{ title: 'New Screen' }}
/>
```

Or use in tabs:

```typescript
// src/navigation/MainTabs.tsx
<Tab.Screen
  name="NewTab"
  component={NewScreen}
  options={{
    tabBarLabel: 'New',
    tabBarIcon: ({ color }) => <Icon name="star" color={color} />
  }}
/>
```

## 🔧 Migration Guide

If you need to migrate old screen configs to new pattern:

1. **Find screen config** in `config/navigationConfig.ts`
2. **Extract component import** and metadata
3. **Add to AppNavigator** with proper stack/tabs
4. **Remove from config** (optional, can keep as reference)

Example:

```typescript
// Old config
{
  ProductScreen: {
    title: 'Products',
    component: () => import('@/features/example/screens/ProductScreen'),
    showHeader: true,
    headerType: 'minimal',
  }
}

// New implementation
<Stack.Screen
  name="ProductScreen"
  component={ProductScreen}
  options={{
    title: 'Products',
    headerShown: true,
  }}
/>
```

## 🎯 Best Practices

1. ✅ Use AppNavigator for new screens
2. ✅ Keep screens in feature folders
3. ✅ Use type-safe navigation params
4. ✅ Leverage React Navigation v6 features
5. ⚠️ Reference old config files only for patterns
6. ❌ Don't add new screens to legacy config files

## 🔗 Related Documentation

- [Main README](../../README.md)
- [Features Organization](../features/README.md)
- [App Bootstrap](../app/README.md)

---

**Status:** Legacy documentation - kept for reference patterns only  
**Last Updated:** 2026-01-16  
**Maintained by:** vanquyet16/base-react-native
