import type { Metadata } from 'next'
import '../globals.css'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
    title: 'Quotopia',
    description: 'The worlds most complete quote library',
}

const inter = Inter({ subsets: ['latin'] })

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
            <div className='flex flex-row w-full justify-center content-center'>
                        {children}
            </div>
  )
}
