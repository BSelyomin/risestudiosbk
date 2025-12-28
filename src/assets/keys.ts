import { type InjectionKey, type Ref } from 'vue'

// Define the precise type for the provided context
interface SheetContext {
  isOpen: Ref<boolean> // Or typeof isOpen, but Ref<boolean> is clearer for external use
  toggle: () => void
}

// Export the single, common key
export const SheetKey: InjectionKey<SheetContext> = Symbol('Sheet')
