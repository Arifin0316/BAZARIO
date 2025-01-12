import { GetProdakByUser } from "@/lib/data";
import { formatDate } from "@/lib/utils";

export const ProdakTable = async () => {
    const prodaks = await GetProdakByUser();
    if(!prodaks?.length) return <h1 className="text-2xl">no prodak found</h1>
    return ( 
        <table className="w-full bg-white mt-3">
            <thead className="border-b border-green-100">
                <tr>
                    <th className="py-3 px-6 text-left text-sm">name</th>
                    <th className="py-3 px-6 text-left text-sm">price</th>
                    <th className="py-3 px-6 text-left text-sm">created at</th>
                    <th className="py-3 px-6 text-left text-sm">created by</th>
                </tr>
            </thead>
            <tbody>
                {prodaks.map((prodak) => (
                    <tr key={prodak.id}>
                    <td className="py-3 px-6 ">{prodak.name}</td>
                    <td className="py-3 px-6 ">{prodak.price}</td>
                    <td className="py-3 px-6 ">{formatDate(prodak.createdAt.toString())}</td>
                    <td className="py-3 px-6 ">{prodak.user.name}</td>
                </tr>
                ))}
                
            </tbody>
        </table>
     );
}
 
export default ProdakTable;