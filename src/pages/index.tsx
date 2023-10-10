import { GetStaticProps } from 'next'
import Image from 'next/image'
import { useKeenSlider } from 'keen-slider/react'
import Stripe from 'stripe'

import { stripe } from 'src/lib/stripe'
import { HomeContainer, Product } from '@stylesPages/home'

import 'keen-slider/keen-slider.min.css'
import Link from 'next/link'

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
          <Link href={`/products/${id}`} key={id}>
            <Product className="keen-slider__slide">
              <Image src={imageUrl} width={520} height={480} alt="" />

              <footer>
                <strong>{name}</strong>
                <span>R$ {price}</span>
              </footer>
            </Product>
          </Link>
        )
      })}
    </HomeContainer>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price'],
  })

  const products = response.data.map((product) => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: price?.unit_amount
        ? new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price.unit_amount / 100)
        : null,
    }
  })
  return {
    props: {
      products,
    },
    revalidate: 60 * 60 * 60, // 2 hours,
  }
}
