import type { Archetype, Card } from '../types';

export interface ArchetypeMeta {
  id: Archetype;
  name: string;
  species: string;
  subtitle: string;
  description: string;
  weightRange: string;
  themeColor: string;
  badgeBg: string;
  accentBorder: string;
  quote: string;
  artKey: string;
  image: string;
}

export const ARCHETYPES: Record<Archetype, ArchetypeMeta> = {
  rajadas: {
    id: 'rajadas',
    name: 'Matilha dos Ventos & Harpias',
    species: 'Lupinos & Harpias',
    subtitle: 'Burst de Inversão & Rapidez Eólica',
    description: 'Guerreiros velozes e ágeis de pelagem cinzenta e asas eólicas (pesos 1 a 5). Quando posicionados na Ala Nascente, rasgam os céus e atropelam múltiplas cartas de uma vez no Grande Vórtice.',
    weightRange: '1 - 5',
    themeColor: 'text-amber-400',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-600/60',
    accentBorder: 'border-amber-500 shadow-amber-500/30',
    quote: '"O uivo dos ventos anuncia o avanço antes mesmo do primeiro golpe."',
    artKey: 'wolf_leader',
    image: '/assets/cards/wolf.jpg'
  },
  raiz: {
    id: 'raiz',
    name: 'Baluartes da Terra & Ursídeos',
    species: 'Titãs Ursídeos & Defensores',
    subtitle: 'Pedágio Pesado & Resistência de Espinhos',
    description: 'Guardiões maciços e corpulentos (pesos 16 a 25) ancorados na Ala Poente. Equipados com ombreiras titânicas de bronze e marretas de carvalho rúnico, devolvem dano massivo em retaliação a qualquer invasor que tente saltá-los.',
    weightRange: '16 - 25',
    themeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60',
    accentBorder: 'border-emerald-600 shadow-emerald-600/30',
    quote: '"Nenhum vendaval verga quem tem a terra e as raízes no coração."',
    artKey: 'bear',
    image: '/assets/cards/bear.jpg'
  },
  zefiro: {
    id: 'zefiro',
    name: 'Santuário dos Felinos & Draconianos',
    species: 'Felinos & Draconianos',
    subtitle: 'Harmonia Perfeita & Fluxo Sereno',
    description: 'Místicas felinas e nobres guerreiras de escamas carmesim (pesos 8 a 14). Deslizam em harmonia sem atritos, recompensando a ordem algorítmica estrita com cura constante e golpes harmônicos puros.',
    weightRange: '8 - 14',
    themeColor: 'text-sky-300',
    badgeBg: 'bg-sky-950/80 text-sky-200 border-sky-600/60',
    accentBorder: 'border-sky-500 shadow-sky-500/30',
    quote: '"Na quietude do fluxo laminar, o sopro celestial cura todas as feridas."',
    artKey: 'cat_mystic',
    image: '/assets/cards/cat.jpg'
  },
  eter: {
    id: 'eter',
    name: 'Guilda das Raposas Alquímicas',
    species: 'Feiticeiras Kitsune & Alquimistas',
    subtitle: 'Mutação Numérica & Alquimia Arcana',
    description: 'Raposas místicas de múltiplas caudas flamejantes e alquimistas arcanos. Ao sofrerem inversões nos níveis iniciais, transmutam seus próprios pesos numéricos e invertem a lógica do combate.',
    weightRange: 'Variável',
    themeColor: 'text-purple-300',
    badgeBg: 'bg-purple-950/80 text-purple-200 border-purple-600/60',
    accentBorder: 'border-purple-500 shadow-purple-500/30',
    quote: '"Uma gota de Azoth e até a mais sólida equação se desfaz."',
    artKey: 'kitsune_alchemist',
    image: '/assets/cards/kitsune.jpg'
  }
};

export const CARD_CATALOG: Card[] = [
  // --- MATILHA DOS VENTOS (Pesos 1-5, Lupinos & Harpias) ---
  {
    id: 'fenrir_wolf',
    name: 'Fenrir, Lâmina Lupina',
    speciesName: 'Guerreiro Lupino',
    weight: 1,
    originalWeight: 1,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Guerreiro lobo com cicatrizes de batalha e manto azul celeste, salta com agilidade sobrenatural.',
    illustration: 'wolf',
    image: '/assets/cards/wolf.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 3,
    passiveDescription: 'Salto Lupino: Causa 3 de dano direto para cada carta ultrapassada no merge.'
  },
  {
    id: 'aria_harpy',
    name: 'Aria, Harpia dos Céus',
    speciesName: 'Harpia Celeste',
    weight: 2,
    originalWeight: 2,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Harpia de plumagem dourada e óculos de aviadora, fende as térmicas em rasantes velozes.',
    illustration: 'harpy',
    image: '/assets/cards/harpy.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: 'Golpe de Asas: Causa 2 de dano por carta ultrapassada.'
  },
  {
    id: 'lyca_scout',
    name: 'Lyca, Patrulheira Ágil',
    speciesName: 'Batedora Lupina',
    weight: 3,
    originalWeight: 3,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Rastreia correntes térmicas com agilidade incomparável e lâminas curtas afiadas.',
    illustration: 'wolf',
    image: '/assets/cards/wolf.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: 'Investida Eólica: Causa 2 de dano ao realizar uma ultrapassagem.'
  },
  {
    id: 'siren_falcon',
    name: 'Sirena das Nuvens',
    speciesName: 'Cantora Celeste',
    weight: 4,
    originalWeight: 4,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Seu canto ressonante corta o ar e desestabiliza as defesas inimigas durante o avanço.',
    illustration: 'harpy',
    image: '/assets/cards/harpy.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: 'Canto Perfurante: Causa 2 de dano ao ultrapassar posições.'
  },
  {
    id: 'storm_wolf',
    name: 'Uivo da Tempestade',
    speciesName: 'Rastreador Lupino',
    weight: 5,
    originalWeight: 5,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Acelera a vanguarda com um uivo tempestuoso que ecoa pelas ilhas celestes.',
    illustration: 'wolf',
    image: '/assets/cards/wolf.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 1,
    passiveDescription: 'Ultrapassagem: Causa 1 de dano por ultrapassagem executada.'
  },

  // --- BALUARTES DA TERRA (Pesos 16-25, Bovinos & Ursídeos) ---
  {
    id: 'brena_holstaur',
    name: 'Brena, Guardiã Sagrada',
    speciesName: 'Matriarca Bovina',
    weight: 24,
    originalWeight: 24,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Guardiã serena de marreta rúnica ancestral envolta em musgo sagrado e sino de latão.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur.jpg',
    passiveType: 'pedagio',
    passiveValue: 3,
    passiveDescription: 'Marreta Rúnica: Retalia com 3 de dano contra qualquer unidade que tente saltá-la.'
  },
  {
    id: 'korgn_bear',
    name: 'Korgn, Titã dos Rochedos',
    speciesName: 'Defensor Ursídeo',
    weight: 20,
    originalWeight: 20,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Guerreiro maciço com ombreiras cravadas de bronze e martelo forjado na rocha matriz.',
    illustration: 'bear',
    image: '/assets/cards/bear.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Couraça de Bronze: Causa 2 de dano de esmagamento ao ser ultrapassado.'
  },
  {
    id: 'ursula_matron',
    name: 'Ursula, Protetora dos Vales',
    speciesName: 'Paladina Bovina',
    weight: 18,
    originalWeight: 18,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Seu escudo de carvalho maciço absorve o choque de ventos turbulentos sem ceder um centímetro.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Barreira Viva: Retalia com 2 de dano a cada ultrapassagem sofrida.'
  },
  {
    id: 'ursine_brawler',
    name: 'Guardião dos Bosques',
    speciesName: 'Combatente Ursídeo',
    weight: 16,
    originalWeight: 16,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Garras densas e couraça de casca de carvalho entrelaçada que cobram pedágio de saltadores.',
    illustration: 'bear',
    image: '/assets/cards/bear.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Espinhos Terrestres: Drena 2 de vida ao ser ultrapassado.'
  },

  // --- SANTUÁRIO DOS FELINOS & DRACONIANOS (Pesos 8-14, Felinos & Draconianos) ---
  {
    id: 'elara_cat',
    name: 'Elara, Mística da Harmonia',
    speciesName: 'Mística Felina',
    weight: 9,
    originalWeight: 9,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Sacerdotisa serena com quimono celeste, cetro de cristal aéreo e movimentos fluidos.',
    illustration: 'cat',
    image: '/assets/cards/cat.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 4,
    passiveDescription: 'Bênção Laminar: Se entrar na fila ordenada sem atrito, regenera 4 HP do invocador.'
  },
  {
    id: 'kallista_dragon',
    name: 'Kallista, Valquíria Draconiana',
    speciesName: 'Valquíria Draconiana',
    weight: 11,
    originalWeight: 11,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Guerreira de escamas carmesim nobres, lança dourada e disciplina marcial impecável.',
    illustration: 'dragon',
    image: '/assets/cards/dragon.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 3,
    passiveDescription: 'Lança Harmônica: Se avançar sem causar inversão, canaliza 3 de dano puro no oponente.'
  },
  {
    id: 'neko_healer',
    name: 'Mia, Tece-Névoas',
    speciesName: 'Clériga Felina',
    weight: 13,
    originalWeight: 13,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Move-se em passos almofadados e suaves, purificando a atmosfera de atritos e turbulências.',
    illustration: 'cat',
    image: '/assets/cards/cat.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 3,
    passiveDescription: 'Fluxo Sereno: Regenera 3 HP e purifica o arquipélago ao passar sem inversão.'
  },
  {
    id: 'dragon_sentinel',
    name: 'Sentinela Draconiana',
    speciesName: 'Sentinela Draconiano',
    weight: 8,
    originalWeight: 8,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Olhar penetrante que mantém a ordem geométrica dos ventos e anula o caos.',
    illustration: 'dragon',
    image: '/assets/cards/dragon.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 2,
    passiveDescription: 'Ordem Celeste: Causa 2 de dano e restaura 2 HP se avançar serenamente.'
  },

  // --- GUILDA DAS RAPOSAS ALQUÍMICAS (Mutação, Kitsune & Alquimia) ---
  {
    id: 'kael_kitsune',
    name: 'Vixen, Alquimista Kitsune',
    speciesName: 'Feiticeira Kitsune',
    weight: 7,
    originalWeight: 7,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Raposa mística de caudas flamejantes em fogo violeta, óculos arcanos e frasco de Azoth primordial.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune.jpg',
    passiveType: 'mutacao',
    passiveValue: 6,
    passiveDescription: 'Transmutação de Azoth: Ao sofrer inversão no Nível 1 ou 2, transmuta seu peso para 21 ou 3!'
  },
  {
    id: 'vulpine_brewer',
    name: 'Renard, Mestre do Éter',
    speciesName: 'Mestre Alquimista',
    weight: 6,
    originalWeight: 6,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Manipula tubos de ensaio de bronze capazes de inverter as leis de gravidade e peso relativo.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune.jpg',
    passiveType: 'mutacao',
    passiveValue: 4,
    passiveDescription: 'Vapor Químico: Se for ultrapassado, libera vapores arcanos que causam 4 de dano mútuo.'
  },
  {
    id: 'shadow_vixen',
    name: 'Vixen das Miragens',
    speciesName: 'Ilusionista Kitsune',
    weight: 15,
    originalWeight: 15,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Projeta cópias ilusórias e transmuta pesos numéricos com qualquer unidade adjacente.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune.jpg',
    passiveType: 'mutacao',
    passiveValue: 3,
    passiveDescription: 'Troca de Ilusão: Troca seu peso com a criatura à direita caso sofra inversão.'
  },
  {
    id: 'fennec_apprentice',
    name: 'Aprendiz Fennec',
    speciesName: 'Nômade Arcano',
    weight: 10,
    originalWeight: 10,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Pequena criatura curiosa de grandes orelhas que altera fórmulas alquímicas nas janelas de pausa.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune.jpg',
    passiveType: 'mutacao',
    passiveValue: 3,
    passiveDescription: 'Fórmula Instável: Altera aleatoriamente em +3 ou -3 seu próprio peso ao ser posicionado.'
  }
];

// Spells de intervenção com temática de Alquimia e Aeromancia
export const SPELL_CATALOG: Card[] = [
  {
    id: 'spell_gust',
    name: 'Fole dos Ventos',
    speciesName: 'Feitiço de Aeromancia',
    weight: 0,
    originalWeight: 0,
    archetype: 'rajadas',
    type: 'spell',
    owner: 'player1',
    flavor: 'Uma rajada de ar concentrada que desloca unidades e força uma nova permutação.',
    illustration: 'wolf',
    image: '/assets/cards/wolf.jpg',
    passiveValue: 1,
    passiveDescription: 'Intervenção: Permuta uma criatura com sua vizinha imediata no arquipélago.',
    spellTarget: 'adjacent_swap'
  },
  {
    id: 'spell_nectar',
    name: 'Néctar de Mandrágora',
    speciesName: 'Feitiço Herbalista',
    weight: 0,
    originalWeight: 0,
    archetype: 'raiz',
    type: 'spell',
    owner: 'player1',
    flavor: 'Seiva densa colhida nas raízes antigas que adiciona peso e endurece as defesas.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur.jpg',
    passiveValue: 4,
    passiveDescription: 'Intervenção: Concede +4 de peso à criatura alvo, fortificando seu Pedágio.',
    spellTarget: 'weight_buff'
  },
  {
    id: 'spell_feather',
    name: 'Pluma do Vento Solar',
    speciesName: 'Feitiço da Harmonia',
    weight: 0,
    originalWeight: 0,
    archetype: 'zefiro',
    type: 'spell',
    owner: 'player1',
    flavor: 'Alivia a gravidade de uma criatura para garantir passagem laminar sem atrito.',
    illustration: 'cat',
    image: '/assets/cards/cat.jpg',
    passiveValue: -3,
    passiveDescription: 'Intervenção: Reduz em 3 o peso da unidade alvo (mínimo 1).',
    spellTarget: 'weight_nerf'
  },
  {
    id: 'spell_elixir',
    name: 'Elixir de Azoth',
    speciesName: 'Feitiço Alquímico',
    weight: 0,
    originalWeight: 0,
    archetype: 'eter',
    type: 'spell',
    owner: 'player1',
    flavor: 'Substância alquímica pura que desestabiliza completamente os pesos relativos.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune.jpg',
    passiveValue: 5,
    passiveDescription: 'Intervenção: Transmuta o peso do alvo: +5 se for até 10, senão −5 (mínimo 1).',
    spellTarget: 'weight_transmute'
  }
];

export function buildDeckHand(archetype: Archetype, owner: 'player1' | 'player2'): { creatures: Card[]; spells: Card[] } {
  const primaryCreatures = CARD_CATALOG.filter(c => c.archetype === archetype && c.type === 'creature');
  const otherCreatures = CARD_CATALOG.filter(c => c.archetype !== archetype && c.type === 'creature');

  const selectedCreatures = [
    ...primaryCreatures,
    ...otherCreatures.slice(0, 2)
  ].slice(0, 6);

  // IDs determinísticos: os dois clientes P2P montam decks idênticos a partir do arquétipo
  const creatures: Card[] = selectedCreatures.map((c, idx) => ({
    ...c,
    id: `${owner}_${c.id}_${idx}`,
    owner
  }));

  // Fórmula assinatura do arquétipo + a fórmula seguinte do catálogo (circular)
  const signatureIdx = SPELL_CATALOG.findIndex(s => s.archetype === archetype);
  const spellPool = [SPELL_CATALOG[signatureIdx], SPELL_CATALOG[(signatureIdx + 1) % SPELL_CATALOG.length]];

  const spells: Card[] = spellPool.map((s, idx) => ({
    ...s,
    id: `${owner}_${s.id}_${idx}`,
    owner
  }));

  return { creatures, spells };
}
