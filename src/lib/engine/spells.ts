import type { Card } from '../types';
import { cloneCards } from './inversions';

/**
 * Aplica uma fórmula alquímica sobre o tabuleiro e retorna um novo tabuleiro
 * (o original não é modificado). Regra única usada pelo jogador, pelo bot e
 * pela sincronização P2P.
 */
export function applySpell(board: (Card | null)[], spell: Card, targetSlot: number): (Card | null)[] {
  const next = cloneCards(board);
  const target = next[targetSlot];

  if (spell.spellTarget === 'weight_buff' && target) {
    target.weight += spell.passiveValue;
  } else if (spell.spellTarget === 'weight_nerf' && target) {
    target.weight = Math.max(1, target.weight + spell.passiveValue);
  } else if (spell.spellTarget === 'adjacent_swap') {
    const neighbor = targetSlot < next.length - 1 ? targetSlot + 1 : targetSlot - 1;
    const tmp = next[targetSlot];
    next[targetSlot] = next[neighbor];
    next[neighbor] = tmp;
  }

  return next;
}
