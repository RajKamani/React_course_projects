import ProductItem from "./ProductItem";
import classes from "./Products.module.css";
const Dummy_prod = [
  {
    id: 1,
    name: "cheese",
    price: 100,
    description: "this is cheese",
  },
  {
    id: 2,
    name: "panir",
    price: 60,
    description: "this is panir",
  },
];
const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {Dummy_prod.map((item) => (
          <ProductItem key={item.id} newitem={item} />
        ))}
      </ul>
    </section>
  );
};

export default Products;
