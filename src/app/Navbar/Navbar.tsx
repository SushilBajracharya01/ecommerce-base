import { FaSearch, FaShoppingCart } from "react-icons/fa";
import Navlink from "@/components/Navlink";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import AccountOptions from "./AccountOptions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NAVLINKS } from "./_data";


async function Navbar() {
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-white">
            <header className="relative border-b border-gray-200">
                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <MobileNav />

                        <div className="ml-4 hidden lg:flex lg:ml-0">
                            <Logo />
                        </div>

                        <div className="h-full hidden lg:flex">
                            {
                                NAVLINKS.map(link => {
                                    return (
                                        <Navlink
                                            key={link.label}
                                            link={link}
                                        />
                                    )
                                })
                            }
                        </div>

                        <div className="lg:hidden">
                            <Logo />
                        </div>

                        <div className="flex items-center">
                            <AccountOptions
                                session={session}
                            />

                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <FaSearch className="w-6 h-6" aria-hidden="true" />
                                </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <a href="#" className="group -m-2 p-2 flex items-center">
                                    <FaShoppingCart
                                        className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                                        aria-hidden="true"
                                    />
                                    <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">0</span>
                                    <span className="sr-only">items in cart, view cart</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;