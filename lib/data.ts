'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";


export const GetUser = async() => {
    const session = await auth();
    
    if(!session || !session.user || session.user.role !== "admin") redirect("dashboard")
    
    try{
        const user = await prisma.user.findMany();
        return user
    }catch (error) {
        console.log(error)
    }
}

export const GetProdakByUser = async() => {
    const session = await auth();
    
    if(!session || !session.user) redirect("dashboard")

    const role = session.user.role

    if(role === "admin") {
        try{
            const prodaks = await prisma.prodak.findMany({
                include: {user: {select: {name: true}}}
            });
            return prodaks
        }catch (error) {
            console.log(error)
        }
    }else {
        try{
            const prodaks = await prisma.prodak.findMany({
                where: {userId: session.user.id},
                include: {user: {select: {name: true}}}
            });
            return prodaks
        }catch (error) {
            console.log(error)
        }
    }
}
// Konfigurasi Cloudinary

export async function uploadImageToCloudinary(base64Image: string) {
    try {

        const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
        const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
            folder: 'prodak',
        });
        return result.secure_url;
    } catch (error) {
        console.error('Upload error:', error);
        if (error instanceof Error) {
            throw new Error(`Failed to upload image: ${error.message}`);
        } else {
            throw new Error('Failed to upload image');
        }
    }
}

export async function createProdakAction(data: {
    name: string;
    price: number;
    stock: number;
    description: string;
    image?: string;
}) {
    const session = await auth();
    
    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        let imageUrl;
        if (data.image) {
            imageUrl = await uploadImageToCloudinary(data.image);
        }

        const prodak = await prisma.prodak.create({
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                image: imageUrl,
                userId: session.user.id ?? ''
            }
        });

        return { success: true, data: prodak };
    } catch (error) {
        console.error('Error creating product:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to create product" 
        };
    }
}

export async function deleteProdakAction(id: string) {
    const session = await auth();
    
    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const prodak = await prisma.prodak.findUnique({
            where: { id },
        });

        if (!prodak) {
            return { success: false, error: "Product not found" };
        }

        if (session.user.role !== "admin" && prodak.userId !== session.user.id) {
            return { success: false, error: "Forbidden" };
        }

        await prisma.prodak.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting product:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to delete product" 
        };
    }
}

export async function deleteUserAction(id: string) {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return { success: false, error: "User not found" };
        }

        await prisma.user.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting user:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to delete user" 
        };
    }
}

export async function GetProdakById(id: string) {
    const session = await auth();
    
    if (!session?.user) {
        return null;
    }

    try {
        const prodak = await prisma.prodak.findUnique({
            where: { id },
            include: { user: { select: { name: true } } }
        });

        if (!prodak) {
            return null;
        }

        // Check if user has permission to view this product
        if (session.user.role !== "admin" && prodak.userId !== session.user.id) {
            return null;
        }

        return prodak;
    } catch (error) {
        console.error('Error fetching product:', error);
        return null;
    }
}

export async function updateProdakAction(data: {
    id: string;
    name: string;
    price: number;
    stock: number;
    description: string;
    image?: string;
}) {
    const session = await auth();
    
    if (!session?.user) {
        return { success: false, error: "Unauthorized" };
    }

    try {
        // Check if product exists and user has permission
        const existingProdak = await prisma.prodak.findUnique({
            where: { id: data.id },
        });

        if (!existingProdak) {
            return { success: false, error: "Product not found" };
        }

        if (session.user.role !== "admin" && existingProdak.userId !== session.user.id) {
            return { success: false, error: "Forbidden" };
        }

        let imageUrl = existingProdak.image;
        
        // Only upload new image if provided
        if (data.image && data.image !== existingProdak.image) {
            imageUrl = await uploadImageToCloudinary(data.image);
        }

        const updatedProdak = await prisma.prodak.update({
            where: { id: data.id },
            data: {
                name: data.name,
                price: data.price,
                stock: data.stock,
                description: data.description,
                image: imageUrl,
            }
        });

        return { success: true, data: updatedProdak };
    } catch (error) {
        console.error('Error updating product:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to update product" 
        };
    }
}