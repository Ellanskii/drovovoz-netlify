// import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import marked from 'marked'

export const cleanProduct = (product, full = false) => {
  // Базовый товар для миниатюры в списке
  const basicProduct = {
    id: product.sys.id,
    slug: product.fields.slug,
    name: product.fields.name,
    cover: product.fields.image
      ? 'https:' + product.fields.image[0].fields.file.url
      : null,
    price: product.fields.price
  }

  const fullProduct = {
    description: product.fields.description
      ? marked(product.fields.description)
      : null,
    characteristics: product.fields.characteristics
  }

  return full ? { ...basicProduct, ...fullProduct } : basicProduct
}

export const cleanWarhouse = (warhouse) => {
  return {
    id: warhouse.sys.id,
    address: warhouse.fields.address,
    dealer: warhouse.fields.dealer?.fields
  }
}
