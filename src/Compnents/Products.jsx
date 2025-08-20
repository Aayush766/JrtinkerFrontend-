import { Helmet } from "react-helmet-async";


const Products = () => {
  
  return (
    <>
<Helmet>
  <title>Products</title>
</Helmet>

   <section className="w-full ">
      <img src="/images/coming-soon.jpg" alt="coming soon" className="w-full h-auto object-cover object-top" />
    </section>
    </>
  );
};

export default Products;
