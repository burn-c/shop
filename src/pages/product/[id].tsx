import { GetStaticPaths, GetStaticProps } from 'next'
import Stripe from 'stripe'

import { stripe } from 'src/lib/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@stylesPages/product'
import Image from 'next/image'
import { useRouter } from 'next/router'

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()

  // TODO: Adds Loader component or skeleton
  if (isFallback) {
    return <h1>...Loading</h1>
  }

  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product?.imageUrl} width={520} height={480} alt="" />
      </ImageContainer>

      <ProductDetails>
        <h1>{product?.name}</h1>
        <span>{product?.price}</span>

        <p>{product?.description}</p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  // Buscar os produtos mais vendidos / mais acessados

  return {
    paths: [{ params: { id: 'prod_On7htJdplddGTf' } }],
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const productId = params?.id as string

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price'],
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: price?.unit_amount
          ? new Intl.NumberFormat('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            }).format(price.unit_amount / 100)
          : null,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 60 minutes
  }
}
