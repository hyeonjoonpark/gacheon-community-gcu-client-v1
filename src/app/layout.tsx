import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import Header from '@/components/header'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'  // 폰트 로딩 최적화
})

export const metadata: Metadata = {
  title: '가천 유니버스',
  description: '가천대학교 커뮤니티',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>
          <Header />
          {children}
        </Providers>
      </body>
    </html>
  )
}
