'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState } from 'react'
// Header 컴포넌트의 경로를 수정하세요.
import Header from '../components/header'

export default function RootLayoutClient({
  children,
  interClassName,
}: {
  children: React.ReactNode
  interClassName: string
}) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
  }))

  return (
    <QueryClientProvider client={queryClient}>
      <div className={interClassName}>
        <Header />
        <main>
          {children}
        </main>
      </div>
    </QueryClientProvider>
  )
} 