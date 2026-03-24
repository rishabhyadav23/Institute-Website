import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  Video,
  Play,
  CheckCheck,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getLiveClasses, createLiveClass, updateLiveClass, updateLiveClassStatus, deleteLiveClass } from '../../api/adminApi';

const STATUS_STYLES = {
  UPCOMING: 'bg-blue-100 text-blue-700',
  LIVE: 'bg-red-100 text-red-700',
  COMPLETED: 'bg-gray-100 text-gray-600',
};

const STATUS_TRANSITIONS = {
  UPCOMING: 'LIVE',
  LIVE: 'COMPLETED',
};

const emptyClass = {
  title: '',
  description: '',
  scheduledAt: '',
  duration: '',
  streamUrl: '',
  thumbnailUrl: '',
  maxStudents: '',
};

export const AdminLiveClasses = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyClass });
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchClasses = async () => {
    try {
      setLoading(true);
      const res = await getLiveClasses();
      const d = res.data.data || res.data;
      setClasses(Array.isArray(d) ? d : d?.content || []);
    } catch {
      showToast('Failed to load live classes', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyClass });
    setShowModal(true);
  };

  const openEdit = (cls) => {
    setEditId(cls.id);
    setForm({
      title: cls.title || '',
      description: cls.description || '',
      scheduledAt: cls.scheduledAt ? cls.scheduledAt.slice(0, 16) : '',
      duration: cls.duration ?? '',
      streamUrl: cls.streamUrl || '',
      thumbnailUrl: cls.thumbnailUrl || '',
      maxStudents: cls.maxStudents ?? '',
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) {
      showToast('Title is required', 'error');
      return;
    }

    const payload = {
      ...form,
      duration: form.duration ? Number(form.duration) : 0,
      maxStudents: form.maxStudents ? Number(form.maxStudents) : 0,
    };

    try {
      setSaving(true);
      if (editId) {
        await updateLiveClass(editId, payload);
        showToast('Live class updated');
      } else {
        await createLiveClass(payload);
        showToast('Live class created');
      }
      setShowModal(false);
      fetchClasses();
    } catch {
      showToast('Failed to save live class', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (cls) => {
    const nextStatus = STATUS_TRANSITIONS[cls.status];
    if (!nextStatus) return;

    try {
      await updateLiveClassStatus(cls.id, nextStatus);
      showToast(`Status changed to ${nextStatus}`);
      fetchClasses();
    } catch {
      showToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLiveClass(id);
      showToast('Live class deleted');
      setDeleteConfirm(null);
      fetchClasses();
    } catch {
      showToast('Failed to delete', 'error');
    }
  };

  const formatDate = (dateStr) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-6">
      {toast && (
        <div
          className={`fixed top-4 right-4 z-[100] flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-sm font-medium ${
            toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-green-600 text-white'
          }`}
        >
          {toast.type === 'error' ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-heading font-bold text-gray-900">Live Classes</h1>
          <p className="text-gray-500 text-sm mt-1">Schedule and manage live sessions</p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Schedule Class
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
        </div>
      ) : classes.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Video className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500">No live classes scheduled yet.</p>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Title</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Scheduled At</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Duration</th>
                  <th className="text-left px-4 py-3 font-semibold text-gray-600">Status</th>
                  <th className="text-right px-4 py-3 font-semibold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {classes.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <span className="font-medium text-gray-900">{cls.title}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-600">{formatDate(cls.scheduledAt)}</td>
                    <td className="px-4 py-3 text-gray-600">{cls.duration ? `${cls.duration} min` : '-'}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                          STATUS_STYLES[cls.status] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {cls.status || 'UPCOMING'}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {STATUS_TRANSITIONS[cls.status] && (
                          <button
                            onClick={() => handleStatusChange(cls)}
                            className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title={`Change to ${STATUS_TRANSITIONS[cls.status]}`}
                          >
                            {cls.status === 'UPCOMING' ? (
                              <Play className="w-4 h-4" />
                            ) : (
                              <CheckCheck className="w-4 h-4" />
                            )}
                          </button>
                        )}
                        <button
                          onClick={() => openEdit(cls)}
                          className="p-2 text-gray-500 hover:text-brand-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(cls.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-heading font-bold text-gray-900">Delete Live Class</h3>
            <p className="text-gray-500 text-sm mt-2">Are you sure? This cannot be undone.</p>
            <div className="flex gap-3 mt-5">
              <Button variant="secondary" size="sm" className="flex-1" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl w-full max-w-lg shadow-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-heading font-bold text-gray-900">
                {editId ? 'Edit Live Class' : 'Schedule Live Class'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled At *</label>
                  <input
                    name="scheduledAt"
                    type="datetime-local"
                    value={form.scheduledAt}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
                  <input
                    name="duration"
                    type="number"
                    min="0"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stream URL</label>
                <input
                  name="streamUrl"
                  value={form.streamUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Thumbnail URL</label>
                <input
                  name="thumbnailUrl"
                  value={form.thumbnailUrl}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Max Students</label>
                <input
                  name="maxStudents"
                  type="number"
                  min="0"
                  value={form.maxStudents}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="secondary" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit" isLoading={saving}>
                  {editId ? 'Update Class' : 'Schedule Class'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
