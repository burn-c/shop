import Image from 'next/image'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps } from 'next'
import axios from 'axios'
import Stripe from 'stripe'

import { stripe } from 'src/lib/stripe'

import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@stylesPages/product'
import { useState } from 'react'

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
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] =
    useState(false)
  const { isFallback } = useRouter()

  async function handleBuyProduct() {
    try {
      setIsCreatingCheckoutSession(true)

      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId,
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      // TODO: Conectar com uma ferramenta de observabilidade ( Datadog / Sentry)

      alert('Falha ao redirecionar ao checkout!')
      setIsCreatingCheckoutSession(false)
    }
  }

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

        <button
          type="button"
          onClick={handleBuyProduct}
          disabled={isCreatingCheckoutSession}
        >
          {isCreatingCheckoutSession ? 'Carregando...' : 'Comprar agora'}
        </button>
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
