import { inject, computed } from '@angular/core';
import { signalStore, withState, withMethods, withComputed, patchState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

export interface Role {
  id: number;
  name: string;
}

const STORAGE_KEY = 'role';
const DEFAULT_ROLE: Role = { id: 1, name: 'client' };

export interface RoleState {
  role: Role;
}

function isRole(value: unknown): value is Role {
  return !!value
    && typeof (value as any).id === 'number'
    && typeof (value as any).name === 'string';
}

function loadRole(): Role {
  const storedJson = sessionStorage.getItem(STORAGE_KEY);
  if (!storedJson) return DEFAULT_ROLE;
  try {
    const parsedRole = JSON.parse(storedJson);
    return isRole(parsedRole) ? parsedRole : DEFAULT_ROLE;
  } catch {
    return DEFAULT_ROLE;
  }
}

function saveRole(role: Role) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(role));
}

function writeRoleToStorage(role: Role) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(role));
}

const initialState: RoleState = {
    role: loadRole(),
};

export const UserRole = signalStore(
    { providedIn: 'root' },
    withState(initialState),
  
    withComputed(({ role }) => ({
        isEmployee: computed(() => role().name === 'employee'),
        dashboardPath: computed(() => (role().name === 'employee' ? '/funcionario' : '/cliente')),
    })),
);