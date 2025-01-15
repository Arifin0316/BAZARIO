'use client';

import { FormEvent, useState } from 'react';
import { useTransition } from 'react';
import { updateUserRoleAction } from "@/lib/data";
import { deleteUserAction } from "@/lib/data";
import DeleteConfirmationModal from '../modals/DeleteConfirmationModal';
import Swal from 'sweetalert2';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface UserTableProps {
    initialUsers: User[];
}

const UserTable = ({ initialUsers }: UserTableProps) => {
    const [users, setUsers] = useState(initialUsers);
    const [isPending, startTransition] = useTransition();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);


    const handleUpdateRole = async (event: FormEvent<HTMLFormElement>, userId: string) => {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        
        // Optimistic update
        const newRole = formData.get('role') as string;
        setUsers(prevUsers => 
            prevUsers.map(user => 
                user.id === userId ? {...user, role: newRole || user.role} : user
            )
        );

        startTransition(async () => {
            try {
                await updateUserRoleAction(formData);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Role pengguna berhasil diupdate',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    customClass: {
                        popup: 'colored-toast'
                    }
                });
            } catch (error) {
                console.error('Error updating user role:', error);
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userId ? {...user, role: user.role} : user
                    )
                );
                // You might want to show an error message to the user here
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Gagal mengupdate role pengguna',
                    showConfirmButton: false,
                    timer: 1000,
                    toast: true,
                    customClass: {
                        popup: 'colored-toast'
                    }
                });
            }
        });
    };

    const openDeleteModal = (userId: string) => {
        setUserToDelete(userId);
        setIsDeleteModalOpen(true);
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const confirmDelete = async () => {
        if (!userToDelete) return;

        const formData = new FormData();
        formData.append('id', userToDelete);

        // Optimistic update
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));

        startTransition(async () => {
            try {
                await deleteUserAction(formData);
                Swal.fire({
                    title: 'Berhasil!',
                    text: 'Pengguna berhasil dihapus',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } catch (error) {
                console.error('Error deleting user:', error);
                // Revert the optimistic update on error
                const deletedUser = initialUsers.find(user => user.id === userToDelete);
                if (deletedUser) {
                    setUsers(prevUsers => [...prevUsers, deletedUser]);
                }
                // You might want to show an error message to the user here
                Swal.fire({
                    title: 'Error!',
                    text: 'Gagal menghapus pengguna',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        });

        closeDeleteModal();
    };

    if(!users?.length) return <h1 className="text-2xl">No users found</h1>
    
    return (
        <>
            <table className="w-full bg-white mt-3">
                <thead className="border-b border-green-100">
                    <tr>
                        <th className="py-3 px-6 text-left text-sm">Name</th>
                        <th className="py-3 px-6 text-left text-sm">Email</th>
                        <th className="py-3 px-6 text-left text-sm">Role</th>
                        <th className="py-3 px-6 text-left text-sm">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                            <td className="py-3 px-6">{user.name}</td>
                            <td className="py-3 px-6">{user.email}</td>
                            <td className="py-3 px-6">
                                <form onSubmit={(e) => handleUpdateRole(e, user.id)}>
                                    <input 
                                        type="hidden" 
                                        name="userId" 
                                        value={user.id} 
                                    />
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
                                    onClick={() => openDeleteModal(user.id)}
                                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                                    disabled={isPending}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <DeleteConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={confirmDelete}
            />
        </>
    );
}

export default UserTable;