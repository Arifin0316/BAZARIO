

// lib/orders.ts
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import {CreateOrderInput} from "@/types/index";
import { getUserCart } from "@/lib/data";



// Membuat order baru dari cart
export async function createOrder(input: CreateOrderInput) {
  const session = await auth();
  if (!session?.user) {
    throw new Error("Unauthorized");
  }

  try {
    // Dapatkan cart user
    const { data: cart } = await getUserCart();
    if (!cart || cart.items.length === 0) {
      throw new Error("Cart is empty");
    }

    // Hitung total amount
    const totalAmount = cart.items.reduce((sum, item) => {
      return sum + (item.prodak.price * item.quantity);
    }, 0) + (input.shippingCost || 0);

    // Buat order dalam transaction
    const order = await prisma.$transaction(async (tx) => {
      // 1. Buat order baru
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

      // 2. Update stock produk
      for (const item of cart.items) {
        await tx.prodak.update({
          where: { id: item.prodak.id },
          data: {
            stock: {
              decrement: item.quantity
            }
          }
        });
      }

      // 3. Kosongkan cart
      await tx.cartItem.deleteMany({
        where: {
          cartId: cart.id
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

// Mendapatkan semua order user
export async function getUserOrders() {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const orders = await prisma.order.findMany({
      where: {
        userId: session.user.id
      },
      include: {
        orderItems: {
          include: {
            prodak: true
          }
        },
        payment: true
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
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get orders"
    };
  }
}

// Mendapatkan detail order
export async function getOrderById(orderId: string) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    const order = await prisma.order.findUnique({
      where: {
        id: orderId
      },
      include: {
        orderItems: {
          include: {
            prodak: true
          }
        },
        payment: true
      }
    });

    if (!order) {
      throw new Error("Order not found");
    }

    // Check if order belongs to user
    if (order.userId !== session.user.id) {
      throw new Error("Unauthorized");
    }

    return {
      success: true,
      data: order
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to get order"
    };
  }
}

// Update order status (Admin only)
export async function updateOrderStatus(
  orderId: string,
  status: OrderStatus,
  trackingNumber?: string
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      throw new Error("Unauthorized");
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { id: session.user.id }
    });

    if (user?.role !== 'admin') {
      throw new Error("Unauthorized");
    }

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status,
        trackingNumber,
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
      data: order
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Failed to update order"
    };
  }
}

// Server Action untuk membuat order


// Types
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PENDING = 'PENDING',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
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
          paymentStatus: 'UNPAID',
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