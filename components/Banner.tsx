interface Props{
  largeText:Function;
  smallText:Function;
  banner:Function
}

function Banner(props:Props) {
  return (
    <div className="flex justify-between items-center bg-yellow-500 border-y border-black py-10">
      <div className="px-10 space-y-5">
        <h1 className="text-5xl max-w-xl font-serif">
          {props.largeText()}
        </h1>
        <h2>
          {" "}
          {props.smallText()}
        </h2>
      </div>

      {/* Never has fresh been so close */}

      <div className="hidden md:inline-flex text-8xl font-amatic lg:text-9xl mr-10">
        <h1 className="">
          {props.banner()}
        </h1>
      </div>
    </div>
  );
}

export default Banner;
