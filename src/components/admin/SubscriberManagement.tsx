import React, { useState, useEffect } from 'react';
import type { Subscriber } from '../../lib/catalog';
import {
  fetchAdminSubscribers,
  exportSubscribersCsv,
} from '../../lib/adminApiClient';
import {
  Download,
  Mail,
  Search,
  RefreshCw,
  AlertCircle,
  Calendar,
  Users,
} from 'lucide-react';

export const SubscriberManagement: React.FC = () => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [exporting, setExporting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState<string>('');

  const loadSubscribers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchAdminSubscribers();
      setSubscribers(data);
    } catch (err: any) {
      setError(err?.message || 'Error al cargar la lista de suscriptores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSubscribers();
  }, []);

  const handleExportCsv = async () => {
    try {
      setExporting(true);
      await exportSubscribersCsv();
    } catch (err: any) {
      alert(err?.message || 'No se pudo descargar el archivo CSV.');
    } finally {
      setExporting(false);
    }
  };

  const filtered = subscribers.filter((s) =>
    s.email.toLowerCase().includes(search.toLowerCase().trim())
  );

  return (
    <div className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 p-4 text-sm text-red-800 bg-red-50 border border-red-200 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span>{error}</span>
          <button
            onClick={loadSubscribers}
            className="ml-auto underline hover:text-red-900"
          >
            Reintentar
          </button>
        </div>
      )}

      {/* Control bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 bg-white p-4 rounded-xl border border-[#3D4D45]/10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por correo electrónico..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#8FA479]/50"
            />
          </div>

          <span className="text-xs text-gray-500 whitespace-nowrap">
            {filtered.length} de {subscribers.length} suscriptores
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={loadSubscribers}
            title="Recargar suscriptores"
            className="p-2 border border-gray-200 rounded-lg text-[#3D4D45] hover:bg-[#F9F7F2] transition"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          </button>

          <button
            onClick={handleExportCsv}
            disabled={exporting || subscribers.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-[#3D4D45] hover:bg-[#2C3832] text-white text-sm font-medium rounded-lg transition shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Download className={`w-4 h-4 ${exporting ? 'animate-bounce' : ''}`} />
            <span>{exporting ? 'Descargando...' : 'Exportar CSV'}</span>
          </button>
        </div>
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl border border-[#3D4D45]/10 shadow-sm overflow-hidden">
        {loading && subscribers.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto text-[#8FA479] mb-3" />
            <p>Cargando suscriptores de newsletter...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-500">
            <Users className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-base font-medium text-gray-700">
              No se encontraron suscriptores
            </p>
            <p className="text-sm">
              Los registros de la newsletter aparecerán listados aquí.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#F9F7F2]/60 text-xs font-semibold uppercase tracking-wider text-[#3D4D45]/70">
                  <th className="py-3 px-4">Correo Electrónico</th>
                  <th className="py-3 px-4">ID de Suscriptor</th>
                  <th className="py-3 px-4 text-right">Fecha de Suscripción</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm">
                {filtered.map((subscriber) => (
                  <tr key={subscriber.id} className="hover:bg-[#F9F7F2]/40 transition">
                    <td className="py-3.5 px-4 font-medium text-[#3D4D45] flex items-center gap-2">
                      <Mail className="w-4 h-4 text-[#8FA479]" />
                      <span>{subscriber.email}</span>
                    </td>
                    <td className="py-3.5 px-4 text-xs font-mono text-gray-400">
                      {subscriber.id}
                    </td>
                    <td className="py-3.5 px-4 text-right text-xs text-gray-500 font-sans">
                      <span className="inline-flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-gray-400" />
                        {new Date(subscriber.created_at).toLocaleString('es-AR', {
                          day: '2-digit',
                          month: '2-digit',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
