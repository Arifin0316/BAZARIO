import { GetUser } from "@/lib/data";
import UserTable from '@/components/ui/user-table';  // adjust the import path as needed

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}


const UserTableWrapper = async () => {
    const initialUsers = (await GetUser()) as User[];
    return <UserTable initialUsers={initialUsers} />;
}

export default UserTableWrapper;