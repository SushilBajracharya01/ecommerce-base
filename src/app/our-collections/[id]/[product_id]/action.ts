"use server"

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


export async function incrementProductQuantity (productId: string){ 
    const cart = await getCart() ?? await createCart();
    if(!cart) return;   
    
    const productInCart = cart.items.find(item => item.productId === productId);
    
    if(productInCart) {
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data: {
                items: {
                    update: {
                        where: {
                            id: productInCart.id
                        },
                        data: {
                            quantity: {
                                increment: 1
                            }
                        }
                    }
                }
            }
        })
    }
    else {
        await prisma.cart.update({
            where: {
                id: cart.id
            },
            data : {
                items: {
                    create: {
                        quantity: 1,
                        productId
                    }
                }
            }
        })
    }
    revalidatePath("/collections/[id]/[product_id]",'page');
}

export async function getProductFromCart (productId: string){ 
    const cart = await getCart();
    if(!cart) return;   
    
    const productInCart = cart.items.find(item => item.productId === productId);
    
    if(productInCart) {
        return productInCart;
    }
    else {
        return null;
    }
}
