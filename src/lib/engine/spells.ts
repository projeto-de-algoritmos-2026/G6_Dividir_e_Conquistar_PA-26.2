import type { Card } from '../types';
import { cloneCards } from './inversions';

/** Rótulo curto do efeito de uma fórmula (ex.: "+4", "-3", "±5", "Swap"). */
export function spellEffectLabel(spell: Card): string {
  if (spell.spellTarget === 'adjacent_swap') return 'Swap';
  if (spell.spellTarget === 'weight_transmute') return `±${spell.passiveValue}`;
  return spell.passiveValue > 0 ? `+${spell.passiveValue}` : `${spell.passiveValue}`;
}

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
  } else if (spell.spellTarget === 'weight_transmute' && target) {
    // Mesma lógica da passiva Mutação: leves engordam, pesadas emagrecem
    target.weight = target.weight <= 10 ? target.weight + spell.passiveValue : Math.max(1, target.weight - spell.passiveValue);
  } else if (spell.spellTarget === 'adjacent_swap') {
    const neighbor = targetSlot < next.length - 1 ? targetSlot + 1 : targetSlot - 1;
    const tmp = next[targetSlot];
    next[targetSlot] = next[neighbor];
    next[neighbor] = tmp;
  }

  return next;
}
