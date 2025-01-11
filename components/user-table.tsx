import { GetUser } from "@/lib/data";

const UserTable = async () => {
    const users = await GetUser();
    if(!users?.length) return <h1 className="text-2xl">no user found</h1>
    return ( 
        <table className="w-full bg-white mt-3">
            <thead className="border-b border-green-100">
                <tr>
                    <th className="py-3 px-6 text-left text-sm">name</th>
                    <th className="py-3 px-6 text-left text-sm">email</th>
                    <th className="py-3 px-6 text-left text-sm">role</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id}>
                    <td className="py-3 px-6 ">{user.name}</td>
                    <td className="py-3 px-6 ">{user.email}</td>
                    <td className="py-3 px-6 ">{user.role}</td>
                </tr>
                ))}
                
            </tbody>
        </table>
     );
}
 
export default UserTable;