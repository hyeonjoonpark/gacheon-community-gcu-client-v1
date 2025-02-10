"use client"

import Image from 'next/image'
import Link from 'next/link'
import ThemeToggle from './theme-toggle'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
 
  const menuItems = [
    { href: '/notice', label: '가천뉴스' },
    { 
      href: '/community', 
      label: '게시판',
      subMenu: [
        { href: '/community?tab=free', label: '자유게시판' },
        { href: '/community?tab=department', label: '학과게시판' },
        { href: '/community?tab=student', label: '학생게시판' },
      ],
    },
    { href: '/club', label: '동아리' },
    { href: '/forest', label: '대나무숲' },
    { href: '/cc', label: '가천cc' },
    {
      href: '/wiki',
      label: 'wiki',
      subMenu: [
        { href: '/wiki/student', label: '학생' },
        { href: '/wiki/case', label: '사건사고' },
      ],
    },
  ]

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 right-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Image
                  src="/Gacheon Universe Logo.svg"
                  alt="가천 유니버스 로고"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                  priority
                />
              </Link>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <nav>
                <ul className="flex gap-6 text-gray-800 dark:text-gray-100">
                  {menuItems.map((item) => (
                    <li 
                      key={item.href} 
                      className="relative"
                      onMouseEnter={() => item.subMenu && setOpenMenuId(item.href)}
                      onMouseLeave={() => item.subMenu && setOpenMenuId(null)}
                    >
                      <Link 
                        href={item.href} 
                        className={`block py-2 ${
                          pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''
                        }`}
                      >
                        {item.label}
                        {pathname === item.href && (
                          <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 dark:bg-blue-400" />
                        )}
                      </Link>
                      {item.subMenu && openMenuId === item.href && (
                        <div className="absolute top-full left-0 w-32 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
                          {item.subMenu.map((subItem) => (
                            <Link
                              key={subItem.href}
                              href={subItem.href}
                              className={`block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                                pathname === subItem.href ? 'text-blue-600 dark:text-blue-400' : ''
                              }`}
                            >
                              {subItem.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center">
                <ThemeToggle />
              </div>
              
              <Link href="/login" className="hidden md:block px-4 py-2 text-gray-800 dark:text-gray-100">
                로그인
              </Link>
              
              <button
                className="md:hidden p-2"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <svg
                  className="h-6 w-6 text-gray-800 dark:text-gray-100"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isMobileMenuOpen ? (
                    <path d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {isMobileMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {menuItems.map((item) => (
                  <div key={item.href}>
                    <Link
                      href={item.href}
                      className={`block px-3 py-2 rounded-md text-base font-medium ${
                        pathname === item.href
                          ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                          : 'text-gray-800 dark:text-gray-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.subMenu && (
                      <div className="pl-4 space-y-1">
                        {item.subMenu.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={`block px-3 py-2 rounded-md text-sm font-medium ${
                              pathname === subItem.href
                                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                                : 'text-gray-800 dark:text-gray-100'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                <Link
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-800 dark:text-gray-100"
                >
                  로그인
                </Link>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  )
} 