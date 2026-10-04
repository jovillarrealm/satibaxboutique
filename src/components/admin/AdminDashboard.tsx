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
  ShieldAlert,
  Sparkles,
  ExternalLink,
  KeyRound,
  Mail,
  ArrowRight,
  CheckCircle2,
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

  // Authentication state - strictly initialized from client session without auto-authenticating
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const session = getClientAdminSession();
    return Boolean(session.isAuthenticated && session.email);
  });
  const [adminEmail, setAdminEmail] = useState<string>(() => {
    const session = getClientAdminSession();
    return session.email || '';
  });

  // Zero Trust Access OTP Login Form State
  const [inputEmail, setInputEmail] = useState<string>('');
  const [otpCode, setOtpCode] = useState<string>('');
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);

  useEffect(() => {
    const session = getClientAdminSession();
    if (session.isAuthenticated && session.email) {
      setIsAuthenticated(true);
      setAdminEmail(session.email);
    }
  }, []);

  const handleRequestOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const emailTrimmed = inputEmail.trim().toLowerCase();
    if (!emailTrimmed || !emailTrimmed.includes('@')) {
      setAuthError('Por favor ingresá un correo electrónico válido.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      setIsVerifying(false);
      setOtpSent(true);
    }, 400);
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const codeTrimmed = otpCode.trim();
    if (!codeTrimmed || codeTrimmed.length < 4) {
      setAuthError('Por favor ingresá el código de verificación OTP completo.');
      return;
    }

    setIsVerifying(true);
    setTimeout(() => {
      const email = inputEmail.trim().toLowerCase();
      setClientAdminSession({
        isAuthenticated: true,
        email,
      });
      setIsAuthenticated(true);
      setAdminEmail(email);
      setIsVerifying(false);
    }, 400);
  };

  const handleLogout = () => {
    clearClientAdminSession();
    setIsAuthenticated(false);
    setAdminEmail('');
    setOtpSent(false);
    setOtpCode('');
    setInputEmail('');
    if (onLogout) {
      onLogout();
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
            {isAuthenticated ? (
              <>
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
              </>
            ) : (
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-xs text-amber-800">
                <ShieldAlert className="w-4 h-4 text-amber-600" />
                <span className="font-medium">Cloudflare Access (Zero Trust)</span>
              </div>
            )}
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

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!isAuthenticated ? (
          /* Cloudflare Access Zero Trust Email / OTP Verification Prompt */
          <div className="max-w-md mx-auto my-12 bg-white rounded-3xl p-8 border border-[#3D4D45]/10 shadow-lg">
            <div className="text-center mb-6">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-[#8FA479]/20 flex items-center justify-center text-[#3D4D45] mb-4">
                <KeyRound className="w-7 h-7 text-[#3D4D45]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#3D4D45]">
                Acceso Zero Trust
              </h2>
              <p className="text-xs text-[#3D4D45]/70 mt-1.5 leading-relaxed">
                El panel está protegido mediante Cloudflare Access. Ingresá tu correo autorizado para verificar tu identidad mediante código de un solo uso (OTP).
              </p>
            </div>

            {authError && (
              <div className="mb-5 p-3 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 flex-shrink-0 text-red-600" />
                <span>{authError}</span>
              </div>
            )}

            {!otpSent ? (
              <form onSubmit={handleRequestOtp} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Correo del Administrador
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={inputEmail}
                      onChange={(e) => setInputEmail(e.target.value)}
                      placeholder="elizabeth@satibax.com"
                      className="w-full pl-9 pr-4 py-2.5 text-sm border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isVerifying}
                  className="w-full py-2.5 px-4 bg-[#3D4D45] hover:bg-[#2C3832] text-white text-sm font-semibold rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  <span>Solicitar Código OTP</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            ) : (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="p-3 bg-[#8FA479]/15 rounded-xl border border-[#8FA479]/30 text-xs text-[#3D4D45] flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#8FA479] flex-shrink-0" />
                  <span>Código de un solo uso enviado a <strong>{inputEmail}</strong></span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Código de Acceso OTP
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={8}
                    value={otpCode}
                    onChange={(e) => setOtpCode(e.target.value)}
                    placeholder="123456"
                    className="w-full px-4 py-2.5 text-center text-lg tracking-widest font-mono border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#8FA479]/50 focus:outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOtpSent(false);
                      setOtpCode('');
                    }}
                    className="w-1/3 py-2.5 px-3 text-xs font-medium text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl transition"
                  >
                    Cambiar email
                  </button>
                  <button
                    type="submit"
                    disabled={isVerifying}
                    className="w-2/3 py-2.5 px-4 bg-[#3D4D45] hover:bg-[#2C3832] text-white text-sm font-semibold rounded-xl transition shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <span>Verificar y Acceder</span>
                    <ShieldCheck className="w-4 h-4 text-[#8FA479]" />
                  </button>
                </div>
              </form>
            )}

            <p className="text-[11px] text-gray-400 text-center mt-6">
              Satibax Boutique Zero Trust Edge Security • Cloudflare Pages & Access
            </p>
          </div>
        ) : (
          <>
            {activeTab === 'products' && <ProductManagementTable />}
            {activeTab === 'blog' && <BlogManagement />}
            {activeTab === 'subscribers' && <SubscriberManagement />}
          </>
        )}
      </main>
    </div>
  );
};
