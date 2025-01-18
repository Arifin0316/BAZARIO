'use server'

import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import cloudinary from "@/lib/cloudinary";
import {CreateOrderInput} from '@/types/index';
import { hash, compare } from "bcrypt-ts";
import { z } from 'zod';
import { OrderStatus } from "@prisma/client";


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

  export async function GetAllProdakById(id: string) {
    try {
      const product = await prisma.prodak.findUnique({
        where: { id },
        include: {
          reviews: {
            include: {
              user: {
                select: {
                  name: true,
                  image: true
                }
              }
            }
          }
        }
      });
      return product;
    } catch (error) {
      console.error('Get product error:', error);
      return null;
    }
  }

export async function createOrders(input: CreateOrderInput) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
}


  try {
    // Get user's cart
    const cart = await prisma.cart.findUnique({
      where: {
        userId: session.user.id
      },
      include: {
        items: {
          include: {
            prodak: true
          }
        }
      }
    });

    if (!cart || cart.items.length === 0) {
      return {
        success: false,
        message: "Cart is empty"
      };
    }

    // Calculate total amount
    const subtotal = cart.items.reduce((sum, item) => {
      return sum + (item.prodak.price * item.quantity);
    }, 0);

    const totalAmount = subtotal + (input.shippingCost || 0);

    // Create order using transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Create new order
      if (!session.user.id) {
        throw new Error("User ID is undefined");
      }
      const newOrder = await tx.order.create({
        data: {
          userId: session.user.id,
          totalAmount,
          shippingAddress: input.shippingAddress,
          phoneNumber: input.phoneNumber,
          notes: input.notes,
          shippingMethod: input.shippingMethod,
          shippingCost: input.shippingCost,
          status: 'PENDING',
          paymentStatus: 'PAID',
          orderItems: {
            create: cart.items.map(item => ({
              prodakId: item.prodak.id,
              quantity: item.quantity,
              price: item.prodak.price
            }))
          }
        },
        include: {
          orderItems: {
            include: {
              prodak: true
            }
          }
        }
      });

      // 2. Update product stock
      for (const item of cart.items) {
        const newStock = item.prodak.stock - item.quantity;
        if (newStock < 0) {
          throw new Error(`Insufficient stock for product: ${item.prodak.name}`);
        }

        await tx.prodak.update({
          where: { id: item.prodak.id },
          data: {
            stock: newStock
          }
        });
      }

      // 3. Clear cart items
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id
        }
      });

      // Create initial payment record
      await tx.payment.create({
        data: {
          orderId: newOrder.id,
          amount: totalAmount,
          status: 'UNPAID',
          paymentMethod: 'BANK_TRANSFER', // Default value, can be updated later
        }
      });

      return newOrder;
    });

    return {
      success: true,
      data: order
    };

  } catch (error) {
    console.error("Create order error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create order"
    };
  }
}

export async function cancelOrder(orderId: string) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
}

  
  try {
    // Cek order exists dan belongs to user
    const order = await prisma.order.findFirst({
      where: {
        id: orderId,
        userId: session.user.id,
      }
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found"
      };
    }

    // Cek jika order masih bisa dibatalkan (PENDING)
    if (order.status !== 'PENDING') {
      return {
        success: false,
        message: "Order cannot be cancelled"
      };
    }

    // Update order status menggunakan transaction
    const updatedOrder = await prisma.$transaction(async (tx) => {
      // 1. Update order status
      const cancelledOrder = await tx.order.update({
        where: { id: orderId },
        data: {
          status: 'CANCELLED',
          updatedAt: new Date()
        },
      });

      // 2. Kembalikan stock produk
      const orderItems = await tx.orderItem.findMany({
        where: { orderId: orderId },
        include: { prodak: true }
      });

      for (const item of orderItems) {
        await tx.prodak.update({
          where: { id: item.prodakId },
          data: {
            stock: {
              increment: item.quantity
            }
          }
        });
      }

      return cancelledOrder;
    });

    return {
      success: true,
      data: updatedOrder
    };

  } catch (error) {
    console.error("Cancel order error:", error);
    return {
      success: false,
      message: "Failed to cancel order"
    };
  }
}

export async function getSellerOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      where: {
        orderItems: {
          some: {
            prodak: {
              userId: userId
            }
          }
        }
      },
      include: {
        orderItems: {
          include: {
            prodak: {
              select: {
                name: true,
                image: true,
                price: true
              }
            }
          }
        },
        user: {
          select: {
            name: true,
            email: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return {
      success: true,
      data: orders
    };
  } catch (error) {
    console.error("Get seller orders error:", error);
    return {
      success: false,
      message: "Failed to get orders"
    };
  }
}


interface UpdateOrderStatusInput {
  orderId: string;
  status: OrderStatus;
  trackingNumber?: string;
}

export async function updateOrderStatus(input: UpdateOrderStatusInput) {
  const session = await auth();
  if (!session?.user) {
    return { success: false, error: "Unauthorized" };
}
  try {
    // Verify seller owns the products in the order
    const order = await prisma.order.findFirst({
      where: {
        id: input.orderId,
        orderItems: {
          some: {
            prodak: {
              userId: session.user.id
            }
          }
        }
      }
    });

    if (!order) {
      return {
        success: false,
        message: "Order not found or unauthorized"
      };
    }

    const updatedOrder = await prisma.order.update({
      where: { id: input.orderId },
      data: {
        status: input.status,
        trackingNumber: input.trackingNumber,
        updatedAt: new Date()
      },
      include: {
        orderItems: {
          include: {
            prodak: true
          }
        }
      }
    });

    return {
      success: true,
      data: updatedOrder
    };

  } catch (error) {
    console.error("Update order status error:", error);
    return {
      success: false,
      message: "Failed to update order status"
    };
  }
}

export async function uploadImageProfileToCloudinary(base64Image: string) {
  try {
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    const result = await cloudinary.uploader.upload(`data:image/png;base64,${base64Data}`, {
      folder: 'profile',
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

// Update profile function
export async function updateProfile(formData: FormData) {
  const session = await auth();
      if (!session?.user?.id) {
        throw new Error("Unauthorized");
      }
  try {
    // Get form data
    const name = formData.get('name') as string;
    const phoneNumber = formData.get('phoneNumber') as string;
    const address = formData.get('address') as string;
    const imageBase64 = formData.get('imageBase64') as string;

    // Prepare update data
    const updateData: { name?: string; phoneNumber?: string; address?: string; image?: string } = {
      name: name || undefined,
      phoneNumber: phoneNumber || undefined,
      address: address || undefined,
    };

    // Handle image upload if provided
    if (imageBase64) {
      try {
        const imageUrl = await uploadImageProfileToCloudinary(imageBase64);
        updateData.image = imageUrl;
      } catch (error) {
        console.error('Image upload error:', error);
        return { success: false, message: "Failed to upload image" };
      }
    }

    // Update user profile
    const updatedUser = await prisma.user.update({
      where: { id: session.user.id },
      data: updateData,
    });

 
    return { success: true, data: updatedUser };

  } catch (error) {
    console.error('Update profile error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update profile"
    };
  }
}
// Update password function
export async function updatePassword(formData: FormData) {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Unauthorized" };
}

  try {
    const currentPassword = formData.get('currentPassword') as string;
    const newPassword = formData.get('newPassword') as string;
    const confirmPassword = formData.get('confirmPassword') as string;

    // Validate inputs
    if (!currentPassword || !newPassword || !confirmPassword) {
      return { success: false, message: "All password fields are required" };
    }

    if (newPassword !== confirmPassword) {
      return { success: false, message: "New passwords don't match" };
    }

    if (newPassword.length < 6) {
      return { success: false, message: "Password must be at least 6 characters" };
    }

    // Get current user with password
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (!user?.password) {
      return { success: false, message: "No password set for this account" };
    }

    // Verify current password
    const isPasswordValid = await compare(currentPassword, user.password);
    if (!isPasswordValid) {
      return { success: false, message: "Current password is incorrect" };
    }

    // Hash and update new password
    const hashedPassword = await hash(newPassword, 12);
    await prisma.user.update({
      where: { id: session.user.id },
      data: { password: hashedPassword }
    });

    return { success: true, message: "Password updated successfully" };

  } catch (error) {
    console.error('Update password error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update password"
    };
  }
}

// lib/data.ts

export async function getUserProfile(userId: string) {
  try {
    // Cek jika userId ada
    if (!userId) {
      return {
        success: false,
        message: "User ID is required"
      };
    }

    // Ambil data user dengan relasi yang diperlukan
    const user = await prisma.user.findUnique({
      where: { 
        id: userId 
      },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        phoneNumber: true,
        address: true,
        orders: {
          select: {
            id: true,
            status: true,
            createdAt: true,
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 // Ambil 5 order terakhir
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            prodak: {
              select: {
                id: true,
                name: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          },
          take: 5 // Ambil 5 review terakhir
        },
        cart: {
          include: {
            items: {
              include: {
                prodak: true
              }
            }
          }
        }
      }
    });

    if (!user) {
      return {
        success: false,
        message: "User not found"
      };
    }

    return {
      success: true,
      data: user
    };

  } catch (error) {
    console.error("Get user profile error:", error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get user profile"
    };
  }
}

interface CreateReviewInput {
  productId: string;
  rating: number;
  comment?: string;
}

export async function createReview(input: CreateReviewInput) {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Unauthorized" };
}

  try {
    // Check if user already reviewed this product
    const existingReview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        prodakId: input.productId
      }
    });

    if (existingReview) {
      return { success: false, message: "You have already reviewed this product" };
    }

    // Ensure userId is defined
    if (!session.user.id) {
      return { success: false, message: "User ID is undefined" };
    }

    // Create review
    const review = await prisma.review.create({
      data: {
        userId: session.user.id,
        prodakId: input.productId,
        rating: input.rating,
        comment: input.comment
      }
    });

    return { success: true, data: review };

  } catch (error) {
    console.error('Create review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create review"
    };
  }
}

export async function getReview({ id }: { id: string }) {
  const session = await auth();
  if (!session) {
    return { success: false, error: "Unauthorized" }
}

  try {
    // Check if user already reviewed this product
    const userRiview = await prisma.review.findFirst({
      where: {
        userId: session.user.id,
        prodakId: id
      }
    })
    return { success: true, data: userRiview };
  } catch (error) {
    console.error('Create review error:', error);
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to create review"
    };
  }
}