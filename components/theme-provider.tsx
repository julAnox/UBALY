'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <NextThemesProvider 
      {...props}
      disableTransitionOnChange
      defaultTheme="dark"
      attribute="class"
      forcedTheme="dark"
    >
      {children}
    </NextThemesProvider>
  )
}
