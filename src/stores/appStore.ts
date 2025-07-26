import { create } from 'zustand';

interface AppStore {
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
}

const useAppStore = create<AppStore>((set) => ({
    theme: 'light',
    setTheme: (theme) => set({ theme }),
}));

export const useTheme = () => useAppStore((state) => state.theme);
export const useSetTheme = () => useAppStore((state) => state.setTheme);

export default useAppStore; 