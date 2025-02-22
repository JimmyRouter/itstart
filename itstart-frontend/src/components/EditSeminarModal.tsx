import { useState } from 'react';
import { updateSeminar, Seminar } from '../services/api';

interface Props {
    seminar: Seminar | null;
    onClose: () => void;
    onUpdate: (seminar: Seminar) => void;
}

export default function EditSeminarModal({ seminar, onClose, onUpdate }: Props) {
    const [formData, setFormData] = useState<Partial<Seminar>>(seminar || {});
    const [loading, setLoading] = useState(false);  //disable buttons
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        if (!seminar) return;

        setLoading(true);
        setError(null);

        try {
            await updateSeminar(seminar.id, formData);
            onUpdate({ ...seminar, ...formData } as Seminar);
            onClose();
        } catch (err) {
            setError('Failed to update seminar. Please try again.'); //catch errors
        } finally {
            setLoading(false);
        }
    };

    if (!seminar) return null;
// IRL useForm, Ant design...
    return (
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-gray-800">Edit Seminar</h2>
            {error && <p className="text-red-500 mb-2">{error}</p>}
            <div className="space-y-3">
                <input
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="title"
                    value={formData.title || ''}
                    onChange={handleChange}
                    placeholder="Title"
                    disabled={loading}
                />
                <input
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="description"
                    value={formData.description || ''}
                    onChange={handleChange}
                    placeholder="Description"
                    disabled={loading}
                />
                <input
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="date"
                    type="date"
                    value={formData.date || ''}
                    onChange={handleChange}
                    disabled={loading}
                />
                <input
                    className="w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    name="time"
                    type="time"
                    value={formData.time || ''}
                    onChange={handleChange}
                    disabled={loading}
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <button
                    className={`px-4 py-2 text-white rounded-lg ${loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
                    onClick={handleSubmit}
                    disabled={loading}
                >
                    {loading ? 'Saving...' : 'Save'}
                </button>
                <button
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancel
                </button>
            </div>
        </div>
    );
}
