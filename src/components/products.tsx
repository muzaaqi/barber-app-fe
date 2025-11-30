import ProductCards from "./product-cards";
import SectionTitle from "./ui/text";

const ProductsSection = () => {
  return (
    <div className="container px-4 md:px-0">
      <SectionTitle>Your Hair Solutions</SectionTitle>
      <div>
        <ProductCards />
      </div>
    </div>
  );
};

export default ProductsSection;
