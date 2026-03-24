import React, { useState, useEffect } from 'react';
import {
  Loader2,
  AlertCircle,
  CheckCircle,
  MessageSquare,
  Mail,
  Phone,
  ChevronDown,
  ChevronUp,
  Eye,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getContactMessages, markMessageRead } from '../../api/adminApi';

export const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [expandedId, setExpandedId] = useState(null);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const res = await getContactMessages();
      const d = res.data.data || res.data;
      const list = Array.isArray(d) ? d : d?.content || [];
      setMessages(list.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)));
    } catch {
      showToast('Failed to load messages', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleMarkRead = async (id) => {
    try {
      await markMessageRead(id);
      setMessages((prev) =>
        prev.map((m) => (m.id === id ? { ...m, read: true } : m))
      );
      showToast('Marked as read');
    } catch {
      showToast('Failed to update', 'error');
    }
  };

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  const formatDate = (dateStr) => {
    if (!dateStr) return '';
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
          <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white">
            Messages
            {unreadCount > 0 && (
              <span className="ml-2 inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-100 text-red-700">
                {unreadCount} unread
              </span>
            )}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">Contact form submissions</p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-brand-900" />
        </div>
      ) : messages.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-500 dark:text-gray-400">No messages yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => {
            const isExpanded = expandedId === msg.id;
            return (
              <div
                key={msg.id}
                className={`bg-white dark:bg-gray-900 rounded-xl border transition-shadow ${
                  !msg.read ? 'border-brand-200 dark:border-brand-800 shadow-sm' : 'border-gray-200 dark:border-gray-800'
                }`}
              >
                {/* Header row */}
                <button
                  onClick={() => toggleExpand(msg.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 text-sm font-bold"
                    style={{
                      backgroundColor: msg.read ? '#f3f4f6' : '#fff1f2',
                      color: msg.read ? '#6b7280' : '#881337',
                    }}
                  >
                    {(msg.name || '?').charAt(0).toUpperCase()}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-gray-900 dark:text-white truncate">{msg.name}</span>
                      {!msg.read && (
                        <span className="w-2 h-2 rounded-full bg-brand-900 shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                      {msg.subject || msg.message?.slice(0, 60) || 'No subject'}
                    </p>
                  </div>

                  <span className="text-xs text-gray-400 shrink-0 hidden sm:block">
                    {formatDate(msg.createdAt)}
                  </span>

                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                  )}
                </button>

                {/* Expanded content */}
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="pt-4 space-y-3">
                      {/* Contact info */}
                      <div className="flex flex-wrap gap-4 text-sm">
                        {msg.email && (
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                            <Mail className="w-4 h-4 text-gray-400" />
                            <a href={`mailto:${msg.email}`} className="hover:text-brand-900">
                              {msg.email}
                            </a>
                          </div>
                        )}
                        {msg.phone && (
                          <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-400">
                            <Phone className="w-4 h-4 text-gray-400" />
                            <a href={`tel:${msg.phone}`} className="hover:text-brand-900">
                              {msg.phone}
                            </a>
                          </div>
                        )}
                      </div>

                      {/* Subject */}
                      {msg.subject && (
                        <div>
                          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Subject</p>
                          <p className="text-sm text-gray-800 dark:text-gray-200 font-medium">{msg.subject}</p>
                        </div>
                      )}

                      {/* Message body */}
                      <div>
                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-1">Message</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap leading-relaxed">
                          {msg.message || 'No message content'}
                        </p>
                      </div>

                      {/* Date on mobile */}
                      <p className="text-xs text-gray-400 sm:hidden">{formatDate(msg.createdAt)}</p>

                      {/* Actions */}
                      {!msg.read && (
                        <div className="pt-2">
                          <Button size="sm" variant="secondary" onClick={() => handleMarkRead(msg.id)}>
                            <Eye className="w-4 h-4" /> Mark as Read
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
