import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "prodak List",
    description: "List of users",
}
const ProdakPage = () => {
    return ( 
        <div className="bg-slate-50 min-h-screen">
            <div className="max-w-screen-md mx-auto py-10">
                <h1 className="text-2xl font-bold">prodak list</h1>
            </div>
        </div>
     );
}
 
export default ProdakPage;