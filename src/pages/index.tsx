import { GetServerSideProps } from 'next'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'

import { HomeContainer, Product } from '@stylesPages/home'

import camiseta1 from '@assets/camisetas/1.png'
import camiseta2 from '@assets/camisetas/2.png'
import camiseta3 from '@assets/camisetas/3.png'
import camiseta4 from '@assets/camisetas/4.png'
import camiseta5 from '@assets/camisetas/5.png'

import 'keen-slider/keen-slider.min.css'
import { stripe } from 'src/lib/stripe'
import Stripe from 'stripe'

type Product = {
  id: string
  name: string
  imageUrl: string
  price: number | null
}

interface HomeProps {
  products: Product[]
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    },
  })
  return (
    <HomeContainer ref={sliderRef} className="keen_slider">
      {products?.map(({ id, imageUrl, name, price }) => {
        return (
          <Product key={id} className="keen-slider__slide">
            <Image src={imageUrl} width={520} height={480} alt="" />

            <footer>
              <strong>{name}</strong>
              <span>R$ {price}</span>
            </footer>
          </Product>
        )
      })}
    </HomeContainer>
  )
}

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price?.unit_amount ? price.unit_amount / 100 : null,
    }
  })
  return {
    props: {
      products,
    },
  }
}
