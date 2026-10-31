export type Archetype = 'rajadas' | 'raiz' | 'zefiro' | 'eter';

export type CardType = 'creature' | 'spell';

export type PassiveTrigger = 'ultrapassagem' | 'pedagio' | 'fluxo_sereno' | 'mutacao';

export interface Card {
  id: string;
  name: string;
  speciesName?: string; // Espécie Anthro Furry (ex: 'Lupine Warrior', 'Holstaur Brawler', 'Catgirl Mystic')
  weight: number; // Prioridade numérica a_i
  originalWeight: number;
  archetype: Archetype;
  type: CardType;
  owner: 'player1' | 'player2'; // 'player1' is Host / User, 'player2' is Guest / Bot
  flavor: string;
  illustration: string; // SVG icon key or visual motif
  image?: string; // Caminho para a pintura do monstro anthro furry
  passiveType?: PassiveTrigger;
  passiveValue: number; // Valor numérico do efeito (dano, cura, bônus)
  passiveDescription: string;
  // Spell specifics
  spellTarget?: 'self_slot' | 'adjacent_swap' | 'weight_buff' | 'weight_nerf';
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
  boardState: (Card | null)[];
  activePointers?: {
    auroraIndex?: number;
    ocasoIndex?: number;
    activePair?: [number, number];
  };
  eventPayload?: {
    aggressor?: Card;
    victims?: Card[];
    swappedIndices?: [number, number];
    kInversions?: number;
    damageP1?: number;
    damageP2?: number;
    healP1?: number;
    healP2?: number;
    logText: string;
  };
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

export interface GameState {
  phase: Phase;
  round: number;
  turnPlayer: 'player1' | 'player2';
  slots: (Card | null)[]; // 8 slots no tabuleiro
  player1: PlayerState;
  player2: PlayerState;
  currentStepIndex: number;
  steps: AlgorithmStep[];
  isPlaying: boolean;
  playbackSpeed: number; // 1, 2, 4
  winner: 'player1' | 'player2' | 'draw' | null;
  rA: number;
  rB: number;
  rCross: number;
  rTotal: number;
  logHistory: string[];
}

export type NetworkMessage =
  | { type: 'HELLO'; playerName: string; deck: Archetype }
  | { type: 'START_GAME'; starter: 'player1' | 'player2' }
  | { type: 'PLACE_CARD'; cardId: string; slotIndex: number; player: 'player1' | 'player2' }
  | { type: 'CAST_SPELL'; spellId: string; targetSlot: number; window: 'alpha' | 'beta'; player: 'player1' | 'player2' }
  | { type: 'PASS_WINDOW'; window: 'alpha' | 'beta'; player: 'player1' | 'player2' }
  | { type: 'SYNC_STEP'; stepIndex: number }
  | { type: 'PLAY_PAUSE'; isPlaying: boolean; speed: number }
  | { type: 'RESTART_ROUND' };
