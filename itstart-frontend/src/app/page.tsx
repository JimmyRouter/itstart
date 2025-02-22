'use client';
import { useEffect, useState } from 'react';
import { getSeminars, deleteSeminar, Seminar } from '@/services/api';
import EditSeminarModal from '@/components/EditSeminarModal';

export default function Home() {
  const [seminars, setSeminars] = useState<Seminar[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [editingSeminar, setEditingSeminar] = useState<Seminar | null>(null);

  useEffect(() => {
    getSeminars()
        .then(setSeminars)
        .catch((err) => setError(err.message))
        .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this seminar?')) {
      await deleteSeminar(id);
      setSeminars(seminars.filter(seminar => seminar.id !== id));
    }
  };

  const handleUpdate = (updatedSeminar: Seminar) => {
    setSeminars(seminars.map(seminar => (seminar.id === updatedSeminar.id ? updatedSeminar : seminar)));
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;  //loading state
  if (error) return <p className="text-center text-red-500">Error loading seminars: {error}</p>; //catching errors

  return (
      <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-4">Seminars</h1>
        <ul className="space-y-4">
          {seminars.map((seminar) => (
              <li key={seminar.id} className="p-4 bg-gray-100 rounded-lg flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900">{seminar.title}</span>
                <p className="text-sm text-gray-600">
                  {seminar.date} at {seminar.time}
                </p>
                <div className="space-x-2">
                  <button
                      className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                      onClick={() => setEditingSeminar(seminar)}>
                    Edit
                  </button>
                  <button
                      className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                      onClick={() => handleDelete(seminar.id)}>
                    Delete
                  </button>
                </div>
              </li>
          ))}
        </ul>
        {editingSeminar && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <EditSeminarModal
                  seminar={editingSeminar}
                  onClose={() => setEditingSeminar(null)}
                  onUpdate={handleUpdate}
              />
            </div>
        )}
      </div>
  );
}
