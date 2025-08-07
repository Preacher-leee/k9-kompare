import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { Breed, User, FilterOptions, Toast, Modal, AppState } from '@/types'
import { getFromLocalStorage, setToLocalStorage } from '@/utils'

interface ComparisonState {
  breeds: Breed[]
  maxBreeds: number
  isDragging: boolean
  draggedIndex: number | null
}

interface StoreState extends AppState {
  // User actions
  setUser: (user: User | null) => void
  updateUser: (updates: Partial<User>) => void
  
  // Comparison actions
  addToComparison: (breed: Breed) => void
  removeFromComparison: (breedId: number) => void
  clearComparison: () => void
  reorderComparison: (fromIndex: number, toIndex: number) => void
  setDragging: (isDragging: boolean, index?: number) => void
  
  // Filter actions
  setFilters: (filters: FilterOptions) => void
  updateFilters: (updates: Partial<FilterOptions>) => void
  clearFilters: () => void
  
  // Theme actions
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  toggleTheme: () => void
  
  // Toast actions
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  clearToasts: () => void
  
  // Modal actions
  openModal: (type: string, props?: Record<string, any>) => void
  closeModal: (id: string) => void
  closeAllModals: () => void
  
  // Loading and error actions
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
}

const generateId = () => Math.random().toString(36).substr(2, 9)

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Initial state
      user: null,
      comparison: {
        breeds: [],
        maxBreeds: 4,
        isDragging: false,
        draggedIndex: null,
      },
      filters: {},
      theme: 'system',
      toasts: [],
      modals: [],
      loading: false,
      error: null,

      // User actions
      setUser: (user) => set({ user }),
      
      updateUser: (updates) => set((state) => ({
        user: state.user ? { ...state.user, ...updates } : null
      })),

      // Comparison actions
      addToComparison: (breed) => set((state) => {
        const { breeds, maxBreeds } = state.comparison
        
        // Check if breed is already in comparison
        if (breeds.some(b => b.id === breed.id)) {
          return state
        }
        
        // Check if max breeds reached
        if (breeds.length >= maxBreeds) {
          // Add toast notification
          const toast: Toast = {
            id: generateId(),
            type: 'warning',
            title: 'Maximum breeds reached',
            message: `You can only compare up to ${maxBreeds} breeds at a time.`,
            duration: 3000,
          }
          
          return {
            ...state,
            toasts: [...state.toasts, toast],
          }
        }
        
        return {
          ...state,
          comparison: {
            ...state.comparison,
            breeds: [...breeds, breed],
          },
        }
      }),

      removeFromComparison: (breedId) => set((state) => ({
        comparison: {
          ...state.comparison,
          breeds: state.comparison.breeds.filter(b => b.id !== breedId),
        },
      })),

      clearComparison: () => set((state) => ({
        comparison: {
          ...state.comparison,
          breeds: [],
        },
      })),

      reorderComparison: (fromIndex, toIndex) => set((state) => {
        const breeds = [...state.comparison.breeds]
        const [removed] = breeds.splice(fromIndex, 1)
        breeds.splice(toIndex, 0, removed)
        
        return {
          comparison: {
            ...state.comparison,
            breeds,
          },
        }
      }),

      setDragging: (isDragging, index) => set((state) => ({
        comparison: {
          ...state.comparison,
          isDragging,
          draggedIndex: index ?? null,
        },
      })),

      // Filter actions
      setFilters: (filters) => set({ filters }),
      
      updateFilters: (updates) => set((state) => ({
        filters: { ...state.filters, ...updates },
      })),
      
      clearFilters: () => set({ filters: {} }),

      // Theme actions
      setTheme: (theme) => {
        set({ theme })
        
        // Apply theme to document
        if (typeof window !== 'undefined') {
          const root = window.document.documentElement
          root.classList.remove('light', 'dark')
          
          if (theme === 'system') {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
            root.classList.add(systemTheme)
          } else {
            root.classList.add(theme)
          }
        }
      },

      toggleTheme: () => {
        const { theme, setTheme } = get()
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
      },

      // Toast actions
      addToast: (toast) => set((state) => {
        const newToast: Toast = {
          ...toast,
          id: generateId(),
          duration: toast.duration ?? 5000,
        }
        
        return {
          toasts: [...state.toasts, newToast],
        }
      }),

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter(t => t.id !== id),
      })),

      clearToasts: () => set({ toasts: [] }),

      // Modal actions
      openModal: (type, props) => set((state) => {
        const modal: Modal = {
          id: generateId(),
          type,
          props,
        }
        
        return {
          modals: [...state.modals, modal],
        }
      }),

      closeModal: (id) => set((state) => ({
        modals: state.modals.filter(m => m.id !== id),
      })),

      closeAllModals: () => set({ modals: [] }),

      // Loading and error actions
      setLoading: (loading) => set({ loading }),
      
      setError: (error) => set({ error }),
    }),
    {
      name: 'k9kompare-store',
      partialize: (state) => ({
        user: state.user,
        comparison: state.comparison,
        filters: state.filters,
        theme: state.theme,
      }),
    }
  )
)

// Selectors for better performance
export const useUser = () => useStore((state) => state.user)
export const useComparison = () => useStore((state) => state.comparison)
export const useFilters = () => useStore((state) => state.filters)
export const useTheme = () => useStore((state) => state.theme)
export const useToasts = () => useStore((state) => state.toasts)
export const useModals = () => useStore((state) => state.modals)
export const useLoading = () => useStore((state) => state.loading)
export const useError = () => useStore((state) => state.error)

// Comparison selectors
export const useComparisonBreeds = () => useStore((state) => state.comparison.breeds)
export const useComparisonCount = () => useStore((state) => state.comparison.breeds.length)
export const useIsInComparison = (breedId: number) => 
  useStore((state) => state.comparison.breeds.some(b => b.id === breedId))

// Filter selectors
export const useActiveFilters = () => useStore((state) => {
  const filters = state.filters
  return Object.keys(filters).filter(key => {
    const value = filters[key as keyof FilterOptions]
    return value !== undefined && value !== null && 
           (Array.isArray(value) ? value.length > 0 : value !== '')
  }).length
})

// Theme selector with system preference
export const useResolvedTheme = () => {
  const theme = useTheme()
  
  if (typeof window === 'undefined') return 'light'
  
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  
  return theme
} 
