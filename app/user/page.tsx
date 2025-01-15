import UserTableWrapper from "@/components/userTableWreper";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "User List",
    description: "List of users",
}
const UserPage = () => {
    
    return ( 
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-screen-md mx-auto py-10">
                <h1 className="text-2xl font-bold">user list</h1>
                <UserTableWrapper />
            </div>
        </div>
     );
}
 
export default UserPage;