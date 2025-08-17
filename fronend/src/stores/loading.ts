import { create } from 'zustand';

interface LoadingState {
  isLoading: boolean;
  loadingText: string;
}

interface LoadingActions {
  showLoading: (text?: string) => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState & LoadingActions>((set) => ({
  isLoading: false,
  loadingText: 'Loading...',

  showLoading: (text = 'Loading...') => set({ isLoading: true, loadingText: text }),
  hideLoading: () => set({ isLoading: false, loadingText: 'Loading...' }),
}));
