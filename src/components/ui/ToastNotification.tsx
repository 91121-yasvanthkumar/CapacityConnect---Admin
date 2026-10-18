import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, ShieldCheck, Info, AlertTriangle, X } from 'lucide-react';
import { usePortal } from '../../context/PortalContext';

export const ToastNotification: React.FC = () => {
  const {
    toastNotification,
    setToastNotification,
    notificationAlert,
    setNotificationAlert,
  } = usePortal();

  // If there's an alert string but no toastNotification object yet, create a fallback view
  const currentToast = toastNotification || (notificationAlert ? {
    id: 'legacy-alert',
    message: notificationAlert,
    title: 'System Notification',
    type: 'success' as const,
  } : null);

  const handleDismiss = () => {
    setToastNotification(null);
    setNotificationAlert(null);
  };

  if (!currentToast) return null;

  const isRoleUpdate =
    currentToast.title?.toLowerCase().includes('role') ||
    currentToast.message.toLowerCase().includes('role');

  return (
    <div
      className="fixed top-6 right-6 z-[9999] pointer-events-none max-w-md w-full sm:w-auto"
      id="toast-notification-container"
    >
      <AnimatePresence mode="wait">
        {currentToast && (
          <motion.div
            key={currentToast.id || currentToast.message}
            initial={{ opacity: 0, y: -24, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.94 }}
            transition={{ type: 'spring', damping: 26, stiffness: 360 }}
            className="pointer-events-auto flex items-start gap-3.5 px-5 py-4 bg-[#ecfdf5] text-[#064e3b] rounded-2xl shadow-xl shadow-emerald-950/15 border border-[#a7f3d0] min-w-[320px] max-w-md mx-4 sm:mx-0 backdrop-blur-xs"
            id="toast-notification"
            role="status"
            aria-live="polite"
          >
            {/* Icon */}
            <div className="w-9 h-9 rounded-xl bg-emerald-100/90 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5 shadow-xs border border-emerald-200/60">
              {isRoleUpdate ? (
                <ShieldCheck className="w-5 h-5 text-[#047857] stroke-[2.3]" />
              ) : currentToast.type === 'warning' ? (
                <AlertTriangle className="w-5 h-5 text-amber-600 stroke-[2.3]" />
              ) : currentToast.type === 'info' ? (
                <Info className="w-5 h-5 text-blue-600 stroke-[2.3]" />
              ) : (
                <CheckCircle2 className="w-5 h-5 text-[#047857] stroke-[2.3]" />
              )}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0 pr-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-800">
                  {currentToast.title || 'System Notification'}
                </span>
                {currentToast.badge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200/80 text-emerald-900 border border-emerald-300">
                    {currentToast.badge}
                  </span>
                )}
              </div>
              <p className="text-xs font-semibold text-slate-800 mt-1 leading-relaxed">
                {currentToast.message}
              </p>
            </div>

            {/* Dismiss Button */}
            <button
              onClick={handleDismiss}
              id="toast-dismiss-btn"
              className="text-emerald-800/60 hover:text-emerald-950 p-1.5 hover:bg-emerald-100/70 rounded-lg transition shrink-0 -mr-1 cursor-pointer"
              aria-label="Dismiss notification"
              title="Dismiss"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
