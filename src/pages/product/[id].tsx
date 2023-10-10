import {
  ImageContainer,
  ProductContainer,
  ProductDetails,
} from '@stylesPages/product'

export default function Product() {
  return (
    <ProductContainer>
      <ImageContainer>{/* <Image /> */}</ImageContainer>

      <ProductDetails>
        <h1>Camisa X</h1>
        <span>R$ 79,90</span>

        <p>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex impedit
          odio cupiditate ipsum totam eum sunt natus amet debitis vero, tenetur
          assumenda illum atque quasi voluptates! Soluta consequuntur recusandae
          necessitatibus.
        </p>

        <button>Comprar agora</button>
      </ProductDetails>
    </ProductContainer>
  )
}
