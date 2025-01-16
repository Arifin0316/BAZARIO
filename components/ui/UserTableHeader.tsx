const UserTableHeader = () => {
  return (
    <thead className="border-b border-green-100">
      <tr>
        <th className="py-3 px-6 text-left text-sm">Name</th>
        <th className="py-3 px-6 text-left text-sm">Email</th>
        <th className="py-3 px-6 text-left text-sm">Role</th>
        <th className="py-3 px-6 text-left text-sm">Actions</th>
      </tr>
    </thead>
  );
};

export default UserTableHeader;