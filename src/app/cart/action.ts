"use server"

import { createCart, getCart } from "@/lib/db/cart"
import { prisma } from "@/lib/db/prisma";
import { revalidatePath } from "next/cache";


export async function updateProductQuantity (productId: string, quantity: number){ 
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
                            quantity
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
                        quantity,
                        productId
                    }
                }
            }
        })
    }
    revalidatePath("/cart",'page');
}
export async function removeProductFromCart (productId: string){ 
    const cart = await getCart();
    if(!cart) return;   
    
    const productInCart = cart.items.find(item => item.productId === productId);
    
    if(!productInCart) {
        return;
    }

    await prisma.cart.update({
        where: {
            id: cart.id
        },
        data: {
            items: {
                delete:{
                    id: productInCart.id
                }
            }
        }
    })
 
    revalidatePath("/cart",'page');
}