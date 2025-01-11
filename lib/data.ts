import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

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