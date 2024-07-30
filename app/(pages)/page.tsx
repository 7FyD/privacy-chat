import Link from "next/link";

const Page = () => {
  return (
    <div className="container mt-24 space-y-10">
      <div className="space-y-2">
        <h2 className="text-center text-4xl">
          Looking to have a private, quick conversation?
        </h2>
        <h4 className="text-center text-4xl font-light">We've got you!</h4>
      </div>
      <Link
        href="/chat"
        className="mx-auto block bg-red-500 hover:bg-red-700 transition-colors rounded-full p-4 text-white max-w-max"
      >
        Start a one-to-one conversation!
      </Link>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem
        temporibus cumque voluptatibus deserunt minus natus. Adipisci deleniti
        aliquam perspiciatis magni eum, hic nobis laboriosam recusandae earum
        necessitatibus animi reprehenderit neque.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 text-center gap-24 !mt-24">
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
        <p>Image</p>
      </div>
    </div>
  );
};

export default Page;
