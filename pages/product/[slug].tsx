import { GetStaticProps } from "next";
import React, { useRef } from "react";
import { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Product } from "../../typings";

interface Props {
  product: Product;
}

function Product({ product }: Props) {
  const [price, setprice] = useState(1);

  const handePrice = (e: any) => {
    if (e.target.value > 0) {
      setprice(parseInt(e.target.value));
    }
  };

  const handlesubmit = (e:any)=>{
    e.preventDefault()

  }

  return (
    <>
    <Header/>
    <div className="flex justify-center my-[8%]">
      <form onSubmit={(e)=>handlesubmit(e)} className="flex m-3 flex-col object-cover max-w-2xl shadow appearance-none border rounded overflow-hidden">
        {/* image and desc*/}
          <div className="flex flex-col sm:flex-row">
            <img src={urlFor(product.mainImage).url()!} alt="" className="max-w-full sm:max-w-[50%]"/>
            <div className=" flex flex-col justify-between p-5 w-full">
              <div className="">
              <h1 className="text-3xl font-semibold mb-2">{product.title}</h1>
              <p>{product.description}</p>
              </div>

              <div className="flex justify-between items-center pt-5">
                <p className="font-semibold">
                  Price: {(product.price * price).toFixed(2)}$
                </p>
                <div className="font-bold">
                <label htmlFor="quanitity">quantity:</label>
                <input
                  type="number"
                  inputMode="numeric"
                  className={`ml-2 appearance-none font-bold outers w-16 focus:outline-none`}
                  name="quanitity"
                  value={price}
                  onChange={(e) => handePrice(e)}
                />
                </div>
              </div>
            </div>
          </div>
          <button type="submit" className=" py-2 px-3 rounded-b hover:bg-yellow-400 font-bold font-amatic text-2xl transition-all text-gray-700 leading-tight bg-yellow-500 w-full focus:outline-none focus:shadow-outline" >
            Add to cart
          </button>
      </form>

    </div>
    <Footer/>
    </>
  );
}

export default Product;

export const getStaticPaths = async () => {
  const query = `*[_type=='product']{_id,slug{current,}}`;

  const products = await sanityClient.fetch(query);

  const paths = products.map((product: Product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'product' && slug.current == $slug][0]{
    _id,
    title,
    price,
    stock,
    description,
    mainImage,
    slug
  }`;

  const product = await sanityClient.fetch(query, { slug: params?.slug });

  if (!product) {
    return { notFound: true };
  }

  return {
    props: {
      product,
    },
    revalidate: 60,
  };
};
