import React, { useEffect, useState } from 'react'
import { Layout } from '../components'
import '../styles/global.scss'
import type { AppProps } from 'next/app'
import { Footer } from '../components'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
      <Footer />
    </Layout>
  )
}

export default MyApp
