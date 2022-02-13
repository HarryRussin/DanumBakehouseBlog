import React, { useState } from "react";
import Header from "../components/Header";
import { sanityClient } from "../sanity";
import { Category, Product } from "../typings";
import { SearchIcon } from "@heroicons/react/outline";

interface Props {
  products: [Product];
  categories: [Category];
}

function Products({ products, categories }: Props) {
  const [selectedCategory, setselectedCategory] = useState("");

  return (
    <div>
      <Header />

      {/* search bar */}
      <div className="bg-yellow-500 px-20 py-10">
      <div className="">
        <h1 className="font-amatic text-8xl text-center">Danum Bakehouse</h1>
        <div className="relative border bg-white p-4 my-10 rounded-full  text-3xl">
          <input
            type="text"
            name=""
            id=""
            className="block outline-none ml-14 text-2xl md:text-3xl md:ml-20 h-8 md:h-12 text-left text-orange-500"
            placeholder="search for bread!"
          />
          <SearchIcon className="absolute top-[1.15rem] md:top-5 left-6 w-8 md:w-12 text-orange-500" />
        </div>
      </div>
      </div>


        {/* categories */}
        <div className="flex mx-5 md:mx-20 my-10 justify-between ">
          {categories.map((category) => (
            <p
              className="text-center shadow-lg bg-yellow-500 hover:shadow-2xl sick-hover before:h-1 flex-1 py-2 px-6"
              onClick={() => setselectedCategory(category.title)}
            >
              {category.title}
            </p>
          ))}
        </div>
        {selectedCategory}

        {/* items */}
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `* [_type == 'product']{
          _id,
          title,
          price,
          stock,
          description,
          mainImage,
          slug,
        }`;

  const products = await sanityClient.fetch(query);

  const query2 = `* [_type == 'category']{
    _id,
    title,
  }`;

  const categories = await sanityClient.fetch(query2);

  return {
    props: {
      products,
      categories,
    },
  };
};

export default Products;
