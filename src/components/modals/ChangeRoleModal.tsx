import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Shield } from 'lucide-react';
import { UserRole } from '../../types';
import { usePortal } from '../../context/PortalContext';

export interface UserForRoleChange {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  initials?: string;
  department?: string;
}

interface ChangeRoleModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  user?: UserForRoleChange | null;
  onConfirm?: (userId: string, newRole: UserRole) => void;
}

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
}

const ROLE_OPTIONS: RoleOption[] = [
  {
    role: 'TRAINEE',
    title: 'Trainee',
    description: 'Access to learning curricula, assessments, smart revision, and competency tracking.',
  },
  {
    role: 'TRAINER',
    title: 'Trainer',
    description: 'Author courses, create assessments, upload resources, and monitor assigned trainees.',
  },
  {
    role: 'ADMIN',
    title: 'Administrator',
    description: 'Full platform administration, user directory governance, and curriculum approvals.',
  },
];

export const ChangeRoleModal: React.FC<ChangeRoleModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
  user: propsUser,
  onConfirm: propsOnConfirm,
}) => {
  const portal = usePortal();

  const isOpen = propsIsOpen !== undefined ? propsIsOpen : portal.isChangeRoleOpen;
  const user = propsUser !== undefined ? propsUser : portal.roleChangeUser;
  const onClose = propsOnClose || (() => portal.setIsChangeRoleOpen(false));
  const onConfirm =
    propsOnConfirm ||
    ((userId: string, newRole: UserRole) => portal.updateUserRole(userId, newRole));

  const [selectedRole, setSelectedRole] = useState<UserRole>('TRAINEE');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setSelectedRole(user.role);
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleConfirm = () => {
    setIsSubmitting(true);
    onConfirm(user.id, selectedRole);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-70 overflow-y-auto flex items-center justify-center p-4"
        id="change-role-modal-root"
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        />

        {/* Modal Dialog */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 8 }}
          transition={{ duration: 0.18 }}
          className="relative bg-white rounded-2xl max-w-lg w-full p-7 shadow-2xl border border-slate-100 z-10"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shrink-0">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 leading-snug">
                  Change User Role
                </h3>
                <p className="text-sm text-slate-500 font-normal">
                  {user.name}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition"
              id="close-change-role-modal"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Current Role text */}
          <div className="mt-5 text-sm text-slate-600">
            Current role:{' '}
            <span className="font-bold text-slate-900 tracking-wide uppercase">
              {user.role}
            </span>
          </div>

          {/* Section label */}
          <div className="mt-4 mb-2.5 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            ASSIGN NEW ROLE
          </div>

          {/* Role Option Cards */}
          <div className="space-y-3">
            {ROLE_OPTIONS.map((opt) => {
              const isSelected = selectedRole === opt.role;

              return (
                <div
                  key={opt.role}
                  id={`role-option-${opt.role.toLowerCase()}`}
                  onClick={() => setSelectedRole(opt.role)}
                  className={`p-4 rounded-xl border transition cursor-pointer flex items-start gap-3.5 ${
                    isSelected
                      ? 'border-indigo-500 bg-white ring-1 ring-indigo-500'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  {/* Custom Radio Button */}
                  <div className="mt-0.5 shrink-0">
                    <div
                      className={`w-4 h-4 rounded-full flex items-center justify-center transition ${
                        isSelected
                          ? 'border-2 border-indigo-600'
                          : 'border border-slate-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 rounded-full bg-indigo-600" />
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="flex-1">
                    <div className="font-bold text-sm text-slate-900 leading-none mb-1.5">
                      {opt.title}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {opt.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer Actions */}
          <div className="mt-6 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              id="cancel-role-change-btn"
              className="px-5 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 border border-slate-200 rounded-xl transition"
            >
              Cancel
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirm}
              id="confirm-role-change-btn"
              className="px-5 py-2 text-sm font-semibold text-white bg-[#7C82F6] hover:bg-[#6B72F2] rounded-xl shadow-xs transition hover:opacity-95 disabled:opacity-50"
            >
              {isSubmitting ? 'Updating...' : 'Update Role'}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

