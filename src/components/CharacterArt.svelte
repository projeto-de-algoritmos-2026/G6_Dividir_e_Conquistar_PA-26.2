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

<div class="relative flex items-center justify-center overflow-hidden bg-[#160e08] select-none {className}">
  <!-- Grade de Textura CRT / Scanline Sutil de Pixel Art Clássico 16-bit -->
  <div class="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.5)_50%)] bg-[length:100%_4px] z-10"></div>

  {#if charKey === 'wolf'}
    <!-- ========================================== -->
    <!-- FENRIR: LUPINO GUERREIRO (PIXEL ART 16-BIT) -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#181e2b"/>
      <rect x="0" y="24" width="32" height="8" fill="#121620"/>

      <!-- Orelhas Pontudas de Lobo -->
      <rect x="7" y="3" width="2" height="6" fill="#191c26"/>
      <rect x="9" y="4" width="3" height="6" fill="#94a3b8"/>
      <rect x="9" y="6" width="2" height="4" fill="#fbcfe8"/>
      <rect x="6" y="7" width="2" height="4" fill="#64748b"/>

      <rect x="23" y="3" width="2" height="6" fill="#191c26"/>
      <rect x="20" y="4" width="3" height="6" fill="#94a3b8"/>
      <rect x="21" y="6" width="2" height="4" fill="#fbcfe8"/>
      <rect x="24" y="7" width="2" height="4" fill="#64748b"/>

      <!-- Cabeça & Juba de Lobo -->
      <rect x="9" y="8" width="14" height="12" fill="#cbd5e1"/>
      <rect x="8" y="10" width="16" height="9" fill="#e2e8f0"/>
      <rect x="5" y="14" width="3" height="4" fill="#94a3b8"/>
      <rect x="4" y="16" width="2" height="3" fill="#64748b"/>
      <rect x="24" y="14" width="3" height="4" fill="#94a3b8"/>
      <rect x="26" y="16" width="2" height="3" fill="#64748b"/>
      <rect x="8" y="8" width="16" height="1" fill="#191c26"/>
      <rect x="7" y="9" width="1" height="8" fill="#191c26"/>
      <rect x="24" y="9" width="1" height="8" fill="#191c26"/>

      <!-- Sobrancelhas & Olhos de Âmbar -->
      <rect x="10" y="11" width="4" height="1" fill="#475569"/>
      <rect x="18" y="11" width="4" height="1" fill="#475569"/>
      <rect x="10" y="12" width="3" height="2" fill="#d97706"/>
      <rect x="11" y="12" width="1" height="2" fill="#f59e0b"/>
      <rect x="12" y="12" width="1" height="1" fill="#111827"/>
      <rect x="10" y="12" width="1" height="1" fill="#ffffff"/>

      <rect x="19" y="12" width="3" height="2" fill="#d97706"/>
      <rect x="20" y="12" width="1" height="2" fill="#f59e0b"/>
      <rect x="19" y="12" width="1" height="1" fill="#111827"/>
      <rect x="21" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Cicatriz guerreira -->
      <rect x="20" y="10" width="1" height="5" fill="#dc2626"/>

      <!-- Focinho & Nariz -->
      <rect x="13" y="14" width="6" height="5" fill="#f8fafc"/>
      <rect x="14" y="15" width="4" height="2" fill="#0f172a"/>
      <rect x="15" y="15" width="1" height="1" fill="#94a3b8"/>
      <rect x="15" y="17" width="2" height="1" fill="#1e293b"/>
      <rect x="13" y="18" width="6" height="1" fill="#475569"/>

      <!-- Cachecol Azul Celeste -->
      <rect x="9" y="20" width="14" height="3" fill="#38bdf8"/>
      <rect x="8" y="21" width="16" height="2" fill="#0284c7"/>
      <rect x="10" y="22" width="12" height="1" fill="#0369a1"/>
      <rect x="6" y="22" width="3" height="4" fill="#38bdf8"/>
      <rect x="5" y="24" width="2" height="4" fill="#0284c7"/>

      <!-- Peitoral de Couro e Latão -->
      <rect x="8" y="24" width="16" height="8" fill="#451a03"/>
      <rect x="11" y="25" width="10" height="7" fill="#ca8a04"/>
      <rect x="12" y="26" width="8" height="5" fill="#eab308"/>
      <rect x="13" y="27" width="6" height="3" fill="#fef08a"/>
      <rect x="11" y="25" width="1" height="1" fill="#713f12"/>
      <rect x="20" y="25" width="1" height="1" fill="#713f12"/>
      <rect x="11" y="30" width="1" height="1" fill="#713f12"/>
      <rect x="20" y="30" width="1" height="1" fill="#713f12"/>
    </svg>

  {:else if charKey === 'harpy'}
    <!-- ========================================== -->
    <!-- ARIA: HARPIA AVIADORA (PIXEL ART 16-BIT)   -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#2d1b10"/>
      <rect x="0" y="24" width="32" height="8" fill="#1f120a"/>

      <!-- Asas Douradas nas Costas -->
      <rect x="3" y="12" width="4" height="14" fill="#ca8a04"/>
      <rect x="2" y="14" width="2" height="10" fill="#a16207"/>
      <rect x="5" y="10" width="3" height="12" fill="#eab308"/>
      <rect x="25" y="12" width="4" height="14" fill="#ca8a04"/>
      <rect x="28" y="14" width="2" height="10" fill="#a16207"/>
      <rect x="24" y="10" width="3" height="12" fill="#eab308"/>

      <!-- Cabelo / Penas Douradas -->
      <rect x="10" y="5" width="12" height="10" fill="#facc15"/>
      <rect x="8" y="7" width="16" height="8" fill="#fde047"/>
      <rect x="14" y="2" width="4" height="4" fill="#facc15"/>
      <rect x="11" y="4" width="3" height="3" fill="#eab308"/>
      <rect x="18" y="4" width="3" height="3" fill="#eab308"/>

      <!-- Óculos de Aviador na Testa -->
      <rect x="9" y="7" width="14" height="3" fill="#451a03"/>
      <rect x="10" y="7" width="4" height="3" fill="#ca8a04"/>
      <rect x="11" y="8" width="2" height="1" fill="#7dd3fc"/>
      <rect x="18" y="7" width="4" height="3" fill="#ca8a04"/>
      <rect x="19" y="8" width="2" height="1" fill="#7dd3fc"/>
      <rect x="14" y="8" width="4" height="1" fill="#713f12"/>

      <!-- Rosto e Olhos Celestes -->
      <rect x="10" y="11" width="12" height="8" fill="#fed7aa"/>
      <rect x="11" y="12" width="10" height="7" fill="#ffedd5"/>
      <rect x="11" y="13" width="3" height="2" fill="#0f766e"/>
      <rect x="12" y="13" width="1" height="2" fill="#14b8a6"/>
      <rect x="11" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="13" width="3" height="2" fill="#0f766e"/>
      <rect x="19" y="13" width="1" height="2" fill="#14b8a6"/>
      <rect x="18" y="13" width="1" height="1" fill="#ffffff"/>

      <!-- Bico Fino de Harpia -->
      <rect x="14" y="16" width="4" height="2" fill="#f59e0b"/>
      <rect x="15" y="17" width="2" height="2" fill="#d97706"/>
      <rect x="15" y="18" width="2" height="1" fill="#78350f"/>

      <!-- Gola e Jaqueta de Voo -->
      <rect x="10" y="20" width="12" height="3" fill="#f1f5f9"/>
      <rect x="9" y="21" width="14" height="2" fill="#ffffff"/>
      <rect x="8" y="23" width="16" height="9" fill="#78350f"/>
      <rect x="11" y="24" width="10" height="8" fill="#92400e"/>
      <rect x="15" y="23" width="2" height="9" fill="#facc15"/>
    </svg>

  {:else if charKey === 'holstaur'}
    <!-- ========================================== -->
    <!-- BRENA: HOLSTAUR COW GUARDIAN (16-BIT)      -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#162319"/>
      <rect x="0" y="24" width="32" height="8" fill="#0f1911"/>

      <!-- Chifres Bovinos & Flor Rosa -->
      <rect x="8" y="5" width="2" height="4" fill="#d97706"/>
      <rect x="7" y="4" width="2" height="2" fill="#fde68a"/>
      <rect x="6" y="3" width="2" height="2" fill="#ffffff"/>
      <rect x="22" y="5" width="2" height="4" fill="#d97706"/>
      <rect x="23" y="4" width="2" height="2" fill="#fde68a"/>
      <rect x="24" y="3" width="2" height="2" fill="#ffffff"/>
      <rect x="9" y="8" width="3" height="3" fill="#f472b6"/>
      <rect x="10" y="9" width="1" height="1" fill="#fef08a"/>

      <!-- Orelhas Bovinas Macias -->
      <rect x="4" y="11" width="5" height="3" fill="#e2e8f0"/>
      <rect x="5" y="12" width="3" height="1" fill="#fbcfe8"/>
      <rect x="23" y="11" width="5" height="3" fill="#e2e8f0"/>
      <rect x="24" y="12" width="3" height="1" fill="#fbcfe8"/>

      <!-- Cabeça com Pelagem Malhada -->
      <rect x="9" y="8" width="14" height="12" fill="#f8fafc"/>
      <rect x="9" y="10" width="5" height="6" fill="#334155"/>
      <rect x="10" y="9" width="3" height="2" fill="#1e293b"/>

      <!-- Cabelos e Tranças -->
      <rect x="12" y="7" width="8" height="3" fill="#582f0e"/>
      <rect x="14" y="6" width="4" height="2" fill="#7f4f24"/>
      <rect x="7" y="15" width="3" height="12" fill="#582f0e"/>
      <rect x="7" y="27" width="3" height="1" fill="#f472b6"/>
      <rect x="22" y="15" width="3" height="12" fill="#582f0e"/>
      <rect x="22" y="27" width="3" height="1" fill="#f472b6"/>

      <!-- Olhos Castanhos Expressivos -->
      <rect x="11" y="12" width="2" height="3" fill="#78350f"/>
      <rect x="11" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="19" y="12" width="2" height="3" fill="#78350f"/>
      <rect x="19" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Bovino Rosado -->
      <rect x="11" y="16" width="10" height="4" fill="#fbcfe8"/>
      <rect x="12" y="17" width="8" height="3" fill="#f472b6"/>
      <rect x="13" y="18" width="2" height="1" fill="#881337"/>
      <rect x="17" y="18" width="2" height="1" fill="#881337"/>

      <!-- Sino de Latão Pastoral -->
      <rect x="10" y="22" width="12" height="2" fill="#78350f"/>
      <rect x="14" y="23" width="4" height="4" fill="#facc15"/>
      <rect x="15" y="24" width="2" height="2" fill="#ca8a04"/>

      <!-- Corpete -->
      <rect x="9" y="25" width="14" height="7" fill="#9a3412"/>
      <rect x="11" y="26" width="10" height="6" fill="#ea580c"/>
      <rect x="13" y="27" width="6" height="5" fill="#f8fafc"/>
    </svg>

  {:else if charKey === 'bear'}
    <!-- ========================================== -->
    <!-- KORGN: URSO PARDO GUERREIRO (16-BIT)       -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#24180f"/>
      <rect x="0" y="24" width="32" height="8" fill="#170f09"/>

      <!-- Orelhas Redondas de Urso -->
      <rect x="6" y="5" width="4" height="4" fill="#78350f"/>
      <rect x="7" y="6" width="2" height="2" fill="#fed7aa"/>
      <rect x="22" y="5" width="4" height="4" fill="#78350f"/>
      <rect x="23" y="6" width="2" height="2" fill="#fed7aa"/>

      <!-- Cabeça Maciça -->
      <rect x="7" y="8" width="18" height="13" fill="#78350f"/>
      <rect x="6" y="10" width="20" height="9" fill="#92400e"/>
      <rect x="8" y="9" width="16" height="11" fill="#b45309"/>

      <!-- Sobrancelhas e Olhos -->
      <rect x="9" y="11" width="4" height="2" fill="#451a03"/>
      <rect x="19" y="11" width="4" height="2" fill="#451a03"/>
      <rect x="10" y="13" width="2" height="2" fill="#facc15"/>
      <rect x="10" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="20" y="13" width="2" height="2" fill="#facc15"/>
      <rect x="20" y="13" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho e Nariz de Urso -->
      <rect x="11" y="15" width="10" height="6" fill="#d97706"/>
      <rect x="12" y="16" width="8" height="4" fill="#fed7aa"/>
      <rect x="13" y="16" width="6" height="2" fill="#1c1917"/>
      <rect x="14" y="16" width="2" height="1" fill="#78716c"/>
      <rect x="14" y="19" width="4" height="1" fill="#451a03"/>

      <!-- Ombreiras de Bronze com Cravos -->
      <rect x="2" y="21" width="7" height="11" fill="#ca8a04"/>
      <rect x="3" y="22" width="5" height="9" fill="#eab308"/>
      <rect x="4" y="24" width="2" height="2" fill="#fef08a"/>
      <rect x="23" y="21" width="7" height="11" fill="#ca8a04"/>
      <rect x="24" y="22" width="5" height="9" fill="#eab308"/>
      <rect x="26" y="24" width="2" height="2" fill="#fef08a"/>

      <!-- Peitoral de Couro -->
      <rect x="9" y="22" width="14" height="10" fill="#451a03"/>
      <rect x="10" y="23" width="12" height="9" fill="#78350f"/>
      <rect x="11" y="24" width="2" height="2" fill="#ca8a04"/>
      <rect x="13" y="26" width="2" height="2" fill="#ca8a04"/>
      <rect x="15" y="28" width="2" height="2" fill="#ca8a04"/>
      <rect x="17" y="30" width="2" height="2" fill="#ca8a04"/>
    </svg>

  {:else if charKey === 'cat'}
    <!-- ========================================== -->
    <!-- ELARA: MÍSTICA FELINA (16-BIT)             -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#131e2c"/>
      <rect x="0" y="24" width="32" height="8" fill="#0c131c"/>

      <!-- Orelhas de Gato com Guizos -->
      <rect x="7" y="4" width="4" height="6" fill="#ca8a04"/>
      <rect x="8" y="5" width="2" height="4" fill="#f472b6"/>
      <rect x="5" y="10" width="2" height="2" fill="#facc15"/>
      <rect x="21" y="4" width="4" height="6" fill="#ca8a04"/>
      <rect x="22" y="5" width="2" height="4" fill="#f472b6"/>
      <rect x="25" y="10" width="2" height="2" fill="#facc15"/>

      <!-- Cauda Sinuosa -->
      <rect x="2" y="20" width="2" height="8" fill="#eab308"/>
      <rect x="3" y="18" width="2" height="4" fill="#facc15"/>

      <!-- Cabelos e Rosto -->
      <rect x="8" y="7" width="16" height="13" fill="#ca8a04"/>
      <rect x="9" y="8" width="14" height="11" fill="#fde047"/>
      <rect x="11" y="7" width="10" height="2" fill="#fef08a"/>
      <rect x="10" y="11" width="12" height="8" fill="#fef3c7"/>
      <rect x="11" y="12" width="10" height="7" fill="#fffbeb"/>

      <!-- Sobrancelhas e Olhos Esmeralda Místicos -->
      <rect x="10" y="12" width="4" height="1" fill="#1e293b"/>
      <rect x="18" y="12" width="4" height="1" fill="#1e293b"/>
      <rect x="10" y="13" width="4" height="2" fill="#047857"/>
      <rect x="11" y="13" width="2" height="2" fill="#10b981"/>
      <rect x="12" y="13" width="1" height="2" fill="#064e3b"/>
      <rect x="11" y="13" width="1" height="1" fill="#ffffff"/>

      <rect x="18" y="13" width="4" height="2" fill="#047857"/>
      <rect x="19" y="13" width="2" height="2" fill="#10b981"/>
      <rect x="19" y="13" width="1" height="2" fill="#064e3b"/>
      <rect x="20" y="13" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho e Bigodes -->
      <rect x="15" y="16" width="2" height="1" fill="#f472b6"/>
      <rect x="14" y="17" width="4" height="1" fill="#b45309"/>
      <rect x="7" y="16" width="2" height="1" fill="#ca8a04"/>
      <rect x="23" y="16" width="2" height="1" fill="#ca8a04"/>

      <!-- Quimono de Seda Celeste -->
      <rect x="8" y="20" width="16" height="12" fill="#0284c7"/>
      <rect x="9" y="21" width="14" height="11" fill="#38bdf8"/>
      <rect x="11" y="22" width="10" height="10" fill="#7dd3fc"/>
      <rect x="12" y="20" width="2" height="6" fill="#ffffff"/>
      <rect x="18" y="20" width="2" height="6" fill="#ffffff"/>
      <rect x="14" y="24" width="4" height="2" fill="#fef08a"/>
    </svg>
  {:else if charKey === 'dragon'}
    <!-- ========================================== -->
    <!-- KALLISTA: VALQUÍRIA DRACONIANA (16-BIT)    -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#2d1016"/>
      <rect x="0" y="24" width="32" height="8" fill="#1c070c"/>

      <!-- Chifres Draconianos Dourados -->
      <rect x="8" y="4" width="2" height="5" fill="#ca8a04"/>
      <rect x="7" y="2" width="2" height="3" fill="#eab308"/>
      <rect x="6" y="1" width="2" height="2" fill="#fef08a"/>
      <rect x="22" y="4" width="2" height="5" fill="#ca8a04"/>
      <rect x="23" y="2" width="2" height="3" fill="#eab308"/>
      <rect x="24" y="1" width="2" height="2" fill="#fef08a"/>

      <!-- Cabeça com Escamas Carmesim -->
      <rect x="9" y="8" width="14" height="11" fill="#be123c"/>
      <rect x="8" y="10" width="16" height="8" fill="#e11d48"/>
      <rect x="10" y="9" width="12" height="8" fill="#fb7185"/>

      <!-- Olhos Reptilianos Dourados -->
      <rect x="10" y="12" width="3" height="2" fill="#eab308"/>
      <rect x="11" y="12" width="1" height="2" fill="#451a03"/>
      <rect x="10" y="12" width="1" height="1" fill="#fef08a"/>
      <rect x="19" y="12" width="3" height="2" fill="#eab308"/>
      <rect x="20" y="12" width="1" height="2" fill="#451a03"/>
      <rect x="21" y="12" width="1" height="1" fill="#fef08a"/>

      <!-- Focinho de Dragão -->
      <rect x="12" y="15" width="8" height="5" fill="#e11d48"/>
      <rect x="13" y="17" width="2" height="1" fill="#881337"/>
      <rect x="17" y="17" width="2" height="1" fill="#881337"/>
      <rect x="13" y="19" width="6" height="1" fill="#4c0519"/>

      <!-- Armadura de Placas e Lança Dourada -->
      <rect x="7" y="21" width="18" height="11" fill="#881337"/>
      <rect x="9" y="22" width="14" height="10" fill="#9f1239"/>
      <rect x="11" y="23" width="10" height="2" fill="#facc15"/>
      <rect x="15" y="25" width="2" height="6" fill="#facc15"/>
      <rect x="4" y="28" width="2" height="2" fill="#facc15"/>
      <rect x="26" y="8" width="2" height="3" fill="#facc15"/>
      <rect x="27" y="6" width="1" height="3" fill="#fef08a"/>
    </svg>

  {:else}
    <!-- ========================================== -->
    <!-- KITSUNE: RAPOSA ALQUIMISTA (16-BIT)        -->
    <!-- ========================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#20112e"/>
      <rect x="0" y="24" width="32" height="8" fill="#140a1d"/>

      <!-- Caudas de Raposa com Fogo Violeta -->
      <rect x="2" y="10" width="4" height="12" fill="#ea580c"/>
      <rect x="1" y="8" width="3" height="4" fill="#c084fc"/>
      <rect x="26" y="10" width="4" height="12" fill="#ea580c"/>
      <rect x="28" y="8" width="3" height="4" fill="#c084fc"/>

      <!-- Orelhas Grandes com Pontas Pretas -->
      <rect x="6" y="3" width="4" height="7" fill="#1c1917"/>
      <rect x="7" y="6" width="4" height="5" fill="#ea580c"/>
      <rect x="8" y="7" width="2" height="4" fill="#fed7aa"/>
      <rect x="22" y="3" width="4" height="7" fill="#1c1917"/>
      <rect x="21" y="6" width="4" height="5" fill="#ea580c"/>
      <rect x="22" y="7" width="2" height="4" fill="#fed7aa"/>

      <!-- Óculos Alquímicos na Testa -->
      <rect x="9" y="8" width="14" height="3" fill="#ca8a04"/>
      <rect x="10" y="8" width="4" height="3" fill="#facc15"/>
      <rect x="11" y="9" width="2" height="1" fill="#c084fc"/>
      <rect x="11" y="9" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="8" width="4" height="3" fill="#facc15"/>
      <rect x="19" y="9" width="2" height="1" fill="#c084fc"/>
      <rect x="19" y="9" width="1" height="1" fill="#ffffff"/>

      <!-- Rosto e Bochechas Brancas -->
      <rect x="9" y="10" width="14" height="9" fill="#ea580c"/>
      <rect x="10" y="11" width="12" height="8" fill="#f97316"/>
      <rect x="9" y="14" width="4" height="4" fill="#fff7ed"/>
      <rect x="19" y="14" width="4" height="4" fill="#fff7ed"/>

      <!-- Sobrancelhas & Olhos Astutos -->
      <rect x="10" y="12" width="4" height="1" fill="#451a03"/>
      <rect x="18" y="12" width="4" height="1" fill="#451a03"/>
      <rect x="11" y="13" width="3" height="2" fill="#d97706"/>
      <rect x="12" y="13" width="1" height="2" fill="#f59e0b"/>
      <rect x="11" y="13" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="13" width="3" height="2" fill="#d97706"/>
      <rect x="19" y="13" width="1" height="2" fill="#f59e0b"/>
      <rect x="20" y="13" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho e Boca -->
      <rect x="13" y="16" width="6" height="3" fill="#fed7aa"/>
      <rect x="15" y="16" width="2" height="1" fill="#1c1917"/>
      <rect x="14" y="18" width="4" height="1" fill="#7c2d12"/>

      <!-- Manto Alquímico e Frasco de Azoth -->
      <rect x="8" y="21" width="16" height="11" fill="#4c1d95"/>
      <rect x="9" y="22" width="14" height="10" fill="#6d28d9"/>
      <rect x="11" y="23" width="10" height="9" fill="#7e22ce"/>
      <rect x="15" y="22" width="2" height="3" fill="#facc15"/>
      <!-- Frasco de Azoth -->
      <rect x="22" y="24" width="4" height="5" fill="#f43f5e"/>
      <rect x="23" y="23" width="2" height="2" fill="#ca8a04"/>
      <rect x="23" y="25" width="1" height="1" fill="#ffffff"/>
    </svg>
  {/if}
</div>
