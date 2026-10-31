<script lang="ts">
  interface Props {
    character: string;
    class?: string;
  }

  let { character, class: className = 'w-full h-full' }: Props = $props();
</script>

<div class="relative flex items-center justify-center overflow-hidden {className}">
  {#if character === 'wolf'}
    <!-- FENRIR: LUPINE WOLF WARRIOR -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="wolfBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#3b4252"/>
          <stop offset="100%" stop-color="#1e222a"/>
        </radialGradient>
        <linearGradient id="wolfFur" x1="60" y1="20" x2="60" y2="90">
          <stop offset="0%" stop-color="#e5e9f0"/>
          <stop offset="50%" stop-color="#d8dee9"/>
          <stop offset="100%" stop-color="#8892b0"/>
        </linearGradient>
        <linearGradient id="wolfScarf" x1="30" y1="75" x2="90" y2="95">
          <stop offset="0%" stop-color="#38bdf8"/>
          <stop offset="100%" stop-color="#0284c7"/>
        </linearGradient>
      </defs>
      <!-- Background Circle -->
      <circle cx="60" cy="60" r="54" fill="url(#wolfBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#4c566a" stroke-width="2"/>
      
      <!-- Orelhas pontudas de lobo com tufos internos -->
      <polygon points="32,48 24,14 48,34" fill="#8892b0" stroke="#2e3440" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="34,44 28,20 44,35" fill="#fbcfe8"/>
      <polygon points="88,48 96,14 72,34" fill="#8892b0" stroke="#2e3440" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="86,44 92,20 76,35" fill="#fbcfe8"/>

      <!-- Cabeça / Juba de Lobo com camadas de pelos -->
      <path d="M26 62 Q20 48 34 38 Q60 26 86 38 Q100 48 94 62 Q102 78 88 88 Q60 96 32 88 Q18 78 26 62 Z" fill="url(#wolfFur)" stroke="#2e3440" stroke-width="2.5"/>
      
      <!-- Mancha facial clara -->
      <path d="M42 45 Q60 38 78 45 Q82 66 60 76 Q38 66 42 45 Z" fill="#ffffff" opacity="0.9"/>
      
      <!-- Olhos de Âmbar penetrantes -->
      <ellipse cx="46" cy="52" rx="6" ry="7" fill="#f59e0b" stroke="#1f2937" stroke-width="2"/>
      <ellipse cx="74" cy="52" rx="6" ry="7" fill="#f59e0b" stroke="#1f2937" stroke-width="2"/>
      <circle cx="47" cy="51" r="2.5" fill="#111827"/>
      <circle cx="73" cy="51" r="2.5" fill="#111827"/>
      <circle cx="45" cy="49" r="1.5" fill="#ffffff"/>
      <circle cx="71" cy="49" r="1.5" fill="#ffffff"/>
      <!-- Cicatriz guerreira no olho direito -->
      <line x1="74" y1="40" x2="74" y2="64" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round"/>

      <!-- Focinho e Nariz de Lobo -->
      <polygon points="60,60 52,69 68,69" fill="#1e293b"/>
      <circle cx="60" cy="65" r="4.5" fill="#0f172a"/>
      <path d="M60 69 L60 75 M54 75 Q60 78 66 75" stroke="#1e293b" stroke-width="2.2" stroke-linecap="round"/>

      <!-- Cachecol Azul Eólico ondulando -->
      <path d="M28 84 Q60 98 92 84 Q98 96 85 106 Q60 112 35 106 Q22 96 28 84 Z" fill="url(#wolfScarf)" stroke="#0369a1" stroke-width="2.5"/>
      <path d="M24 96 Q14 104 22 118 Q30 114 34 102 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="1.8"/>
    </svg>

  {:else if character === 'harpy'}
    <!-- ARIA: HARPY AVIAN ANTHRO -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="harpyBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#4a3f35"/>
          <stop offset="100%" stop-color="#1f1812"/>
        </radialGradient>
        <linearGradient id="harpyHair" x1="60" y1="15" x2="60" y2="60">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="60%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#b45309"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#harpyBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#785328" stroke-width="2"/>

      <!-- Asas de Penas Abertas ao Fundo -->
      <path d="M12 70 C8 35 30 20 45 40 M108 70 C112 35 90 20 75 40" stroke="#fde047" stroke-width="8" stroke-linecap="round"/>
      <path d="M18 78 C12 45 35 30 50 48 M102 78 C108 45 85 30 70 48" stroke="#d97706" stroke-width="5" stroke-linecap="round"/>

      <!-- Orelhas emplumadas -->
      <path d="M30 40 C22 22 35 15 42 32" fill="#fde047" stroke="#78350f" stroke-width="2"/>
      <path d="M90 40 C98 22 85 15 78 32" fill="#fde047" stroke="#78350f" stroke-width="2"/>

      <!-- Rosto e Cabelo Dourado em Camadas -->
      <circle cx="60" cy="56" r="22" fill="#fed7aa" stroke="#78350f" stroke-width="2"/>
      <path d="M36 42 Q60 18 84 42 Q76 30 60 30 Q44 30 36 42 Z" fill="url(#harpyHair)" stroke="#78350f" stroke-width="2"/>
      <!-- Franja e Mechas -->
      <path d="M40 42 Q50 56 60 45 Q70 56 80 42" fill="none" stroke="#b45309" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Óculos de Aviador na Cabeça -->
      <rect x="42" y="26" width="14" height="10" rx="3" fill="#38bdf8" stroke="#d97706" stroke-width="2"/>
      <rect x="64" y="26" width="14" height="10" rx="3" fill="#38bdf8" stroke="#d97706" stroke-width="2"/>
      <line x1="56" y1="31" x2="64" y2="31" stroke="#78350f" stroke-width="2.5"/>

      <!-- Olhos Celestes Expressivos -->
      <ellipse cx="49" cy="56" rx="5" ry="6.5" fill="#0284c7" stroke="#0f172a" stroke-width="2"/>
      <ellipse cx="71" cy="56" rx="5" ry="6.5" fill="#0284c7" stroke="#0f172a" stroke-width="2"/>
      <circle cx="50" cy="54" r="2" fill="#ffffff"/>
      <circle cx="72" cy="54" r="2" fill="#ffffff"/>

      <!-- Sorriso e Bico Fino Sutil -->
      <polygon points="60,62 57,67 63,67" fill="#f59e0b" stroke="#78350f" stroke-width="1.5"/>
      <path d="M55 72 Q60 76 65 72" stroke="#78350f" stroke-width="2" stroke-linecap="round"/>

      <!-- Jaqueta de Couro Aviador com gola felpuda -->
      <path d="M38 78 Q60 92 82 78 L88 108 Q60 114 32 108 Z" fill="#78350f" stroke="#451a03" stroke-width="2.5"/>
      <path d="M42 78 Q60 88 78 78" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/>
    </svg>

  {:else if character === 'holstaur'}
    <!-- BRENA: HOLSTAUR COW ANTHRO GUARDIAN -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="cowBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#2d3b2d"/>
          <stop offset="100%" stop-color="#141c14"/>
        </radialGradient>
        <linearGradient id="cowHorn" x1="30" y1="15" x2="30" y2="40">
          <stop offset="0%" stop-color="#2e1d11"/>
          <stop offset="100%" stop-color="#785328"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#cowBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#166534" stroke-width="2"/>

      <!-- Chifres Bovinos Curvos -->
      <path d="M40 38 C28 26 22 10 32 6 C38 16 44 26 46 36" fill="url(#cowHorn)" stroke="#1a110a" stroke-width="2"/>
      <path d="M80 38 C92 26 98 10 88 6 C82 16 76 26 74 36" fill="url(#cowHorn)" stroke="#1a110a" stroke-width="2"/>

      <!-- Orelhas Bovinas Macias Horizontais -->
      <path d="M38 46 C20 44 14 54 26 60 C34 58 38 52 38 46 Z" fill="#f5ebe0" stroke="#4a3728" stroke-width="2"/>
      <path d="M26 48 C20 50 20 54 26 56" fill="#fbcfe8"/>
      <path d="M82 46 C100 44 106 54 94 60 C86 58 82 52 82 46 Z" fill="#f5ebe0" stroke="#4a3728" stroke-width="2"/>
      <path d="M94 48 C100 50 100 54 94 56" fill="#fbcfe8"/>

      <!-- Cabeça com Pelagem Branca e Mancha Castanha -->
      <circle cx="60" cy="56" r="26" fill="#fdfbf7" stroke="#4a3728" stroke-width="2.5"/>
      <!-- Mancha castanha característica Holstaur no olho esquerdo -->
      <path d="M42 36 Q56 34 52 56 Q40 60 38 48 Z" fill="#9a623a"/>

      <!-- Cabelo com Franja e Trança Florida -->
      <path d="M44 34 Q60 26 76 34 Q70 42 60 38 Q50 42 44 34 Z" fill="#ffffff" stroke="#4a3728" stroke-width="2"/>
      <!-- Florzinha na orelha -->
      <circle cx="36" cy="36" r="3.5" fill="#f472b6"/>
      <circle cx="36" cy="36" r="1.5" fill="#fef08a"/>

      <!-- Olhos Castanhos Gentis e Calmos -->
      <ellipse cx="48" cy="52" rx="5" ry="6" fill="#582f0e" stroke="#1f1812" stroke-width="2"/>
      <ellipse cx="72" cy="52" rx="5" ry="6" fill="#582f0e" stroke="#1f1812" stroke-width="2"/>
      <circle cx="49" cy="50" r="1.8" fill="#ffffff"/>
      <circle cx="73" cy="50" r="1.8" fill="#ffffff"/>

      <!-- Focinho Bovino Macio Rosado -->
      <ellipse cx="60" cy="68" rx="15" ry="9" fill="#fed7aa" stroke="#78350f" stroke-width="2"/>
      <ellipse cx="54" cy="67" rx="2.5" ry="3" fill="#78350f"/>
      <ellipse cx="66" cy="67" rx="2.5" ry="3" fill="#78350f"/>
      <path d="M56 73 Q60 76 64 73" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>

      <!-- Armadura com Peitoral e Colar com Sino Dourado -->
      <path d="M34 82 Q60 96 86 82 L90 114 Q60 120 30 114 Z" fill="#4a3728" stroke="#2e1d11" stroke-width="2.5"/>
      <path d="M42 82 Q60 92 78 82" stroke="#d4a34b" stroke-width="4"/>
      <!-- Sino de Latão pastoral -->
      <circle cx="60" cy="94" r="5" fill="#f59e0b" stroke="#78350f" stroke-width="2"/>
    </svg>

  {:else if character === 'bear'}
    <!-- KORGN: GRIZZLY BEAR ANTHRO TANK -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="bearBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#3b2b1a"/>
          <stop offset="100%" stop-color="#191108"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#bearBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#854d0e" stroke-width="2"/>

      <!-- Orelhas redondas de Urso -->
      <circle cx="34" cy="28" r="12" fill="#713f12" stroke="#2e1d11" stroke-width="2.5"/>
      <circle cx="34" cy="28" r="6" fill="#fed7aa"/>
      <circle cx="86" cy="28" r="12" fill="#713f12" stroke="#2e1d11" stroke-width="2.5"/>
      <circle cx="86" cy="28" r="6" fill="#fed7aa"/>

      <!-- Cabeça Maciça de Urso com pelos -->
      <circle cx="60" cy="56" r="30" fill="#854d0e" stroke="#2e1d11" stroke-width="3"/>
      
      <!-- Focinho largo claro -->
      <ellipse cx="60" cy="66" rx="16" ry="12" fill="#d97706" stroke="#2e1d11" stroke-width="2"/>
      <polygon points="60,60 52,66 68,66" fill="#1e1b18"/>
      <path d="M60 66 L60 72 M52 72 Q60 76 68 72" stroke="#1e1b18" stroke-width="2.5" stroke-linecap="round"/>

      <!-- Olhos determinados -->
      <circle cx="48" cy="48" r="4.5" fill="#fef08a" stroke="#1e1b18" stroke-width="2"/>
      <circle cx="72" cy="48" r="4.5" fill="#fef08a" stroke="#1e1b18" stroke-width="2"/>
      <circle cx="48" cy="48" r="2.5" fill="#0f172a"/>
      <circle cx="72" cy="48" r="2.5" fill="#0f172a"/>

      <!-- Armadura de Latão Pesada com Cravos Pontudos -->
      <path d="M26 84 Q60 102 94 84 L100 118 Q60 124 20 118 Z" fill="#ca8a04" stroke="#713f12" stroke-width="3"/>
      <!-- Cravos nos ombros -->
      <polygon points="26,82 20,70 32,78" fill="#fef08a" stroke="#713f12" stroke-width="2"/>
      <polygon points="94,82 100,70 88,78" fill="#fef08a" stroke="#713f12" stroke-width="2"/>
    </svg>

  {:else if character === 'cat'}
    <!-- ELARA: FELINE CATGIRL MYSTIC -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="catBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#1e293b"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#catBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#0284c7" stroke-width="2"/>

      <!-- Orelhas pontudas de Gato com Guizos -->
      <polygon points="34,44 26,14 52,32" fill="#fed7aa" stroke="#451a03" stroke-width="2.2" stroke-linejoin="round"/>
      <polygon points="36,40 30,22 48,32" fill="#f472b6"/>
      <polygon points="86,44 94,14 68,32" fill="#fed7aa" stroke="#451a03" stroke-width="2.2" stroke-linejoin="round"/>
      <polygon points="84,40 90,22 72,32" fill="#f472b6"/>
      <!-- Fitas e Guizos nas orelhas -->
      <circle cx="28" cy="38" r="4" fill="#fbbf24" stroke="#78350f" stroke-width="1.5"/>
      <circle cx="92" cy="38" r="4" fill="#fbbf24" stroke="#78350f" stroke-width="1.5"/>

      <!-- Cauda Felina Sinuosa ao Fundo -->
      <path d="M22 100 C8 80 12 50 26 42 C32 38 34 46 26 52 C18 60 16 80 32 94" stroke="#fed7aa" stroke-width="6" stroke-linecap="round"/>

      <!-- Cabeça e Cabelos Loiro-Platinado Elegantes -->
      <circle cx="60" cy="56" r="22" fill="#fef3c7" stroke="#451a03" stroke-width="2.2"/>
      <path d="M38 42 Q60 22 82 42 Q72 32 60 32 Q48 32 38 42 Z" fill="#fef08a" stroke="#78350f" stroke-width="2"/>
      <path d="M42 42 Q52 52 60 44 Q68 52 78 42" fill="none" stroke="#b45309" stroke-width="2" stroke-linecap="round"/>

      <!-- Olhos Esmeralda Místicos -->
      <ellipse cx="48" cy="54" rx="5.5" ry="7" fill="#10b981" stroke="#064e3b" stroke-width="2"/>
      <ellipse cx="72" cy="54" rx="5.5" ry="7" fill="#10b981" stroke="#064e3b" stroke-width="2"/>
      <ellipse cx="48" cy="54" rx="2" ry="5.5" fill="#064e3b"/>
      <ellipse cx="72" cy="54" rx="2" ry="5.5" fill="#064e3b"/>
      <circle cx="46" cy="51" r="1.8" fill="#ffffff"/>
      <circle cx="70" cy="51" r="1.8" fill="#ffffff"/>

      <!-- Nariz e Bigodes Delicados -->
      <polygon points="60,63 58,66 62,66" fill="#f472b6"/>
      <path d="M57 69 Q60 72 63 69" stroke="#78350f" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="38" y1="64" x2="28" y2="62" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="38" y1="68" x2="28" y2="70" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="82" y1="64" x2="92" y2="62" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="82" y1="68" x2="92" y2="70" stroke="#b45309" stroke-width="1.5" stroke-linecap="round"/>

      <!-- Quimono de Seda Celeste Laminar com Nuvens -->
      <path d="M36 78 Q60 94 84 78 L90 114 Q60 120 30 114 Z" fill="#38bdf8" stroke="#0284c7" stroke-width="2.5"/>
      <path d="M44 78 L60 98 L76 78" stroke="#ffffff" stroke-width="3" fill="none"/>
    </svg>

  {:else if character === 'dragon'}
    <!-- KALLISTA: DRAGONKIN ANTHRO VALKYRIE -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="dragBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#4c1d24"/>
          <stop offset="100%" stop-color="#1f0a0d"/>
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#dragBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#e11d48" stroke-width="2"/>

      <!-- Asas de Dragão Abertas -->
      <path d="M20 50 C10 20 30 10 44 26 C36 36 28 42 20 50 Z" fill="#be123c" stroke="#881337" stroke-width="2"/>
      <path d="M100 50 C110 20 90 10 76 26 C84 36 92 42 100 50 Z" fill="#be123c" stroke="#881337" stroke-width="2"/>

      <!-- Chifres Draconianos Estilizados -->
      <path d="M42 36 C34 16 26 8 38 2 C44 14 46 24 48 34" fill="#fbbf24" stroke="#78350f" stroke-width="2"/>
      <path d="M78 36 C86 16 94 8 82 2 C76 14 74 24 72 34" fill="#fbbf24" stroke="#78350f" stroke-width="2"/>

      <!-- Cabeça Draconiana Escamosa Carmesim -->
      <path d="M38 52 C38 34 60 28 82 52 C86 70 60 78 38 52 Z" fill="#e11d48" stroke="#881337" stroke-width="2.5"/>

      <!-- Olhos Dourados de Dragão com fenda -->
      <ellipse cx="50" cy="50" rx="5" ry="6.5" fill="#fef08a" stroke="#78350f" stroke-width="1.8"/>
      <ellipse cx="70" cy="50" rx="5" ry="6.5" fill="#fef08a" stroke="#78350f" stroke-width="1.8"/>
      <line x1="50" y1="45" x2="50" y2="55" stroke="#451a03" stroke-width="2.2" stroke-linecap="round"/>
      <line x1="70" y1="45" x2="70" y2="55" stroke="#451a03" stroke-width="2.2" stroke-linecap="round"/>

      <!-- Armadura de Escamas e Lança Dourada -->
      <path d="M36 78 Q60 96 84 78 L88 114 Q60 120 32 114 Z" fill="#881337" stroke="#4c0519" stroke-width="2.5"/>
      <line x1="24" y1="116" x2="96" y2="24" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
    </svg>

  {:else}
    <!-- KAEL: KITSUNE FOX ANTHRO ALCHEMIST -->
    <svg viewBox="0 0 120 120" class="w-full h-full drop-shadow-md" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="foxBg" cx="60" cy="50" r="55">
          <stop offset="0%" stop-color="#3b1d4a"/>
          <stop offset="100%" stop-color="#170920"/>
        </radialGradient>
        <linearGradient id="foxFire" x1="0" y1="0" x2="0" y2="40">
          <stop offset="0%" stop-color="#f472b6"/>
          <stop offset="100%" stop-color="#9333ea"/>
        </linearGradient>
      </defs>
      <circle cx="60" cy="60" r="54" fill="url(#foxBg)"/>
      <circle cx="60" cy="60" r="54" stroke="#a855f7" stroke-width="2"/>

      <!-- Caudas de Raposa Flamejantes com Fogo Fátuo -->
      <path d="M26 84 C8 60 14 30 26 22 C34 35 32 60 38 78 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
      <circle cx="26" cy="22" r="5" fill="url(#foxFire)"/>
      <path d="M94 84 C112 60 106 30 94 22 C86 35 88 60 82 78 Z" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
      <circle cx="94" cy="22" r="5" fill="url(#foxFire)"/>

      <!-- Orelhas Grandes de Raposa com Pêlos Internos -->
      <polygon points="34,44 24,10 52,30" fill="#ea580c" stroke="#7c2d12" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="36,40 28,18 48,32" fill="#fed7aa"/>
      <polygon points="86,44 96,10 68,30" fill="#ea580c" stroke="#7c2d12" stroke-width="2.5" stroke-linejoin="round"/>
      <polygon points="84,40 92,18 72,32" fill="#fed7aa"/>

      <!-- Rosto com Pelagem Alaranjada e Bochechas Brancas -->
      <polygon points="60,82 30,50 38,36 82,36 90,50" fill="#ea580c" stroke="#7c2d12" stroke-width="2.5"/>
      <polygon points="60,80 42,60 50,48 70,48 78,60" fill="#fff7ed"/>

      <!-- Óculos Alquímicos de Aviador na Cabeça -->
      <circle cx="48" cy="36" r="9" fill="#a855f7" stroke="#ca8a04" stroke-width="2.5"/>
      <circle cx="72" cy="36" r="9" fill="#a855f7" stroke="#ca8a04" stroke-width="2.5"/>
      <line x1="57" y1="36" x2="63" y2="36" stroke="#ca8a04" stroke-width="3"/>

      <!-- Olhos Dourados Astutos com delineado -->
      <ellipse cx="48" cy="52" rx="5.5" ry="6" fill="#f59e0b" stroke="#451a03" stroke-width="2"/>
      <ellipse cx="72" cy="52" rx="5.5" ry="6" fill="#f59e0b" stroke="#451a03" stroke-width="2"/>
      <circle cx="49" cy="50" r="2" fill="#0f172a"/>
      <circle cx="71" cy="50" r="2" fill="#0f172a"/>
      <circle cx="47" cy="49" r="1.5" fill="#ffffff"/>
      <circle cx="69" cy="49" r="1.5" fill="#ffffff"/>

      <!-- Focinho e Sorriso Travesso -->
      <polygon points="60,66 56,71 64,71" fill="#1e1b18"/>
      <path d="M54 75 Q60 78 66 75" stroke="#1e1b18" stroke-width="2" stroke-linecap="round"/>

      <!-- Manto Alquímico com Frasco de Poção Rosa/Violeta -->
      <path d="M36 82 Q60 96 84 82 L88 114 Q60 120 32 114 Z" fill="#581c87" stroke="#3b0764" stroke-width="2.5"/>
      <!-- Frasco de Azoth -->
      <circle cx="60" cy="98" r="8" fill="#f43f5e" stroke="#fbbf24" stroke-width="2"/>
      <rect x="58" y="86" width="4" height="6" fill="#ca8a04"/>
    </svg>
  {/if}
</div>
