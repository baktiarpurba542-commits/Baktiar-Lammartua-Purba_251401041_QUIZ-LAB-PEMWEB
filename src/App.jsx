import React, { useState } from 'react';
import { initialTodos } from './data/initialTodos';
import { Eye, Trash2, Plus, Edit, ArrowLeft, X } from 'lucide-react';

export default function App() {
  const [todos, setTodos] = useState(initialTodos);
  const [view, setView] = useState('list'); // 'list' | 'detail' | 'form'
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [formMode, setFormMode] = useState('add'); // 'add' | 'edit'

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low',
    deadline: '',
    status: 'to-do'
  });

  // Handle Input Form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Buka Modal Tambah
  const handleOpenAdd = () => {
    setFormData({ title: '', description: '', priority: 'low', deadline: '', status: 'to-do' });
    setFormMode('add');
    setView('form');
  };

  // Buka Modal Edit
  const handleOpenEdit = (todo) => {
    setSelectedTodo(todo);
    setFormData(todo);
    setFormMode('edit');
    setView('form');
  };

  // Simpan (Tambah / Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formMode === 'add') {
      const newTodo = {
        id: Date.now(),
        ...formData
      };
      setTodos([...todos, newTodo]);
      alert('Tugas baru berhasil ditambahkan!');
    } else {
      setTodos(todos.map(t => t.id === selectedTodo.id ? { ...t, ...formData } : t));
      alert('Tugas berhasil diperbarui!');
    }
    setView('list');
  };

  // Hapus Tugas
  const handleDelete = (id, title) => {
    if (window.confirm(`Apakah Anda yakin ingin menghapus tugas "${title}"?`)) {
      setTodos(todos.filter(t => t.id !== id));
      alert('Tugas berhasil dihapus.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-6">
        
        {/* HEADER */}
        <div className="flex justify-between items-center border-b pb-4 mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo List</h1>
          {view === 'list' && (
            <button
              onClick={handleOpenAdd}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition"
            >
              <Plus size={16} /> Tambah Todo
            </button>
          )}
        </div>

        {/* 1. HALAMAN UTAMA (TABEL) */}
        {view === 'list' && (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b text-gray-600 text-sm">
                  <th className="py-3 px-4">Judul</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Prioritas</th>
                  <th className="py-3 px-4">Deadline</th>
                  <th className="py-3 px-4 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {todos.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center py-6 text-gray-500">Belum ada tugas.</td>
                  </tr>
                ) : (
                  todos.map((todo) => (
                    <tr key={todo.id} className="border-b hover:bg-gray-50 text-sm">
                      <td className="py-3 px-4 font-medium text-gray-800">{todo.title}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          todo.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-200 text-gray-700'
                        }`}>
                          {todo.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 capitalize">{todo.priority}</td>
                      <td className="py-3 px-4">{todo.deadline}</td>
                      <td className="py-3 px-4 flex justify-center gap-2">
                        <button
                          onClick={() => { setSelectedTodo(todo); setView('detail'); }}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded transition"
                          title="Lihat Detail"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => handleDelete(todo.id, todo.title)}
                          className="bg-red-600 hover:bg-red-700 text-white p-1.5 rounded transition"
                          title="Hapus"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* 2. HALAMAN DETAIL TUGAS */}
        {view === 'detail' && selectedTodo && (
          <div className="max-w-xl mx-auto bg-white p-6 border rounded-lg shadow-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 border-b pb-2">Detail Tugas</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div>
                <span className="font-semibold text-gray-600 block">Judul</span>
                <p className="text-gray-900 text-base">{selectedTodo.title}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-600 block">Deskripsi</span>
                <p className="text-gray-700">{selectedTodo.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <span className="font-semibold text-gray-600 block">Status</span>
                  <span className="inline-block mt-1 px-2 py-1 rounded text-xs font-semibold bg-yellow-100 text-yellow-800">
                    {selectedTodo.status}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 block">Prioritas</span>
                  <p className="text-gray-800 capitalize">{selectedTodo.priority}</p>
                </div>
                <div>
                  <span className="font-semibold text-gray-600 block">Deadline</span>
                  <p className="text-gray-800">{selectedTodo.deadline}</p>
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={() => setView('list')}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
              >
                <ArrowLeft size={16} /> Kembali
              </button>
              <button
                onClick={() => handleOpenEdit(selectedTodo)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm flex items-center gap-2"
              >
                <Edit size={16} /> Update
              </button>
            </div>
          </div>
        )}

        {/* 3. MODAL FORM (TAMBAH / UPDATE) */}
        {view === 'form' && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-lg w-full p-6 shadow-xl relative">
              <h2 className="text-lg font-bold mb-4 border-b pb-2">
                {formMode === 'add' ? 'Tambah Todo' : 'Update Todo'}
              </h2>
              <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Judul</label>
                  <input
                    type="text"
                    name="title"
                    required
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300 outline-none"
                    placeholder="Masukkan judul tugas..."
                  />
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Deskripsi</label>
                  <textarea
                    name="description"
                    rows="3"
                    required
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300 outline-none"
                    placeholder="Masukkan deskripsi tugas..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Status</label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleChange}
                      className="w-full border rounded p-2 focus:ring focus:ring-blue-300 outline-none bg-white"
                    >
                      <option value="to-do">to-do</option>
                      <option value="in-progress">in-progress</option>
                      <option value="completed">completed</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-medium text-gray-700 mb-1">Prioritas</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full border rounded p-2 focus:ring focus:ring-blue-300 outline-none bg-white"
                    >
                      <option value="low">low</option>
                      <option value="high">high</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block font-medium text-gray-700 mb-1">Deadline</label>
                  <input
                    type="date"
                    name="deadline"
                    required
                    value={formData.deadline}
                    onChange={handleChange}
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4 border-t">
                  <button
                    type="button"
                    onClick={() => setView('list')}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                  >
                    Batal
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    {formMode === 'add' ? 'Tambah' : 'Update'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}