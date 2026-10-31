# DIVIDE ET IMPERA: Skyward Inversions
### *STRATADIVIDE: Conquer the Winds*

> Jogo web de cartas 1v1 estratégico ambientado na estética pastoral celeste de **Cloud Meadow**, onde o motor de combate é a execução cinética e tática em tempo real do algoritmo **Divide-and-Conquer: Counting Inversions (Sort-and-Count / Merge-and-Count)** em $\mathcal{O}(n \log n)$.

---

## 🎨 Identidade Visual Fiel a Cloud Meadow

A interface foi reformulada com base na direção de arte clássica de *Cloud Meadow* (Team Nimbus / S-Purple):
- **Pergaminhos Envelhecidos & Vinhetas**: Texturas de pergaminho quente com bordas tostadas (`cloud-parchment`).
- **Madeira Nobre, Couro & Rebites 3D**: Painéis de nogueira escura e couro de zepelim com rebites chanfrados de bronze e cantoneiras de latão (`cloud-wood-panel`, `cloud-rivet`).
- **Botões Físicos & Skeuomórficos**: Botoeiras táteis de latão escovado com chanfro tridimensional, relevo superior dourado, afundamento ao clique e sombras ricas (`cloud-btn-brass`, `cloud-btn-wood`).
- **Medidores de HP & Éter Mecânicos**:
  - Trilho chanfrado encastrado em metal escuro com divisores de segmento mecânicos (`cloud-gauge-track`, `cloud-gauge-ticks`).
  - Barra de vida verde esmeralda luminosa com reflexo de vidro superior (`cloud-bar-hp`) e barra de éter azul safira.
  - Medalhões de busto circulares com anéis de latão e asas heráldicas (`cloud-portrait-medallion`).
- **Espécies Canônicas de Monstros**:
  - **Harpies (Aria & Revoada)**: Asas de vento, garras e aeromancia veloz (*Wing Beat*, *Siren's Call*).
  - **Mandrake & Ogros (Jaero & Kreyton)**: Troncos milenares, galhos floridos, espinhos e rochedos titânicos (*Thorn Barrier*, *Stone Breaker*).
  - **Lamias & Draconianas (Nathifa & Kallista)**: Serpentes místicas e draconianas que personificam o *Fluxo Sereno*.
  - **Quimeras Alquímicas**: Criaturas mutantes que reagem com frascos de azoth e transmutação.

---

## ⚔️ Loop de Gameplay: A Tríade da Conquista ($n = 8$)

```
                  [FASE DIVIDIR: Fila de 8 Ilhas Desce em Estratos]
                                         │
                    ┌────────────────────┴────────────────────┐
           [Ala Poente: Ilhas 0-3]                   [Ala Nascente: Ilhas 4-7]
              ┌─────────┴─────────┐                     ┌─────────┴─────────┐
          (Nicho 0-1)         (Nicho 2-3)           (Nicho 4-5)         (Nicho 6-7)
              │                   │                     │                   │
              ▼                   ▼                     ▼                   ▼
    [Duelo T(2): Swaps]  [Duelo T(2): Swaps]   [Duelo T(2): Swaps] [Duelo T(2): Swaps]
              └─────────┬─────────┘                     └─────────┬─────────┘
                        ▼                                         ▼
         [Merge Ala A: r_A Inversões]              [Merge Ala B: r_B Inversões]
                        └────────────────────┬────────────────────┘
                                             ▼
                        [FASE CONQUISTAR: Grande Merge O(n)]
                         Ponteiro A (Azul) vs Ponteiro B (Âmbar)
                               ↳ r Inversões Cruzadas
                                             │
                                             ▼
                       [Dano = Equação: r_total = r_A + r_B + r]
```

---

## 🕹️ Execução & Testes

```bash
# Servidor de desenvolvimento local
npm run dev

# Verificação matemática do motor O(n log n)
npx tsx scripts/verify-engine.ts

# Compilar para exportação puramente estática
npm run build
```
