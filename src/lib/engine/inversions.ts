import type { Card, AlgorithmStep, AlgorithmStepType, AlgorithmResumeOptions } from '../types';

export interface StepSimulationResult {
  steps: AlgorithmStep[];
  finalBoard: (Card | null)[];
  rA: number;
  rB: number;
  rCross: number;
  rTotal: number;
  totalDamageP1: number;
  totalDamageP2: number;
  totalHealP1: number;
  totalHealP2: number;
}

// Clone helper
export function cloneCards(cards: (Card | null)[]): (Card | null)[] {
  return cards.map(c => (c ? { ...c } : null));
}

/**
 * Simula a execução completa do algoritmo Divide-and-Conquer Counting Inversions
 * registrando cada micro-passo para animação visual cinética e didática em 60 FPS.
 * Permite retomar a execução a partir das janelas táticas de intervenção (Alpha e Beta).
 */
export function generateAlgorithmSteps(
  initialSlots: (Card | null)[],
  resumeOptions?: AlgorithmResumeOptions
): StepSimulationResult {
  const steps: AlgorithmStep[] = [];
  let stepCounter = resumeOptions?.initialStepCounter ?? 0;

  let rA = resumeOptions?.initialRA ?? 0;
  let rB = resumeOptions?.initialRB ?? 0;
  let rCross = resumeOptions?.initialRCross ?? 0;
  let totalDamageP1 = resumeOptions?.initialDamageP1 ?? 0;
  let totalDamageP2 = resumeOptions?.initialDamageP2 ?? 0;
  let totalHealP1 = resumeOptions?.initialHealP1 ?? 0;
  let totalHealP2 = resumeOptions?.initialHealP2 ?? 0;

  // Estado mutável do tabuleiro ao longo dos passos
  let board = cloneCards(initialSlots);

  // Helper para registrar um passo
  function pushStep(
    type: AlgorithmStepType,
    title: string,
    description: string,
    complexityNotation: string,
    activePointers?: AlgorithmStep['activePointers'],
    eventPayload?: AlgorithmStep['eventPayload']
  ) {
    if (eventPayload?.damageP1) totalDamageP1 += eventPayload.damageP1;
    if (eventPayload?.damageP2) totalDamageP2 += eventPayload.damageP2;
    if (eventPayload?.healP1) totalHealP1 += eventPayload.healP1;
    if (eventPayload?.healP2) totalHealP2 += eventPayload.healP2;

    steps.push({
      id: stepCounter++,
      type,
      title,
      description,
      complexityNotation,
      rA,
      rB,
      rCross,
      rTotal: rA + rB + rCross,
      boardState: cloneCards(board),
      activePointers,
      eventPayload
    });
  }

  // Helper de aplicação de habilidades
  function triggerPassivesOnOvertake(aggressor: Card, victims: Card[]) {
    let dmgP1 = 0;
    let dmgP2 = 0;
    let healP1 = 0;
    let healP2 = 0;
    const logs: string[] = [];

    // Ultrapassagem da carta agressora disparada para cada vítima
    for (const victim of victims) {
      if (aggressor.passiveType === 'ultrapassagem') {
        const dmg = aggressor.passiveValue;
        if (aggressor.owner === 'player1') {
          dmgP2 += dmg;
          logs.push(`[Ultrapassagem] ${aggressor.name} (P1) causa ${dmg} dano ao P2.`);
        } else {
          dmgP1 += dmg;
          logs.push(`[Ultrapassagem] ${aggressor.name} (P2) causa ${dmg} dano ao P1.`);
        }
      }

      // Pedágio da vítima contra o agressor
      if (victim.passiveType === 'pedagio') {
        const toll = victim.passiveValue;
        if (victim.owner === 'player1') {
          dmgP2 += toll;
          logs.push(`[Pedágio] ${victim.name} (P1) retalia com ${toll} de dano contra o dono de ${aggressor.name}.`);
        } else {
          dmgP1 += toll;
          logs.push(`[Pedágio] ${victim.name} (P2) retalia com ${toll} de dano contra o dono de ${aggressor.name}.`);
        }
      }

      // Mutação de Éter
      if (victim.passiveType === 'mutacao') {
        const oldW = victim.weight;
        victim.weight = victim.weight <= 10 ? victim.weight + 8 : Math.max(1, victim.weight - 8);
        logs.push(`[Mutação] ${victim.name} altera seu peso de ${oldW} para ${victim.weight}!`);
      }
    }

    return { dmgP1, dmgP2, healP1, healP2, logText: logs.join(' ') };
  }

  function triggerSereneFlow(card: Card) {
    let dmgP1 = 0;
    let dmgP2 = 0;
    let healP1 = 0;
    let healP2 = 0;
    let logText = '';

    if (card.passiveType === 'fluxo_sereno') {
      const val = card.passiveValue;
      if (card.owner === 'player1') {
        healP1 += Math.floor(val * 0.7);
        dmgP2 += Math.ceil(val * 0.3);
        logText = `[Fluxo Sereno] ${card.name} (P1) flui em harmonia: cura ${Math.floor(val * 0.7)} HP e causa ${Math.ceil(val * 0.3)} dano.`;
      } else {
        healP2 += Math.floor(val * 0.7);
        dmgP1 += Math.ceil(val * 0.3);
        logText = `[Fluxo Sereno] ${card.name} (P2) flui em harmonia: cura ${Math.floor(val * 0.7)} HP e causa ${Math.ceil(val * 0.3)} dano.`;
      }
    }

    return { dmgP1, dmgP2, healP1, healP2, logText };
  }

  // ==========================================
  // PASSO 1 & 2: DIVIDIR E DUELOS DE NICHO T(2)
  // (Apenas se executando do início)
  // ==========================================
  if (!resumeOptions || resumeOptions.startFrom === 'divide') {
    pushStep(
      'divide_start',
      'Fase Dividir: Queda dos Estratos',
      'O arquipélago divide-se em duas Alas (Poente [0..3] e Nascente [4..7]) e depois em 4 Nichos isolados de 2 slots.',
      'Divide: 8 → 4 → 2 (Base da Recursão)'
    );

    const pairs: [number, number][] = [
      [0, 1],
      [2, 3],
      [4, 5],
      [6, 7]
    ];

    for (let idx = 0; idx < pairs.length; idx++) {
      const [left, right] = pairs[idx];
      const cLeft = board[left];
      const cRight = board[right];

      if (!cLeft || !cRight) continue;

      pushStep(
        'nicho_compare',
        `Nicho ${idx} [Slots ${left}-${right}]: Duelo T(2)`,
        `Comparando ${cLeft.name} (Peso ${cLeft.weight}) com ${cRight.name} (Peso ${cRight.weight}).`,
        `T(2) = 1 comparação no Nicho ${idx}`,
        { activePair: [left, right] }
      );

      if (cLeft.weight > cRight.weight) {
        // Inversão detectada no Nicho!
        if (idx < 2) {
          rA += 1;
        } else {
          rB += 1;
        }

        // Efeito de passivas: cRight ultrapassou cLeft
        const effect = triggerPassivesOnOvertake(cRight, [cLeft]);

        // Swap no tabuleiro
        board[left] = cRight;
        board[right] = cLeft;

        pushStep(
          'nicho_swap',
          `Inversão no Nicho ${idx}!`,
          `${cRight.name} (Peso ${cRight.weight}) é mais leve que ${cLeft.name} (Peso ${cLeft.weight}). Ocorre um Swap dinâmico no ar!`,
          `Inversão detectada: +1 em r_${idx < 2 ? 'A' : 'B'}`,
          { activePair: [left, right] },
          {
            swappedIndices: [left, right],
            damageP1: effect.dmgP1,
            damageP2: effect.dmgP2,
            healP1: effect.healP1,
            healP2: effect.healP2,
            logText: effect.logText || `Swap dinâmico entre slots ${left} e ${right}.`
          }
        );
      } else {
        // Ordenado
        const serene = triggerSereneFlow(cLeft);
        pushStep(
          'nicho_ordered',
          `Nicho ${idx} em Ordem`,
          `${cLeft.name} (Peso ${cLeft.weight}) ≤ ${cRight.name} (Peso ${cRight.weight}). Nenhum atrito gerado.`,
          'Zero Inversões no Nicho',
          { activePair: [left, right] },
          {
            damageP1: serene.dmgP1,
            damageP2: serene.dmgP2,
            healP1: serene.healP1,
            healP2: serene.healP2,
            logText: serene.logText || 'Ordem mantida.'
          }
        );
      }
    }

    // Janela Alpha
    pushStep(
      'alpha_pause',
      'Janela de Intervenção Alpha',
      'Os 4 nichos estão ordenados internamente. Os jogadores podem conjurar fórmulas alquímicas para alterar pesos ou permutar cartas antes da fusão das alas.',
      'Pausa Tática: Estratos T(2) Prontos'
    );
  }

  // ==========================================
  // PASSO 4: CONQUISTAR NÍVEL 2 - FUSÃO DAS ALAS
  // (Executado se 'divide' ou 'alpha')
  // ==========================================
  if (!resumeOptions || resumeOptions.startFrom === 'divide' || resumeOptions.startFrom === 'alpha') {
    pushStep(
      'merge_ala_start',
      'Conquista Nível 2: Fusão das Alas',
      'Os nichos fundem-se em dois estratos maiores: Ala Poente [0..3] e Ala Nascente [4..7].',
      'Merge de 2 sub-vetores de tamanho 2'
    );

    // Merge de cada Ala (Poente 0..3 e Nascente 4..7)
    function mergeSubArray(startA: number, startB: number, isAlaA: boolean) {
      const arrA = [board[startA]!, board[startA + 1]!];
      const arrB = [board[startB]!, board[startB + 1]!];

      // Se uma fórmula alquímica inverteu cartas internamente dentro do nicho
      if (arrA[0].weight > arrA[1].weight) {
        const tmp = arrA[0];
        arrA[0] = arrA[1];
        arrA[1] = tmp;
        if (isAlaA) rA++; else rB++;
      }
      if (arrB[0].weight > arrB[1].weight) {
        const tmp = arrB[0];
        arrB[0] = arrB[1];
        arrB[1] = tmp;
        if (isAlaA) rA++; else rB++;
      }

      const merged: Card[] = [];
      let pA = 0;
      let pB = 0;

      while (pA < arrA.length && pB < arrB.length) {
        const cA = arrA[pA];
        const cB = arrB[pB];

        pushStep(
          'merge_ala_compare',
          `Merge ${isAlaA ? 'Ala Poente (A)' : 'Ala Nascente (B)'}`,
          `Comparando ${cA.name} (Peso ${cA.weight}) com ${cB.name} (Peso ${cB.weight}).`,
          `Comparação em O(1)`,
          { activePair: [startA + pA, startB + pB] }
        );

        if (cA.weight <= cB.weight) {
          // Sem inversão
          const serene = triggerSereneFlow(cA);
          merged.push(cA);
          pA++;
          pushStep(
            'merge_ala_pass',
            `Fluxo Sereno na ${isAlaA ? 'Ala A' : 'Ala B'}`,
            `${cA.name} desliza para a posição ordenada da ala sem atrito.`,
            'Sem Inversão Local',
            undefined,
            {
              damageP1: serene.dmgP1,
              damageP2: serene.dmgP2,
              healP1: serene.healP1,
              healP2: serene.healP2,
              logText: serene.logText || `${cA.name} entra sem inversões.`
            }
          );
        } else {
          // Inversão! cB é menor que todos os restantes em arrA (arrA.length - pA)
          const kRemaining = arrA.length - pA;
          if (isAlaA) {
            rA += kRemaining;
          } else {
            rB += kRemaining;
          }

          const victims = arrA.slice(pA);
          const effect = triggerPassivesOnOvertake(cB, victims);

          merged.push(cB);
          pB++;

          pushStep(
            'merge_ala_inversion',
            `Inversão Cruzada na ${isAlaA ? 'Ala A' : 'Ala B'}!`,
            `${cB.name} (Peso ${cB.weight}) ultrapassa ${kRemaining} carta(s) de uma só vez! Adicionadas ${kRemaining} inversões a r_${isAlaA ? 'A' : 'B'}.`,
            `+${kRemaining} Inversões locais`,
            undefined,
            {
              kInversions: kRemaining,
              damageP1: effect.dmgP1,
              damageP2: effect.dmgP2,
              healP1: effect.healP1,
              healP2: effect.healP2,
              logText: effect.logText || `${cB.name} provocou ${kRemaining} inversões locais.`
            }
          );
        }
      }

      while (pA < arrA.length) {
        merged.push(arrA[pA]);
        pA++;
      }
      while (pB < arrB.length) {
        merged.push(arrB[pB]);
        pB++;
      }

      // Atualiza tabuleiro com merged
      const startIdx = startA;
      for (let i = 0; i < merged.length; i++) {
        board[startIdx + i] = merged[i];
      }
    }

    mergeSubArray(0, 2, true);
    mergeSubArray(4, 6, false);

    // Janela Beta
    pushStep(
      'beta_pause',
      'Janela de Intervenção Beta',
      'As Alas Poente e Nascente estão ordenadas! Última chance de conjurar fórmulas alquímicas antes do confronto épico no Grande Vórtice.',
      'Pausa Tática: Alas A e B Prontas'
    );
  }

  // ==========================================
  // PASSO 6: O GRANDE VÓRTICE O(n)
  // (Ponteiro Aurora i vs Ponteiro Ocaso j)
  // ==========================================
  pushStep(
    'vortex_start',
    'O Grande Vórtice: Merge Final O(n)',
    'As duas metades ordenadas entram em convergência no Altar Principal. Ponteiro da Aurora (i) encara o Ponteiro do Ocaso (j).',
    'Merge O(n): Clímax do Divide and Conquer'
  );

  const alaA = [board[0]!, board[1]!, board[2]!, board[3]!];
  const alaB = [board[4]!, board[5]!, board[6]!, board[7]!];

  // Se alguma intervenção alterou a ordenação interna de alaA ou alaB, garante ordenação antes do merge
  for (let i = 0; i < alaA.length; i++) {
    for (let j = i + 1; j < alaA.length; j++) {
      if (alaA[i].weight > alaA[j].weight) {
        const tmp = alaA[i];
        alaA[i] = alaA[j];
        alaA[j] = tmp;
        rA++;
      }
    }
  }
  for (let i = 0; i < alaB.length; i++) {
    for (let j = i + 1; j < alaB.length; j++) {
      if (alaB[i].weight > alaB[j].weight) {
        const tmp = alaB[i];
        alaB[i] = alaB[j];
        alaB[j] = tmp;
        rB++;
      }
    }
  }

  const finalSorted: Card[] = [];
  let ptrA = 0;
  let ptrB = 0;

  while (ptrA < alaA.length && ptrB < alaB.length) {
    const cardA = alaA[ptrA];
    const cardB = alaB[ptrB];

    pushStep(
      'vortex_compare',
      'Duelo dos Ponteiros',
      `Aurora [Slot ${ptrA}] ${cardA.name} (${cardA.weight}) vs Ocaso [Slot ${4 + ptrB}] ${cardB.name} (${cardB.weight}).`,
      `Comparação do Vórtice`,
      { auroraIndex: ptrA, ocasoIndex: 4 + ptrB }
    );

    if (cardA.weight <= cardB.weight) {
      // Sem inversão cruzada
      const serene = triggerSereneFlow(cardA);
      finalSorted.push(cardA);
      ptrA++;

      pushStep(
        'vortex_serene_pass',
        'Passagem Serena da Aurora',
        `${cardA.name} (Aurora) é menor ou igual a ${cardB.name} (Ocaso). Flui em harmonia para a formação ordenada final.`,
        'Sem inversão cruzada',
        { auroraIndex: ptrA - 1, ocasoIndex: 4 + ptrB },
        {
          damageP1: serene.dmgP1,
          damageP2: serene.dmgP2,
          healP1: serene.healP1,
          healP2: serene.healP2,
          logText: serene.logText || `${cardA.name} avança serenamente.`
        }
      );
    } else {
      // Inversão cruzada massiva! cardB é menor que TODOS os restantes em alaA
      const kCross = alaA.length - ptrA;
      rCross += kCross;

      const victims = alaA.slice(ptrA);
      const effect = triggerPassivesOnOvertake(cardB, victims);

      finalSorted.push(cardB);
      ptrB++;

      pushStep(
        'vortex_burst_inversion',
        `Rajada de ${kCross} Inversões Cruzadas!`,
        `Turbulência! ${cardB.name} (Ocaso, Peso ${cardB.weight}) ultrapassa de uma só vez todas as ${kCross} cartas restantes da Aurora!`,
        `+${kCross} Inversões Cruzadas em O(1)`,
        { auroraIndex: ptrA, ocasoIndex: 4 + ptrB - 1 },
        {
          kInversions: kCross,
          damageP1: effect.dmgP1,
          damageP2: effect.dmgP2,
          healP1: effect.healP1,
          healP2: effect.healP2,
          logText: effect.logText || `Explosão de ${kCross} inversões cruzadas por ${cardB.name}!`
        }
      );
    }
  }

  // Copia o resto de Ala A (se sobrar)
  while (ptrA < alaA.length) {
    const c = alaA[ptrA];
    finalSorted.push(c);
    ptrA++;
  }

  // Copia o resto de Ala B (se sobrar)
  while (ptrB < alaB.length) {
    const c = alaB[ptrB];
    finalSorted.push(c);
    ptrB++;
  }

  // Atualiza board com final sorted
  board = cloneCards(finalSorted);

  // ==========================================
  // PASSO 7: RESOLUÇÃO DA CONQUISTA
  // Equação: r_total = r_A + r_B + r_vortice
  // ==========================================
  const rTotal = rA + rB + rCross;

  // Dano base derivado das inversões proporcionais
  pushStep(
    'round_resolution',
    'Resolução da Conquista: Síntese Algorítmica',
    `Fórmula Viva: r_total = r_A (${rA}) + r_B (${rB}) + r (${rCross}) = ${rTotal}. As cartas ascendem em pólen dourado.`,
    `r_total = ${rA} + ${rB} + ${rCross} = ${rTotal}`,
    undefined,
    {
      finalDamageP1: totalDamageP1,
      finalDamageP2: totalDamageP2,
      logText: `Fim da resolução. Inversões: r_A=${rA}, r_B=${rB}, r=${rCross} (Total: ${rTotal}). Saldo de Dano: P1 sofre ${totalDamageP1}, P2 sofre ${totalDamageP2}.`
    }
  );

  return {
    steps,
    finalBoard: board,
    rA,
    rB,
    rCross,
    rTotal,
    totalDamageP1,
    totalDamageP2,
    totalHealP1,
    totalHealP2
  };
}
