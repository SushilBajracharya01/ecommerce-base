import FormSubmitButton from "@/components/FormSubmitButton";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


async function handleAddCollection (formData: FormData) {
    "use server"

    const session = await getServerSession(authOptions);

    if(!session) {
        redirect("/api/auth/signin?callbackUrl=/add-collection");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();

    if(!name || !description) {
        throw new Error("Missing fields");
    }

    await prisma.collections.create({
        data: {
            name, description
        }
    })

    redirect('/');
}

export default async function AddCollectionPage() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/api/auth/signin?callbackUrl=/add-collection");

    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">
                Add Collections
            </h1>

            <form action={handleAddCollection} className="space-y-4">
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


                <FormSubmitButton
                    className="btn-block">
                    Add Product
                </FormSubmitButton>
            </form>
        </div>
    )
}