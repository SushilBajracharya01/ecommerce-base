import FileUpload from "@/components/FileUpload";
import FormSubmitButton from "@/components/FormSubmitButton";
import Input from "@/components/Input";
import TextArea from "@/components/Textarea";
import { authOptions } from "@/lib/authOptions";
import cloudinary from "@/lib/cloudinary/cloudinary";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth"
import { redirect } from "next/navigation";


async function handleAddCollection(formData: FormData) {
    "use server"

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/api/auth/signin?callbackUrl=/add-collection");
    }

    const name = formData.get("name")?.toString();
    const description = formData.get("description")?.toString();
    const coverImage = formData.get("coverImage") as File;

    const arrayBuffer = await coverImage.arrayBuffer();
    const buffer = new Uint8Array(arrayBuffer);

    if (!name || !description) {
        throw new Error("Missing fields");
    }

    const result: any = await new Promise((res, rej) => {
        cloudinary.uploader.upload_stream({}, (error: any, result: any) => {
            if (error) rej(error);
            res(result);
        }).end(buffer)
    })

    await prisma.collections.create({
        data: {
            name, 
            description,
            coverImage: result.secure_url
        }
    })

    redirect('/');
}

export default async function AddCollectionPage() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/api/auth/signin?callbackUrl=/add-collection");

    return (
        <div className="pt-12">
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

                <FileUpload
                    label="Image"
                    name="coverImage"
                    required
                />

                <FormSubmitButton
                    className="btn-block">
                    Add Collection
                </FormSubmitButton>
            </form>
        </div>
    )
}