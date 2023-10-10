import Image from 'next/image'

import { HomeContainer, Product } from '@stylesPages/home'

import camiseta1 from '@assets/camisetas/1.png'
import camiseta2 from '@assets/camisetas/2.png'
import camiseta3 from '@assets/camisetas/3.png'
import camiseta4 from '@assets/camisetas/4.png'
import camiseta5 from '@assets/camisetas/5.png'

export default function Home() {
  return (
    <HomeContainer>
      <Product>
        <Image src={camiseta1} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa x1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta2} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa x1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta3} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa x1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta4} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa x1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>

      <Product>
        <Image src={camiseta5} width={520} height={480} alt="" />

        <footer>
          <strong>Camisa x1</strong>
          <span>R$ 79,90</span>
        </footer>
      </Product>
    </HomeContainer>
  )
}
