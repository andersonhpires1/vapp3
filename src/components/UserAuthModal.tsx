import React, { useState } from 'react';
import { 
  X, Mail, Lock, User, Phone, Check, 
  ArrowRight, ShieldCheck, HelpCircle, 
  Sparkles, AlertCircle, MessageSquare, Bell
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { hapticLight, hapticSuccess, hapticMedium } from '../utils/haptics';

interface UserAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (userData: { name: string; email: string; phone: string; avatarUrl: string }) => void;
}

type AuthView = 'login' | 'register' | 'friction_verification' | 'safety_whatsapp' | 'safety_push';

export const UserAuthModal: React.FC<UserAuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const { isDark } = useTheme();
  
  // Views: 'login' (default) -> 'register' -> 'friction_verification' -> 'safety_whatsapp' -> 'safety_push'
  const [view, setView] = useState<AuthView>('login');
  
  // Login Form States
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Register Form States
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regConfirmEmail, setRegConfirmEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Email Code Verification State (Fricção Intencional)
  const [verificationCode, setVerificationCode] = useState('');
  const [verificationError, setVerificationError] = useState('');

  // WhatsApp Captura State
  const [whatsappPhone, setWhatsappPhone] = useState('');
  const [whatsappError, setWhatsappError] = useState('');

  // Garantir que ao abrir o modal, ele sempre inicie do zero na tela de login
  React.useEffect(() => {
    if (isOpen) {
      setView('login');
      setLoginEmail('');
      setLoginPassword('');
      setLoginError('');
      setRegName('');
      setRegEmail('');
      setRegConfirmEmail('');
      setRegPassword('');
      setRegPhone('');
      setRegisterError('');
      setVerificationCode('');
      setVerificationError('');
      setWhatsappPhone('');
      setWhatsappError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Formatar WhatsApp no padrão brasileiro
  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      if (numbers.length > 6) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
      } else if (numbers.length > 2) {
        return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
      }
      return numbers;
    }
    return value;
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!loginEmail.trim() || !loginPassword.trim()) {
      setLoginError('Por favor, preencha todos os campos.');
      hapticMedium();
      return;
    }

    // Login com e-mail simulado
    hapticSuccess();
    onLoginSuccess({
      name: 'Anderson Silva',
      email: loginEmail.trim(),
      phone: '(11) 99876-5432',
      avatarUrl: ''
    });
    onClose();
  };

  const handleGoogleLogin = () => {
    hapticSuccess();
    // Continuar com Google (1 toque, sem atrito)
    onLoginSuccess({
      name: 'Anderson Silva',
      email: 'anderson.silva@gmail.com',
      phone: '(11) 99876-5432',
      avatarUrl: ''
    });
    onClose();
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (!regName.trim() || !regEmail.trim() || !regConfirmEmail.trim() || !regPassword.trim() || !regPhone.trim()) {
      setRegisterError('Por favor, preencha todos os campos obrigatórios.');
      hapticMedium();
      return;
    }

    if (regEmail.trim().toLowerCase() !== regConfirmEmail.trim().toLowerCase()) {
      setRegisterError('Os e-mails digitados não coincidem.');
      hapticMedium();
      return;
    }

    hapticLight();
    // Avança para Fricção Intencional: Código de 6 dígitos enviado ao e-mail
    setView('friction_verification');
  };

  const handleVerificationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setVerificationError('');

    if (verificationCode.trim().length !== 6) {
      setVerificationError('O código deve conter exatamente 6 dígitos.');
      hapticMedium();
      return;
    }

    hapticSuccess();
    // Avança para o Pós-Login de Segurança: WhatsApp
    setWhatsappPhone(regPhone);
    setView('safety_whatsapp');
  };

  const handleWhatsappSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setWhatsappError('');

    const plainNumbers = whatsappPhone.replace(/\D/g, '');
    if (plainNumbers.length < 10) {
      setWhatsappError('Por favor, insira um número de WhatsApp válido.');
      hapticMedium();
      return;
    }

    hapticSuccess();
    // Salvar o telefone no localStorage
    localStorage.setItem('vagou_user_phone', whatsappPhone);
    // Avança para Pós-Login de Segurança: Push Notifications
    setView('safety_push');
  };

  const handleRequestPushPermission = () => {
    hapticSuccess();
    if ('Notification' in window) {
      Notification.requestPermission().then(() => {
        completeRegistration();
      });
    } else {
      completeRegistration();
    }
  };

  const completeRegistration = () => {
    hapticSuccess();
    onLoginSuccess({
      name: regName.trim(),
      email: regEmail.trim(),
      phone: whatsappPhone,
      avatarUrl: ''
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in"
      onClick={onClose}
    >
      <div 
        className={`w-full max-w-sm rounded-[4px] border shadow-2xl p-5 flex flex-col transition-all ${
          isDark ? 'bg-slate-950 border-slate-800 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Cabeçalho do Modal */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800/60 mb-4 shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-[4px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
            </div>
            <div>
              <h3 className="text-xs font-bold font-['Poppins'] uppercase tracking-wider text-emerald-400">
                Área do Cliente
              </h3>
              <p className="text-[10px] text-slate-400">Vagou • Conectar & Agendar</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className={`p-1 rounded-[4px] transition cursor-pointer ${
              isDark ? 'hover:bg-slate-900 text-slate-400' : 'hover:bg-slate-100 text-slate-600'
            }`}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================== */}
        {/* VISTA 1: ENTRAR (LOGIN DEFAULT)            */}
        {/* ========================================== */}
        {view === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="text-center space-y-1 mb-2">
              <h4 className="text-sm font-bold">Acesse sua Conta</h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs mx-auto`}>
                Veja seu histórico de visitas, agendamentos e negocie trocas de horários.
              </p>
            </div>

            {loginError && (
              <div className="p-2.5 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            {/* Inputs de Login */}
            <div className="space-y-3">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>E-mail</span>
                </label>
                <input 
                  type="email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="Seu e-mail cadastrado"
                  required
                  className={`w-full px-3 py-2 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Senha</span>
                </label>
                <input 
                  type="password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Sua senha"
                  required
                  className={`w-full px-3 py-2 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
                  }`}
                />
              </div>
            </div>

            {/* Botão de Envio de Login */}
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs rounded-[4px] transition uppercase tracking-wider font-['Poppins'] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Entrar</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Divisor */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800/40"></div>
              <span className="flex-shrink mx-3 text-[10px] text-slate-500 font-bold uppercase tracking-wider">ou</span>
              <div className="flex-grow border-t border-slate-800/40"></div>
            </div>

            {/* Botão Google (Caminho Principal sem fricção) */}
            <button
              type="button"
              onClick={handleGoogleLogin}
              className={`w-full py-2.5 rounded-[4px] border font-bold text-xs transition uppercase tracking-wider font-['Poppins'] flex items-center justify-center gap-2 cursor-pointer ${
                isDark 
                  ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-white' 
                  : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-900 shadow-2xs'
              }`}
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.18 1-.78 1.85-1.63 2.42v2.85h2.64c1.55-1.42 2.63-3.51 2.63-6.28z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-2.64-2.85c-.73.49-1.66.79-2.64.79-2.03 0-3.75-1.37-4.36-3.21H1.81v3c1.82 3.61 5.56 6.01 9.87 6.01z"/>
                <path fill="#FBBC05" d="M7.64 15.07c-.15-.49-.24-.97-.24-1.47s.09-1 .24-1.47v-3H1.81c-.5 1.01-.81 2.14-.81 3.47s.31 2.46.81 3.47l5.02-3.01z"/>
                <path fill="#EA4335" d="M12 5c1.62 0 3.08.56 4.22 1.66l3.16-3.16C17.45 1.68 14.96 1 12 1 7.69 1 3.95 3.4 2.13 7.01l5.02 3c.61-1.84 2.33-3.21 4.36-3.21z"/>
              </svg>
              <span>Continuar com Google</span>
            </button>

            {/* Link para o Cadastro */}
            <div className="pt-2 text-center text-[11px]">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Não tem uma conta? </span>
              <button
                type="button"
                onClick={() => {
                  hapticLight();
                  setView('register');
                }}
                className="text-emerald-400 hover:underline font-bold cursor-pointer"
              >
                Cadastre-se
              </button>
            </div>
          </form>
        )}

        {/* ========================================== */}
        {/* VISTA 2: CADASTRAR (REGISTRO)              */}
        {/* ========================================== */}
        {view === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3 animate-in fade-in duration-200">
            <div className="text-center space-y-1 mb-2">
              <h4 className="text-sm font-bold">Criar Nova Conta</h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs mx-auto`}>
                Inscreva-se com e-mail e ative as notificações.
              </p>
            </div>

            {registerError && (
              <div className="p-2.5 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{registerError}</span>
              </div>
            )}

            {/* Inputs de Cadastro */}
            <div className="space-y-2.5 overflow-y-auto max-h-[280px] pr-1 no-scrollbar">
              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Nome Completo</span>
                </label>
                <input 
                  type="text"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Seu nome completo"
                  required
                  className={`w-full px-3 py-1.5 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>E-mail</span>
                </label>
                <input 
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="exemplo@email.com"
                  required
                  className={`w-full px-3 py-1.5 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Confirmar E-mail</span>
                </label>
                <input 
                  type="email"
                  value={regConfirmEmail}
                  onChange={(e) => setRegConfirmEmail(e.target.value)}
                  placeholder="Confirme seu e-mail"
                  required
                  className={`w-full px-3 py-1.5 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Senha</span>
                </label>
                <input 
                  type="password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Crie uma senha forte"
                  required
                  className={`w-full px-3 py-1.5 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Celular / WhatsApp</span>
                </label>
                <input 
                  type="tel"
                  value={regPhone}
                  onChange={(e) => setRegPhone(formatPhone(e.target.value))}
                  placeholder="(11) 99999-9999"
                  required
                  className={`w-full px-3 py-1.5 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                    isDark 
                      ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400'
                  }`}
                />
              </div>
            </div>

            {/* Botão de Envio de Cadastro */}
            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs rounded-[4px] transition uppercase tracking-wider font-['Poppins'] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Cadastrar</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>

            {/* Link para o Login */}
            <div className="pt-2 text-center text-[11px] border-t border-slate-800/40">
              <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Já possui conta? </span>
              <button
                type="button"
                onClick={() => {
                  hapticLight();
                  setView('login');
                }}
                className="text-emerald-400 hover:underline font-bold cursor-pointer"
              >
                Entrar
              </button>
            </div>
          </form>
        )}

        {/* ========================================== */}
        {/* VISTA 3: FRICCÃO INTENCIONAL (VERIFICAÇÃO) */}
        {/* ========================================== */}
        {view === 'friction_verification' && (
          <form onSubmit={handleVerificationSubmit} className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1 mb-2">
              <h4 className="text-sm font-bold flex items-center justify-center gap-1.5 text-amber-400">
                <Sparkles className="w-4 h-4" />
                <span>Fricção de Segurança</span>
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs mx-auto leading-relaxed`}>
                Enviamos um código de segurança de 6 dígitos para o e-mail <strong>{regEmail}</strong> para evitar bots e cadastros falsos.
              </p>
            </div>

            {verificationError && (
              <div className="p-2.5 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{verificationError}</span>
              </div>
            )}

            <div className="space-y-1 text-center">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Código de 6 dígitos:
              </label>
              <input 
                type="text"
                maxLength={6}
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, ''))}
                placeholder="000000"
                required
                className={`w-32 mx-auto text-center px-3 py-2.5 rounded-[4px] text-lg font-bold font-mono tracking-[0.2em] border outline-hidden transition ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-650 focus:border-emerald-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
                }`}
              />
              <p className="text-[9px] text-slate-500 mt-1">Dica de demonstração: qualquer código de 6 dígitos</p>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs rounded-[4px] transition uppercase tracking-wider font-['Poppins'] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Verificar E-mail</span>
              <Check className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        )}

        {/* ========================================== */}
        {/* VISTA 4: PÓS-LOGIN SEGURANÇA (WHATSAPP)   */}
        {/* ========================================== */}
        {view === 'safety_whatsapp' && (
          <form onSubmit={handleWhatsappSubmit} className="space-y-4 animate-in fade-in duration-200">
            <div className="text-center space-y-1 mb-2">
              <h4 className="text-sm font-bold flex items-center justify-center gap-1.5 text-emerald-400">
                <MessageSquare className="w-4 h-4" />
                <span>WhatsApp de Contato</span>
              </h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs mx-auto leading-relaxed`}>
                Por segurança e para evitar o não-comparecimento (no-show), confirme o seu WhatsApp para recebimento de lembretes.
              </p>
            </div>

            {whatsappError && (
              <div className="p-2.5 rounded-[4px] bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{whatsappError}</span>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp</span>
              </label>
              <input 
                type="tel"
                value={whatsappPhone}
                onChange={(e) => setWhatsappPhone(formatPhone(e.target.value))}
                placeholder="(11) 99999-9999"
                required
                className={`w-full px-3 py-2 rounded-[4px] text-xs border outline-hidden transition font-semibold ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 text-white placeholder:text-slate-500 focus:border-emerald-500' 
                    : 'bg-slate-50 border-slate-200 text-slate-900 placeholder:text-slate-400 focus:border-emerald-500'
                }`}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs rounded-[4px] transition uppercase tracking-wider font-['Poppins'] cursor-pointer flex items-center justify-center gap-1.5"
            >
              <span>Confirmar WhatsApp</span>
              <Check className="w-3.5 h-3.5 text-white" />
            </button>
          </form>
        )}

        {/* ========================================== */}
        {/* VISTA 5: PÓS-LOGIN SEGURANÇA (NOTIFICAÇÃO) */}
        {/* ========================================== */}
        {view === 'safety_push' && (
          <div className="space-y-4 text-center animate-in fade-in duration-200">
            <div className="w-12 h-12 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mx-auto mb-1">
              <Bell className="w-6 h-6 animate-bounce" />
            </div>

            <div className="space-y-1">
              <h4 className="text-sm font-bold">Lembretes & Push</h4>
              <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'} max-w-xs mx-auto leading-relaxed`}>
                Ative as notificações para receber atualizações do seu agendamento em tempo real e não perder a sua vaga.
              </p>
            </div>

            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={handleRequestPushPermission}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 active:scale-[0.99] text-white font-bold text-xs rounded-[4px] transition uppercase tracking-wider font-['Poppins'] cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Check className="w-4 h-4 text-white stroke-[2.5]" />
                <span className="text-white">Ativar Notificações</span>
              </button>

              <button
                type="button"
                onClick={completeRegistration}
                className={`w-full py-2 rounded-[4px] border text-xs font-bold transition uppercase tracking-wider font-['Poppins'] cursor-pointer ${
                  isDark 
                    ? 'bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white' 
                    : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-500'
                }`}
              >
                Pular Etapa
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
