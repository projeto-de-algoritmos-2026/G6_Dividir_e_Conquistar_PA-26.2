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
    <!-- ============================================================== -->
    <!-- 1. FENRIR: GUERREIRO LUPINO (HOMEM)                            -->
    <!-- Guerreiro wolfkin destemido, feições masculinas fortes,       -->
    <!-- cicatriz em batalha, orelhas alertas, cachecol e peitoral      -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo noturno celeste -->
      <rect width="32" height="32" fill="#151b28"/>
      <rect x="0" y="24" width="32" height="8" fill="#0d111a"/>

      <!-- Orelhas pontudas de lobo com sombras e interior rosa suave -->
      <rect x="6" y="2" width="2" height="7" fill="#0f172a"/>
      <rect x="8" y="3" width="3" height="6" fill="#64748b"/>
      <rect x="8" y="5" width="2" height="4" fill="#cbd5e1"/>
      <rect x="9" y="6" width="1" height="3" fill="#f472b6"/>
      <rect x="5" y="6" width="2" height="4" fill="#334155"/>

      <rect x="24" y="2" width="2" height="7" fill="#0f172a"/>
      <rect x="21" y="3" width="3" height="6" fill="#64748b"/>
      <rect x="22" y="5" width="2" height="4" fill="#cbd5e1"/>
      <rect x="22" y="6" width="1" height="3" fill="#f472b6"/>
      <rect x="25" y="6" width="2" height="4" fill="#334155"/>

      <!-- Cabelos e juba prateada imponente -->
      <rect x="8" y="7" width="16" height="13" fill="#94a3b8"/>
      <rect x="9" y="8" width="14" height="12" fill="#cbd5e1"/>
      <rect x="10" y="8" width="12" height="10" fill="#e2e8f0"/>
      <!-- Mechas laterais da juba masculina -->
      <rect x="5" y="12" width="3" height="6" fill="#64748b"/>
      <rect x="6" y="14" width="2" height="5" fill="#94a3b8"/>
      <rect x="24" y="12" width="3" height="6" fill="#64748b"/>
      <rect x="24" y="14" width="2" height="5" fill="#94a3b8"/>

      <!-- Rosto humano/wolfkin masculino definido -->
      <rect x="10" y="10" width="12" height="9" fill="#f1f5f9"/>
      <rect x="11" y="11" width="10" height="8" fill="#f8fafc"/>

      <!-- Sobrancelhas marcadas e retas de guerreiro -->
      <rect x="10" y="10" width="5" height="2" fill="#334155"/>
      <rect x="17" y="10" width="5" height="2" fill="#334155"/>

      <!-- Olhos de âmbar penetrantes -->
      <rect x="11" y="12" width="3" height="2" fill="#d97706"/>
      <rect x="12" y="12" width="1" height="2" fill="#f59e0b"/>
      <rect x="13" y="12" width="1" height="1" fill="#0f172a"/>
      <rect x="11" y="12" width="1" height="1" fill="#ffffff"/>

      <rect x="18" y="12" width="3" height="2" fill="#d97706"/>
      <rect x="19" y="12" width="1" height="2" fill="#f59e0b"/>
      <rect x="18" y="12" width="1" height="1" fill="#0f172a"/>
      <rect x="20" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Cicatriz vermelha clássica no olho esquerdo -->
      <rect x="19" y="9" width="1" height="6" fill="#dc2626"/>

      <!-- Nariz wolfkin & maxilar masculino -->
      <rect x="14" y="14" width="4" height="2" fill="#475569"/>
      <rect x="15" y="14" width="2" height="1" fill="#0f172a"/>
      <rect x="13" y="17" width="6" height="1" fill="#64748b"/>
      <rect x="14" y="18" width="4" height="1" fill="#334155"/>

      <!-- Cachecol esvoaçante azul do vento -->
      <rect x="8" y="19" width="16" height="4" fill="#0284c7"/>
      <rect x="9" y="20" width="14" height="2" fill="#38bdf8"/>
      <rect x="7" y="21" width="4" height="6" fill="#0284c7"/>
      <rect x="8" y="22" width="2" height="4" fill="#38bdf8"/>
      <rect x="21" y="21" width="3" height="5" fill="#0369a1"/>

      <!-- Peitoral de batalha de couro nobre com tachas douradas -->
      <rect x="7" y="23" width="18" height="9" fill="#1e293b"/>
      <rect x="9" y="24" width="14" height="8" fill="#451a03"/>
      <rect x="11" y="24" width="10" height="8" fill="#78350f"/>
      <rect x="13" y="25" width="6" height="7" fill="#d97706"/>
      <rect x="14" y="26" width="4" height="5" fill="#f59e0b"/>
      <!-- Fivelas de latão -->
      <rect x="10" y="26" width="2" height="2" fill="#facc15"/>
      <rect x="20" y="26" width="2" height="2" fill="#facc15"/>
    </svg>

  {:else if charKey === 'bear'}
    <!-- ============================================================== -->
    <!-- 2. KORGN: TITÃ DOS ROCHEDOS (HOMEM)                            -->
    <!-- Homem-urso grandioso, barba trançada viril, peitoral couraçado,-->
    <!-- feições austeras de montanha e ombreiras de bronze maciço       -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo terroso de taverna -->
      <rect width="32" height="32" fill="#24140a"/>
      <rect x="0" y="24" width="32" height="8" fill="#140a04"/>

      <!-- Orelhas redondas de urso no topo -->
      <rect x="5" y="3" width="4" height="4" fill="#451a03"/>
      <rect x="6" y="4" width="2" height="2" fill="#fed7aa"/>
      <rect x="23" y="3" width="4" height="4" fill="#451a03"/>
      <rect x="24" y="4" width="2" height="2" fill="#fed7aa"/>

      <!-- Cabeça & Cabelos espessos castanho-escuro -->
      <rect x="6" y="6" width="20" height="14" fill="#451a03"/>
      <rect x="7" y="7" width="18" height="12" fill="#78350f"/>
      <rect x="8" y="8" width="16" height="10" fill="#92400e"/>

      <!-- Rosto masculino curtido pelo sol e vento -->
      <rect x="9" y="8" width="14" height="8" fill="#d97706"/>
      <rect x="10" y="9" width="12" height="6" fill="#f59e0b"/>

      <!-- Sobrancelhas grossas e franzidas -->
      <rect x="9" y="9" width="5" height="2" fill="#271103"/>
      <rect x="18" y="9" width="5" height="2" fill="#271103"/>

      <!-- Olhos dourados decididos -->
      <rect x="10" y="11" width="3" height="2" fill="#facc15"/>
      <rect x="11" y="11" width="1" height="2" fill="#271103"/>
      <rect x="10" y="11" width="1" height="1" fill="#ffffff"/>

      <rect x="19" y="11" width="3" height="2" fill="#facc15"/>
      <rect x="20" y="11" width="1" height="2" fill="#271103"/>
      <rect x="21" y="11" width="1" height="1" fill="#ffffff"/>

      <!-- Nariz largo e forte de urso -->
      <rect x="14" y="12" width="4" height="2" fill="#271103"/>
      <rect x="15" y="12" width="2" height="1" fill="#78350f"/>

      <!-- Barba trançada masculina e espessa (estilo ferreiro nórdico/titã) -->
      <rect x="8" y="14" width="16" height="8" fill="#451a03"/>
      <rect x="9" y="15" width="14" height="7" fill="#78350f"/>
      <rect x="11" y="17" width="10" height="6" fill="#92400e"/>
      <!-- Anel de barba dourado / presilha -->
      <rect x="14" y="21" width="4" height="2" fill="#facc15"/>
      <rect x="15" y="21" width="2" height="2" fill="#eab308"/>
      <rect x="13" y="23" width="6" height="2" fill="#78350f"/>

      <!-- Ombreiras titânicas de bronze com cravos e rebites -->
      <rect x="1" y="18" width="7" height="14" fill="#713f12"/>
      <rect x="2" y="19" width="5" height="12" fill="#a16207"/>
      <rect x="3" y="20" width="3" height="10" fill="#ca8a04"/>
      <rect x="4" y="22" width="2" height="2" fill="#fef08a"/>
      <rect x="4" y="27" width="2" height="2" fill="#fef08a"/>

      <rect x="24" y="18" width="7" height="14" fill="#713f12"/>
      <rect x="25" y="19" width="5" height="12" fill="#a16207"/>
      <rect x="26" y="20" width="3" height="10" fill="#ca8a04"/>
      <rect x="26" y="22" width="2" height="2" fill="#fef08a"/>
      <rect x="26" y="27" width="2" height="2" fill="#fef08a"/>

      <!-- Peitoral maciço de carvalho e metal -->
      <rect x="8" y="22" width="16" height="10" fill="#1c1917"/>
      <rect x="10" y="24" width="12" height="8" fill="#451a03"/>
      <rect x="12" y="25" width="8" height="7" fill="#ca8a04"/>
      <rect x="14" y="26" width="4" height="5" fill="#facc15"/>
    </svg>

  {:else if charKey === 'cat'}
    <!-- ============================================================== -->
    <!-- 3. ELARA: MÍSTICA FELINA (MULHER)                              -->
    <!-- Bela sacerdotisa felina, traços faciais delicados femininos,   -->
    <!-- cabelos loiro-dourados com franja elegante, orelhas felinas    -->
    <!-- suaves com brincos de esmeralda, olhos vivos e quimono de seda -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo azul santuário harmônico -->
      <rect width="32" height="32" fill="#0f1b29"/>
      <rect x="0" y="24" width="32" height="8" fill="#07101a"/>

      <!-- Orelhas pontudas de gata, graciosas e delicadas -->
      <rect x="6" y="2" width="4" height="7" fill="#ca8a04"/>
      <rect x="7" y="3" width="3" height="5" fill="#fde047"/>
      <rect x="8" y="4" width="2" height="4" fill="#f472b6"/>
      <rect x="9" y="5" width="1" height="2" fill="#fbcfe8"/>

      <rect x="22" y="2" width="4" height="7" fill="#ca8a04"/>
      <rect x="22" y="3" width="3" height="5" fill="#fde047"/>
      <rect x="22" y="4" width="2" height="4" fill="#f472b6"/>
      <rect x="22" y="5" width="1" height="2" fill="#fbcfe8"/>

      <!-- Brincos esmeralda pendentes nas orelhas -->
      <rect x="4" y="8" width="2" height="3" fill="#10b981"/>
      <rect x="4" y="9" width="1" height="1" fill="#a7f3d0"/>
      <rect x="26" y="8" width="2" height="3" fill="#10b981"/>
      <rect x="27" y="9" width="1" height="1" fill="#a7f3d0"/>

      <!-- Cabelos femininos fartos e sedosos com mechas caindo nos ombros -->
      <rect x="7" y="7" width="18" height="15" fill="#ca8a04"/>
      <rect x="8" y="7" width="16" height="14" fill="#eab308"/>
      <rect x="9" y="7" width="14" height="8" fill="#fde047"/>
      <!-- Mechas longas emoldurando o rosto feminino -->
      <rect x="6" y="10" width="3" height="14" fill="#eab308"/>
      <rect x="7" y="11" width="2" height="12" fill="#fde047"/>
      <rect x="23" y="10" width="3" height="14" fill="#eab308"/>
      <rect x="23" y="11" width="2" height="12" fill="#fde047"/>

      <!-- Cauda felina graciosa ao fundo -->
      <rect x="2" y="18" width="2" height="8" fill="#ca8a04"/>
      <rect x="3" y="16" width="2" height="4" fill="#fde047"/>

      <!-- Rosto feminino delicado e suave -->
      <rect x="10" y="9" width="12" height="9" fill="#fed7aa"/>
      <rect x="11" y="10" width="10" height="8" fill="#ffedd5"/>
      <rect x="12" y="11" width="8" height="7" fill="#fff7ed"/>

      <!-- Franja elegante feminina em formato coração/arco -->
      <rect x="10" y="8" width="12" height="2" fill="#fde047"/>
      <rect x="11" y="9" width="3" height="2" fill="#fef08a"/>
      <rect x="18" y="9" width="3" height="2" fill="#fef08a"/>

      <!-- Olhos amendoados femininos com cílios marcados e brilho esmeralda místico -->
      <!-- Delineador/Cílios -->
      <rect x="10" y="11" width="4" height="1" fill="#1c1917"/>
      <rect x="9" y="11" width="1" height="1" fill="#1c1917"/>
      <rect x="18" y="11" width="4" height="1" fill="#1c1917"/>
      <rect x="22" y="11" width="1" height="1" fill="#1c1917"/>
      <!-- Íris Esmeralda luminosa -->
      <rect x="10" y="12" width="3" height="2" fill="#047857"/>
      <rect x="11" y="12" width="2" height="2" fill="#10b981"/>
      <rect x="12" y="12" width="1" height="2" fill="#064e3b"/>
      <rect x="10" y="12" width="1" height="1" fill="#ffffff"/>

      <rect x="19" y="12" width="3" height="2" fill="#047857"/>
      <rect x="19" y="12" width="2" height="2" fill="#10b981"/>
      <rect x="19" y="12" width="1" height="2" fill="#064e3b"/>
      <rect x="21" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Blush rosado suave nas bochechas femininas -->
      <rect x="10" y="14" width="2" height="1" fill="#fbcfe8"/>
      <rect x="20" y="14" width="2" height="1" fill="#fbcfe8"/>

      <!-- Nariz e lábios rosados delicados -->
      <rect x="15" y="14" width="2" height="1" fill="#f472b6"/>
      <rect x="14" y="16" width="4" height="1" fill="#fb7185"/>
      <rect x="15" y="16" width="2" height="1" fill="#e11d48"/>

      <!-- Gargantilha com fita dourada e broche celeste -->
      <rect x="11" y="18" width="10" height="2" fill="#1e293b"/>
      <rect x="14" y="18" width="4" height="3" fill="#facc15"/>
      <rect x="15" y="19" width="2" height="2" fill="#38bdf8"/>

      <!-- Manto/Quimono de seda celeste com decote feminino bordado -->
      <rect x="8" y="20" width="16" height="12" fill="#0284c7"/>
      <rect x="9" y="21" width="14" height="11" fill="#38bdf8"/>
      <rect x="11" y="21" width="10" height="11" fill="#7dd3fc"/>
      <!-- Dobra branca de seda com laço rosa no peito -->
      <rect x="13" y="21" width="2" height="6" fill="#ffffff"/>
      <rect x="17" y="21" width="2" height="6" fill="#ffffff"/>
      <rect x="14" y="24" width="4" height="3" fill="#f472b6"/>
      <rect x="15" y="25" width="2" height="1" fill="#fde047"/>
    </svg>

  {:else if charKey === 'dragon'}
    <!-- ============================================================== -->
    <!-- KALLISTA: VALQUÍRIA DRACONIANA (MULHER)                        -->
    <!-- Poderosa nobre draconiana, postura nobre e feições femininas   -->
    <!-- marcantes, chifres elegantes de marfim, cabelos brancos como   -->
    <!-- neve celestial, olhos ametista brilhantes e armadura carmesim  -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo carmesim nobre crepuscular -->
      <rect width="32" height="32" fill="#240e16"/>
      <rect x="0" y="24" width="32" height="8" fill="#15070c"/>

      <!-- Chifres draconianos pontiagudos curvados em coroa de marfim e ouro -->
      <rect x="7" y="2" width="2" height="6" fill="#ca8a04"/>
      <rect x="6" y="1" width="2" height="4" fill="#facc15"/>
      <rect x="5" y="0" width="2" height="3" fill="#fef08a"/>
      <rect x="4" y="0" width="1" height="2" fill="#ffffff"/>

      <rect x="23" y="2" width="2" height="6" fill="#ca8a04"/>
      <rect x="24" y="1" width="2" height="4" fill="#facc15"/>
      <rect x="25" y="0" width="2" height="3" fill="#fef08a"/>
      <rect x="27" y="0" width="1" height="2" fill="#ffffff"/>

      <!-- Cabelos platinados femininos -->
      <rect x="7" y="5" width="18" height="17" fill="#cbd5e1"/>
      <rect x="8" y="5" width="16" height="16" fill="#e2e8f0"/>
      <rect x="9" y="5" width="14" height="15" fill="#f8fafc"/>
      <!-- Mechas longas onduladas sobre a armadura -->
      <rect x="5" y="9" width="3" height="15" fill="#cbd5e1"/>
      <rect x="6" y="10" width="2" height="13" fill="#f8fafc"/>
      <rect x="24" y="9" width="3" height="15" fill="#cbd5e1"/>
      <rect x="24" y="10" width="2" height="13" fill="#f8fafc"/>

      <!-- Rosto nobre feminino com escamas carmesim sutis nas têmporas -->
      <rect x="10" y="9" width="12" height="9" fill="#fed7aa"/>
      <rect x="11" y="9" width="10" height="8" fill="#fff1f2"/>
      <!-- Detalhes de escama mística nas bochechas -->
      <rect x="9" y="12" width="1" height="2" fill="#e11d48"/>
      <rect x="22" y="12" width="1" height="2" fill="#e11d48"/>

      <!-- Tiara/Coroa dourada de valquíria na testa -->
      <rect x="10" y="6" width="12" height="2" fill="#ca8a04"/>
      <rect x="12" y="5" width="8" height="2" fill="#facc15"/>
      <rect x="15" y="4" width="2" height="3" fill="#e11d48"/>

      <!-- Olhos ametista / violeta luminosos femininos com delineado -->
      <rect x="10" y="10" width="4" height="1" fill="#4c0519"/>
      <rect x="18" y="10" width="4" height="1" fill="#4c0519"/>

      <rect x="10" y="11" width="3" height="2" fill="#86198f"/>
      <rect x="11" y="11" width="2" height="2" fill="#c084fc"/>
      <rect x="12" y="11" width="1" height="2" fill="#581c87"/>
      <rect x="10" y="11" width="1" height="1" fill="#ffffff"/>

      <rect x="19" y="11" width="3" height="2" fill="#86198f"/>
      <rect x="19" y="11" width="2" height="2" fill="#c084fc"/>
      <rect x="19" y="11" width="1" height="2" fill="#581c87"/>
      <rect x="21" y="11" width="1" height="1" fill="#ffffff"/>

      <!-- Nariz afilado e lábios carmesim delicados -->
      <rect x="15" y="13" width="2" height="1" fill="#f43f5e"/>
      <rect x="14" y="15" width="4" height="1" fill="#be123c"/>
      <rect x="15" y="15" width="2" height="1" fill="#9f1239"/>

      <!-- Colar de escama com gola real -->
      <rect x="11" y="17" width="10" height="2" fill="#4c0519"/>
      <rect x="14" y="17" width="4" height="3" fill="#facc15"/>

      <!-- Corpete e armadura de placas carmesim e ouro esculpida feminina -->
      <rect x="8" y="19" width="16" height="13" fill="#4c0519"/>
      <rect x="9" y="20" width="14" height="12" fill="#881337"/>
      <rect x="10" y="21" width="12" height="11" fill="#be123c"/>
      <rect x="12" y="21" width="8" height="11" fill="#e11d48"/>
      <!-- Guarnições e filigranas douradas -->
      <rect x="11" y="20" width="10" height="2" fill="#facc15"/>
      <rect x="15" y="21" width="2" height="8" fill="#facc15"/>
      <rect x="12" y="25" width="8" height="2" fill="#facc15"/>
      <!-- Ombreiras de dragão elegantes -->
      <rect x="5" y="22" width="3" height="6" fill="#be123c"/>
      <rect x="6" y="23" width="2" height="4" fill="#facc15"/>
      <rect x="24" y="22" width="3" height="6" fill="#be123c"/>
      <rect x="24" y="23" width="2" height="4" fill="#facc15"/>
    </svg>

  {:else if charKey === 'harpy'}
    <!-- ============================================================== -->
    <!-- ARIA: HARPIA AVIADORA (MULHER)                                 -->
    <!-- Jovem harpia veloz, óculos de aviador, asas douradas nas costas-->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#2d1b10"/>
      <rect x="0" y="24" width="32" height="8" fill="#1f120a"/>

      <!-- Asas Douradas nas Costas -->
      <rect x="3" y="10" width="4" height="16" fill="#ca8a04"/>
      <rect x="2" y="12" width="2" height="12" fill="#a16207"/>
      <rect x="5" y="8" width="3" height="14" fill="#eab308"/>
      <rect x="25" y="10" width="4" height="16" fill="#ca8a04"/>
      <rect x="28" y="12" width="2" height="12" fill="#a16207"/>
      <rect x="24" y="8" width="3" height="14" fill="#eab308"/>

      <!-- Cabelo / Penas Douradas femininas -->
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
      <rect x="10" y="10" width="12" height="9" fill="#fed7aa"/>
      <rect x="11" y="11" width="10" height="8" fill="#ffedd5"/>
      <rect x="11" y="12" width="3" height="2" fill="#0f766e"/>
      <rect x="12" y="12" width="1" height="2" fill="#14b8a6"/>
      <rect x="11" y="12" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="12" width="3" height="2" fill="#0f766e"/>
      <rect x="19" y="12" width="1" height="2" fill="#14b8a6"/>
      <rect x="18" y="12" width="1" height="1" fill="#ffffff"/>

      <!-- Bico Fino delicado e boca -->
      <rect x="14" y="15" width="4" height="2" fill="#f59e0b"/>
      <rect x="15" y="16" width="2" height="2" fill="#d97706"/>
      <rect x="15" y="17" width="2" height="1" fill="#78350f"/>

      <!-- Gola e Jaqueta de Voo de couro macio -->
      <rect x="10" y="19" width="12" height="3" fill="#f1f5f9"/>
      <rect x="9" y="20" width="14" height="2" fill="#ffffff"/>
      <rect x="8" y="22" width="16" height="10" fill="#78350f"/>
      <rect x="11" y="23" width="10" height="9" fill="#92400e"/>
      <rect x="15" y="22" width="2" height="10" fill="#facc15"/>
    </svg>

  {:else if charKey === 'holstaur'}
    <!-- ============================================================== -->
    <!-- BRENA: HOLSTAUR MATRIARCH (MULHER)                             -->
    <!-- Matriarca bovina carinhosa e imponente, chifres, sino de latão -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <rect width="32" height="32" fill="#162319"/>
      <rect x="0" y="24" width="32" height="8" fill="#0f1911"/>

      <!-- Chifres Bovinos & Flor Rosa -->
      <rect x="8" y="4" width="2" height="4" fill="#d97706"/>
      <rect x="7" y="3" width="2" height="2" fill="#fde68a"/>
      <rect x="6" y="2" width="2" height="2" fill="#ffffff"/>
      <rect x="22" y="4" width="2" height="4" fill="#d97706"/>
      <rect x="23" y="3" width="2" height="2" fill="#fde68a"/>
      <rect x="24" y="2" width="2" height="2" fill="#ffffff"/>
      <rect x="9" y="7" width="3" height="3" fill="#f472b6"/>
      <rect x="10" y="8" width="1" height="1" fill="#fef08a"/>

      <!-- Orelhas Bovinas Macias -->
      <rect x="4" y="10" width="5" height="3" fill="#e2e8f0"/>
      <rect x="5" y="11" width="3" height="1" fill="#fbcfe8"/>
      <rect x="23" y="10" width="5" height="3" fill="#e2e8f0"/>
      <rect x="24" y="11" width="3" height="1" fill="#fbcfe8"/>

      <!-- Cabeça com Pelagem Malhada -->
      <rect x="9" y="7" width="14" height="13" fill="#f8fafc"/>
      <rect x="9" y="9" width="5" height="6" fill="#334155"/>
      <rect x="10" y="8" width="3" height="2" fill="#1e293b"/>

      <!-- Cabelos e Tranças femininas -->
      <rect x="12" y="6" width="8" height="3" fill="#582f0e"/>
      <rect x="14" y="5" width="4" height="2" fill="#7f4f24"/>
      <rect x="7" y="14" width="3" height="13" fill="#582f0e"/>
      <rect x="7" y="27" width="3" height="1" fill="#f472b6"/>
      <rect x="22" y="14" width="3" height="13" fill="#582f0e"/>
      <rect x="22" y="27" width="3" height="1" fill="#f472b6"/>

      <!-- Olhos Castanhos Expressivos e doces -->
      <rect x="11" y="11" width="2" height="3" fill="#78350f"/>
      <rect x="11" y="11" width="1" height="1" fill="#ffffff"/>
      <rect x="19" y="11" width="2" height="3" fill="#78350f"/>
      <rect x="19" y="11" width="1" height="1" fill="#ffffff"/>

      <!-- Focinho Bovino Rosado -->
      <rect x="11" y="15" width="10" height="4" fill="#fbcfe8"/>
      <rect x="12" y="16" width="8" height="3" fill="#f472b6"/>
      <rect x="13" y="17" width="2" height="1" fill="#881337"/>
      <rect x="17" y="17" width="2" height="1" fill="#881337"/>

      <!-- Sino de Latão Pastoral com fita -->
      <rect x="10" y="20" width="12" height="2" fill="#78350f"/>
      <rect x="14" y="21" width="4" height="4" fill="#facc15"/>
      <rect x="15" y="22" width="2" height="2" fill="#ca8a04"/>

      <!-- Corpete e Vestido Pastoral -->
      <rect x="9" y="23" width="14" height="9" fill="#9a3412"/>
      <rect x="11" y="24" width="10" height="8" fill="#ea580c"/>
      <rect x="13" y="25" width="6" height="7" fill="#f8fafc"/>
    </svg>

  {:else}
    <!-- ============================================================== -->
    <!-- 4. VIXEN: FEITICEIRA KITSUNE (MULHER)                          -->
    <!-- Bela alquimista kitsune de nove caudas, traços faciais         -->
    <!-- delicados femininos, cabelos ruivos longos, olhos dourados     -->
    <!-- amendoados com maquiagem cerimonial, óculos arcanos na cabeça, -->
    <!-- caudas com fogo violeta e frasco de Azoth reluzente            -->
    <!-- ============================================================== -->
    <svg viewBox="0 0 32 32" class="w-full h-full" style="image-rendering: pixelated; shape-rendering: crispEdges;">
      <!-- Fundo místico crepuscular violeta -->
      <rect width="32" height="32" fill="#1a0e2e"/>
      <rect x="0" y="24" width="32" height="8" fill="#10081d"/>

      <!-- Partículas arcanas de fogo fatuo / Azoth -->
      <rect x="3" y="4" width="1" height="1" fill="#c084fc"/>
      <rect x="28" y="5" width="1" height="1" fill="#e879f9"/>
      <rect x="29" y="18" width="1" height="1" fill="#c084fc"/>

      <!-- Múltiplas Caudas Volumosas com Fogo Violeta de Azoth -->
      <!-- Cauda esquerda -->
      <rect x="1" y="9" width="4" height="14" fill="#c2410c"/>
      <rect x="2" y="10" width="3" height="11" fill="#ea580c"/>
      <rect x="3" y="12" width="2" height="8" fill="#fb923c"/>
      <!-- Fogo violeta da ponta esquerda -->
      <rect x="1" y="6" width="3" height="4" fill="#a855f7"/>
      <rect x="2" y="7" width="2" height="2" fill="#e879f9"/>
      <rect x="2" y="8" width="1" height="1" fill="#ffffff"/>

      <!-- Cauda direita -->
      <rect x="27" y="9" width="4" height="14" fill="#c2410c"/>
      <rect x="27" y="10" width="3" height="11" fill="#ea580c"/>
      <rect x="27" y="12" width="2" height="8" fill="#fb923c"/>
      <!-- Fogo violeta da ponta direita -->
      <rect x="28" y="6" width="3" height="4" fill="#a855f7"/>
      <rect x="28" y="7" width="2" height="2" fill="#e879f9"/>
      <rect x="29" y="8" width="1" height="1" fill="#ffffff"/>

      <!-- Orelhas de Raposa pontudas e felpudas -->
      <rect x="6" y="2" width="4" height="7" fill="#18181b"/>
      <rect x="7" y="4" width="3" height="5" fill="#ea580c"/>
      <rect x="8" y="4" width="2" height="4" fill="#fed7aa"/>
      <rect x="8" y="5" width="1" height="3" fill="#fbcfe8"/>

      <rect x="22" y="2" width="4" height="7" fill="#18181b"/>
      <rect x="22" y="4" width="3" height="5" fill="#ea580c"/>
      <rect x="22" y="4" width="2" height="4" fill="#fed7aa"/>
      <rect x="23" y="5" width="1" height="3" fill="#fbcfe8"/>

      <!-- Fitas vermelhas e guizo dourado na orelha -->
      <rect x="5" y="8" width="2" height="3" fill="#dc2626"/>
      <rect x="4" y="9" width="2" height="2" fill="#facc15"/>
      <rect x="25" y="8" width="2" height="3" fill="#dc2626"/>
      <rect x="26" y="9" width="2" height="2" fill="#facc15"/>

      <!-- Cabelos ruivos longos femininos com mechas esvoaçantes -->
      <rect x="7" y="7" width="18" height="15" fill="#9a3412"/>
      <rect x="8" y="7" width="16" height="14" fill="#c2410c"/>
      <rect x="9" y="7" width="14" height="10" fill="#ea580c"/>
      <!-- Mechas longas emoldurando o rosto feminino -->
      <rect x="6" y="10" width="3" height="14" fill="#c2410c"/>
      <rect x="7" y="12" width="2" height="11" fill="#ea580c"/>
      <rect x="23" y="10" width="3" height="14" fill="#c2410c"/>
      <rect x="23" y="12" width="2" height="11" fill="#ea580c"/>

      <!-- Óculos arcanos de alquimista apoiados na cabeça -->
      <rect x="9" y="6" width="14" height="3" fill="#78350f"/>
      <rect x="10" y="6" width="4" height="3" fill="#ca8a04"/>
      <rect x="11" y="7" width="2" height="1" fill="#c084fc"/>
      <rect x="11" y="7" width="1" height="1" fill="#ffffff"/>
      <rect x="18" y="6" width="4" height="3" fill="#ca8a04"/>
      <rect x="19" y="7" width="2" height="1" fill="#c084fc"/>
      <rect x="19" y="7" width="1" height="1" fill="#ffffff"/>

      <!-- Rosto feminino delicado e queixo afilado -->
      <rect x="10" y="9" width="12" height="9" fill="#fed7aa"/>
      <rect x="11" y="10" width="10" height="8" fill="#fff7ed"/>

      <!-- Franja elegante ruiva no topo da testa -->
      <rect x="10" y="8" width="12" height="2" fill="#ea580c"/>
      <rect x="12" y="9" width="3" height="2" fill="#fb923c"/>
      <rect x="17" y="9" width="3" height="2" fill="#fb923c"/>

      <!-- Marcas cerimoniais de kitsune nas têmporas/bochechas -->
      <rect x="9" y="13" width="2" height="1" fill="#e11d48"/>
      <rect x="21" y="13" width="2" height="1" fill="#e11d48"/>

      <!-- Olhos de raposa amendoados femininos com delineado gatinho -->
      <rect x="9" y="11" width="5" height="1" fill="#18181b"/>
      <rect x="18" y="11" width="5" height="1" fill="#18181b"/>

      <!-- Íris Âmbar / Dourada brilhante -->
      <rect x="10" y="12" width="3" height="2" fill="#b45309"/>
      <rect x="11" y="12" width="2" height="2" fill="#f59e0b"/>
      <rect x="12" y="12" width="1" height="2" fill="#78350f"/>
      <rect x="10" y="12" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->

      <rect x="19" y="12" width="3" height="2" fill="#b45309"/>
      <rect x="19" y="12" width="2" height="2" fill="#f59e0b"/>
      <rect x="19" y="12" width="1" height="2" fill="#78350f"/>
      <rect x="21" y="12" width="1" height="1" fill="#ffffff"/> <!-- Brilho -->

      <!-- Blush rosado suave nas bochechas -->
      <rect x="10" y="14" width="2" height="1" fill="#fbcfe8"/>
      <rect x="20" y="14" width="2" height="1" fill="#fbcfe8"/>

      <!-- Focinho delicado feminino & lábios de cereja -->
      <rect x="15" y="14" width="2" height="1" fill="#f43f5e"/>
      <rect x="14" y="16" width="4" height="1" fill="#e11d48"/>
      <rect x="15" y="16" width="2" height="1" fill="#be123c"/>

      <!-- Gargantilha com broche violeta -->
      <rect x="11" y="18" width="10" height="2" fill="#2e1065"/>
      <rect x="14" y="18" width="4" height="2" fill="#ca8a04"/>
      <rect x="15" y="18" width="2" height="2" fill="#c084fc"/>

      <!-- Quimono / Traje de Alquimista Violeta Feminino -->
      <rect x="8" y="20" width="16" height="12" fill="#3b0764"/>
      <rect x="9" y="21" width="14" height="11" fill="#581c87"/>
      <rect x="11" y="21" width="10" height="11" fill="#7e22ce"/>
      <!-- Decote em V com bordas de seda branca -->
      <rect x="13" y="20" width="2" height="6" fill="#f8fafc"/>
      <rect x="17" y="20" width="2" height="6" fill="#f8fafc"/>
      <rect x="14" y="24" width="4" height="2" fill="#be123c"/>
      <rect x="15" y="25" width="2" height="1" fill="#facc15"/>

      <!-- Frasco de Azoth Fluorescente com rolha de latão na cintura -->
      <rect x="22" y="23" width="4" height="6" fill="#1e1b4b"/>
      <rect x="23" y="22" width="2" height="2" fill="#ca8a04"/>
      <rect x="22" y="24" width="4" height="4" fill="#a855f7"/>
      <rect x="23" y="25" width="2" height="3" fill="#e879f9"/>
      <rect x="24" y="25" width="1" height="1" fill="#ffffff"/>
    </svg>
  {/if}
</div>
