const AuthLayoth = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="bg-gray-100 h-screen">
            <div className="flex flex-col pt-20 justify-between items-center px-6 py-8">
                <div className="w-full rounded-lg shadow-lg mt-0 max-w-md bg-white">
                    {children}
                </div>
            </div>
        </div>
     );
}
 
export default AuthLayoth;