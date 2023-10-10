import Image from 'next/image'
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
          <Image src={logoImg.src} alt="" width={129.74} height={136} />
        </Header>

        <Component {...pageProps} />
      </Container>
    </div>
  )
}
