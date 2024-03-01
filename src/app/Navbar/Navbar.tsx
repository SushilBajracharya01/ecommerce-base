import Navlink from "@/components/Navlink";
import Logo from "@/components/Logo";
import MobileNav from "@/components/MobileNav";
import AccountOptions from "./AccountOptions";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { NAVLINKS } from "./_data";
import CartButton from "./CartButton";
import { getCart } from "@/lib/db/cart";
import SearchBar from "@/components/SearchBar";
import { redirect } from "next/navigation";

async function searchProducts(formData: FormData) {
    "use server";

    const searchQuery = formData.get("searchQuery")?.toString();

    if (searchQuery) {
        redirect('/search?query=' + searchQuery)
    }
}

async function Navbar() {
    const cart = await getCart();
    const session = await getServerSession(authOptions);

    return (
        <div className="bg-white">
            <header className="relative border-b border-gray-200">
                <nav aria-label="Top" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="h-16 flex items-center justify-between">
                        <MobileNav
                            session={session}
                        />

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
                            <SearchBar
                                handleSearchProducts={searchProducts}
                            />

                            <AccountOptions
                                session={session}
                            />

                            <CartButton
                                cart={cart} />
                        </div>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default Navbar;