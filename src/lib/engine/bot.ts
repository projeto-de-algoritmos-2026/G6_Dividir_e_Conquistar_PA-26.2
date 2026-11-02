import type { Card, Archetype } from '../types';
import { generateAlgorithmSteps, cloneCards } from './inversions';
import { applySpell } from './spells';

export interface BotDecision {
  cardId: string;
  slotIndex: number;
}

export interface BotSpellDecision {
  shouldCast: boolean;
  spellId?: string;
  targetSlot?: number;
}

/**
 * Avalia o benefício de uma configuração de tabuleiro para o Jogador 2 (Bot).
 * Retorna uma pontuação heurística:
 * score = (dano infligido ao P1 + curas do P2) - (dano sofrido pelo P2)
 */
function evaluateBoardStateForBot(board: (Card | null)[], botArchetype: Archetype): number {
  // Se ainda houver slots nulos, preenche temporariamente com placeholders neutros
  const testBoard: (Card | null)[] = board.map((c, i) => {
    if (c) return c;
    return {
      id: `neutral_${i}`,
      name: 'Brisa Silvestre',
      weight: 10,
      originalWeight: 10,
      archetype: 'zefiro',
      type: 'creature',
      owner: i % 2 === 0 ? 'player1' : 'player2',
      flavor: 'Placeholder',
      illustration: 'breeze',
      passiveValue: 0,
      passiveDescription: ''
    };
  });

  const sim = generateAlgorithmSteps(testBoard);

  let score = sim.totalDamageP1 * 2 + sim.totalHealP2 - sim.totalDamageP2 * 2;

  // Ajustes de sinergia de arquétipo
  if (botArchetype === 'rajadas') {
    // Andarilhos adoram muitas inversões em rCross (Vórtice)
    score += sim.rCross * 2.5;
  } else if (botArchetype === 'raiz') {
    // Raiz adora pedágios ativados na Ala A
    score += (sim.rA + sim.rCross) * 1.5;
  } else if (botArchetype === 'zefiro') {
    // Zéfiro pontua mais por manter harmonia / poucas inversões e alto heal
    score += (20 - sim.rTotal) * 1.2 + sim.totalHealP2 * 2;
  }

  return score;
}

/**
 * Calcula a jogada ótima do Bot durante a fase de Semeadura.
 * Simulação gulosa rasa em todos os pares válidos (carta_da_mão, slot_vazio).
 */
export function calculateBestMove(
  hand: Card[],
  slots: (Card | null)[],
  botArchetype: Archetype
): BotDecision {
  const availableSlots: number[] = [];
  for (let i = 0; i < slots.length; i++) {
    if (!slots[i]) availableSlots.push(i);
  }

  if (availableSlots.length === 0 || hand.length === 0) {
    return { cardId: hand[0]?.id || '', slotIndex: 0 };
  }

  let bestScore = -Infinity;
  let bestCard = hand[0];
  let bestSlot = availableSlots[0];

  for (const card of hand) {
    for (const slotIdx of availableSlots) {
      // Simula colocar a carta no slot
      const candidateBoard = cloneCards(slots);
      candidateBoard[slotIdx] = { ...card, owner: 'player2' };

      // Heurísticas de posicionamento baseadas no arquétipo
      let bonusPositioning = 0;

      if (botArchetype === 'rajadas') {
        // Criaturas leves (1-5) brilham na Ala B (slots 4..7)
        if (slotIdx >= 4 && card.weight <= 5) {
          bonusPositioning += 8;
        }
      } else if (botArchetype === 'raiz') {
        // Baluartes pesados (16-25) ancoram na Ala A (slots 0..3)
        if (slotIdx <= 3 && card.weight >= 15) {
          bonusPositioning += 8;
        }
      } else if (botArchetype === 'zefiro') {
        // Zéfiro busca ordem crescente natural de peso pelo índice do slot
        const expectedWeight = 8 + slotIdx;
        const diff = Math.abs(card.weight - expectedWeight);
        bonusPositioning += Math.max(0, 10 - diff * 2);
      }

      const boardScore = evaluateBoardStateForBot(candidateBoard, botArchetype) + bonusPositioning;

      if (boardScore > bestScore) {
        bestScore = boardScore;
        bestCard = card;
        bestSlot = slotIdx;
      }
    }
  }

  return {
    cardId: bestCard.id,
    slotIndex: bestSlot
  };
}

/**
 * Decide se o bot deve lançar um feitiço de intervenção na Janela Alpha ou Beta.
 */
export function calculateSpellDecision(
  spells: Card[],
  board: (Card | null)[],
  botArchetype: Archetype,
  _window: 'alpha' | 'beta'
): BotSpellDecision {
  if (spells.length === 0) {
    return { shouldCast: false };
  }

  const baselineScore = evaluateBoardStateForBot(board, botArchetype);
  let bestSpell: Card | null = null;
  let bestTargetSlot = -1;
  let highestGain = 0;

  for (const spell of spells) {
    for (let slot = 0; slot < board.length; slot++) {
      const target = board[slot];
      if (!target) continue;

      const candidateBoard = applySpell(board, spell, slot);

      const score = evaluateBoardStateForBot(candidateBoard, botArchetype);
      const gain = score - baselineScore;

      if (gain > 3 && gain > highestGain) {
        highestGain = gain;
        bestSpell = spell;
        bestTargetSlot = slot;
      }
    }
  }

  if (bestSpell && bestTargetSlot !== -1) {
    return {
      shouldCast: true,
      spellId: bestSpell.id,
      targetSlot: bestTargetSlot
    };
  }

  return { shouldCast: false };
}
