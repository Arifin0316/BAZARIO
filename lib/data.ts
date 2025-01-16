'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import { z } from 'zod';


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

export const allProdak = async() => {
    try{
        const prodaks = await prisma.prodak.findMany({
            include: {
                user: {
                    select: {
                        name: true
                    }
                }
            }
        });
        return prodaks
    }catch (error) {
        console.log(error)
    }
}

export const GetProdakByUser = async() => {
    const session = await auth();
    
    if(!session || !session.user) redirect("/dashboard")

    const role = session.user.role

    if(role === "admin") {
        try{
            const prodaks = await prisma.prodak.findMany({
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return prodaks
        }catch (error) {
            console.log(error)
        }
    }else {
        try{
            const prodaks = await prisma.prodak.findMany({
                where: {
                    userId: session.user.id
                },
                include: {
                    user: {
                        select: {
                            name: true
                        }
                    },
                    category: {
                        select: {
                            id: true,
                            name: true
                        }
                    }
                }
            });
            return prodaks
        }catch (error) {
            console.log(error)
        }
    }
}
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
            throw new Error('Failed to upload image: Unknown error');
        }
    }
}

export async function createProdakAction(data: {
    name: string;
    price: number;
    stock: number;
    description: string;
    categoryId?: string;
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
                categoryId: data.categoryId,
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


export async function deleteUserAction(formData: FormData) {
    const id = formData.get('id') as string;
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    try {
        const user = await prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            throw new Error("User not found");
        }

        await prisma.user.delete({
            where: { id },
        });

    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}

export async function updateUserRoleAction(formData: FormData) {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        throw new Error("Unauthorized");
    }

    const userId = formData.get('userId') as string;
    const newRole = formData.get('role') as string;

    const schema = z.object({
        userId: z.string().min(1, "User ID is required"),
        role: z.enum(["user", "admin"], {
            errorMap: () => ({ message: "Invalid role" })
        })
    });

    try {
        const validatedData = schema.parse({ userId, role: newRole });

        await prisma.user.update({
            where: { id: validatedData.userId },
            data: { role: validatedData.role }
        });

    } catch (error) {
        console.error('Error updating user role:', error);
        throw error;
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
    categoryId: string | null;
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
                categoryId: data.categoryId,
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

// Get all categories
export const GetCategories = async() => {
    const session = await auth();
    
    if(!session || !session.user) redirect("dashboard")
    
    try {
        const categories = await prisma.category.findMany();
        return categories;
    } catch (error) {
        console.log(error);
    }
}

// Get category by ID
export const GetCategoryById = async(id: string) => {
    const session = await auth();
    
    if(!session || !session.user) redirect("dashboard")
    
    try {
        const category = await prisma.category.findUnique({
            where: { id }
        });
        return category;
    } catch (error) {
        console.log(error);
        return null;
    }
}

// Create category
export async function createCategoryAction(data: {
    name: string;
    description?: string;
}) {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const category = await prisma.category.create({
            data: {
                name: data.name,
            }
        });

        return { success: true, data: category };
    } catch (error) {
        console.error('Error creating category:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to create category" 
        };
    }
}

// Update category
export async function updateCategoryAction(data: {
    id: string;
    name: string;
    description?: string;
}) {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const existingCategory = await prisma.category.findUnique({
            where: { id: data.id },
        });

        if (!existingCategory) {
            return { success: false, error: "Category not found" };
        }

        const updatedCategory = await prisma.category.update({
            where: { id: data.id },
            data: {
                name: data.name,
            }
        });

        return { success: true, data: updatedCategory };
    } catch (error) {
        console.error('Error updating category:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to update category" 
        };
    }
}

// Delete category
export async function deleteCategoryAction(id: string) {
    const session = await auth();
    
    if (!session?.user || session.user.role !== "admin") {
        return { success: false, error: "Unauthorized" };
    }

    try {
        const category = await prisma.category.findUnique({
            where: { id },
        });

        if (!category) {
            return { success: false, error: "Category not found" };
        }

        await prisma.category.delete({
            where: { id },
        });

        return { success: true };
    } catch (error) {
        console.error('Error deleting category:', error);
        return { 
            success: false, 
            error: error instanceof Error ? error.message : "Failed to delete category" 
        };
    }
}

export async function getOrCreateCart(userId: string) {
    let cart = await prisma.cart.findUnique({
      where: { userId },
      include: {
        items: {
          include: {
            prodak: true
          }
        }
      }
    });
  
    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId,
          items: {
            create: []
          }
        },
        include: {
          items: {
            include: {
              prodak: true
            }
          }
        }
      });
    }
  
    return cart;
  }

  export async function addToCart(productId: string, quantity: number = 1) {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
  
      const userId = session.user.id;
  
      // Cek stok produk
      const product = await prisma.prodak.findUnique({
        where: { id: productId }
      });
  
      if (!product) {
        throw new Error("Product not found");
      }
  
      if (product.stock < quantity) {
        throw new Error("Not enough stock available");
      }
  
      // Dapatkan atau buat cart
      const cart = await getOrCreateCart(userId);
  
      // Cek apakah produk sudah ada di cart
      const existingItem = await prisma.cartItem.findFirst({
        where: {
          cartId: cart.id,
          prodakId: productId
        }
      });
  
      if (existingItem) {
        // Update quantity jika item sudah ada
        const updatedItem = await prisma.cartItem.update({
          where: { id: existingItem.id },
          data: {
            quantity: existingItem.quantity + quantity
          },
          include: {
            prodak: true
          }
        });
  
        return {
          success: true,
          message: "Cart updated successfully",
          data: updatedItem
        };
      } else {
        // Buat item baru jika belum ada
        const newItem = await prisma.cartItem.create({
          data: {
            cartId: cart.id,
            prodakId: productId,
            quantity
          },
          include: {
            prodak: true
          }
        });
  
        return {
          success: true,
          message: "Item added to cart",
          data: newItem
        };
      }
    } catch (error) {
      console.error("Add to cart error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to add item to cart",
        error
      };
    }
  }

  export async function getUserCart() {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
  
      const cart = await prisma.cart.findUnique({
        where: { userId: session.user.id },
        include: {
          items: {
            include: {
              prodak: true
            }
          }
        }
      });
  
      return {
        success: true,
        data: cart
      };
    } catch (error) {
      console.error("Get cart error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to get cart",
        error
      };
    }
  }

  export async function updateCartItemQuantity(itemId: string, quantity: number) {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
  
      if (quantity < 1) {
        throw new Error("Quantity must be at least 1");
      }
  
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
          cart: true,
          prodak: true
        }
      });
  
      if (!cartItem) {
        throw new Error("Cart item not found");
      }
  
      if (cartItem.cart.userId !== session.user.id) {
        throw new Error("Unauthorized");
      }
  
      if (cartItem.prodak.stock < quantity) {
        throw new Error("Not enough stock available");
      }
  
      const updatedItem = await prisma.cartItem.update({
        where: { id: itemId },
        data: { quantity },
        include: {
          prodak: true
        }
      });
  
      return {
        success: true,
        message: "Quantity updated successfully",
        data: updatedItem
      };
    } catch (error) {
      console.error("Update quantity error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to update quantity",
        error
      };
    }
  }

  export async function removeFromCart(itemId: string) {
    try {
      const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
  
      const cartItem = await prisma.cartItem.findUnique({
        where: { id: itemId },
        include: {
          cart: true
        }
      });
  
      if (!cartItem) {
        throw new Error("Cart item not found");
      }
  
      if (cartItem.cart.userId !== session.user.id) {
        throw new Error("Unauthorized");
      }
  
      await prisma.cartItem.delete({
        where: { id: itemId }
      });
  
      return {
        success: true,
        message: "Item removed from cart"
      };
    } catch (error) {
      console.error("Remove from cart error:", error);
      return {
        success: false,
        message: error instanceof Error ? error.message : "Failed to remove item from cart",
        error
      };
    }
  }

  

