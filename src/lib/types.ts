export type Archetype = 'rajadas' | 'raiz' | 'zefiro' | 'eter';

export type CardType = 'creature' | 'spell';

export type PassiveTrigger = 'ultrapassagem' | 'pedagio' | 'fluxo_sereno' | 'mutacao';

export interface Card {
  id: string;
  name: string;
  speciesName?: string; // Espécie / título da criatura (ex: 'Guerreiro Lupino', 'Baluarte Ursídeo')
  weight: number; // Prioridade numérica a_i
  originalWeight: number;
  archetype: Archetype;
  type: CardType;
  owner: 'player1' | 'player2'; // 'player1' is Host / User, 'player2' is Guest / Bot
  flavor: string;
  illustration: string; // Identificador visual do personagem
  image?: string;
  passiveType?: PassiveTrigger;
  passiveValue: number; // Valor numérico do efeito (dano, cura, bônus)
  passiveDescription: string;
  // Spell specifics
  spellTarget?: 'self_slot' | 'adjacent_swap' | 'weight_buff' | 'weight_nerf' | 'weight_transmute';
}

export type Phase =
  | 'lobby'
  | 'deck_select'
  | 'seeding' // Colocação alternada de 4 criaturas por jogador nas 8 ilhas
  | 'alpha_window' // Janela de intervenção 1 (após Nichos T(2))
  | 'beta_window' // Janela de intervenção 2 (após Alas A e B)
  | 'executing' // Execução cinética passo a passo do Merge-and-Count
  | 'round_end'
  | 'match_end';

export type AlgorithmStepType =
  | 'divide_start' // O arquipélago parte em estratos
  | 'nicho_compare' // Comparação em T(2)
  | 'nicho_swap' // Inversão em T(2) com ultrapassagem
  | 'nicho_ordered' // Nicho já ordenado sem inversão
  | 'alpha_pause' // Janela de intervenção Alpha
  | 'merge_ala_start' // Início do merge das Alas Poente e Nascente
  | 'merge_ala_compare'
  | 'merge_ala_inversion' // Inversão em r_A ou r_B
  | 'merge_ala_pass' // Passagem serena
  | 'beta_pause' // Janela de intervenção Beta
  | 'vortex_start' // O Grande Vórtice O(n)
  | 'vortex_compare' // Ponteiro Aurora vs Ponteiro Ocaso
  | 'vortex_serene_pass' // a_i <= a_j -> Fluxo Sereno
  | 'vortex_burst_inversion' // a_j < a_i -> K inversões simultâneas!
  | 'round_resolution'; // Cálculo do dano total e impacto nos HPs

export interface StepTotals {
  damageP1: number;
  damageP2: number;
  healP1: number;
  healP2: number;
}

export interface AlgorithmStep {
  id: number;
  type: AlgorithmStepType;
  title: string;
  description: string;
  complexityNotation: string; // e.g. "T(2) = 1 comparação", "Merge Nível 2", "O(n) Vórtice Final"
  rA: number;
  rB: number;
  rCross: number;
  rTotal: number;
  // Dano e cura acumulados até este passo (inclusive)
  totals: StepTotals;
  // Estado completo do array no momento
  boardState: (Card | null)[];
  // Pointers ativos para visualização
  activePointers?: {
    auroraIndex?: number; // Ala A (i)
    ocasoIndex?: number; // Ala B (j)
    activePair?: [number, number];
  };
  // Destaque de animação
  eventPayload?: {
    swappedIndices?: [number, number];
    kInversions?: number;
    logText: string;
    damageP1?: number;
    damageP2?: number;
    healP1?: number;
    healP2?: number;
    finalDamageP1?: number;
    finalDamageP2?: number;
  };
}

export interface AlgorithmResumeOptions {
  startFrom: 'divide' | 'alpha' | 'beta';
  initialRA?: number;
  initialRB?: number;
  initialRCross?: number;
  initialDamageP1?: number;
  initialDamageP2?: number;
  initialHealP1?: number;
  initialHealP2?: number;
  initialStepCounter?: number;
}

export interface PlayerState {
  id: 'player1' | 'player2';
  name: string;
  hp: number;
  deckArchetype: Archetype;
  hand: Card[];
  spells: Card[];
  hasPlayedAlphaSpell: boolean;
  hasPlayedBetaSpell: boolean;
}

export interface NetworkMessage {
  type: 'join' | 'deck_select' | 'place_card' | 'cast_spell' | 'pass_window' | 'sync_state' | 'restart';
  player: 'player1' | 'player2';
  archetype?: Archetype;
  cardId?: string;
  slotIndex?: number;
  targetSlot?: number;
  windowType?: 'alpha' | 'beta';
  round?: number; // Rodada a que a jogada pertence (descarta/enfileira mensagens fora de hora)
  boardSnapshot?: (Card | null)[];
}
