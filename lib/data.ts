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