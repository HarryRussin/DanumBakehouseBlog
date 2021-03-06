
function Explanation() {
  return (
    <div className="transition-all flex flex-col sm:flex-row items-center space-x-10 mx-10 max-w-xl md:max-w-3xl lg:max-w-4xl mb-10 mt-16 lg:mx-auto">
        {/* left side: PHOTO */}
        <img src="/baker.jpg" alt="" 
        className="rounded-full h-72 object-cover w-72 hover:border-orange-500 hover:border-4 transition-all"/>

        {/* right side: TEXT */}
        <div className="max-w-lg mt-5 sm:mt-0">
            <h1 className="text-4xl sm:text-5xl font-bold font-serif italic">Professionally Trained</h1>
            <p className="text-gray-700 p-1">After being a home cook for many years, I wanted to take the next step,
             and start a business. Well, here I am now. I trained at the tremendous <a href="" className="hover:text-orange-500 text-yellow-500 transition-all">School of Artisan food</a> and graduated in the spring of 2022.
              <span className="font-bold ml-2 px-1 text-lg bg-yellow-500 rounded-md font-amatic"> DanumBakehouse</span> is where I use every skill I was taught, to provide the best artisan sourdoughs, croissants, and more... <span className="italic">for you</span></p>
        </div>
    </div>
  );
}

export default Explanation;
