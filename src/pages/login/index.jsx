import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Modern, responsive login page using Tailwind utility classes (consistent with the repo).
 * - Username/email + password fields
 * - Required-field validation + simple email format check
 * - Password show/hide toggle
 * - Remember me checkbox
 * - Accessible error messaging (aria-live)
 * - Smooth transitions and subtle gradient background
 *
 * Usage:
 * - Place this file in src/pages/login/index.jsx
 * - Add a route in Routes.jsx: <Route path="/login" element={<Login />} />
 *
 * Security notes (important):
 * - This component does not store passwords in localStorage.
 * - On successful authentication prefer server-set HttpOnly cookies (so tokens aren't accessible from JS).
 * - Provide a CSRF token from the server and include it in the request headers when required.
 */

const Login = () => {
  const navigate = useNavigate();
  const emailRef = useRef(null);

  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState({});

  // Simple email-ish regex for client validation (not authoritative)
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

  const validate = () => {
    const errs = {};
    if (!identifier?.trim()) errs.identifier = 'Le nom d’utilisateur ou l’email est requis.';
    else if (identifier.includes('@') && !EMAIL_RE.test(identifier)) errs.identifier = 'Format d’email invalide.';

    if (!password) errs.password = 'Le mot de passe est requis.';
    // Add more checks (min length, password strength) if needed
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!validate()) {
      // focus first invalid field
      if (fieldErrors.identifier) emailRef.current?.focus();
      return;
    }

    setLoading(true);

    try {
      // Example POST to auth endpoint. Replace with your real endpoint.
      // Use credentials: 'include' if your server sets HttpOnly cookies for sessions.
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'X-CSRF-Token': window.__CSRF_TOKEN__  // uncomment if you set up CSRF
        },
        credentials: 'include',
        body: JSON.stringify({
          identifier: identifier.trim(),
          password,
          remember: !!remember
        })
      });

      if (!res.ok) {
        // Try to parse message from server
        let msg = 'Échec de la connexion. Veuillez réessayer.';
        try {
          const body = await res.json();
          if (body?.message) msg = body.message;
        } catch (_) {}
        throw new Error(msg);
      }

      // On success, server should set a secure HttpOnly cookie or return a token.
      // Do NOT store raw password or tokens in localStorage unless you understand the risk.
      // If server returns useful user info, you can read it and route accordingly.
      const payload = await res.json();

      // Optionally: use payload.redirect or next param
      const redirectTo = payload?.redirect || '/tableau-de-bord';
      navigate(redirectTo);
    } catch (err) {
      setError(err?.message || 'Erreur inconnue');
      // Keep generic messages for security if desired
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-slate-50"
      style={{
        // subtle diagonal gradient overlay + faint pattern via CSS gradients
        backgroundImage:
          'linear-gradient(135deg, rgba(59,130,246,0.03) 0%, rgba(16,185,129,0.02) 50%, rgba(234,88,12,0.01) 100%)'
      }}
    >
      <div className="w-full max-w-4xl mx-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left: visual / marketing panel */}
        <aside className="hidden lg:flex flex-col justify-center rounded-xl overflow-hidden shadow-lg bg-gradient-to-tr from-primary/5 to-accent/5 p-10">
          <div className="mb-8">
            <div className="w-12 h-12 rounded-lg bg-primary flex items-center justify-center text-white font-bold">
              SI
            </div>
          </div>

          <h2 className="text-3xl font-semibold text-foreground mb-3">Bienvenue dans SILM</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Système Intégré de Logistique Médicale — accédez à la gestion d'équipements, la traçabilité et l'analyse prédictive.
          </p>

          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted/40 rounded-md flex items-center justify-center">✓</div>
              Sécurité, audit & gestion centralisée
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted/40 rounded-md flex items-center justify-center">✓</div>
              Dashboard en temps réel et alertes proactives
            </li>
            <li className="flex items-start gap-3">
              <div className="w-8 h-8 bg-muted/40 rounded-md flex items-center justify-center">✓</div>
              Conçu pour les environnements hospitaliers
            </li>
          </ul>
        </aside>

        {/* Right: form card */}
        <main className="bg-white rounded-xl shadow-lg p-8 sm:p-12">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Se connecter</h1>
            <p className="text-sm text-muted-foreground mt-1">Entrez vos identifiants pour continuer</p>
          </div>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-4">
              <div>
                <label htmlFor="identifier" className="block text-sm font-medium text-slate-700 mb-1">
                  Nom d’utilisateur ou email
                </label>
                <input
                  id="identifier"
                  ref={emailRef}
                  name="identifier"
                  type="text"
                  inputMode="email"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  className={`w-full px-4 py-3 border rounded-md text-sm transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30
                    ${fieldErrors.identifier ? 'border-error/80 focus:ring-error/40' : 'border-border'}
                  `}
                  aria-invalid={!!fieldErrors.identifier}
                  aria-describedby={fieldErrors.identifier ? 'identifier-error' : undefined}
                  required
                />
                {fieldErrors.identifier && (
                  <p id="identifier-error" className="mt-1 text-xs text-error" role="alert">
                    {fieldErrors.identifier}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full px-4 py-3 border rounded-md text-sm transition-shadow duration-150 focus:outline-none focus:ring-2 focus:ring-primary/30
                      ${fieldErrors.password ? 'border-error/80 focus:ring-error/40' : 'border-border'}
                    `}
                    aria-invalid={!!fieldErrors.password}
                    aria-describedby={fieldErrors.password ? 'password-error' : undefined}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Masquer le mot de passe' : 'Afficher le mot de passe'}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
                  >
                    {showPassword ? 'Masquer' : 'Afficher'}
                  </button>
                </div>
                {fieldErrors.password && (
                  <p id="password-error" className="mt-1 text-xs text-error" role="alert">
                    {fieldErrors.password}
                  </p>
                )}
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm select-none">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded border-border"
                  />
                  <span className="text-sm text-slate-600">Se souvenir de moi</span>
                </label>

                <button
                  type="button"
                  onClick={() => alert('Flux de récupération de mot de passe à implémenter.')}
                  className="text-sm text-primary hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Error area (server-side) */}
              <div aria-live="polite" className="min-h-[1.375rem]">
                {error && <div className="text-sm text-error">{error}</div>}
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full inline-flex justify-center items-center gap-2 px-4 py-3 rounded-md text-sm font-medium text-white bg-primary shadow-sm
                    hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all duration-150
                    ${loading ? 'opacity-80 cursor-wait' : ''}
                  `}
                >
                  {loading ? 'Connexion...' : 'Se connecter'}
                </button>
              </div>

              <div className="pt-4 text-center text-xs text-muted-foreground">
                By continuing you agree to our <button type="button" className="text-primary hover:underline">Terms</button> and <button type="button" className="text-primary hover:underline">Privacy Policy</button>.
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default Login;