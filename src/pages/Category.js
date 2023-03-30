import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Product from "../components/Product";

const Category = () => {
  const { id } = useParams();
  const [category, setCategory] = useState(null);

  const getCategoryById = () => {
    axios
      .get(`http://localhost:1337/api/categories/${id}?populate=*`)
      .then((res) => {
        setCategory(res.data.data);
        console.log(res.data.data);
      });
  };

  useEffect(() => {
    getCategoryById();
  }, [id]);

  return (
    <div>
      <h1 className="font-orbitron font-extrabold text-4xl text-center my-10">
        Gaming {category?.attributes.name}
      </h1>
      <section className="container mx-auto ">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {category?.attributes.products.data.map((product) => (
            <Product product={product} key={product.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Category;
