import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getResponsiveImage = (url: string, mult: number = 1) => {
  const windowWidth = typeof window !== 'undefined' ? window.innerWidth : 1200
  let width = 1280 // Default for XL/Desktop

  if (windowWidth < 640) {
    width = 640 // Mobile (increased for high-DPR phones)
  } else if (windowWidth < 1024) {
    width = 1024 // Tablet
  }

  const dpr = window.devicePixelRatio || 1

  const finalWidth = Math.min(Math.round(width * dpr), 3840) * mult

  const params = new URLSearchParams({
    w: finalWidth.toString(),
    q: dpr > 1 ? '65' : '80',
    fm: 'webp',
    fit: 'contain',
    url: url,
  })
  if (import.meta.env.VITE_DEV) return url

  return `/.netlify/images?${params.toString()}`
}

import { useToast, TYPE, POSITION } from 'vue-toastification'
import type { ToastOptions } from 'vue-toastification/dist/types/types'

export interface CustomToastProps {
  title?: string
  description: string
  variant?: 'default' | 'success' | 'info' | 'warning' | 'error' | 'destructive' // Using common toast types
}

export type CustomToastFunction = (props: CustomToastProps) => void

const libraryToast = useToast()

export const customToast: CustomToastFunction = ({
  title = '',
  description,
  variant = 'default',
}) => {
  let toastType = TYPE.DEFAULT
  let styleOptions: ToastOptions = {}

  switch (variant) {
    case 'success':
      toastType = TYPE.SUCCESS
      break
    case 'info':
      toastType = TYPE.INFO
      break
    case 'warning':
      toastType = TYPE.WARNING
      break
    case 'error':
    case 'destructive': // Map 'destructive' to 'error'
      toastType = TYPE.ERROR
      break
    case 'default':
    default:
      toastType = TYPE.DEFAULT
      break
  }

  const message = title ? `${title}: ${description}` : description

  styleOptions = {
    type: toastType,
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
  }

  libraryToast(message, styleOptions)
}

// For backward compatibility (if you still want to use a simple name)
export const toast = customToast
