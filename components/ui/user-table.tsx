'use client';

import { FormEvent, useState } from 'react';
import { useTransition } from 'react';
import { updateUserRoleAction, deleteUserAction } from "@/lib/data";
import ConfirmationModal from '../modals/ConfirmationModal';
import { Pagination } from '@/components/ui/Pagination';
import Swal from 'sweetalert2';
import UserTableRow from './UserTableRow';
import UserTableHeader from './UserTableHeader';

const ITEMS_PER_PAGE = 10;

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
    const [users, setUsers] = useState<User[]>(initialUsers);
    const [isPending, startTransition] = useTransition();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate pagination
    const totalPages = Math.ceil(users.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const currentUsers = users.slice(startIndex, endIndex);

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
                    timer: 1500,
                    toast: true
                });
            } catch (error) {
                console.error('Error updating user role:', error);
                // Rollback on error
                setUsers(prevUsers => 
                    prevUsers.map(user => 
                        user.id === userId 
                            ? {...user, role: initialUsers.find(u => u.id === userId)?.role || user.role}
                            : user
                    )
                );
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Gagal mengupdate role pengguna',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            }
        });
    };

    const openDeleteModal = (userId: string) => {
        const userToDeleteData = users.find(user => user.id === userId);
        if (userToDeleteData) {
            setUserToDelete(userId);
            setIsDeleteModalOpen(true);
        }
    };

    const closeDeleteModal = () => {
        setUserToDelete(null);
        setIsDeleteModalOpen(false);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;

        const formData = new FormData();
        formData.append('id', userToDelete);

        // Optimistic update
        setUsers(prevUsers => prevUsers.filter(user => user.id !== userToDelete));

        startTransition(async () => {
            try {
                await deleteUserAction(formData);
                Swal.fire({
                    position: 'top',
                    icon: 'success',
                    title: 'Pengguna berhasil dihapus',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            } catch (error) {
                console.error('Error deleting user:', error);
                // Rollback on error
                const deletedUser = initialUsers.find(user => user.id === userToDelete);
                if (deletedUser) {
                    setUsers(prevUsers => [...prevUsers, deletedUser]);
                }
                Swal.fire({
                    position: 'top',
                    icon: 'error',
                    title: 'Gagal menghapus pengguna',
                    showConfirmButton: false,
                    timer: 1500,
                    toast: true
                });
            } finally {
                closeDeleteModal();
            }
        });
    };

    if(!users?.length) {
        return (
            <div className="flex justify-center items-center min-h-[200px]">
                <h1 className="text-2xl text-gray-500 font-medium">No users found</h1>
            </div>
        );
    }
    
    return (
        <div className="space-y-4">
            <div className="overflow-x-auto">
                <table className="w-full bg-white mt-3">
                    <UserTableHeader />
                    <tbody>
                        {currentUsers.map((user) => (
                            <UserTableRow
                                key={user.id}
                                user={user}
                                onUpdateRole={handleUpdateRole}
                                onDelete={openDeleteModal}
                                isPending={isPending}
                            />
                        ))}
                    </tbody>
                </table>
            </div>

            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={closeDeleteModal}
                onConfirm={handleDelete}
                title="Konfirmasi Penghapusan"
                message="Apakah Anda yakin ingin menghapus pengguna ini?"
                confirmText="Hapus"
                cancelText="Batal"
                size="sm"
                confirmButtonClassName="bg-red-500 hover:bg-red-600 text-white"
                cancelButtonClassName="bg-gray-300 hover:bg-gray-400 text-gray-800"
            />
        </div>
    );
};

export default UserTable;