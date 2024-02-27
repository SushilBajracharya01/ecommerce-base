import FormSubmitButton from "@/components/FormSubmitButton";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


async function handleAddProduct(formData: FormData) {
    "use server"

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-product");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const quantity = Number(formData.get("quantity") || 0);
    const price = Number(formData.get("price") || 0);
    const collectionId = formData.get("collectionId")?.toString();

    if (!name || !description || !quantity || !price || !collectionId) {
        throw new Error("Missing fields");
    }

    try {
        await prisma.product.create({
            data: {
                name, description, quantity, price, collectionId
            }
        })
    }
    catch (error) {
        console.log(error, 'erreror');
    }

    redirect('/');
}

export default async function AddProductPage() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/api/auth/signin?callbackUrl=/add-product");

    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">
                Add Products
            </h1>

            <form action={handleAddProduct} className="space-y-4">
                <Input
                    label="Name"
                    name="name"
                    required
                    placeholder="Name"
                />

                <TextArea
                    name="description"
                    placeholder="Description"
                    label="Description"
                    required
                />

                <Input
                    name="quantity"
                    type="number"
                    placeholder="Quantity"
                    label="Quantity"
                    required
                />

                <Input
                    name="price"
                    required
                    placeholder="Price"
                    label="Price"
                    type="number"
                />

                <Input
                    name="collectionId"
                    required
                    placeholder="Collection"
                    label="Collection"
                />


                <FormSubmitButton
                    className="btn-block">
                    Add Product
                </FormSubmitButton>
            </form>
        </div>
    )
}