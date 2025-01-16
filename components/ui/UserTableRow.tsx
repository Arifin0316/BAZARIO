import { User } from "next-auth";
import { FormEvent } from "react";

interface UserTableRowProps {
  user: User;
  onUpdateRole: (e: FormEvent<HTMLFormElement>, userId: string) => Promise<void>;
  onDelete: (userId: string) => void;
  isPending: boolean;
}

const UserTableRow = ({ user, onUpdateRole, onDelete, isPending }: UserTableRowProps) => {
  return (
    <tr className="hover:bg-gray-50">
      <td className="py-3 px-6">{user.name}</td>
      <td className="py-3 px-6">{user.email}</td>
      <td className="py-3 px-6">
        <form onSubmit={(e) => user.id && onUpdateRole(e, user.id)}>
          <input type="hidden" name="userId" value={user.id} />
          <select 
            name="role"
            defaultValue={user.role}
            className="w-full p-1 border rounded"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
          <button 
            type="submit" 
            className="mt-2 bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
            disabled={isPending}
          >
            {isPending ? 'Updating...' : 'Update Role'}
          </button>
        </form>
      </td>
      <td className="py-3 px-6">
        <button 
          onClick={() => user.id && onDelete(user.id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          disabled={isPending}
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default UserTableRow;