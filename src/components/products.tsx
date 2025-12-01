import ProductCards from "./product-cards";
import SectionTitle from "./ui/text";

const ProductsSection = () => {
  return (
    <div id="products" className="container px-4">
      <SectionTitle>SOLUSI RAMBUTMU</SectionTitle>
      <div>
        <ProductCards />
      </div>
    </div>
  );
};

export default ProductsSection;
