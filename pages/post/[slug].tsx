import { GetStaticProps } from "next";
import Header from "../../components/Header";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import PortableText from "react-portable-text";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState } from "react";

interface Props {
  post: Post;
}

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

function Post({ post }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    fetch("/api/createComment", {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => {
        setsubmitted(true);
      })
      .catch((err) => {
        console.log(err);
        setsubmitted(false);
      });
  };

  const [submitted, setsubmitted] = useState(false);

  return (
    <main suppressHydrationWarning>
      <Header />

      <img
        src={urlFor(post.mainImage).url()!}
        alt=""
        className="w-full h-40 object-cover"
      />

      <article className="max-w-3xl mx-auto p-5">
        <h1 className="text-3xl mt-10 mb-3">{post.title}</h1>
        <h2 className="text-xl font-light text-gray-500 mb-2">
          {post.description}
        </h2>

        <div className="flex items-center space-x-2">
          <img
            src={urlFor(post.author.image).url()!}
            alt=""
            className="rounded-full h-10 w-10"
          />
          <p className="font-extralight text-sm">
            Blog post by{" "}
            <span className="text-orange-700">{post.author.name}</span> -
            Published at {new Date(post._createdAt).toLocaleString()}
          </p>
        </div>

        <div className="mt-10">
          <PortableText
            className=""
            dataset={process.env.NEXT_PUBLIC_SANITY_DATASET!}
            projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!}
            content={post.body}
            serializers={{
              h1: (props: any) => (
                <h1 className="text-2xl font-bold  my-5" {...props} />
              ),
              h2: (props: any) => (
                <h1 className="text-xl font-bold my-5" {...props} />
              ),
              li: ({ children }: any) => (
                <li className="ml-4 list-disc">{children}</li>
              ),
              link: ({ href, children }: any) => (
                <a href={href} className="text-blue-500 hover:underline">
                  {children}
                </a>
              ),
            }}
          />
        </div>
      </article>



      <hr className="max-w-lg my-5 mx-auto border border-yellow-500 bg-yellow-500" />

      {!submitted ? (
        <form
          className="flex flex-col p-5 max-w-2xl mx-auto mb-10 my-10 "
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="text-sm text-yellow-500">Enjoyed this article?</h3>
          <h4 className="text-3xl font-bold">Leave a comment below!</h4>
          <hr className="py-3 mt-2" />

          <input
            type="hidden"
            {...register("_id")}
            name="_id"
            value={post._id}
          />

          <label className="block mb-5">
            <span className="text-gray-700">Name</span>
            <input
              {...register("name", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring focus:border-none outline-none"
              type="text"
              placeholder="Margaret Thatcher"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Email</span>
            <input
              {...register("email", { required: true })}
              className="shadow border rounded py-2 px-3 form-input mt-1 block w-full ring-yellow-500 focus:ring focus:border-none outline-none"
              type="email"
              placeholder="mrsmith@example.com"
            />
          </label>
          <label className="block mb-5">
            <span className="text-gray-700">Comment</span>
            <textarea
              {...register("comment", { required: true })}
              className="shadow border rounded py-2 px-3 form-textarea mt-1 block w-full ring-yellow-500 focus:ring focus:border-none outline-none"
              placeholder="Enter your comment here..."
              rows={8}
            />
          </label>

          <div className="flex flex-col p-5">
            {errors.name && (
              <span className="text-red-500">
                {" "}
                - The name field is required
              </span>
            )}
            {errors.email && (
              <span className="text-red-500">
                {" "}
                - The email field is required
              </span>
            )}
            {errors.comment && (
              <span className="text-red-500">
                {" "}
                - The comment field is required
              </span>
            )}
          </div>

          <input
            type="submit"
            className="shadow border rounded block w-full bg-yellow-500 hover:bg-yellow-400 transition-all focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 cursor-pointer"
          />
        </form>
      ) : (
        <div className="flex flex-col p-10 my-10 bg-yellow-500 text-white max-w-2xl mx-auto">
          <h3 className="text-3xl font-bond">
            Thank you for submitting your comment!
          </h3>
          <p>Once it has been approved, it will appear below</p>
        </div>
      )}

      
<div className="flex flex-col p-10 my-10 max-w-2xl mx-auto shadow-yellow-500 shadow space-y-2">
        <h3 className="text-4xl">Comments</h3>
        <hr className="pb-2"/>

        {post.comments.map((comment) => (
          <div key={comment._id} className="flex relative justify-between p-2">
            <p className="text-xs text-yellow-900 absolute -top-1">{new Date(comment._createdAt).toLocaleString()}</p>
            <p className=""><span className="text-yellow-500 font-bold ">{comment.name}</span>: {comment.comment}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  const query = `*[type=='post']{_id,slug{current,}}`;

  const posts = await sanityClient.fetch(query);

  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `* [_type == 'post' && slug.current == $slug][0]{
    _id,
    _createdAt,
    title,
    author->{
    name,image
  },
    'comments':*[
    _type=='comment'&&post._ref == ^._id &&
    approved == true
  ],
    description,
    mainImage,
    slug,
    body
  }`;

  const post = await sanityClient.fetch(query, { slug: params?.slug });

  if (!post) {
    return { notFound: true };
  }

  return {
    props: {
      post,
    },
    revalidate: 60,
  };
};
