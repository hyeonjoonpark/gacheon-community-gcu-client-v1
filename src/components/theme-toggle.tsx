'use client'

import { useEffect, useState } from 'react'
import { SunIcon, MoonIcon } from '@heroicons/react/24/solid'
import { useThemeStore } from '@/store/themeStore'

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, toggleTheme } = useThemeStore()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={toggleTheme}
      className={`
        w-14 h-7 relative rounded-full transition-colors duration-500
        ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'}
      `}
    >
      <div
        className={`
          absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full 
          transition-transform duration-500 flex items-center justify-center
          ${theme === 'dark' ? 'translate-x-[26px] bg-gray-800' : 'translate-x-1 bg-white'}
        `}
      >
        {theme === 'dark' ? (
          <MoonIcon className="h-3 w-3 text-yellow-300" />
        ) : (
          <SunIcon className="h-3 w-3 text-yellow-500" />
        )}
      </div>
    </button>
  )
} 