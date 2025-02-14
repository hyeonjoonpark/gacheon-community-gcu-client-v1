'use client';

import { Inter } from 'next/font/google'
import './globals.css'
import Providers from '@/providers/providers'
import Header from '@/components/header'
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap'  // 폰트 로딩 최적화
})

const client = new ApolloClient({
  uri: 'http://localhost:8081/graphql',
  cache: new InMemoryCache(),
  credentials: 'include'
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <ApolloProvider client={client}>
          <Providers>
            <Header />
            {children}
          </Providers>
        </ApolloProvider>
      </body>
    </html>
  )
}
