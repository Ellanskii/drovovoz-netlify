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

  const fullProduct = {}

  return full ? { basicProduct, ...fullProduct } : basicProduct
}
