import React, { useState, useEffect } from 'react';
import type { BlogPost, CreateBlogPostInput } from '../../lib/catalog';
import {
  fetchAdminBlogPosts,
  createAdminBlogPost,
  updateAdminBlogPost,
} from '../../lib/adminApiClient';
import {
  Plus,
  Edit2,
  FileText,
  Save,
  X,
  Check,
  RefreshCw,
  AlertCircle,
  Eye,
  EyeOff,
  Calendar,
} from 'lucide-react';

export const BlogManagement: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Editor Modal State
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const [formData, setFormData] = useState<CreateBlogPostInput>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    cover_image: '',
    published: true,
  });

  const loadPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const fetched = await fetchAdminBlogPosts(true);
      setPosts(fetched);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar los artículos del blog');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const notifySuccess = (msg: string) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 4000);
  };

  const openNewPostModal = () => {
    setEditingPostId(null);
    setFormData({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      cover_image: '',
      published: true,
    });
    setIsEditorOpen(true);
  };

  const openEditPostModal = (post: BlogPost) => {
    setEditingPostId(post.id);
    setFormData({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || '',
      content: post.content,
      cover_image: post.cover_image || '',
      published: post.published,
    });
    setIsEditorOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.content.trim()) {
      alert('El título y el contenido son obligatorios.');
      return;
    }

    try {
      setIsSubmitting(true);
      if (editingPostId) {
        const updated = await updateAdminBlogPost(editingPostId, formData);
        setPosts((prev) =>
          prev.map((p) => (p.id === updated.id ? updated : p))
        );
        notifySuccess(`Artículo "${updated.title}" actualizado con éxito.`);
      } else {
        const created = await createAdminBlogPost(formData);
        setPosts((prev) => [created, ...prev]);
        notifySuccess(`Nuevo artículo "${created.title}" publicado con éxito.`);
      }
      setIsEditorOpen(false);
    } catch (err: any) {
      alert(err?.message || 'Error al guardar el artículo');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTogglePublish = async (post: BlogPost) => {
    try {
      const nextState = !post.published;
      const updated = await updateAdminBlogPost(post.id, { published: nextState });
      setPosts((prev) =>
        prev.map((p) => (p.id === updated.id ? updated : p))
      );
      notifySuccess(
        `"${post.title}" ${nextState ? 'publicado' : 'guardado como borrador'}.`
      );
    } catch (err: any) {
      setError(err?.message || 'No se pudo actualizar el estado');
    }
  };

  return (
    <div className="space-y-6">
      {/* Notifications */}
      {successMessage && (
        <div className="flex items-center gap-2 p-4 text-sm text-[#3D4D45] bg-[#8FA479]/20 border border-[#8FA479] rounded-lg">
          <Check className="w-5 h-5 text-[#3D4D45]" />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="flex items-center gap-2 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>{error}</span>
        </div>
      )}

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-[#3D4D45]/10 shadow-sm">
        <div>
          <h3 className="font-serif text-lg font-semibold text-[#3D4D45]">
            Artículos y Publicaciones
          </h3>
          <p className="text-xs text-gray-500">
            {posts.length} artículo(s) registrados en el blog botánico.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadPosts}
            title="Recargar artículos"
            className="p-2 border border-gray-200 rounded-lg text-[#3D4D45] hover:bg-[#F9F7F2] transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={openNewPostModal}
            className="flex items-center gap-2 px-4 py-2 bg-[#3D4D45] hover:bg-[#2C3832] text-white text-sm font-medium rounded-lg transition shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Nueva Entrada</span>
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div className="bg-white rounded-xl border border-[#3D4D45]/10 shadow-sm overflow-hidden">
        {loading && posts.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#8FA479] mb-3" />
            <p>Cargando publicaciones del blog...</p>
          </div>
        ) : posts.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-base font-medium text-gray-700">No hay entradas aún</p>
            <p className="text-sm">Publica tu primera historia botánica con "Nueva Entrada".</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div
                key={post.id}
                className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F9F7F2]/40 transition"
              >
                <div className="flex items-start gap-4">
                  {post.cover_image ? (
                    <img
                      src={post.cover_image}
                      alt={post.title}
                      className="w-16 h-16 rounded-xl object-cover border border-gray-200 flex-shrink-0"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="w-16 h-16 rounded-xl bg-[#8FA479]/20 flex items-center justify-center text-[#3D4D45] flex-shrink-0">
                      <FileText className="w-8 h-8 opacity-60" />
                    </div>
                  )}

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-serif text-base font-semibold text-[#3D4D45]">
                        {post.title}
                      </h4>
                      {post.published ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-[#8FA479]/20 text-[#3D4D45]">
                          <Eye className="w-3 h-3 mr-1" /> Publicado
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-gray-100 text-gray-600">
                          <EyeOff className="w-3 h-3 mr-1" /> Borrador
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-gray-500 line-clamp-2">
                      {post.excerpt || post.content.slice(0, 140) + '...'}
                    </p>

                    <div className="flex items-center gap-4 text-[11px] text-gray-400 font-mono pt-1">
                      <span>/{post.slug}</span>
                      <span className="flex items-center gap-1 font-sans">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.created_at).toLocaleDateString('es-AR')}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end md:self-center">
                  <button
                    onClick={() => handleTogglePublish(post)}
                    className="px-3 py-1.5 text-xs border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                  >
                    {post.published ? 'Despublicar' : 'Publicar'}
                  </button>
                  <button
                    onClick={() => openEditPostModal(post)}
                    className="flex items-center gap-1 px-3 py-1.5 bg-[#F9F7F2] hover:bg-[#8FA479]/20 border border-gray-200 text-[#3D4D45] text-xs font-medium rounded-lg transition"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    <span>Editar</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {isEditorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fadeIn">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-gray-100 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-serif text-lg font-semibold text-[#3D4D45]">
                  {editingPostId ? 'Editar Entrada de Blog' : 'Nueva Entrada de Blog'}
                </h3>
                <p className="text-xs text-gray-500">
                  Comparte relatos, consejos de cuidado botánico y novedades.
                </p>
              </div>
              <button
                onClick={() => setIsEditorOpen(false)}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Título *
                </label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Ej. Guía para una rutina facial botánica"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    Slug (URL amigable)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="Se autogenera si se deja vacío"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none font-mono text-xs"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                    URL Imagen de Portada
                  </label>
                  <input
                    type="url"
                    value={formData.cover_image || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, cover_image: e.target.value })
                    }
                    placeholder="https://..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Extracto / Resumen
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt || ''}
                  onChange={(e) =>
                    setFormData({ ...formData, excerpt: e.target.value })
                  }
                  placeholder="Breve introducción para previsualización..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1">
                  Contenido *
                </label>
                <textarea
                  rows={8}
                  required
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Escribe el cuerpo completo del artículo..."
                  className="w-full p-3 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="publishedCheckbox"
                  checked={Boolean(formData.published)}
                  onChange={(e) =>
                    setFormData({ ...formData, published: e.target.checked })
                  }
                  className="rounded text-[#3D4D45] focus:ring-[#8FA479]"
                />
                <label htmlFor="publishedCheckbox" className="text-sm text-gray-700 cursor-pointer">
                  Publicar inmediatamente (visible para visitantes del sitio)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsEditorOpen(false)}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex items-center gap-2 px-5 py-2 bg-[#3D4D45] text-white text-sm font-medium rounded-lg hover:bg-[#2C3832] transition disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <Save className="w-4 h-4" />
                  )}
                  <span>{editingPostId ? 'Guardar Cambios' : 'Publicar Entrada'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
