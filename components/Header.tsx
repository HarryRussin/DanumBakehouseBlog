import Image from "next/image"
import Link from "next/link"

function Header() {
    return (
        <header className="flex justify-between p-5 max-w-7xl mx-auto">
            <div className="flex items-center space-x-5">
                <Link href={'/'}>
                    <div className="flex items-center space-x-1 text-[2rem] font-amatic">
                    <img src={'/favicon.ico'} className="object-contain
                    w-10 cursor-pointer"/>
                    <h1>Danum Bakehouse</h1>
                    </div>
                </Link>

            <div className="hidden md:inline-flex items-center space-x-5">
                <h3>About</h3>
                <h3>Contact</h3>
                <h3 className="text-white bg-orange-600 px-4 py-1 rounded-full">Follow</h3>
            </div>


            </div>
            <div className="flex items-center space-x-5 text-orange-600">
                <h3>Sign In</h3>
                <Link href={'/blog'}>
                <h3 className="border border-orange-600 rounded-full px-4 py-1 hover:bg-orange-500 hover:text-white transition-colors ease-out">Read our Blog</h3>
                </Link>
            </div>

        </header>
    )
}

export default Header
