import unplugged from "../assets/unplugged.png";

export const getProductImageSource = (product) => {
  const image = product?.imageData ?? product?.productImage ?? product?.imageUrl;

  if (typeof image !== "string" || !image.trim()) {
    return unplugged;
  }

  const imageValue = image.trim();
  if (
    imageValue.startsWith("data:") ||
    imageValue.startsWith("http://") ||
    imageValue.startsWith("https://") ||
    imageValue.startsWith("blob:")
  ) {
    return imageValue;
  }

  const imageType = product.imageType?.includes("/")
    ? product.imageType
    : "image/jpeg";
  return `data:${imageType};base64,${imageValue}`;
};

export { unplugged };
