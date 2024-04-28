import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ThemeProvider } from '@/providers/ThemeProvider';
import NotficationDialogs from '@/components/ui/NotificationDialogs';
import Sidebar from '@/components/nav/Sidebar';
import MaxWidthWrapper from '@/components/ui/MaxWidthWrapper';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quotopia',
  description: 'The worlds most complete quote library',

}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
  
}) {

  return (
    <html lang="en">
        <body className={inter.className}>
        <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            > 
            <div className='min-h-screen -translate-x-1/2 rotate-[30] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] dark:bg-gradient-to-tr dark:from-[#81425c] dark:to-[#403d6e]'>
              <div className="min-h-screen inset-0 h-full w-full bg-[radial-gradient(transparent_1px,#FFFFFF_1px)] dark:bg-[radial-gradient(transparent_1px,#000000_1px)] [background-size:16px_16px] bg-opacity-30">
                      <Sidebar />
                      <MaxWidthWrapper>
                        <NotficationDialogs />
                        {children}
                      </MaxWidthWrapper>
              </div>
            </div>
          </ThemeProvider>
        </body>
    </html>
  )
}
