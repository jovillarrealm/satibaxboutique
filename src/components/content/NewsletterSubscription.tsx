import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle, Sparkles, Loader2 } from 'lucide-react';

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

export interface NewsletterSubscriptionProps {
  title?: string;
  description?: string;
  compact?: boolean;
  className?: string;
  onSubscribe?: (email: string) => Promise<{ success: boolean; message?: string }>;
}

export const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  title = 'Sumate a nuestro Círculo Botánico',
  description = 'Recibí consejos sobre rutinas botánicas, lanzamientos de temporada y beneficios exclusivos para cuidar tu piel conscientemente.',
  compact = false,
  className = '',
  onSubscribe,
}) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanEmail = email.trim();

    if (!cleanEmail) {
      setStatus('error');
      setErrorMessage('Por favor, ingresá tu correo electrónico.');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setStatus('error');
      setErrorMessage('Por favor, ingresá un correo electrónico válido.');
      return;
    }

    setStatus('loading');
    setErrorMessage(null);

    try {
      if (onSubscribe) {
        const res = await onSubscribe(cleanEmail);
        if (res.success) {
          setStatus('success');
          setEmail('');
        } else {
          setStatus('error');
          setErrorMessage(res.message || 'No pudimos registrar tu suscripción. Intentalo de nuevo.');
        }
      } else {
        // Direct API POST call
        const response = await fetch('/api/subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: cleanEmail }),
        });

        if (response.ok) {
          setStatus('success');
          setEmail('');
        } else {
          const errData = await response.json().catch(() => null);
          setStatus('error');
          setErrorMessage(errData?.error || 'No pudimos registrar tu suscripción. Intentalo de nuevo.');
        }
      }
    } catch {
      setStatus('error');
      setErrorMessage('Ocurrió un error de conexión. Por favor intentá más tarde.');
    }
  };

  if (compact) {
    return (
      <div className={`w-full ${className}`}>
        {status === 'success' ? (
          <div className="flex items-center gap-2 p-3 bg-[#8FA479]/20 text-[#3D4D45] rounded-xl text-sm font-medium">
            <CheckCircle2 className="w-5 h-5 text-[#8FA479] flex-shrink-0" />
            <span>¡Suscripción confirmada! Gracias por ser parte.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-[#3D4D45]/40 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Tu correo electrónico"
                disabled={status === 'loading'}
                className="w-full pl-9 pr-3 py-2.5 text-sm bg-white border border-[#3D4D45]/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#8FA479] text-[#3D4D45] placeholder-[#3D4D45]/40"
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="px-5 py-2.5 bg-[#8FA479] hover:bg-[#8FA479]/90 active:scale-95 text-[#F9F7F2] font-semibold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Enviando...</span>
                </>
              ) : (
                <span>Suscribirme</span>
              )}
            </button>
          </form>
        )}
        {status === 'error' && errorMessage && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs text-red-600 font-medium">
            <AlertCircle className="w-3.5 h-3.5" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-white via-[#F9F7F2] to-[#8FA479]/10 border border-[#8FA479]/30 rounded-3xl p-6 sm:p-10 shadow-sm ${className}`}
    >
      <div className="max-w-2xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8FA479]/20 text-[#3D4D45] text-xs font-semibold uppercase tracking-wider mb-4">
          <Sparkles className="w-3.5 h-3.5 text-[#8FA479]" />
          <span>Comunidad & Bienestar</span>
        </div>

        <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#3D4D45] mb-3 leading-tight">
          {title}
        </h3>

        <p className="text-sm sm:text-base text-[#3D4D45]/80 font-light leading-relaxed mb-8 max-w-lg mx-auto">
          {description}
        </p>

        {status === 'success' ? (
          <div className="inline-flex items-center gap-3 p-4 bg-[#8FA479]/25 text-[#3D4D45] rounded-2xl text-sm sm:text-base font-medium shadow-sm animate-fade-in">
            <CheckCircle2 className="w-6 h-6 text-[#3D4D45] flex-shrink-0" />
            <span>¡Gracias por sumarte a nuestra comunidad botánica! Pronto recibirás novedades y descuentos exclusivos.</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-2.5">
              <div className="relative flex-1">
                <Mail className="w-5 h-5 text-[#3D4D45]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (status === 'error') setStatus('idle');
                  }}
                  placeholder="Tu correo electrónico"
                  disabled={status === 'loading'}
                  className="w-full pl-11 pr-4 py-3 bg-white border border-[#3D4D45]/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#8FA479] text-[#3D4D45] placeholder-[#3D4D45]/40 text-sm sm:text-base shadow-inner"
                />
              </div>
              <button
                type="submit"
                disabled={status === 'loading'}
                className="px-6 py-3 bg-[#3D4D45] hover:bg-[#553A49] active:scale-95 text-[#F9F7F2] font-semibold text-sm sm:text-base rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <span>Suscribirme</span>
                    <Sparkles className="w-4 h-4 text-[#8FA479]" />
                  </>
                )}
              </button>
            </div>

            {status === 'error' && errorMessage && (
              <div className="mt-3 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-red-600 font-medium">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="mt-3 text-xs text-[#3D4D45]/50">
              Cuidamos tu privacidad. No enviamos spam y podés desuscribirte cuando quieras.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};
