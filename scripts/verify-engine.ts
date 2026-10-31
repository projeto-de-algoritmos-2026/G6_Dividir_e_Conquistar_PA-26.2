import { generateAlgorithmSteps } from '../src/lib/engine/inversions';
import { CARD_CATALOG, buildDeckHand } from '../src/lib/engine/cards';
import { calculateBestMove, calculateSpellDecision } from '../src/lib/engine/bot';
import type { Card } from '../src/lib/types';

function countBruteForceInversions(cards: Card[]): number {
  let count = 0;
  for (let i = 0; i < cards.length; i++) {
    for (let j = i + 1; j < cards.length; j++) {
      if (cards[i].weight > cards[j].weight) {
        count++;
      }
    }
  }
  return count;
}

console.log('=== TEST 1: Verificação Matemática do Algoritmo O(n log n) vs O(n^2) ===');

// Test with 5 random permutations of 8 cards
for (let t = 1; t <= 5; t++) {
  const shuffledWeights = [1, 3, 5, 8, 12, 16, 20, 24].sort(() => Math.random() - 0.5);
  const testCards: Card[] = shuffledWeights.map((w, i) => ({
    id: `c_${i}`,
    name: `Carta ${w}`,
    weight: w,
    originalWeight: w,
    archetype: 'rajadas',
    type: 'creature',
    owner: i < 4 ? 'player1' : 'player2',
    flavor: 'Test',
    illustration: 'falcon',
    passiveValue: 1,
    passiveDescription: ''
  }));

  const expectedInversions = countBruteForceInversions(testCards);
  const sim = generateAlgorithmSteps(testCards);

  console.log(`Permutação ${t}: [${shuffledWeights.join(', ')}]`);
  console.log(`  -> r_A = ${sim.rA}, r_B = ${sim.rB}, r_cross = ${sim.rCross}`);
  console.log(`  -> r_total calculado: ${sim.rTotal} | Inversões reais O(n^2): ${expectedInversions}`);

  if (sim.rTotal === expectedInversions) {
    console.log(`  ✓ Match exato! Fórmula r_total = r_A + r_B + r válida!`);
  } else {
    console.error(`  ✗ Divergência detectada! Esperado: ${expectedInversions}, Obtido: ${sim.rTotal}`);
    process.exit(1);
  }
}

console.log('\n=== TEST 2: Verificação das Passivas (Ultrapassagem, Pedágio, Fluxo Sereno) ===');
// Monta cenário controlado: Ala A tem cartas pesadas (Raiz, peso 20 e 24), Ala B tem cartas leves (Rajada, peso 1 e 2)
const controlledBoard: Card[] = [
  // Ala A
  { id: '1', name: 'Carvalho', weight: 24, originalWeight: 24, archetype: 'raiz', type: 'creature', owner: 'player1', flavor: '', illustration: 'great_oak', passiveType: 'pedagio', passiveValue: 3, passiveDescription: '' },
  { id: '2', name: 'Sentinela', weight: 20, originalWeight: 20, archetype: 'raiz', type: 'creature', owner: 'player1', flavor: '', illustration: 'great_oak', passiveType: 'pedagio', passiveValue: 2, passiveDescription: '' },
  { id: '3', name: 'Monge A', weight: 14, originalWeight: 14, archetype: 'zefiro', type: 'creature', owner: 'player1', flavor: '', illustration: 'serene_monk', passiveType: 'fluxo_sereno', passiveValue: 3, passiveDescription: '' },
  { id: '4', name: 'Monge B', weight: 12, originalWeight: 12, archetype: 'zefiro', type: 'creature', owner: 'player1', flavor: '', illustration: 'serene_monk', passiveType: 'fluxo_sereno', passiveValue: 3, passiveDescription: '' },
  // Ala B
  { id: '5', name: 'Falcão', weight: 1, originalWeight: 1, archetype: 'rajadas', type: 'creature', owner: 'player2', flavor: '', illustration: 'falcon', passiveType: 'ultrapassagem', passiveValue: 3, passiveDescription: '' },
  { id: '6', name: 'Brisa', weight: 2, originalWeight: 2, archetype: 'rajadas', type: 'creature', owner: 'player2', flavor: '', illustration: 'falcon', passiveType: 'ultrapassagem', passiveValue: 2, passiveDescription: '' },
  { id: '7', name: 'Zéfirito', weight: 3, originalWeight: 3, archetype: 'rajadas', type: 'creature', owner: 'player2', flavor: '', illustration: 'falcon', passiveType: 'ultrapassagem', passiveValue: 2, passiveDescription: '' },
  { id: '8', name: 'Corsário', weight: 4, originalWeight: 4, archetype: 'rajadas', type: 'creature', owner: 'player2', flavor: '', illustration: 'falcon', passiveType: 'ultrapassagem', passiveValue: 2, passiveDescription: '' }
];

const simControlled = generateAlgorithmSteps(controlledBoard);
console.log(`Dano infligido ao P1: ${simControlled.totalDamageP1}`);
console.log(`Dano infligido ao P2: ${simControlled.totalDamageP2}`);
console.log(`Total Inversões r_cross: ${simControlled.rCross}`);
console.log(`Total Inversões r_total: ${simControlled.rTotal}`);

if (simControlled.rCross > 0 && simControlled.totalDamageP1 > 0 && simControlled.totalDamageP2 > 0) {
  console.log('✓ Combos de Ultrapassagem e retaliações de Pedágio disparados com sucesso!');
} else {
  console.error('✗ Falha na detecção de dano cruzado');
  process.exit(1);
}

console.log('\n=== TEST 3: Verificação do Bot Heurístico ===');
const botDeck = buildDeckHand('rajadas', 'player2');
const emptySlots: (Card | null)[] = [
  controlledBoard[0], controlledBoard[1], null, null,
  null, null, null, null
];

const botMove = calculateBestMove(botDeck.creatures, emptySlots, 'rajadas');
console.log(`Bot escolheu carta ${botMove.cardId} para o slot ${botMove.slotIndex}`);
if (botMove.slotIndex >= 0 && botMove.slotIndex < 8 && emptySlots[botMove.slotIndex] === null) {
  console.log('✓ Decisão de posicionamento válida e coerente!');
} else {
  console.error('✗ Decisão inválida do Bot');
  process.exit(1);
}

console.log('\n=== TODOS OS TESTES PASSARAM COM SUCESSO! ===');
