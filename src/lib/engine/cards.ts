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
    name: 'Matilha dos Lobos & Harpias do Vento',
    species: 'Lupine & Harpy Anthro',
    subtitle: 'Burst de Inversão Direita & Swiftness',
    description: 'Monstros caninos e aviários anthro de pelagem cinzenta e asas eólicas (pesos 1 a 5). Quando jogados na Ala Nascente (B), rasgam o ar com garras velozes e atropelam até 4 cartas de uma vez no Grande Vórtice.',
    weightRange: '1 - 5',
    themeColor: 'text-amber-400',
    badgeBg: 'bg-amber-950/80 text-amber-300 border-amber-600/60',
    accentBorder: 'border-amber-500 shadow-amber-500/30',
    quote: '"O uivo dos ventos anuncia a caçada antes mesmo do primeiro golpe."',
    artKey: 'wolf_leader',
    image: '/assets/cards/wolf_anthro.jpg'
  },
  raiz: {
    id: 'raiz',
    name: 'Baluartes Holstaur & Ursídeos',
    species: 'Bovine Holstaur & Bear Anthro',
    subtitle: 'Pedágio Pesado de Esquerda & Thorns',
    description: 'Guerreiras e titãs anthro corpulentos (pesos 16 a 25) ancorados na Ala Poente (A). Com armaduras de latão e marretas de madeira musgosa, devolvem dano massivo em espinhos a invasores.',
    weightRange: '16 - 25',
    themeColor: 'text-emerald-400',
    badgeBg: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/60',
    accentBorder: 'border-emerald-600 shadow-emerald-600/30',
    quote: '"Nenhum vento verga quem tem a terra e as raízes no coração."',
    artKey: 'holstaur_matriarch',
    image: '/assets/cards/holstaur_anthro.jpg'
  },
  zefiro: {
    id: 'zefiro',
    name: 'Santuário dos Felinos & Draconianos',
    species: 'Feline & Draconian Anthro',
    subtitle: 'Ordem Harmônica & Fluxo Sereno',
    description: 'Místicas felinas e draconianas com caudas sinuosas e escamas carmesim nobres (pesos 8 a 14). Deslizam em harmonia sem atritos, recompensando a ordem algorítmica com cura abundante e golpes harmônicos puros.',
    weightRange: '8 - 14',
    themeColor: 'text-sky-300',
    badgeBg: 'bg-sky-950/80 text-sky-200 border-sky-600/60',
    accentBorder: 'border-sky-500 shadow-sky-500/30',
    quote: '"Na quietude do fluxo laminar, o sopro celestial cura todas as feridas."',
    artKey: 'cat_mystic',
    image: '/assets/cards/cat_anthro.jpg'
  },
  eter: {
    id: 'eter',
    name: 'Guilda das Raposas Alquímicas',
    species: 'Kitsune & Vulpine Shifter Anthro',
    subtitle: 'Mutação de Invariante & Transmutação',
    description: 'Raposas anthro místicas de múltiplas caudas flamejantes e óculos de alquimia. Ao sofrerem inversões no Nível 1 ou 2, transmutam seus próprios pesos numéricos e invertem a ordem.',
    weightRange: 'Variável',
    themeColor: 'text-purple-300',
    badgeBg: 'bg-purple-950/80 text-purple-200 border-purple-600/60',
    accentBorder: 'border-purple-500 shadow-purple-500/30',
    quote: '"Uma pitada de Azoth e até a mais sólida equação se desfaz."',
    artKey: 'kitsune_alchemist',
    image: '/assets/cards/kitsune_anthro.jpg'
  }
};

export const CARD_CATALOG: Card[] = [
  // --- MATILHA DOS LOBOS DO VENTO (Pesos 1-5, Anthro Lupine & Harpy) ---
  {
    id: 'fenrir_wolf',
    name: 'Fenrir, Lâmina Lupina',
    speciesName: 'Wolf Anthro Warrior',
    weight: 1,
    originalWeight: 1,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Guerreiro lobo com cicatrizes de batalha e manto azul celeste, salta com agilidade sobrenatural.',
    illustration: 'wolf',
    image: '/assets/cards/wolf_anthro.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 3,
    passiveDescription: 'Salto Lupino: Causa 3 de dano direto para cada carta ultrapassada no merge.'
  },
  {
    id: 'aria_harpy',
    name: 'Aria, Harpia dos Céus',
    speciesName: 'Harpy Avian Anthro',
    weight: 2,
    originalWeight: 2,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Harpia de plumagem dourada e óculos de aviadora, fende as térmicas em rasantes velozes.',
    illustration: 'harpy',
    image: '/assets/cards/harpy_anthro.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: 'Wing Beat: Causa 2 de dano por carta ultrapassada.'
  },
  {
    id: 'lyca_scout',
    name: 'Lyca, Patrulheira Canina',
    speciesName: 'Lupine Scout Anthro',
    weight: 3,
    originalWeight: 3,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Rastreia térmicas e correntes de ar montanhosas com olfato apurado e adagas velozes.',
    illustration: 'wolf',
    image: '/assets/cards/wolf_anthro.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: 'Investida Eólica: Causa 2 de dano e ganha asas de outono.'
  },
  {
    id: 'siren_falcon',
    name: 'Sirena das Nuvens',
    speciesName: 'Avian Harpy Singer',
    weight: 4,
    originalWeight: 4,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Seu canto afiado desconcentra os guardiões adversários enquanto avança.',
    illustration: 'harpy',
    image: '/assets/cards/harpy_anthro.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 2,
    passiveDescription: "Siren's Call: Causa 2 de dano perfurante ao ultrapassar."
  },
  {
    id: 'storm_wolf',
    name: 'Uivo da Tempestade',
    speciesName: 'Wolf Stalker Anthro',
    weight: 5,
    originalWeight: 5,
    archetype: 'rajadas',
    type: 'creature',
    owner: 'player1',
    flavor: 'Acelera a matilha com um uivo ressonante que reverbera pelas docas flutuantes.',
    illustration: 'wolf',
    image: '/assets/cards/wolf_anthro.jpg',
    passiveType: 'ultrapassagem',
    passiveValue: 1,
    passiveDescription: 'Ultrapassagem: Causa 1 de dano por ultrapassagem.'
  },

  // --- BALUARTES HOLSTAUR & URSÍDEOS (Pesos 16-25, Anthro Bovine & Bear) ---
  {
    id: 'brena_holstaur',
    name: 'Brena, Guardiã Holstaur',
    speciesName: 'Holstaur Cow Anthro',
    weight: 24,
    originalWeight: 24,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Moça-touro de pelagem malhada macia, trança florida e marreta de tronco ancestral com musgo sagrado.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur_anthro.jpg',
    passiveType: 'pedagio',
    passiveValue: 3,
    passiveDescription: 'Marreta de Musgo: Retalia com 3 de dano contra quem tentar saltar sobre ela.'
  },
  {
    id: 'korgn_bear',
    name: 'Korgn, Urso dos Rochedos',
    speciesName: 'Grizzly Bear Anthro Tank',
    weight: 20,
    originalWeight: 20,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Urso imponente em couraça pesada de latão com cravos afiados e martelo rúnico forjado nas ilhas.',
    illustration: 'bear',
    image: '/assets/cards/bear_anthro.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Armadura Cravada: Causa 2 de dano de esmagamento ao ser ultrapassado.'
  },
  {
    id: 'ursula_matron',
    name: 'Ursula, Protetora da Pradaria',
    speciesName: 'Bovine Holstaur Paladin',
    weight: 18,
    originalWeight: 18,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Seu escudo de carvalho maciço bloqueia vendavais inteiros com serenidade maternal.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur_anthro.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Pedágio: Retalia com 2 de dano a cada ultrapassagem sofrida.'
  },
  {
    id: 'ursine_brawler',
    name: 'Lutador dos Bosques',
    speciesName: 'Bear Anthro Defender',
    weight: 16,
    originalWeight: 16,
    archetype: 'raiz',
    type: 'creature',
    owner: 'player1',
    flavor: 'Garras densas e casca de árvore entrelaçada para imobilizar saltadores aéreos.',
    illustration: 'bear',
    image: '/assets/cards/bear_anthro.jpg',
    passiveType: 'pedagio',
    passiveValue: 2,
    passiveDescription: 'Pedágio: Drena 2 de vida ao ser saltado.'
  },

  // --- SANTUÁRIO DOS FELINOS & DRACONIANOS (Pesos 8-14, Anthro Cat & Dragon) ---
  {
    id: 'elara_cat',
    name: 'Elara, Mística Felina',
    speciesName: 'Feline Cat Anthro',
    weight: 9,
    originalWeight: 9,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Sacerdotisa gata de pelagem dourada sedosa, longas fitas com guizos de latão e cetro de cristal aéreo.',
    illustration: 'cat',
    image: '/assets/cards/cat_anthro.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 4,
    passiveDescription: 'Bênção Laminar: Se entrar na fila ordenada sem atrito, cura 4 HP do invocador.'
  },
  {
    id: 'kallista_dragon',
    name: 'Kallista, Valquíria Draconiana',
    speciesName: 'Dragon Anthro Warrior',
    weight: 11,
    originalWeight: 11,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Draconiana de escamas carmesim, asas de dragão, lança dourada e disciplina marcial impecável.',
    illustration: 'dragon',
    image: '/assets/cards/dragon_anthro.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 3,
    passiveDescription: 'Lança Harmônica: Se avançar sem inversões, canaliza 3 de dano puro no adversário.'
  },
  {
    id: 'neko_healer',
    name: 'Mia, Tece-Névoas Felina',
    speciesName: 'Catgirl Cleric Anthro',
    weight: 13,
    originalWeight: 13,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Move-se em passos almofadados silenciosos, purificando a atmosfera dos estratos.',
    illustration: 'cat',
    image: '/assets/cards/cat_anthro.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 3,
    passiveDescription: 'Fluxo Sereno: Cura 3 HP e purifica o tabuleiro se passar sem atrito.'
  },
  {
    id: 'dragon_sentinel',
    name: 'Sentinela Draconiana',
    speciesName: 'Dragon Anthro Guard',
    weight: 8,
    originalWeight: 8,
    archetype: 'zefiro',
    type: 'creature',
    owner: 'player1',
    flavor: 'Seu olhar draconiano impõe ordem matemática aos ventos turbulentos da pradaria.',
    illustration: 'dragon',
    image: '/assets/cards/dragon_anthro.jpg',
    passiveType: 'fluxo_sereno',
    passiveValue: 2,
    passiveDescription: 'Fluxo Sereno: Causa 2 de dano e cura 2 HP se avançar serenamente.'
  },

  // --- GUILDA DAS RAPOSAS ALQUÍMICAS (Mutação, Anthro Kitsune & Shifter) ---
  {
    id: 'kael_kitsune',
    name: 'Kael, Alquimista Kitsune',
    speciesName: 'Kitsune Fox Anthro',
    weight: 7,
    originalWeight: 7,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Raposa mística com múltiplas caudas de chama violeta, óculos de aviador na testa e poção mágica borbulhante.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune_anthro.jpg',
    passiveType: 'mutacao',
    passiveValue: 6,
    passiveDescription: 'Mutação de Azoth: Ao sofrer inversão no Nível 1 ou 2, transmutam seu peso para 21 ou 3!'
  },
  {
    id: 'vulpine_brewer',
    name: 'Renard, Destilador do Éter',
    speciesName: 'Fox Anthro Alchemist',
    weight: 6,
    originalWeight: 6,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Manipula tubos de ensaio de latão capazes de desestabilizar as leis gravitacionais.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune_anthro.jpg',
    passiveType: 'mutacao',
    passiveValue: 4,
    passiveDescription: 'Mutação: Se ultrapassado, explode liberando vapores que causam 4 de dano mútuo.'
  },
  {
    id: 'shadow_vixen',
    name: 'Vixen das Ilusões',
    speciesName: 'Kitsune Illusionist Anthro',
    weight: 15,
    originalWeight: 15,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Usa suas caudas de névoa para projetar cópias e trocar de peso com quem estiver por perto.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune_anthro.jpg',
    passiveType: 'mutacao',
    passiveValue: 3,
    passiveDescription: 'Mutação: Troca seu peso com a criatura à direita caso sofra inversão.'
  },
  {
    id: 'fennec_apprentice',
    name: 'Aprendiz Fennec',
    speciesName: 'Fennec Fox Anthro',
    weight: 10,
    originalWeight: 10,
    archetype: 'eter',
    type: 'creature',
    owner: 'player1',
    flavor: 'Pequena raposa de orelhas gigantes que acidentalmente troca fórmulas nas janelas de intervenção.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune_anthro.jpg',
    passiveType: 'mutacao',
    passiveValue: 3,
    passiveDescription: 'Mutação: Concede +3 ou -3 aleatório de peso quando colocada em nichos.'
  }
];

// Spells de intervenção com temática de Alquimia e Aeromancia do Zepelim
export const SPELL_CATALOG: Card[] = [
  {
    id: 'spell_gust',
    name: 'Fole do Zepelim',
    speciesName: 'Airship Aeromancy Spell',
    weight: 0,
    originalWeight: 0,
    archetype: 'rajadas',
    type: 'spell',
    owner: 'player1',
    flavor: 'Um jato de vapor e ar quente das caldeiras que desloca cartas.',
    illustration: 'wolf',
    image: '/assets/cards/wolf_anthro.jpg',
    passiveValue: 1,
    passiveDescription: 'Intervenção: Permuta uma carta com sua vizinha imediata.',
    spellTarget: 'adjacent_swap'
  },
  {
    id: 'spell_nectar',
    name: 'Néctar de Mandrágora',
    speciesName: 'Bovine Herbalism Spell',
    weight: 0,
    originalWeight: 0,
    archetype: 'raiz',
    type: 'spell',
    owner: 'player1',
    flavor: 'Seiva densa colhida nas raízes antigas que adiciona peso e espinhos.',
    illustration: 'holstaur',
    image: '/assets/cards/holstaur_anthro.jpg',
    passiveValue: 4,
    passiveDescription: 'Intervenção: Concede +4 de peso à criatura alvo, fortificando seu Pedágio.',
    spellTarget: 'weight_buff'
  },
  {
    id: 'spell_feather',
    name: 'Pluma do Vento Solar',
    speciesName: 'Feline Harmony Spell',
    weight: 0,
    originalWeight: 0,
    archetype: 'zefiro',
    type: 'spell',
    owner: 'player1',
    flavor: 'Alivia o peso de uma criatura para garantir passagem laminar sem atrito.',
    illustration: 'cat',
    image: '/assets/cards/cat_anthro.jpg',
    passiveValue: -3,
    passiveDescription: 'Intervenção: Reduz em 3 o peso da unidade alvo (mínimo 1).',
    spellTarget: 'weight_nerf'
  },
  {
    id: 'spell_elixir',
    name: 'Elixir de Azoth',
    speciesName: 'Kitsune Alchemy Spell',
    weight: 0,
    originalWeight: 0,
    archetype: 'eter',
    type: 'spell',
    owner: 'player1',
    flavor: 'Poção alquímica volátil que desestabiliza completamente os pesos.',
    illustration: 'kitsune',
    image: '/assets/cards/kitsune_anthro.jpg',
    passiveValue: 5,
    passiveDescription: 'Intervenção: Adiciona ou subtrai 5 do peso de uma criatura.',
    spellTarget: 'weight_buff'
  }
];

export function buildDeckHand(archetype: Archetype, owner: 'player1' | 'player2'): { creatures: Card[]; spells: Card[] } {
  const primaryCreatures = CARD_CATALOG.filter(c => c.archetype === archetype && c.type === 'creature');
  const otherCreatures = CARD_CATALOG.filter(c => c.archetype !== archetype && c.type === 'creature');

  const selectedCreatures = [
    ...primaryCreatures,
    ...otherCreatures.slice(0, 2)
  ].slice(0, 6);

  const creatures: Card[] = selectedCreatures.map((c, idx) => ({
    ...c,
    id: `${owner}_${c.id}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
    owner
  }));

  const spells: Card[] = SPELL_CATALOG.slice(0, 2).map((s, idx) => ({
    ...s,
    id: `${owner}_${s.id}_${idx}_${Math.random().toString(36).substring(2, 6)}`,
    owner
  }));

  return { creatures, spells };
}
