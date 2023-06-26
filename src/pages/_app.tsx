import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Navbar from '@/components/Navbar'
import { Toaster } from 'react-hot-toast'
import NextNProgress, { NextNProgressProps } from 'nextjs-progressbar'

export default function App({ Component, pageProps }: AppProps) {
  return <>
    <Navbar />
    <NextNProgress />
    <Toaster position='top-center' />
    <Component {...pageProps} />
  </>
}
