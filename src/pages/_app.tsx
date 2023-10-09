import type { AppProps } from 'next/app'

import { Roboto } from 'next/font/google'

import logoImg from '@assets/logo.svg'
import { Container, Header } from '@stylesPages/app'
import { globalStyles } from '../styles/global'

const roboto = Roboto({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--roboto',
})

globalStyles()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <Container>
        <Header>
          <img src={logoImg.src} alt="" />
        </Header>

        <Component {...pageProps} />
      </Container>
    </div>
  )
}
