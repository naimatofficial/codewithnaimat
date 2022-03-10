import React, { useEffect, useState } from 'react'
import { Layout } from '../components'
import '../styles/global.scss'
import type { AppProps } from 'next/app'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
