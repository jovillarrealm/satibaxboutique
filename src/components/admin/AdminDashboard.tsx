import React, { useState, useEffect } from 'react';
import { ProductManagementTable } from './ProductManagementTable';
import { BlogManagement } from './BlogManagement';
import { SubscriberManagement } from './SubscriberManagement';
import {
  getClientAdminSession,
  clearClientAdminSession,
  setClientAdminSession,
} from '../../lib/adminAuth';
import {
  Package,
  FileText,
  Users,
  LogOut,
  ShieldCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

export type AdminTab = 'products' | 'blog' | 'subscribers';

interface AdminDashboardProps {
  initialTab?: AdminTab;
  onLogout?: () => void;
  onViewStorefront?: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  initialTab = 'products',
  onLogout,
  onViewStorefront,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>(initialTab);
  const [adminEmail, setAdminEmail] = useState<string>('elizabeth@satibax.com');

  useEffect(() => {
    const session = getClientAdminSession();
    if (session.email) {
      setAdminEmail(session.email);
    } else {
      // Default identity if loaded via Cloudflare Access or direct admin route
      setClientAdminSession({
        isAuthenticated: true,
        email: 'elizabeth@satibax.com',
      });
    }
  }, []);

  const handleLogout = () => {
    clearClientAdminSession();
    if (onLogout) {
      onLogout();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F7F2] text-[#3D4D45] font-sans antialiased">
      {/* Top Header */}
      <header className="bg-white border-b border-[#3D4D45]/10 sticky top-0 z-40 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Brand title */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#3D4D45] flex items-center justify-center text-[#F9F7F2] shadow-sm">
              <Sparkles className="w-5 h-5 text-[#8FA479]" />
            </div>
            <div>
              <h1 className="font-serif text-lg font-bold text-[#3D4D45] leading-tight">
                Satibax Boutique
              </h1>
              <p className="text-[11px] uppercase tracking-wider text-[#8FA479] font-medium">
                Panel de Administración
              </p>
            </div>
          </div>

          {/* User badge and actions */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#8FA479]/15 border border-[#8FA479]/30 text-xs">
              <ShieldCheck className="w-4 h-4 text-[#3D4D45]" />
              <span className="font-medium text-[#3D4D45]">{adminEmail}</span>
            </div>

            {onViewStorefront && (
              <button
                onClick={onViewStorefront}
                className="hidden md:inline-flex items-center gap-1.5 text-xs text-gray-600 hover:text-[#3D4D45] transition"
              >
                <span>Ver Tienda</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            )}

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg transition"
              title="Cerrar sesión"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cerrar Sesión</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-1 sm:space-x-8" aria-label="Tabs">
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-1 border-b-2 text-sm font-medium transition ${
                activeTab === 'products'
                  ? 'border-[#3D4D45] text-[#3D4D45]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Productos y Catálogo</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-1 border-b-2 text-sm font-medium transition ${
                activeTab === 'blog'
                  ? 'border-[#3D4D45] text-[#3D4D45]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog y Novedades</span>
            </button>

            <button
              onClick={() => setActiveTab('subscribers')}
              className={`flex items-center gap-2 py-3 px-3 sm:px-1 border-b-2 text-sm font-medium transition ${
                activeTab === 'subscribers'
                  ? 'border-[#3D4D45] text-[#3D4D45]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Suscriptores</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Tab Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'products' && <ProductManagementTable />}
        {activeTab === 'blog' && <BlogManagement />}
        {activeTab === 'subscribers' && <SubscriberManagement />}
      </main>
    </div>
  );
};
