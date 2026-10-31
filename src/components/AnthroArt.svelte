<script lang="ts">
  interface Props {
    character: string;
    class?: string;
  }

  let { character, class: className = 'w-full h-full' }: Props = $props();

  const charKey = $derived(
    character === 'wolf_leader' ? 'wolf' :
    character === 'harpy' ? 'harpy' :
    character === 'holstaur_matriarch' ? 'holstaur' :
    character === 'bear' ? 'bear' :
    character === 'cat_mystic' ? 'cat' :
    character === 'dragon' ? 'dragon' :
    character === 'kitsune_alchemist' ? 'kitsune' :
    character
  );
</script>

<div class="relative flex items-center justify-center overflow-hidden bg-[#120a06] select-none {className}">
  <!-- Grade de Textura CRT / Scanline Sutil de Pixel Art Retrô 16/32-Bit -->
  <div class="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] z-10"></div>

  {#if charKey === 'holstaur'}
    <!-- =============================================================== -->
    <!-- BRENA: HOLSTAUR COW ANTHRO (48x48 CLOSE-UP BUST • CLOUD MEADOW) -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#1b291d"/>
      <rect x="0" y="36" width="48" height="12" fill="#111c12"/>

      <!-- Chifres Bovinos com Flor de Hibisco Rosa -->
      <rect x="10" y="3" width="3" height="5" fill="#ca8a04"/>
      <rect x="8" y="2" width="3" height="3" fill="#fde68a"/>
      <rect x="6" y="1" width="3" height="2" fill="#ffffff"/>
      <rect x="35" y="3" width="3" height="5" fill="#ca8a04"/>
      <rect x="37" y="2" width="3" height="3" fill="#fde68a"/>
      <rect x="39" y="1" width="3" height="2" fill="#ffffff"/>
      <!-- Florzinha de Hibisco no Chifre Esquerdo -->
      <rect x="11" y="5" width="5" height="5" fill="#f472b6"/>
      <rect x="12" y="6" width="3" height="3" fill="#db2777"/>
      <rect x="13" y="7" width="1" height="1" fill="#fef08a"/>

      <!-- Orelhas Bovinas Caídas Macias -->
      <rect x="2" y="11" width="8" height="5" fill="#f8fafc"/>
      <rect x="3" y="12" width="6" height="3" fill="#fbcfe8"/>
      <rect x="38" y="11" width="8" height="5" fill="#f8fafc"/>
      <rect x="39" y="12" width="6" height="3" fill="#fbcfe8"/>

      <!-- Cabelos Castanhos & Tranças Longas Caindo sobre o Busto -->
      <rect x="12" y="5" width="24" height="13" fill="#542b11"/>
      <rect x="14" y="4" width="20" height="4" fill="#783c18"/>
      <rect x="6" y="15" width="5" height="26" fill="#542b11"/>
      <rect x="7" y="16" width="3" height="24" fill="#783c18"/>
      <rect x="6" y="38" width="5" height="2" fill="#f472b6"/>
      <rect x="37" y="15" width="5" height="26" fill="#542b11"/>
      <rect x="38" y="16" width="3" height="24" fill="#783c18"/>
      <rect x="37" y="38" width="5" height="2" fill="#f472b6"/>

      <!-- Rosto com Mancha Holstaur no Olho Esquerdo e Blush -->
      <rect x="14" y="8" width="20" height="15" fill="#f8fafc"/>
      <rect x="14" y="9" width="7" height="8" fill="#334155"/>
      <rect x="15" y="10" width="5" height="6" fill="#1e293b"/>

      <!-- Olhos Castanhos Meigos com Longos Cílios e Brilho Duplo -->
      <rect x="16" y="12" width="4" height="4" fill="#78350f"/>
      <rect x="17" y="12" width="2" height="2" fill="#d97706"/>
      <rect x="16" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="15" y="11" width="5" height="1" fill="#21140e"/>

      <rect x="28" y="12" width="4" height="4" fill="#78350f"/>
      <rect x="29" y="12" width="2" height="2" fill="#d97706"/>
      <rect x="28" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="30" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="11" width="5" height="1" fill="#21140e"/>

      <!-- Focinho Bovino Macio Rosado com Blush -->
      <rect x="17" y="17" width="14" height="6" fill="#fbcfe8"/>
      <rect x="19" y="18" width="10" height="4" fill="#f472b6"/>
      <rect x="20" y="20" width="2" height="1" fill="#881337"/>
      <rect x="26" y="20" width="2" height="1" fill="#881337"/>
      <rect x="12" y="16" width="3" height="2" fill="#fda4af"/>
      <rect x="33" y="16" width="3" height="2" fill="#fda4af"/>

      <!-- Pescoço e Gargantilha de Couro com Sino de Bronze Pastoral -->
      <rect x="20" y="23" width="8" height="5" fill="#f8fafc"/>
      <rect x="18" y="25" width="12" height="2" fill="#78350f"/>
      <!-- Sino de Bronze entre as clavículas -->
      <rect x="21" y="26" width="6" height="5" fill="#facc15"/>
      <rect x="22" y="27" width="4" height="3" fill="#ca8a04"/>
      <rect x="23" y="30" width="2" height="1" fill="#713f12"/>

      <!-- BUSTO VOLUPTUOSO COM DECOTE GENEROSO & CLAVÍCULAS (LEWD/SFW) -->
      <rect x="8" y="27" width="7" height="10" fill="#f8fafc"/>
      <rect x="9" y="29" width="4" height="5" fill="#1e293b"/>
      <rect x="33" y="27" width="7" height="10" fill="#f8fafc"/>
      <rect x="35" y="32" width="4" height="4" fill="#1e293b"/>

      <!-- Seios Fartos Holstaur em Curva Ampulheta Marcante -->
      <rect x="14" y="28" width="20" height="13" fill="#f8fafc"/>
      <rect x="23" y="28" width="2" height="9" fill="#e2e8f0"/>
      <rect x="23" y="30" width="2" height="6" fill="#cbd5e1"/>
      <rect x="16" y="29" width="7" height="8" fill="#ffffff"/>
      <rect x="25" y="29" width="7" height="8" fill="#ffffff"/>
      <rect x="15" y="36" width="8" height="2" fill="#cbd5e1"/>
      <rect x="25" y="36" width="8" height="2" fill="#cbd5e1"/>

      <!-- CORPETE DE COURO RÚSTICO JUSTO COM ILHÓS DOURADOS -->
      <rect x="13" y="38" width="22" height="10" fill="#9a3412"/>
      <rect x="15" y="39" width="18" height="9" fill="#c2410c"/>
      <rect x="21" y="39" width="6" height="9" fill="#7c2d12"/>
      <!-- Cordões dourados cruzados no espartilho -->
      <rect x="22" y="40" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="40" width="1" height="2" fill="#facc15"/>
      <rect x="23" y="41" width="2" height="1" fill="#fde047"/>
      <rect x="22" y="43" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="43" width="1" height="2" fill="#facc15"/>
      <rect x="23" y="44" width="2" height="1" fill="#fde047"/>
      <rect x="22" y="46" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="46" width="1" height="2" fill="#facc15"/>
      <rect x="11" y="43" width="3" height="5" fill="#f8fafc"/>
      <rect x="34" y="43" width="3" height="5" fill="#f8fafc"/>
    </svg>

  {:else if charKey === 'cat'}
    <!-- =============================================================== -->
    <!-- ELARA: MÍSTICA FELINA (48x48 CLOSE-UP BUST • SULTRY/SFW)        -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#141c2b"/>
      <rect x="0" y="36" width="48" height="12" fill="#0d131e"/>

      <!-- Ponta da Cauda Sinuosa ao Fundo à Direita -->
      <rect x="39" y="18" width="3" height="18" fill="#facc15"/>
      <rect x="41" y="16" width="3" height="10" fill="#ca8a04"/>
      <rect x="38" y="13" width="3" height="4" fill="#fde047"/>

      <!-- Orelhas de Gato com Guizos de Ouro -->
      <rect x="10" y="3" width="5" height="7" fill="#ca8a04"/>
      <rect x="11" y="4" width="3" height="5" fill="#f472b6"/>
      <rect x="7" y="9" width="3" height="3" fill="#facc15"/>
      <rect x="33" y="3" width="5" height="7" fill="#ca8a04"/>
      <rect x="34" y="4" width="3" height="5" fill="#f472b6"/>
      <rect x="38" y="9" width="3" height="3" fill="#facc15"/>

      <!-- Cabelos Dourados Platinados com Mechas Framing Face -->
      <rect x="12" y="7" width="24" height="15" fill="#fde047"/>
      <rect x="15" y="6" width="18" height="4" fill="#fef08a"/>
      <rect x="9" y="14" width="4" height="18" fill="#fde047"/>
      <rect x="35" y="14" width="4" height="18" fill="#fde047"/>
      <rect x="31" y="7" width="4" height="5" fill="#78350f"/>

      <!-- Rosto e Pele Suave -->
      <rect x="14" y="10" width="20" height="14" fill="#ffedd5"/>
      <rect x="16" y="11" width="16" height="12" fill="#fffbeb"/>

      <!-- Olhos Esmeralda Místicos com Delineado Feline Eyeliner Marcante -->
      <rect x="15" y="13" width="5" height="4" fill="#047857"/>
      <rect x="16" y="13" width="3" height="3" fill="#10b981"/>
      <rect x="18" y="13" width="1" height="3" fill="#064e3b"/>
      <rect x="16" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="14" y="12" width="6" height="1" fill="#1e1336"/>

      <rect x="28" y="13" width="5" height="4" fill="#047857"/>
      <rect x="29" y="13" width="3" height="3" fill="#10b981"/>
      <rect x="29" y="13" width="1" height="3" fill="#064e3b"/>
      <rect x="30" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="12" width="6" height="1" fill="#1e1336"/>

      <!-- Focinho, Narizinho Rosa e Sorriso Malicioso Felino -->
      <rect x="23" y="18" width="2" height="2" fill="#f472b6"/>
      <rect x="21" y="20" width="6" height="1" fill="#b45309"/>
      <rect x="9" y="19" width="3" height="1" fill="#ca8a04"/>
      <rect x="36" y="19" width="3" height="1" fill="#ca8a04"/>

      <!-- Coleira Choker com Guizo Dourado -->
      <rect x="20" y="24" width="8" height="2" fill="#1e1336"/>
      <rect x="23" y="25" width="2" height="2" fill="#facc15"/>

      <!-- OMBROS NUS, CLAVÍCULAS & DECOTE V NO QUIMONO CROPPED -->
      <rect x="8" y="26" width="7" height="10" fill="#ffedd5"/>
      <rect x="33" y="26" width="7" height="10" fill="#ffedd5"/>
      <rect x="15" y="26" width="18" height="4" fill="#ffedd5"/>

      <!-- Busto Gracioso com Decote Sweetheart no Top Quimono Celeste -->
      <rect x="12" y="29" width="24" height="13" fill="#38bdf8"/>
      <rect x="21" y="27" width="6" height="8" fill="#ffedd5"/>
      <rect x="23" y="29" width="2" height="5" fill="#fdba74"/>
      <rect x="15" y="30" width="6" height="8" fill="#7dd3fc"/>
      <rect x="27" y="30" width="6" height="8" fill="#7dd3fc"/>
      <rect x="16" y="34" width="4" height="2" fill="#fef08a"/>
      <rect x="28" y="34" width="4" height="2" fill="#fef08a"/>

      <!-- Faixa Obi Vermelha Amarrada sob o Busto com Laço -->
      <rect x="13" y="40" width="22" height="4" fill="#be123c"/>
      <rect x="22" y="39" width="4" height="5" fill="#f43f5e"/>
      <rect x="23" y="40" width="2" height="3" fill="#facc15"/>

      <!-- Barriguinha Lisa Exposta (Midriff) e Cintura Delicada -->
      <rect x="15" y="44" width="18" height="4" fill="#ffedd5"/>
      <rect x="23" y="45" width="2" height="2" fill="#e2b184"/>
    </svg>

  {:else if charKey === 'harpy'}
    <!-- =============================================================== -->
    <!-- ARIA: HARPIA AVIADORA (48x48 CLOSE-UP BUST • PERKY & SPORTY)   -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#2d1c10"/>
      <rect x="0" y="36" width="48" height="12" fill="#1b1007"/>

      <!-- Asas Douradas nas Costas e Ombreiras de Penas -->
      <rect x="2" y="14" width="6" height="24" fill="#ca8a04"/>
      <rect x="4" y="12" width="5" height="28" fill="#eab308"/>
      <rect x="40" y="14" width="6" height="24" fill="#ca8a04"/>
      <rect x="39" y="12" width="5" height="28" fill="#eab308"/>

      <!-- Penas Douradas e Topete Selvagem -->
      <rect x="14" y="4" width="20" height="12" fill="#facc15"/>
      <rect x="17" y="1" width="14" height="5" fill="#fde047"/>
      <rect x="12" y="6" width="6" height="7" fill="#eab308"/>
      <rect x="30" y="6" width="6" height="7" fill="#eab308"/>

      <!-- Óculos de Aviador na Testa com Reflexo nas Lentes -->
      <rect x="13" y="5" width="22" height="4" fill="#451a03"/>
      <rect x="15" y="4" width="7" height="5" fill="#ca8a04"/>
      <rect x="17" y="5" width="4" height="3" fill="#7dd3fc"/>
      <rect x="18" y="6" width="2" height="1" fill="#ffffff"/>
      <rect x="26" y="4" width="7" height="5" fill="#ca8a04"/>
      <rect x="28" y="5" width="4" height="3" fill="#7dd3fc"/>
      <rect x="29" y="6" width="2" height="1" fill="#ffffff"/>

      <!-- Rosto e Olhos Turquesa Vivos com Cílios -->
      <rect x="15" y="9" width="18" height="12" fill="#fed7aa"/>
      <rect x="17" y="10" width="14" height="10" fill="#ffedd5"/>
      <rect x="16" y="12" width="5" height="4" fill="#0f766e"/>
      <rect x="17" y="12" width="2" height="3" fill="#14b8a6"/>
      <rect x="17" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="15" y="11" width="5" height="1" fill="#331c0e"/>

      <rect x="27" y="12" width="5" height="4" fill="#0f766e"/>
      <rect x="28" y="12" width="2" height="3" fill="#14b8a6"/>
      <rect x="28" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="11" width="5" height="1" fill="#331c0e"/>

      <!-- Bico Fino Dourado com Sorriso Arredio -->
      <rect x="22" y="16" width="4" height="3" fill="#f59e0b"/>
      <rect x="23" y="18" width="2" height="2" fill="#d97706"/>

      <!-- Gola Felpuda de Lã de Carneiro Branca -->
      <rect x="13" y="22" width="22" height="4" fill="#f1f5f9"/>
      <rect x="15" y="23" width="18" height="3" fill="#ffffff"/>

      <!-- JAQUETA DE AVIADOR CROPPED & TOP BANDEAU EMPINADO -->
      <rect x="10" y="26" width="28" height="16" fill="#78350f"/>
      <rect x="16" y="26" width="16" height="12" fill="#f8fafc"/>
      <rect x="18" y="27" width="12" height="10" fill="#ffffff"/>
      <rect x="23" y="26" width="2" height="9" fill="#cbd5e1"/>
      <rect x="11" y="27" width="6" height="13" fill="#92400e"/>
      <rect x="31" y="27" width="6" height="13" fill="#92400e"/>

      <!-- Abdômen Tonificado Exposto (Midriff) -->
      <rect x="16" y="39" width="16" height="7" fill="#fed7aa"/>
      <rect x="18" y="40" width="12" height="5" fill="#ffedd5"/>
      <rect x="23" y="42" width="2" height="2" fill="#c28b58"/>

      <!-- Cinto com Fivela de Bronze -->
      <rect x="14" y="45" width="20" height="3" fill="#451a03"/>
      <rect x="22" y="44" width="4" height="4" fill="#facc15"/>
    </svg>

  {:else if charKey === 'dragon'}
    <!-- =============================================================== -->
    <!-- KALLISTA: VALQUÍRIA DRACONIANA (48x48 CLOSE-UP BUST • NOBRE)    -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#290e15"/>
      <rect x="0" y="36" width="48" height="12" fill="#17060b"/>

      <!-- Cauda com Espigão Dourado ao Fundo -->
      <rect x="38" y="16" width="4" height="20" fill="#be123c"/>
      <rect x="40" y="20" width="3" height="14" fill="#e11d48"/>
      <rect x="41" y="14" width="3" height="5" fill="#facc15"/>

      <!-- Chifres Draconianos Dourados Grandiosos -->
      <rect x="9" y="2" width="3" height="7" fill="#ca8a04"/>
      <rect x="7" y="1" width="3" height="3" fill="#facc15"/>
      <rect x="5" y="0" width="3" height="2" fill="#fef08a"/>
      <rect x="36" y="2" width="3" height="7" fill="#ca8a04"/>
      <rect x="38" y="1" width="3" height="3" fill="#facc15"/>
      <rect x="40" y="0" width="3" height="2" fill="#fef08a"/>

      <!-- Cabeça com Escamas Carmesim Nobres -->
      <rect x="14" y="7" width="20" height="15" fill="#be123c"/>
      <rect x="16" y="8" width="16" height="13" fill="#e11d48"/>
      <rect x="18" y="9" width="12" height="10" fill="#fb7185"/>

      <!-- Olhos Reptilianos Dourados Ferozes -->
      <rect x="16" y="12" width="4" height="4" fill="#ca8a04"/>
      <rect x="17" y="12" width="2" height="3" fill="#facc15"/>
      <rect x="18" y="12" width="1" height="3" fill="#451a03"/>
      <rect x="17" y="12" width="1" height="1" fill="#ffffff"/>

      <rect x="28" y="12" width="4" height="4" fill="#ca8a04"/>
      <rect x="29" y="12" width="2" height="3" fill="#facc15"/>
      <rect x="30" y="12" width="1" height="3" fill="#451a03"/>
      <rect x="30" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Elegante com Sorriso Orgulhoso -->
      <rect x="20" y="17" width="8" height="5" fill="#e11d48"/>
      <rect x="21" y="19" width="2" height="1" fill="#881337"/>
      <rect x="25" y="19" width="2" height="1" fill="#881337"/>
      <rect x="21" y="21" width="6" height="1" fill="#4c0519"/>

      <!-- COURAÇA ESCULPIDA EM ESCAMAS DE DRAGÃO COM DECOTE CORAÇÃO -->
      <rect x="9" y="25" width="30" height="18" fill="#881337"/>
      <rect x="12" y="26" width="24" height="16" fill="#9f1239"/>
      <rect x="15" y="28" width="8" height="12" fill="#be123c"/>
      <rect x="25" y="28" width="8" height="12" fill="#be123c"/>
      <rect x="23" y="27" width="2" height="9" fill="#4c0519"/>
      <rect x="15" y="27" width="18" height="2" fill="#facc15"/>
      <rect x="23" y="28" width="2" height="3" fill="#facc15"/>

      <!-- Detalhes de Armadura de Cintura e Ombreiras Douradas -->
      <rect x="14" y="41" width="20" height="7" fill="#881337"/>
      <rect x="17" y="42" width="14" height="5" fill="#9f1239"/>
      <rect x="23" y="42" width="2" height="4" fill="#facc15"/>
    </svg>

  {:else if charKey === 'wolf'}
    <!-- =============================================================== -->
    <!-- FENRIR: LUPINO GUERREIRO (48x48 CLOSE-UP BUST • PEITORAL SARADO) -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#141926"/>
      <rect x="0" y="36" width="48" height="12" fill="#0c101a"/>

      <!-- Orelhas Pontudas de Lobo -->
      <rect x="10" y="2" width="4" height="9" fill="#191c26"/>
      <rect x="12" y="3" width="4" height="7" fill="#94a3b8"/>
      <rect x="13" y="5" width="2" height="4" fill="#fbcfe8"/>
      <rect x="34" y="2" width="4" height="9" fill="#191c26"/>
      <rect x="32" y="3" width="4" height="7" fill="#94a3b8"/>
      <rect x="33" y="5" width="2" height="4" fill="#fbcfe8"/>

      <!-- Cabeça & Juba de Lobo -->
      <rect x="13" y="8" width="22" height="15" fill="#cbd5e1"/>
      <rect x="11" y="11" width="26" height="11" fill="#e2e8f0"/>
      <rect x="7" y="15" width="5" height="6" fill="#94a3b8"/>
      <rect x="36" y="15" width="5" height="6" fill="#94a3b8"/>

      <!-- Sobrancelhas e Olhos de Âmbar com Cicatriz Vermelha -->
      <rect x="14" y="12" width="5" height="2" fill="#475569"/>
      <rect x="29" y="12" width="5" height="2" fill="#475569"/>
      <rect x="15" y="14" width="4" height="3" fill="#d97706"/>
      <rect x="16" y="14" width="2" height="3" fill="#f59e0b"/>
      <rect x="15" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="29" y="14" width="4" height="3" fill="#d97706"/>
      <rect x="30" y="14" width="2" height="3" fill="#f59e0b"/>
      <rect x="30" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="31" y="11" width="1" height="8" fill="#dc2626"/>

      <!-- Focinho Forte com Nariz Preto e Presas -->
      <rect x="18" y="16" width="12" height="6" fill="#f8fafc"/>
      <rect x="21" y="17" width="6" height="3" fill="#0f172a"/>
      <rect x="22" y="20" width="4" height="1" fill="#1e293b"/>

      <!-- Cachecol Azul Celeste Ondulando ao Vento -->
      <rect x="12" y="22" width="24" height="5" fill="#38bdf8"/>
      <rect x="14" y="23" width="20" height="3" fill="#0284c7"/>
      <rect x="7" y="24" width="6" height="8" fill="#38bdf8"/>

      <!-- PEITORAL MUSCULOSO SARADO & ARREIOS DE COURO -->
      <rect x="6" y="27" width="36" height="21" fill="#cbd5e1"/>
      <rect x="13" y="28" width="22" height="15" fill="#e2e8f0"/>
      <rect x="15" y="30" width="8" height="9" fill="#f8fafc"/>
      <rect x="25" y="30" width="8" height="9" fill="#f8fafc"/>
      <rect x="23" y="29" width="2" height="14" fill="#94a3b8"/>
      <!-- Correias de Couro em X sobre os Peitorais -->
      <rect x="14" y="29" width="3" height="16" fill="#78350f"/>
      <rect x="31" y="29" width="3" height="16" fill="#78350f"/>
      <rect x="14" y="35" width="20" height="2" fill="#ca8a04"/>
      <rect x="23" y="34" width="2" height="4" fill="#facc15"/>
      <rect x="16" y="42" width="16" height="6" fill="#e2e8f0"/>
      <rect x="17" y="44" width="14" height="1" fill="#94a3b8"/>
    </svg>

  {:else if charKey === 'bear'}
    <!-- =============================================================== -->
    <!-- KORGN: URSO GUERREIRO TANQUE (48x48 CLOSE-UP BUST • HUNK)       -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#201309"/>
      <rect x="0" y="36" width="48" height="12" fill="#120a04"/>

      <!-- Orelhas Redondas de Urso -->
      <rect x="8" y="3" width="6" height="6" fill="#78350f"/>
      <rect x="9" y="4" width="4" height="4" fill="#fed7aa"/>
      <rect x="34" y="3" width="6" height="6" fill="#78350f"/>
      <rect x="35" y="4" width="4" height="4" fill="#fed7aa"/>

      <!-- Cabeça Maciça e Barba de Grizzly -->
      <rect x="11" y="7" width="26" height="17" fill="#78350f"/>
      <rect x="9" y="10" width="30" height="13" fill="#92400e"/>
      <rect x="13" y="9" width="22" height="14" fill="#b45309"/>

      <!-- Olhos e Sobrancelhas Fortes -->
      <rect x="14" y="13" width="5" height="2" fill="#451a03"/>
      <rect x="29" y="13" width="5" height="2" fill="#451a03"/>
      <rect x="15" y="15" width="3" height="3" fill="#facc15"/>
      <rect x="15" y="15" width="1" height="1" fill="#ffffff"/>
      <rect x="30" y="15" width="3" height="3" fill="#facc15"/>
      <rect x="30" y="15" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Largo com Nariz Negro -->
      <rect x="17" y="18" width="14" height="8" fill="#d97706"/>
      <rect x="19" y="19" width="10" height="5" fill="#fed7aa"/>
      <rect x="20" y="19" width="8" height="3" fill="#1c1917"/>
      <rect x="22" y="23" width="4" height="1" fill="#451a03"/>

      <!-- OMBREIRAS COLOSSAIS COM CRAVOS & PEITORAL GIGANTE -->
      <rect x="1" y="24" width="12" height="18" fill="#ca8a04"/>
      <rect x="3" y="26" width="8" height="14" fill="#facc15"/>
      <rect x="5" y="29" width="4" height="4" fill="#fef08a"/>
      <rect x="35" y="24" width="12" height="18" fill="#ca8a04"/>
      <rect x="37" y="26" width="8" height="14" fill="#facc15"/>
      <rect x="39" y="29" width="4" height="4" fill="#fef08a"/>

      <!-- Peitoral Muscular com Arnês Pesado -->
      <rect x="12" y="26" width="24" height="22" fill="#78350f"/>
      <rect x="14" y="28" width="20" height="19" fill="#92400e"/>
      <rect x="23" y="27" width="2" height="18" fill="#451a03"/>
      <rect x="13" y="29" width="4" height="17" fill="#ca8a04"/>
      <rect x="31" y="29" width="4" height="17" fill="#ca8a04"/>
      <rect x="13" y="36" width="22" height="3" fill="#713f12"/>
    </svg>

  {:else}
    <!-- =============================================================== -->
    <!-- KAEL: KITSUNE RAPOSA ALQUIMISTA (48x48 CLOSE-UP BUST • SLY/SFW)  -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 48" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="48" fill="#1c0f29"/>
      <rect x="0" y="36" width="48" height="12" fill="#11071c"/>

      <!-- Cauda com Fogo Violeta ao Fundo -->
      <rect x="3" y="14" width="6" height="24" fill="#ea580c"/>
      <rect x="2" y="10" width="5" height="8" fill="#c084fc"/>
      <rect x="39" y="18" width="6" height="20" fill="#ea580c"/>

      <!-- Orelhas Grandes de Raposa com Pontas Pretas -->
      <rect x="9" y="2" width="6" height="9" fill="#1c1917"/>
      <rect x="11" y="6" width="5" height="6" fill="#ea580c"/>
      <rect x="12" y="7" width="3" height="4" fill="#fed7aa"/>
      <rect x="33" y="2" width="6" height="9" fill="#1c1917"/>
      <rect x="32" y="6" width="5" height="6" fill="#ea580c"/>
      <rect x="33" y="7" width="3" height="4" fill="#fed7aa"/>

      <!-- Óculos Alquímicos de Latão na Testa -->
      <rect x="13" y="6" width="22" height="4" fill="#ca8a04"/>
      <rect x="15" y="5" width="7" height="5" fill="#facc15"/>
      <rect x="17" y="6" width="3" height="3" fill="#c084fc"/>
      <rect x="26" y="5" width="7" height="5" fill="#facc15"/>
      <rect x="28" y="6" width="3" height="3" fill="#c084fc"/>

      <!-- Rosto e Sorriso Charmoso com Olhos Dourados -->
      <rect x="14" y="10" width="20" height="13" fill="#ea580c"/>
      <rect x="14" y="15" width="6" height="6" fill="#fff7ed"/>
      <rect x="28" y="15" width="6" height="6" fill="#fff7ed"/>

      <rect x="16" y="13" width="4" height="3" fill="#d97706"/>
      <rect x="17" y="13" width="2" height="3" fill="#f59e0b"/>
      <rect x="17" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="13" width="4" height="3" fill="#d97706"/>
      <rect x="29" y="13" width="2" height="3" fill="#f59e0b"/>
      <rect x="30" y="13" width="1" height="1" fill="#ffffff"/>

      <rect x="20" y="17" width="8" height="4" fill="#fed7aa"/>
      <rect x="23" y="17" width="2" height="2" fill="#1c1917"/>
      <rect x="21" y="20" width="6" height="1" fill="#7c2d12"/>
      <rect x="22" y="20" width="1" height="1" fill="#ffffff"/>

      <!-- MANTO ALQUÍMICO ABERTO & DECOTE EM V REVELANDO CLAVÍCULAS -->
      <rect x="15" y="24" width="18" height="12" fill="#fff7ed"/>
      <rect x="17" y="25" width="14" height="10" fill="#fed7aa"/>
      <rect x="23" y="25" width="2" height="8" fill="#e2b184"/>

      <!-- Manto Violeta Aberto nas Laterais -->
      <rect x="10" y="25" width="7" height="18" fill="#581c87"/>
      <rect x="11" y="26" width="5" height="16" fill="#7e22ce"/>
      <rect x="31" y="25" width="7" height="18" fill="#581c87"/>
      <rect x="32" y="26" width="5" height="16" fill="#7e22ce"/>

      <!-- Frasco de Azoth Borbulhante Rosa / Magenta Seguro perto do Peito -->
      <rect x="31" y="32" width="7" height="9" fill="#f43f5e"/>
      <rect x="33" y="30" width="4" height="3" fill="#ca8a04"/>
      <rect x="34" y="34" width="2" height="2" fill="#ffffff"/>

      <!-- Cinto com Fivelas de Bronze -->
      <rect x="13" y="42" width="22" height="5" fill="#ca8a04"/>
      <rect x="22" y="41" width="4" height="6" fill="#facc15"/>
    </svg>
  {/if}
</div>
