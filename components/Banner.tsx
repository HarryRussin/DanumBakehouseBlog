function Banner() {
  return (
    <div className="flex justify-between items-center bg-yellow-500 border-y border-black py-10">
      <div className="px-10 space-y-5">
        <h1 className="text-5xl max-w-xl font-serif">
          <span className="underline decoration-black decoration-4">
            Danum Bakehouse
          </span>{" "}
          is the <span className="italic">first</span> subscription service for
          freshly baked artisan bread
        </h1>
        <h2>
          {" "}
          Become a consumer of highly delectable artisinal breads and pastries
          from around the world, delivered right to your doorstep.
        </h2>
      </div>

      {/* Never has fresh been so close */}

      <div className="hidden md:inline-flex text-8xl font-amatic lg:text-9xl mr-10">
        <h1 className="">
          DANUM
          <br />
          BAKEHOUSE
        </h1>
      </div>
    </div>
  );
}

export default Banner;
