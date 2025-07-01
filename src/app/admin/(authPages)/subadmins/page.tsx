'use client';

import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type Subadmin = {
  id: number;
  name: string;
  email: string;
};

const dummyData: Subadmin[] = Array.from({ length: 23 }, (_, i) => ({
  id: i + 1,
  name: `Subadmin ${i + 1}`,
  email: `subadmin${i + 1}@example.com`,
}));

const PAGE_SIZE = 10;

export default function Subadmins() {
  const [subadmins, setSubadmins] = useState<Subadmin[]>([]);
  const [page, setPage] = useState(1);
    const router = useRouter();
  useEffect(() => {
    const start = (page - 1) * PAGE_SIZE;
    const end = start + PAGE_SIZE;
    setSubadmins(dummyData.slice(start, end));
  }, [page]);

  const totalPages = Math.ceil(dummyData.length / PAGE_SIZE);

  const handleDelete = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete this subadmin?');
    if (confirmed) {
      alert(`Subadmin ${id} deleted (simulate API call)`);
      // Here you would make an actual DELETE API call and refetch data
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Subadmins</h2>
        <Link
          href="/admin/subadmins/add"
          className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded"
        >
          <Plus size={18} /> Add Subadmin
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
            <tr>
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {subadmins.map((admin, i) => (
              <tr key={admin.id} className="border-b dark:border-gray-700">
                <td className="px-4 py-2">{admin.id}</td>
                <td className="px-4 py-2">{admin.name}</td>
                <td className="px-4 py-2">{admin.email}</td>
                <td className="px-4 py-2">
                  <div className="flex items-center gap-2">
                    <button className="text-blue-600 hover:underline" title="Edit" onClick={()=>{
                        router.push(`/admin/subadmins/edit/${admin.id}`)
                    }}>
                      <Pencil size={16} />
                    </button>
                    <button
                      className="text-red-600 hover:underline"
                      onClick={() => handleDelete(admin.id)}
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {subadmins.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No subadmins found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {page} of {totalPages}
        </span>
        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
