import React, { useState, useEffect } from 'react';
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Loader2,
  AlertCircle,
  CheckCircle,
  ClipboardList,
  ChevronLeft,
  HelpCircle,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import {
  getTestSeries,
  createTestSeries,
  updateTestSeries,
  deleteTestSeries,
  getTestQuestions,
  addTestQuestion,
  deleteTestQuestion,
} from '../../api/adminApi';

const emptyTest = {
  title: '',
  description: '',
  category: '',
  duration: '',
  totalMarks: '',
  passingMarks: '',
  published: true,
};

const emptyQuestion = {
  questionText: '',
  optionA: '',
  optionB: '',
  optionC: '',
  optionD: '',
  correctOption: 'A',
  explanation: '',
  marks: '1',
  negativeMarks: '0',
};

export const AdminTests = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ ...emptyTest });
  const [toast, setToast] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  // Question management
  const [selectedTest, setSelectedTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [loadingQuestions, setLoadingQuestions] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [questionForm, setQuestionForm] = useState({ ...emptyQuestion });
  const [savingQuestion, setSavingQuestion] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchTests = async () => {
    try {
      setLoading(true);
      const res = await getTestSeries();
      const d = res.data.data || res.data;
      setTests(Array.isArray(d) ? d : d?.content || []);
    } catch {
      showToast('Failed to load tests', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const fetchQuestions = async (testId) => {
    try {
      setLoadingQuestions(true);
      const res = await getTestQuestions(testId);
      const d = res.data.data || res.data;
      setQuestions(Array.isArray(d) ? d : d?.content || []);
    } catch {
      showToast('Failed to load questions', 'error');
    } finally {
      setLoadingQuestions(false);
    }
  };

  const openTestQuestions = (test) => {
    setSelectedTest(test);
    fetchQuestions(test.id);
  };

  const openAdd = () => {
    setEditId(null);
    setForm({ ...emptyTest });
    setShowModal(true);
  };

  const openEdit = (test) => {
    setEditId(test.id);
    setForm({
      title: test.title || '',
      description: test.description || '',
      category: test.category || '',
      duration: test.duration ?? '',
      totalMarks: test.totalMarks ?? '',
      passingMarks: test.passingMarks ?? '',
      published: test.published ?? true,
    });
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
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
      totalMarks: form.totalMarks ? Number(form.totalMarks) : 0,
      passingMarks: form.passingMarks ? Number(form.passingMarks) : 0,
    };

    try {
      setSaving(true);
      if (editId) {
        await updateTestSeries(editId, payload);
        showToast('Test updated successfully');
      } else {
        await createTestSeries(payload);
        showToast('Test created successfully');
      }
      setShowModal(false);
      fetchTests();
    } catch {
      showToast('Failed to save test', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTestSeries(id);
      showToast('Test deleted');
      setDeleteConfirm(null);
      fetchTests();
    } catch {
      showToast('Failed to delete test', 'error');
    }
  };

  const handleQuestionChange = (e) => {
    const { name, value } = e.target;
    setQuestionForm((f) => ({ ...f, [name]: value }));
  };

  const handleAddQuestion = async (e) => {
    e.preventDefault();
    if (!questionForm.questionText.trim() || !questionForm.optionA.trim()) {
      showToast('Question text and options are required', 'error');
      return;
    }

    const payload = {
      ...questionForm,
      marks: Number(questionForm.marks) || 1,
      negativeMarks: Number(questionForm.negativeMarks) || 0,
    };

    try {
      setSavingQuestion(true);
      await addTestQuestion(selectedTest.id, payload);
      showToast('Question added');
      setQuestionForm({ ...emptyQuestion });
      setShowQuestionForm(false);
      fetchQuestions(selectedTest.id);
    } catch {
      showToast('Failed to add question', 'error');
    } finally {
      setSavingQuestion(false);
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    try {
      await deleteTestQuestion(selectedTest.id, questionId);
      showToast('Question deleted');
      fetchQuestions(selectedTest.id);
    } catch {
      showToast('Failed to delete question', 'error');
    }
  };

  // If viewing questions for a specific test
  if (selectedTest) {
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
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSelectedTest(null)}
              className="p-2 text-gray-500 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">{selectedTest.title}</h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-0.5">Manage questions for this test</p>
            </div>
          </div>
          <Button size="sm" onClick={() => { setQuestionForm({ ...emptyQuestion }); setShowQuestionForm(true); }}>
            <Plus className="w-4 h-4" /> Add Question
          </Button>
        </div>

        {loadingQuestions ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
          </div>
        ) : questions.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
            <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 dark:text-gray-400">No questions yet. Add your first question.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {questions.map((q, idx) => (
              <div key={q.id || idx} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">
                      Q{idx + 1}. {q.questionText}
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                      {['A', 'B', 'C', 'D'].map((opt) => (
                        <div
                          key={opt}
                          className={`px-3 py-2 rounded-lg text-sm ${
                            q.correctOption === opt
                              ? 'bg-green-50 border border-green-200 text-green-800 font-medium'
                              : 'bg-gray-50 border border-gray-200 text-gray-600'
                          }`}
                        >
                          <span className="font-semibold">{opt}.</span> {q[`option${opt}`]}
                        </div>
                      ))}
                    </div>
                    {q.explanation && (
                      <p className="text-xs text-gray-500 mt-2">Explanation: {q.explanation}</p>
                    )}
                    <p className="text-xs text-gray-400 mt-1">
                      Marks: {q.marks} | Negative: {q.negativeMarks}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDeleteQuestion(q.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Question Form */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
            <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg shadow-xl my-8">
              <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
                <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">Add Question</h2>
                <button onClick={() => setShowQuestionForm(false)} className="p-1 text-gray-400 hover:text-gray-600">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddQuestion} className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Question Text *</label>
                  <textarea
                    name="questionText"
                    value={questionForm.questionText}
                    onChange={handleQuestionChange}
                    required
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none resize-none dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {['A', 'B', 'C', 'D'].map((opt) => (
                    <div key={opt}>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Option {opt} *</label>
                      <input
                        name={`option${opt}`}
                        value={questionForm[`option${opt}`]}
                        onChange={handleQuestionChange}
                        required
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                      />
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Correct Option</label>
                    <select
                      name="correctOption"
                      value={questionForm.correctOption}
                      onChange={handleQuestionChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                    >
                      {['A', 'B', 'C', 'D'].map((o) => (
                        <option key={o} value={o}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Marks</label>
                    <input
                      name="marks"
                      type="number"
                      min="0"
                      value={questionForm.marks}
                      onChange={handleQuestionChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Negative Marks</label>
                    <input
                      name="negativeMarks"
                      type="number"
                      min="0"
                      step="0.25"
                      value={questionForm.negativeMarks}
                      onChange={handleQuestionChange}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Explanation</label>
                  <textarea
                    name="explanation"
                    value={questionForm.explanation}
                    onChange={handleQuestionChange}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none resize-none dark:bg-gray-800 dark:text-white"
                  />
                </div>

                <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
                  <Button variant="secondary" size="sm" type="button" onClick={() => setShowQuestionForm(false)}>
                    Cancel
                  </Button>
                  <Button size="sm" type="submit" isLoading={savingQuestion}>
                    Add Question
                  </Button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Test series list view
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
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">Test Series</h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Manage test series and questions</p>
        </div>
        <Button size="sm" onClick={openAdd}>
          <Plus className="w-4 h-4" /> Add Test Series
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
        </div>
      ) : tests.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
          <ClipboardList className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No test series yet. Create your first one.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {tests.map((test) => (
            <div key={test.id} className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 dark:text-white truncate">{test.title}</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{test.description || 'No description'}</p>
                </div>
                <span
                  className={`ml-2 shrink-0 inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                    test.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {test.published ? 'Published' : 'Draft'}
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs text-gray-500 dark:text-gray-400">
                {test.duration && <span>{test.duration} min</span>}
                {test.totalMarks && <span>{test.totalMarks} marks</span>}
                {test.category && <span>{test.category}</span>}
              </div>

              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => openTestQuestions(test)}
                  className="flex-1 px-3 py-1.5 text-sm font-medium text-brand-900 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors text-center"
                >
                  Questions
                </button>
                <button
                  onClick={() => openEdit(test)}
                  className="p-2 text-gray-500 hover:text-brand-900 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <Pencil className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeleteConfirm(test.id)}
                  className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/50 z-[60] flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-900 rounded-xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-heading font-bold text-gray-900 dark:text-white">Delete Test Series</h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-2">This will also delete all questions. Are you sure?</p>
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

      {/* Test Form Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-gray-900 rounded-xl w-full max-w-lg shadow-xl my-8">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-800">
              <h2 className="text-lg font-heading font-bold text-gray-900 dark:text-white">
                {editId ? 'Edit Test Series' : 'Add Test Series'}
              </h2>
              <button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title *</label>
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none resize-none dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Category</label>
                  <input
                    name="category"
                    value={form.category}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Duration (minutes)</label>
                  <input
                    name="duration"
                    type="number"
                    min="0"
                    value={form.duration}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Total Marks</label>
                  <input
                    name="totalMarks"
                    type="number"
                    min="0"
                    value={form.totalMarks}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Passing Marks</label>
                  <input
                    name="passingMarks"
                    type="number"
                    min="0"
                    value={form.passingMarks}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-lg text-sm focus:ring-2 focus:ring-brand-900/20 focus:border-brand-900 outline-none dark:bg-gray-800 dark:text-white"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="published"
                  checked={form.published}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-brand-900 focus:ring-brand-900"
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Published</span>
              </label>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <Button variant="secondary" size="sm" type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button size="sm" type="submit" isLoading={saving}>
                  {editId ? 'Update Test' : 'Create Test'}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
