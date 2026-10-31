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
  <!-- Grade de Textura CRT / Scanline de Pixel Art Retrô 16/32-Bit -->
  <div class="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.6)_50%)] bg-[length:100%_4px] z-10"></div>

  {#if charKey === 'holstaur'}
    <!-- =============================================================== -->
    <!-- BRENA: HOLSTAUR COW ANTHRO (48x64 HALF-BODY - CLOUD MEADOW LEWD/SFW) -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo de Pasto Pastoral Crepuscular -->
      <rect width="48" height="64" fill="#1b291d"/>
      <rect x="0" y="48" width="48" height="16" fill="#111c12"/>

      <!-- Chifres Bovinos com Flor Rosa -->
      <rect x="11" y="4" width="3" height="6" fill="#ca8a04"/>
      <rect x="9" y="3" width="3" height="3" fill="#fde68a"/>
      <rect x="7" y="1" width="3" height="3" fill="#ffffff"/>
      <rect x="34" y="4" width="3" height="6" fill="#ca8a04"/>
      <rect x="36" y="3" width="3" height="3" fill="#fde68a"/>
      <rect x="38" y="1" width="3" height="3" fill="#ffffff"/>
      <!-- Flor de hibisco no chifre esquerdo -->
      <rect x="12" y="7" width="5" height="5" fill="#f472b6"/>
      <rect x="13" y="8" width="3" height="3" fill="#db2777"/>
      <rect x="14" y="9" width="1" height="1" fill="#fef08a"/>

      <!-- Orelhas Bovinas Caídas nas Laterais -->
      <rect x="3" y="14" width="8" height="5" fill="#f8fafc"/>
      <rect x="4" y="15" width="6" height="3" fill="#fbcfe8"/>
      <rect x="37" y="14" width="8" height="5" fill="#f8fafc"/>
      <rect x="38" y="15" width="6" height="3" fill="#fbcfe8"/>

      <!-- Cabelos e Tranças Castanhas Volumosas -->
      <rect x="13" y="7" width="22" height="14" fill="#542b11"/>
      <rect x="15" y="6" width="18" height="4" fill="#783c18"/>
      <!-- Trança Esquerda Descendo -->
      <rect x="7" y="19" width="5" height="24" fill="#542b11"/>
      <rect x="8" y="20" width="3" height="22" fill="#783c18"/>
      <rect x="7" y="42" width="5" height="2" fill="#f472b6"/> <!-- Laço rosa -->
      <!-- Trança Direita Descendo -->
      <rect x="36" y="19" width="5" height="24" fill="#542b11"/>
      <rect x="37" y="20" width="3" height="22" fill="#783c18"/>
      <rect x="36" y="42" width="5" height="2" fill="#f472b6"/> <!-- Laço rosa -->

      <!-- Rosto com Pelagem Branca e Mancha Holstaur no Olho Esquerdo -->
      <rect x="15" y="10" width="18" height="15" fill="#f8fafc"/>
      <rect x="15" y="11" width="7" height="8" fill="#334155"/>
      <rect x="16" y="12" width="5" height="6" fill="#1e293b"/>

      <!-- Olhos Castanhos Meigos e Expressivos com Cílios -->
      <rect x="17" y="14" width="3" height="4" fill="#78350f"/>
      <rect x="17" y="14" width="2" height="2" fill="#d97706"/>
      <rect x="17" y="14" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->
      <rect x="16" y="13" width="4" height="1" fill="#21140e"/> <!-- Cílios -->

      <rect x="28" y="14" width="3" height="4" fill="#78350f"/>
      <rect x="29" y="14" width="2" height="2" fill="#d97706"/>
      <rect x="28" y="14" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->
      <rect x="28" y="13" width="4" height="1" fill="#21140e"/> <!-- Cílios -->

      <!-- Focinho Bovino Macio Rosado com Blush -->
      <rect x="17" y="19" width="14" height="6" fill="#fbcfe8"/>
      <rect x="19" y="20" width="10" height="4" fill="#f472b6"/>
      <rect x="20" y="22" width="2" height="1" fill="#881337"/> <!-- Narina esq -->
      <rect x="26" y="22" width="2" height="1" fill="#881337"/> <!-- Narina dir -->
      <!-- Blush suave nas bochechas -->
      <rect x="13" y="18" width="3" height="2" fill="#fda4af"/>
      <rect x="32" y="18" width="3" height="2" fill="#fda4af"/>

      <!-- Pescoço e Gargantilha com Sino de Bronze -->
      <rect x="20" y="25" width="8" height="4" fill="#f8fafc"/>
      <rect x="18" y="27" width="12" height="2" fill="#78350f"/> <!-- Coleira de couro -->
      <!-- Sino de Bronze entre as clavículas -->
      <rect x="21" y="28" width="6" height="5" fill="#facc15"/>
      <rect x="22" y="29" width="4" height="3" fill="#ca8a04"/>
      <rect x="23" y="32" width="2" height="1" fill="#713f12"/> <!-- Badalo -->

      <!-- BUSTO VOLUPTUOSO & ESCOTE GENEROSO (LEWD MAS SFW) -->
      <!-- Ombro e Braço Esquerdo -->
      <rect x="9" y="29" width="6" height="14" fill="#f8fafc"/>
      <rect x="10" y="32" width="4" height="5" fill="#1e293b"/> <!-- Mancha preta no ombro -->
      <!-- Ombro e Braço Direito -->
      <rect x="33" y="29" width="6" height="14" fill="#f8fafc"/>
      <rect x="34" y="36" width="4" height="5" fill="#1e293b"/> <!-- Mancha preta -->

      <!-- Curva do Busto (Cleavage e Seios Fartos Holstaur) -->
      <rect x="14" y="30" width="20" height="12" fill="#f8fafc"/>
      <!-- Sombra e Contorno do decote generoso -->
      <rect x="23" y="30" width="2" height="8" fill="#e2e8f0"/>
      <rect x="23" y="32" width="2" height="5" fill="#cbd5e1"/>
      <rect x="16" y="31" width="7" height="8" fill="#ffffff"/> <!-- Realce do seio esquerdo -->
      <rect x="25" y="31" width="7" height="8" fill="#ffffff"/> <!-- Realce do seio direito -->
      <!-- Sombra inferior dos seios -->
      <rect x="15" y="38" width="8" height="2" fill="#cbd5e1"/>
      <rect x="25" y="38" width="8" height="2" fill="#cbd5e1"/>

      <!-- CORPETE DE COURO PASTORAL AJUSTADO (UNDERBUST CORSET) -->
      <rect x="14" y="40" width="20" height="14" fill="#9a3412"/>
      <rect x="16" y="41" width="16" height="12" fill="#c2410c"/>
      <!-- Linhas do espartilho e amarração com cordões dourados -->
      <rect x="21" y="41" width="6" height="12" fill="#7c2d12"/>
      <!-- Ilhós e laços dourados entrelaçados -->
      <rect x="22" y="42" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="42" width="1" height="2" fill="#facc15"/>
      <rect x="23" y="43" width="2" height="1" fill="#fde047"/>
      <rect x="22" y="45" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="45" width="1" height="2" fill="#facc15"/>
      <rect x="23" y="46" width="2" height="1" fill="#fde047"/>
      <rect x="22" y="48" width="1" height="2" fill="#facc15"/>
      <rect x="25" y="48" width="1" height="2" fill="#facc15"/>
      <rect x="23" y="49" width="2" height="1" fill="#fde047"/>

      <!-- CINTURA FINA & QUADRIS LARGOS BOVINOS -->
      <rect x="13" y="52" width="22" height="12" fill="#f8fafc"/>
      <!-- Curva dos quadris generosos -->
      <rect x="10" y="54" width="4" height="10" fill="#f8fafc"/>
      <rect x="34" y="54" width="4" height="10" fill="#f8fafc"/>
      <!-- Manchas pretas naturais nos quadris -->
      <rect x="11" y="56" width="3" height="6" fill="#1e293b"/>
      <rect x="34" y="57" width="3" height="5" fill="#1e293b"/>
      <!-- Cinto rústico com fivela de bronze -->
      <rect x="13" y="52" width="22" height="2" fill="#451a03"/>
      <rect x="22" y="51" width="4" height="4" fill="#facc15"/>
      <rect x="23" y="52" width="2" height="2" fill="#ca8a04"/>
    </svg>

  {:else if charKey === 'cat'}
    <!-- =============================================================== -->
    <!-- ELARA: MÍSTICA FELINA (48x64 HALF-BODY - SULTRY/SFW CROP KIMONO) -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#141c2b"/>
      <rect x="0" y="48" width="48" height="16" fill="#0d131e"/>

      <!-- Cauda Felina Sinuosa ao Fundo à Direita -->
      <rect x="39" y="32" width="4" height="26" fill="#facc15"/>
      <rect x="42" y="30" width="3" height="16" fill="#ca8a04"/>
      <rect x="38" y="26" width="4" height="8" fill="#eab308"/>
      <rect x="37" y="24" width="3" height="4" fill="#fde047"/> <!-- Ponta fofa da cauda -->

      <!-- Orelhas de Gato com Guizos de Ouro -->
      <rect x="11" y="4" width="5" height="8" fill="#ca8a04"/>
      <rect x="12" y="5" width="3" height="6" fill="#f472b6"/>
      <rect x="8" y="11" width="3" height="3" fill="#facc15"/> <!-- Guizo esq -->
      <rect x="32" y="4" width="5" height="8" fill="#ca8a04"/>
      <rect x="33" y="5" width="3" height="6" fill="#f472b6"/>
      <rect x="37" y="11" width="3" height="3" fill="#facc15"/> <!-- Guizo dir -->

      <!-- Cabelos Loiro-Platinado Sedosos e Franja -->
      <rect x="13" y="8" width="22" height="16" fill="#fde047"/>
      <rect x="15" y="7" width="18" height="4" fill="#fef08a"/>
      <!-- Mechas laterais que emolduram o rosto -->
      <rect x="10" y="16" width="4" height="16" fill="#fde047"/>
      <rect x="34" y="16" width="4" height="16" fill="#fde047"/>
      <!-- Mancha calico charmosa no cabelo direito -->
      <rect x="30" y="8" width="4" height="6" fill="#78350f"/>

      <!-- Rosto com Pele Clara e Olhos Esmeralda Místicos -->
      <rect x="14" y="12" width="20" height="13" fill="#ffedd5"/>
      <rect x="16" y="13" width="16" height="11" fill="#fffbeb"/>

      <!-- Olhos Esmeralda com Delineado Feline Eyeliner Marcante -->
      <rect x="16" y="15" width="4" height="3" fill="#047857"/>
      <rect x="17" y="15" width="2" height="3" fill="#10b981"/>
      <rect x="18" y="15" width="1" height="3" fill="#064e3b"/> <!-- Fenda pupilar -->
      <rect x="17" y="15" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->
      <rect x="15" y="14" width="6" height="1" fill="#1e1336"/> <!-- Delineado gatinho -->

      <rect x="28" y="15" width="4" height="3" fill="#047857"/>
      <rect x="29" y="15" width="2" height="3" fill="#10b981"/>
      <rect x="29" y="15" width="1" height="3" fill="#064e3b"/> <!-- Fenda pupilar -->
      <rect x="30" y="15" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->
      <rect x="27" y="14" width="6" height="1" fill="#1e1336"/> <!-- Delineado gatinho -->

      <!-- Focinho, Narizinho Rosa e Sorriso Felino Sensual -->
      <rect x="23" y="19" width="2" height="2" fill="#f472b6"/>
      <rect x="21" y="21" width="6" height="1" fill="#b45309"/>
      <!-- Bigodes sutis -->
      <rect x="10" y="20" width="3" height="1" fill="#ca8a04"/>
      <rect x="35" y="20" width="3" height="1" fill="#ca8a04"/>

      <!-- Coleira Choker com Guizo -->
      <rect x="20" y="26" width="8" height="2" fill="#1e1336"/>
      <rect x="23" y="27" width="2" height="2" fill="#facc15"/>

      <!-- SILHUETA SEDUTORA: TOP QUIMONO CROPPED & DECOTE EM V -->
      <!-- Clavículas e Ombros Nus -->
      <rect x="9" y="28" width="6" height="12" fill="#ffedd5"/>
      <rect x="33" y="28" width="6" height="12" fill="#ffedd5"/>
      <rect x="15" y="28" width="18" height="4" fill="#ffedd5"/>

      <!-- Top Quimono Celeste com Estampa de Nuvens Cruzado sobre o Busto -->
      <rect x="13" y="31" width="22" height="11" fill="#38bdf8"/>
      <!-- Decote em V elegante revelando o busto gracioso -->
      <rect x="21" y="29" width="6" height="8" fill="#ffedd5"/>
      <rect x="23" y="32" width="2" height="4" fill="#fdba74"/> <!-- Sombra do decote -->
      <rect x="15" y="32" width="6" height="8" fill="#7dd3fc"/>
      <rect x="27" y="32" width="6" height="8" fill="#7dd3fc"/>
      <!-- Bordado de nuvem dourada no quimono -->
      <rect x="16" y="35" width="4" height="2" fill="#fef08a"/>
      <rect x="28" y="35" width="4" height="2" fill="#fef08a"/>

      <!-- Faixa Obi Vermelha com Nó de Seda -->
      <rect x="14" y="41" width="20" height="3" fill="#be123c"/>
      <rect x="22" y="40" width="4" height="5" fill="#f43f5e"/>
      <rect x="23" y="41" width="2" height="3" fill="#facc15"/>

      <!-- BARRIGA / MIDRIFF EXPOSTO & UMBIGO CHARMOSO (SFW LEWD) -->
      <rect x="15" y="44" width="18" height="9" fill="#ffedd5"/>
      <rect x="16" y="45" width="16" height="7" fill="#fffbeb"/>
      <!-- Sombra da curva da cintura fina de gatinha -->
      <rect x="14" y="45" width="2" height="7" fill="#fdba74"/>
      <rect x="32" y="45" width="2" height="7" fill="#fdba74"/>
      <!-- Umbigo delineado -->
      <rect x="23" y="48" width="2" height="2" fill="#e2b184"/>
      <rect x="24" y="49" width="1" height="1" fill="#c28b58"/>

      <!-- QUADRIS LARGOS & SAIA BAIXA COM FENDA LATERAL -->
      <rect x="12" y="53" width="24" height="11" fill="#0284c7"/>
      <rect x="14" y="54" width="20" height="10" fill="#0369a1"/>
      <!-- Fenda revelando a coxa esquerda -->
      <rect x="14" y="56" width="4" height="8" fill="#ffedd5"/>
    </svg>

  {:else if charKey === 'harpy'}
    <!-- =============================================================== -->
    <!-- ARIA: HARPIA AVIADORA (48x64 HALF-BODY - CROPPED TOP & ASAS)   -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#2d1c10"/>
      <rect x="0" y="48" width="48" height="16" fill="#1b1007"/>

      <!-- Asas de Penas Abertas ao Fundo -->
      <rect x="2" y="14" width="6" height="28" fill="#ca8a04"/>
      <rect x="4" y="12" width="5" height="32" fill="#eab308"/>
      <rect x="1" y="20" width="4" height="20" fill="#a16207"/>
      <rect x="40" y="14" width="6" height="28" fill="#ca8a04"/>
      <rect x="39" y="12" width="5" height="32" fill="#eab308"/>
      <rect x="43" y="20" width="4" height="20" fill="#a16207"/>

      <!-- Penas Douradas e Topete Espetado -->
      <rect x="14" y="5" width="20" height="14" fill="#facc15"/>
      <rect x="18" y="2" width="12" height="5" fill="#fde047"/>
      <rect x="12" y="8" width="6" height="8" fill="#eab308"/>
      <rect x="30" y="8" width="6" height="8" fill="#eab308"/>

      <!-- Óculos de Aviador na Testa com Reflexo nas Lentes -->
      <rect x="13" y="6" width="22" height="4" fill="#451a03"/>
      <rect x="15" y="5" width="7" height="5" fill="#ca8a04"/>
      <rect x="17" y="6" width="4" height="3" fill="#7dd3fc"/>
      <rect x="18" y="7" width="2" height="1" fill="#ffffff"/> <!-- Brilho lente -->
      <rect x="26" y="5" width="7" height="5" fill="#ca8a04"/>
      <rect x="28" y="6" width="4" height="3" fill="#7dd3fc"/>
      <rect x="29" y="7" width="2" height="1" fill="#ffffff"/> <!-- Brilho lente -->

      <!-- Rosto e Olhos Turquesa Vivos -->
      <rect x="15" y="11" width="18" height="12" fill="#fed7aa"/>
      <rect x="17" y="12" width="14" height="10" fill="#ffedd5"/>
      <rect x="17" y="14" width="4" height="3" fill="#0f766e"/>
      <rect x="18" y="14" width="2" height="3" fill="#14b8a6"/>
      <rect x="18" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="27" y="14" width="4" height="3" fill="#0f766e"/>
      <rect x="28" y="14" width="2" height="3" fill="#14b8a6"/>
      <rect x="28" y="14" width="1" height="1" fill="#ffffff"/>

      <!-- Bico Dourado Fino com Sorriso Atrevido -->
      <rect x="22" y="17" width="4" height="3" fill="#f59e0b"/>
      <rect x="23" y="19" width="2" height="2" fill="#d97706"/>

      <!-- Gola de Lã de Carneiro Branca Felpuda -->
      <rect x="14" y="24" width="20" height="4" fill="#f1f5f9"/>
      <rect x="16" y="25" width="16" height="3" fill="#ffffff"/>

      <!-- JAQUETA DE AVIADOR CROPPED & TOP BANDEAU JUSTO -->
      <rect x="10" y="27" width="28" height="12" fill="#78350f"/>
      <!-- Top Branco justo que realça o busto -->
      <rect x="17" y="27" width="14" height="10" fill="#f8fafc"/>
      <rect x="19" y="28" width="10" height="8" fill="#ffffff"/>
      <rect x="23" y="28" width="2" height="8" fill="#cbd5e1"/> <!-- Decote central -->
      <!-- Coletes de couro abertos nas laterais -->
      <rect x="11" y="28" width="6" height="11" fill="#92400e"/>
      <rect x="31" y="28" width="6" height="11" fill="#92400e"/>

      <!-- BARRIGA SARADA / MIDRIFF TONIFICADO EXPOSTO -->
      <rect x="17" y="38" width="14" height="9" fill="#fed7aa"/>
      <rect x="18" y="39" width="12" height="7" fill="#ffedd5"/>
      <rect x="23" y="43" width="2" height="2" fill="#c28b58"/> <!-- Umbigo -->

      <!-- CINTURÃO DE PILOTO COM FIVELA DE LATÃO & SHORTS/PLUMAGEM -->
      <rect x="13" y="47" width="22" height="4" fill="#451a03"/>
      <rect x="22" y="46" width="4" height="5" fill="#facc15"/>
      <rect x="12" y="51" width="24" height="13" fill="#b45309"/>
      <rect x="14" y="53" width="20" height="11" fill="#ca8a04"/>
    </svg>

  {:else if charKey === 'dragon'}
    <!-- =============================================================== -->
    <!-- KALLISTA: VALQUÍRIA DRACONIANA (48x64 HALF-BODY - ARMADURA NOBRE) -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#290e15"/>
      <rect x="0" y="48" width="48" height="16" fill="#17060b"/>

      <!-- Cauda Draconiana Muscular ao Fundo à Esquerda -->
      <rect x="4" y="28" width="5" height="26" fill="#be123c"/>
      <rect x="6" y="24" width="4" height="18" fill="#e11d48"/>
      <rect x="2" y="46" width="5" height="12" fill="#881337"/>
      <rect x="1" y="54" width="3" height="6" fill="#facc15"/> <!-- Espigão dourado na cauda -->

      <!-- Chifres Draconianos Dourados Majestosos -->
      <rect x="10" y="3" width="3" height="8" fill="#ca8a04"/>
      <rect x="8" y="1" width="3" height="4" fill="#facc15"/>
      <rect x="6" y="0" width="3" height="2" fill="#fef08a"/>
      <rect x="35" y="3" width="3" height="8" fill="#ca8a04"/>
      <rect x="37" y="1" width="3" height="4" fill="#facc15"/>
      <rect x="39" y="0" width="3" height="2" fill="#fef08a"/>

      <!-- Cabeça com Escamas Carmesim Nobres -->
      <rect x="14" y="8" width="20" height="16" fill="#be123c"/>
      <rect x="16" y="9" width="16" height="14" fill="#e11d48"/>
      <rect x="18" y="10" width="12" height="11" fill="#fb7185"/>

      <!-- Olhos Dourados com Fenda Reptiliana Intensa -->
      <rect x="17" y="14" width="4" height="3" fill="#ca8a04"/>
      <rect x="18" y="14" width="2" height="3" fill="#facc15"/>
      <rect x="19" y="14" width="1" height="3" fill="#451a03"/> <!-- Fenda -->
      <rect x="18" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="27" y="14" width="4" height="3" fill="#ca8a04"/>
      <rect x="28" y="14" width="2" height="3" fill="#facc15"/>
      <rect x="29" y="14" width="1" height="3" fill="#451a03"/> <!-- Fenda -->
      <rect x="29" y="14" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Elegante com Narinas e Sorriso Orgulhoso -->
      <rect x="20" y="19" width="8" height="5" fill="#e11d48"/>
      <rect x="21" y="21" width="2" height="1" fill="#881337"/>
      <rect x="25" y="21" width="2" height="1" fill="#881337"/>
      <rect x="21" y="23" width="6" height="1" fill="#4c0519"/>

      <!-- COURAÇA DE ESCAMAS DE DRAGÃO JUSTA AO BUSTO -->
      <rect x="10" y="26" width="28" height="16" fill="#881337"/>
      <rect x="13" y="27" width="22" height="14" fill="#9f1239"/>
      <!-- Decote Coração Dourado Realçando o Busto Escultural -->
      <rect x="15" y="29" width="8" height="10" fill="#be123c"/>
      <rect x="25" y="29" width="8" height="10" fill="#be123c"/>
      <rect x="23" y="29" width="2" height="8" fill="#4c0519"/> <!-- Linha do decote -->
      <rect x="15" y="28" width="18" height="2" fill="#facc15"/> <!-- Borda dourada -->
      <rect x="23" y="29" width="2" height="3" fill="#facc15"/>

      <!-- CINTURA DEFINIDA & QUADRIS FORTES -->
      <rect x="14" y="42" width="20" height="10" fill="#e11d48"/>
      <!-- Placas de armadura sobre a cintura -->
      <rect x="16" y="43" width="16" height="8" fill="#881337"/>
      <rect x="18" y="44" width="12" height="6" fill="#9f1239"/>
      <rect x="23" y="45" width="2" height="4" fill="#facc15"/>

      <!-- Saiote de Placas e Lança Dourada Cruzada -->
      <rect x="12" y="52" width="24" height="12" fill="#881337"/>
      <rect x="14" y="53" width="20" height="11" fill="#be123c"/>
      <!-- Haste da lança dourada -->
      <rect x="7" y="56" width="3" height="8" fill="#ca8a04"/>
      <rect x="38" y="8" width="3" height="8" fill="#ca8a04"/>
      <rect x="39" y="4" width="2" height="4" fill="#fef08a"/>
    </svg>

  {:else if charKey === 'wolf'}
    <!-- =============================================================== -->
    <!-- FENRIR: LUPINO GUERREIRO (48x64 HALF-BODY - PEITORAL SARADO)   -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#141926"/>
      <rect x="0" y="48" width="48" height="16" fill="#0c101a"/>

      <!-- Orelhas Pontudas de Lobo -->
      <rect x="11" y="2" width="4" height="10" fill="#191c26"/>
      <rect x="13" y="3" width="4" height="8" fill="#94a3b8"/>
      <rect x="14" y="5" width="2" height="5" fill="#fbcfe8"/>
      <rect x="33" y="2" width="4" height="10" fill="#191c26"/>
      <rect x="31" y="3" width="4" height="8" fill="#94a3b8"/>
      <rect x="32" y="5" width="2" height="5" fill="#fbcfe8"/>

      <!-- Cabeça e Juba de Lobo -->
      <rect x="14" y="9" width="20" height="15" fill="#cbd5e1"/>
      <rect x="12" y="12" width="24" height="11" fill="#e2e8f0"/>
      <!-- Tufos das bochechas -->
      <rect x="8" y="16" width="5" height="6" fill="#94a3b8"/>
      <rect x="35" y="16" width="5" height="6" fill="#94a3b8"/>

      <!-- Sobrancelhas e Olhos de Âmbar com Cicatriz -->
      <rect x="15" y="13" width="5" height="2" fill="#475569"/>
      <rect x="28" y="13" width="5" height="2" fill="#475569"/>
      <rect x="16" y="15" width="4" height="3" fill="#d97706"/>
      <rect x="17" y="15" width="2" height="3" fill="#f59e0b"/>
      <rect x="16" y="15" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="15" width="4" height="3" fill="#d97706"/>
      <rect x="29" y="15" width="2" height="3" fill="#f59e0b"/>
      <rect x="29" y="15" width="1" height="1" fill="#ffffff"/>
      <rect x="30" y="12" width="1" height="8" fill="#dc2626"/> <!-- Cicatriz -->

      <!-- Focinho Lupino Forte -->
      <rect x="19" y="17" width="10" height="6" fill="#f8fafc"/>
      <rect x="21" y="18" width="6" height="3" fill="#0f172a"/> <!-- Nariz -->
      <rect x="22" y="21" width="4" height="1" fill="#1e293b"/>

      <!-- Cachecol Eólico Azul Celeste Ondulando -->
      <rect x="13" y="24" width="22" height="5" fill="#38bdf8"/>
      <rect x="15" y="25" width="18" height="3" fill="#0284c7"/>
      <rect x="8" y="26" width="6" height="8" fill="#38bdf8"/> <!-- Cauda do cachecol -->

      <!-- PEITORAL MUSCULOSO SARADO & ARREIOS DE COURO (LEWD/SFW HUNK) -->
      <!-- Ombros e Braços Fortes -->
      <rect x="7" y="29" width="8" height="18" fill="#cbd5e1"/>
      <rect x="33" y="29" width="8" height="18" fill="#cbd5e1"/>
      <!-- Peitoral Muscular com Pelagem -->
      <rect x="14" y="29" width="20" height="14" fill="#e2e8f0"/>
      <!-- Definição dos peitorais -->
      <rect x="16" y="32" width="7" height="8" fill="#f8fafc"/>
      <rect x="25" y="32" width="7" height="8" fill="#f8fafc"/>
      <rect x="23" y="31" width="2" height="12" fill="#94a3b8"/> <!-- Linha central do tórax -->
      <!-- Correias de Couro do Arreio X cruzando os peitorais -->
      <rect x="15" y="30" width="3" height="14" fill="#78350f"/>
      <rect x="30" y="30" width="3" height="14" fill="#78350f"/>
      <rect x="15" y="35" width="18" height="2" fill="#ca8a04"/>
      <rect x="23" y="34" width="2" height="4" fill="#facc15"/> <!-- Fivela dourada -->

      <!-- ABDÔMEN DEFINIDO (SIX-PACK) & CINTURA V-TAPER -->
      <rect x="16" y="44" width="16" height="11" fill="#e2e8f0"/>
      <!-- Divisões do abdômen sarado -->
      <rect x="23" y="44" width="2" height="11" fill="#94a3b8"/>
      <rect x="18" y="47" width="12" height="1" fill="#94a3b8"/>
      <rect x="18" y="51" width="12" height="1" fill="#94a3b8"/>

      <!-- Calças de Batalha com Cinto de Bronze -->
      <rect x="13" y="55" width="22" height="9" fill="#1e293b"/>
      <rect x="15" y="55" width="18" height="2" fill="#ca8a04"/>
      <rect x="22" y="54" width="4" height="4" fill="#facc15"/>
    </svg>

  {:else if charKey === 'bear'}
    <!-- =============================================================== -->
    <!-- KORGN: URSO GUERREIRO TANQUE (48x64 HALF-BODY - BRUTO/HUNK)     -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#201309"/>
      <rect x="0" y="48" width="48" height="16" fill="#120a04"/>

      <!-- Orelhas Redondas de Urso -->
      <rect x="9" y="4" width="6" height="6" fill="#78350f"/>
      <rect x="10" y="5" width="4" height="4" fill="#fed7aa"/>
      <rect x="33" y="4" width="6" height="6" fill="#78350f"/>
      <rect x="34" y="5" width="4" height="4" fill="#fed7aa"/>

      <!-- Cabeça Maciça e Barba de Grizzly -->
      <rect x="12" y="8" width="24" height="18" fill="#78350f"/>
      <rect x="10" y="11" width="28" height="13" fill="#92400e"/>
      <rect x="14" y="10" width="20" height="14" fill="#b45309"/>

      <!-- Olhos Determinados e Sobrancelhas Fortes -->
      <rect x="15" y="14" width="5" height="2" fill="#451a03"/>
      <rect x="28" y="14" width="5" height="2" fill="#451a03"/>
      <rect x="16" y="16" width="3" height="3" fill="#facc15"/>
      <rect x="16" y="16" width="1" height="1" fill="#ffffff"/>
      <rect x="29" y="16" width="3" height="3" fill="#facc15"/>
      <rect x="29" y="16" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Largo com Nariz Negro e Sorriso Firme -->
      <rect x="17" y="19" width="14" height="8" fill="#d97706"/>
      <rect x="19" y="20" width="10" height="5" fill="#fed7aa"/>
      <rect x="20" y="20" width="8" height="3" fill="#1c1917"/> <!-- Narizão -->
      <rect x="22" y="24" width="4" height="1" fill="#451a03"/>

      <!-- OMBREIRAS COLOSSAIS DE BRONZE COM CRAVOS -->
      <rect x="2" y="26" width="11" height="16" fill="#ca8a04"/>
      <rect x="4" y="28" width="7" height="12" fill="#facc15"/>
      <rect x="6" y="31" width="3" height="3" fill="#fef08a"/> <!-- Cravo esq -->
      <rect x="35" y="26" width="11" height="16" fill="#ca8a04"/>
      <rect x="37" y="28" width="7" height="12" fill="#facc15"/>
      <rect x="39" y="31" width="3" height="3" fill="#fef08a"/> <!-- Cravo dir -->

      <!-- PEITORAL GIGANTESCO & TÓRAX PODEROSO -->
      <rect x="13" y="27" width="22" height="18" fill="#78350f"/>
      <rect x="15" y="29" width="18" height="15" fill="#92400e"/>
      <rect x="23" y="28" width="2" height="16" fill="#451a03"/>
      <!-- Correias de Couro do Arnês -->
      <rect x="14" y="30" width="4" height="15" fill="#ca8a04"/>
      <rect x="30" y="30" width="4" height="15" fill="#ca8a04"/>
      <rect x="14" y="36" width="20" height="3" fill="#713f12"/>

      <!-- Cintura Larga e Robusta com Cinto de Titã -->
      <rect x="12" y="47" width="24" height="17" fill="#451a03"/>
      <rect x="14" y="48" width="20" height="4" fill="#ca8a04"/>
      <rect x="21" y="47" width="6" height="6" fill="#facc15"/>
    </svg>

  {:else}
    <!-- =============================================================== -->
    <!-- KAEL: KITSUNE RAPOSA ALQUIMISTA (48x64 HALF-BODY - CHARMOSO)   -->
    <!-- =============================================================== -->
    <svg viewBox="0 0 48 64" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="48" height="64" fill="#1c0f29"/>
      <rect x="0" y="48" width="48" height="16" fill="#11071c"/>

      <!-- Múltiplas Caudas de Raposa Flamejantes com Fogo Violeta -->
      <rect x="2" y="16" width="6" height="24" fill="#ea580c"/>
      <rect x="1" y="12" width="5" height="8" fill="#c084fc"/> <!-- Fogo fátuo esq -->
      <rect x="40" y="16" width="6" height="24" fill="#ea580c"/>
      <rect x="42" y="12" width="5" height="8" fill="#c084fc"/> <!-- Fogo fátuo dir -->
      <rect x="5" y="34" width="7" height="16" fill="#ea580c"/>
      <rect x="36" y="34" width="7" height="16" fill="#ea580c"/>

      <!-- Grandes Orelhas de Raposa com Pontas Pretas -->
      <rect x="9" y="3" width="6" height="10" fill="#1c1917"/>
      <rect x="11" y="7" width="5" height="7" fill="#ea580c"/>
      <rect x="12" y="8" width="3" height="5" fill="#fed7aa"/>
      <rect x="33" y="3" width="6" height="10" fill="#1c1917"/>
      <rect x="32" y="7" width="5" height="7" fill="#ea580c"/>
      <rect x="33" y="8" width="3" height="5" fill="#fed7aa"/>

      <!-- Óculos Alquímicos de Latão na Testa -->
      <rect x="13" y="7" width="22" height="4" fill="#ca8a04"/>
      <rect x="15" y="6" width="7" height="5" fill="#facc15"/>
      <rect x="17" y="7" width="3" height="3" fill="#c084fc"/>
      <rect x="26" y="6" width="7" height="5" fill="#facc15"/>
      <rect x="28" y="7" width="3" height="3" fill="#c084fc"/>

      <!-- Rosto e Sorriso Charmoso com Olhos Dourados -->
      <rect x="14" y="11" width="20" height="13" fill="#ea580c"/>
      <rect x="14" y="16" width="6" height="6" fill="#fff7ed"/> <!-- Bochecha esq -->
      <rect x="28" y="16" width="6" height="6" fill="#fff7ed"/> <!-- Bochecha dir -->

      <rect x="16" y="14" width="4" height="3" fill="#d97706"/>
      <rect x="17" y="14" width="2" height="3" fill="#f59e0b"/>
      <rect x="17" y="14" width="1" height="1" fill="#ffffff"/>
      <rect x="28" y="14" width="4" height="3" fill="#d97706"/>
      <rect x="29" y="14" width="2" height="3" fill="#f59e0b"/>
      <rect x="30" y="14" width="1" height="1" fill="#ffffff"/>

      <rect x="20" y="18" width="8" height="4" fill="#fed7aa"/>
      <rect x="23" y="18" width="2" height="2" fill="#1c1917"/> <!-- Narizinho -->
      <rect x="21" y="21" width="6" height="1" fill="#7c2d12"/> <!-- Sorrisinho com presa -->
      <rect x="22" y="21" width="1" height="1" fill="#ffffff"/> <!-- Presinha -->

      <!-- MANTO ALQUÍMICO ABERTO & PEITO/MIDRIFF CHARMOSO (SFW LEWD) -->
      <!-- Clavículas e Peitoral exposto com decote em V no manto -->
      <rect x="16" y="25" width="16" height="10" fill="#fff7ed"/>
      <rect x="18" y="26" width="12" height="8" fill="#fed7aa"/>
      <rect x="23" y="26" width="2" height="8" fill="#e2b184"/> <!-- Linha do tórax -->

      <!-- Colete / Manto Violeta de Alquimista Aberto -->
      <rect x="11" y="26" width="6" height="18" fill="#581c87"/>
      <rect x="12" y="27" width="5" height="16" fill="#7e22ce"/>
      <rect x="31" y="26" width="6" height="18" fill="#581c87"/>
      <rect x="31" y="27" width="5" height="16" fill="#7e22ce"/>

      <!-- Cintura Elegante e Cinto com Frasco de Poção Mágica -->
      <rect x="16" y="37" width="16" height="9" fill="#fff7ed"/>
      <rect x="23" y="41" width="2" height="2" fill="#e2b184"/> <!-- Umbigo -->

      <!-- Frasco de Azoth Borbulhante Rosa / Magenta na Mão Direita -->
      <rect x="32" y="38" width="6" height="8" fill="#f43f5e"/>
      <rect x="33" y="36" width="4" height="3" fill="#ca8a04"/> <!-- Rolha -->
      <rect x="34" y="40" width="2" height="2" fill="#ffffff"/> <!-- Brilho do elixir -->

      <!-- Cinto com Fivelas de Bronze e Calças Arcanas -->
      <rect x="14" y="47" width="20" height="4" fill="#ca8a04"/>
      <rect x="22" y="46" width="4" height="6" fill="#facc15"/>
      <rect x="13" y="51" width="22" height="13" fill="#3b0764"/>
      <rect x="15" y="53" width="18" height="11" fill="#581c87"/>
    </svg>
  {/if}
</div>
