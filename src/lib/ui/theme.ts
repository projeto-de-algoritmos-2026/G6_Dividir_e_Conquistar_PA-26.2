import type { Archetype, PassiveTrigger } from '../types';

type Emblem = 'sword' | 'shield' | 'leaf' | 'flask' | 'star';

export const ARCH_STYLE: Record<
  Archetype,
  { stripe: string; emblem: Emblem; icon: string; vigor: number; impeto: number; short: string }
> = {
  rajadas: { stripe: '#6cc8e8', emblem: 'sword', icon: 'bolt', vigor: 28, impeto: 95, short: 'Matilha' },
  raiz: { stripe: '#9a6b4b', emblem: 'shield', icon: 'shield', vigor: 96, impeto: 22, short: 'Baluartes' },
  zefiro: { stripe: '#e48bb0', emblem: 'leaf', icon: 'leaf', vigor: 62, impeto: 58, short: 'Santuário' },
  eter: { stripe: '#9a6be0', emblem: 'flask', icon: 'flask', vigor: 48, impeto: 78, short: 'Guilda' }
};

export const PASSIVE_STYLE: Record<PassiveTrigger, { icon: string; bg: string; label: string }> = {
  ultrapassagem: { icon: 'bolt', bg: '#f08a3c', label: 'Ultrapassagem' },
  pedagio: { icon: 'shield', bg: '#4459ad', label: 'Pedágio' },
  fluxo_sereno: { icon: 'leaf', bg: '#45c552', label: 'Fluxo Sereno' },
  mutacao: { icon: 'flask', bg: '#9a6be0', label: 'Mutação' }
};

export const OWNER_STYLE = {
  player1: { bg: '#4459ad', label: 'P1' },
  player2: { bg: '#b8492f', label: 'P2' }
} as const;

export function ordinalPt(n: number): string {
  return `${n}ª`;
}
