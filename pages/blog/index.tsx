import Head from "next/head";
import Link from "next/link";
import Banner from "../../components/Banner";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";

interface Props {
  posts: [Post];
}

export default function Home({ posts }: Props) {
  const largeText = () => (
    <div>
      <span>Welcome</span> to the official blog of <span className="font-bold">Danum Bakehouse</span>
    </div>
  );
  const smallText = () => (
    <div>
      World class bread and pastries delivered straight to your door, handmade
      by <span className="italic">Stephanie Russin</span>
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
    <div className="max-w-7xl mx-auto">
      <Head>
        <title>Danum Bakehouse</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Banner
        largeText={largeText}
        smallText={smallText}
        banner={banner}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 p-2 md:p-6 transition-all">
        {posts.map((post) => (
          <Link key={post._id} href={`/blog/post/${post.slug.current}`}>
            <div className="group border rounded-lg cursor-pointer overflow-hidden">
              <img
                className="h-60 w-full object-cover group-hover:scale-105 transition-transform duration-500 ease-in-out"
                src={urlFor(post.mainImage).url()!}
                alt=""
              />
              <div className="flex justify-between p-5 bg-white">
                <div className="">
                  <p className="font-bold text-lg">{post.title}</p>
                  <p className="text-xs">
                    {post.description} by {post.author.name}
                  </p>
                </div>

                <img
                  src={urlFor(post.author.image).url()!}
                  alt=""
                  className="h-12 w-12 rounded-full"
                />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const getServerSideProps = async () => {
  const query = `* [_type == 'post']{
    _id,
    title,
    author->{
    name,image
  },
    description,
    mainImage,
    slug
  }`;

  const posts = await sanityClient.fetch(query);
  

  return {
    props: {
      posts,
    },
  };
};
