import Link from "next/link";
import React, { useEffect } from "react";
import { useState } from "react";
import Banner from "../components/Banner";
import Explanation from "../components/Explanation";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { shuffleArray } from "../globalfunctions";
import { sanityClient, urlFor } from "../sanity";
import { Product } from "../typings";

interface Props {
  products: [Product];
}

function Home({ products }: Props) {
  const [productarr, setproducts] = useState<Product[]>(shuffleArray(products));

  const largeText = () => (
    <div>
      <span className="underline font-bold underline-offset-1 decoration-4">
        Danum Bakehouse
      </span>{" "}
      is the <span className="italic">first</span> subscription service for
      artisan bakery produce
    </div>
  );
  const smallText = () => (
    <div>
      World class artisan bread and pastries, handmade in house by{" "}
      <span className="italic">Stephanie Russin</span>
    </div>
  );
  const banner = () => (
    <div>
      DANUM
      <br />
      BAKEHOUSE
    </div>
  );

  return (
    <div>
      {/* header */}
      <Header />

      <Banner largeText={largeText} smallText={smallText} banner={banner} />

      {/* explanation */}
      <Explanation />

      {/* Carousel */}
      <div className="flex items-center justify-center pt-20 pb-10">
        <h1 className="lg:text-7xl text-5xl md:text-6xl font-amatic font-bold">
          A taste of our stuff
        </h1>
      </div>

      <div className="flex justify-evenly flex-wrap lg:flex-nowrap space-y-10 md:space-y-0 md:space-x-10 px-10 sm:px-20 pb-20 flex-col sm:flex-row">
        {productarr.slice(0, 3)?.map((product) => (
          <Link href={`product/${product.slug.current}`}>
            <div
              key={product._id}
              className="group hover:shadow-lg hover:mb-1 border shadow transition-all rounded-lg cursor-pointer overflow-hidden w-full md:w-[45%] bg-white"
            >
              <img
                src={urlFor(product.mainImage).url()!}
                alt=""
                className="h-52 w-full object-cover group-hover:scale-[103%] transition-transform duration-500 ease-in-out"
              />
              <div className="p-2 ">
                <h1 className="font-semibold">{product.title}</h1>
                <p>{product.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Photo - short bio */}

      {/* Cards */}

      <Footer />
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
  console.log(products);

  return {
    props: {
      products,
    },
  };
};

export default Home;
