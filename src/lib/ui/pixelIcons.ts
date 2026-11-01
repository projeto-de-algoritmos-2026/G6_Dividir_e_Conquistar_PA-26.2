// Ícones pixel-art desenhados à mão (10x10), no espírito dos ícones de
// Cloud Meadow (refs 01, 03 e 05). Cada caractere é um pixel; '.' = vazio.

export const PALETTE: Record<string, string> = {
  k: '#1e1d21', // contorno
  w: '#ffffff',
  c: '#f6e9c6', // pergaminho
  C: '#d8c597', // cáqui
  g: '#f5c542', // ouro
  y: '#ffe48a', // ouro claro
  G: '#c08f17', // ouro escuro
  r: '#e2482f', // vermelho carimbo
  R: '#9c2d1f',
  b: '#4459ad', // royal
  B: '#2b3a80',
  l: '#8fc3ee', // azul céu
  s: '#c3c9d4', // prata
  S: '#7a808c',
  n: '#a8663f', // couro
  N: '#6e3f25',
  e: '#45c552', // verde
  E: '#2a8a38',
  p: '#f06ac4', // rosa
  P: '#a83a8a',
  v: '#9a6be0', // violeta
  o: '#f08a3c'
};

export const ICONS: Record<string, string[]> = {
  sword: [
    '........kk',
    '.......kwk',
    '......kwsk',
    '.....kwsk.',
    '.k..kwsk..',
    '.kkkwsk...',
    '..kgsk....',
    '..kGgk....',
    '.kNkkk....',
    'kNk.......'
  ],
  scroll: [
    '.kkkkkkk..',
    'kcckccccck',
    'kckkccccck',
    '.kkcckkkck',
    '..kcccccck',
    '..kckkkkck',
    '..kcccccck',
    '..kckkkcck',
    '.kkcccccck',
    'kcckkkkkk.'
  ],
  star: [
    '....kk....',
    '...kygk...',
    '...kygk...',
    'kkkkyggkkk',
    'kyyyygggGk',
    '.kgggggGk.',
    '..kgggGk..',
    '..kggkGGk.',
    '.kgGk.kGk.',
    '.kkk...kk.'
  ],
  gear: [
    '....kk....',
    '.kk.ks.kk.',
    '.ksksssksk',
    '..kssssk..',
    'kksskksskk',
    'kssk..kssk',
    '..kssssk..',
    '.ksksssksk',
    '.kk.ks.kk.',
    '....kk....'
  ],
  play: [
    '..........',
    '..kk......',
    '..kwk.....',
    '..kwwk....',
    '..kwwwk...',
    '..kwwwwk..',
    '..kwwwk...',
    '..kwwk....',
    '..kwk.....',
    '..kk......'
  ],
  pause: [
    '..........',
    '.kkk..kkk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '.kwk..kwk.',
    '.kkk..kkk.',
    '..........'
  ],
  next: [
    '..........',
    'kk.....kk.',
    'kwk....kwk',
    'kwwk...kwk',
    'kwwwk..kwk',
    'kwwwwk.kwk',
    'kwwwk..kwk',
    'kwwk...kwk',
    'kwk....kwk',
    'kk.....kk.'
  ],
  heart: [
    '..........',
    '.kk...kk..',
    'krrk.krrk.',
    'krwrkrrrk.',
    'krrrrrrrk.',
    '.krrrrrk..',
    '..krrrk...',
    '...krk....',
    '....k.....',
    '..........'
  ],
  coin: [
    '...kkkk...',
    '..kggggk..',
    '.kgyyggGk.',
    '.kgygkgGk.',
    '.kgygkgGk.',
    '.kgygkgGk.',
    '.kgggggGk.',
    '..kGGGGk..',
    '...kkkk...',
    '..........'
  ],
  shield: [
    '.kkkkkkkk.',
    'kbbbbwwwwk',
    'kbbbbwwwwk',
    'kbbbbwwwwk',
    'kwwwwbbbbk',
    'kwwwwbbbbk',
    '.kwwwbbbk.',
    '..kwwbbk..',
    '...kwbk...',
    '....kk....'
  ],
  bolt: [
    '.....kkk..',
    '....kyyk..',
    '...kyyk...',
    '..kyyk....',
    '.kyyyyykk.',
    '.kkkyyyyk.',
    '....kyyk..',
    '...kyyk...',
    '..kyk.....',
    '..kk......'
  ],
  leaf: [
    '......kkk.',
    '....kkeek.',
    '...keeeek.',
    '..keeEeek.',
    '.keeEeeek.',
    '.keEeeek..',
    '.kEeeek...',
    '.kEkkk....',
    'kEk.......',
    'kk........'
  ],
  swirl: [
    '..kkkkkk..',
    '.kllllllk.',
    'kllkkkkllk',
    'klk.kkklk.',
    'klk.klk...',
    'klk.kllk..',
    'kllk.kkk..',
    '.kllkkkkk.',
    '..kkllllk.',
    '....kkkk..'
  ],
  eye: [
    '..........',
    '..........',
    '...kkkk...',
    '.kkwwwwkk.',
    'kwwkvvkwwk',
    'kwwkvkkwwk',
    '.kkwwwwkk.',
    '...kkkk...',
    '..........',
    '..........'
  ],
  question: [
    '..kkkkk...',
    '.kwwwwwk..',
    'kwwkkkwwk.',
    'kkk..kwwk.',
    '....kwwk..',
    '...kwwk...',
    '...kwwk...',
    '...kkkk...',
    '...kwwk...',
    '...kkkk...'
  ],
  close: [
    'kk......kk',
    'kwk....kwk',
    '.kwk..kwk.',
    '..kwkkwk..',
    '...kwwk...',
    '...kwwk...',
    '..kwkkwk..',
    '.kwk..kwk.',
    'kwk....kwk',
    'kk......kk'
  ],
  bag: [
    '...kkkk...',
    '..kn..nk..',
    '.kkkkkkkk.',
    'knnnnnnnnk',
    'knnggnnnnk',
    'kNNkkNNNNk',
    'knnnnnnnnk',
    'knnnnnnnnk',
    'kNNNNNNNNk',
    '.kkkkkkkk.'
  ],
  calendar: [
    '.k.k..k.k.',
    'kkkkkkkkkk',
    'kbbbbbbbbk',
    'kkkkkkkkkk',
    'kcckcckcck',
    'kcckcckrck',
    'kkkkkkkkkk',
    'kcckcckcck',
    'kcckcckcck',
    'kkkkkkkkkk'
  ],
  sound: [
    '..........',
    '....kk....',
    '...kwk.k..',
    'kkkwwk..k.',
    'kwwwwk.k.k',
    'kwwwwk.k.k',
    'kkkwwk..k.',
    '...kwk.k..',
    '....kk....',
    '..........'
  ],
  mute: [
    '..........',
    '....kk....',
    '...kwk....',
    'kkkwwkr..r',
    'kwwwwk.rr.',
    'kwwwwk.rr.',
    'kkkwwkr..r',
    '...kwk....',
    '....kk....',
    '..........'
  ],
  flag: [
    '.kk.......',
    '.kbkkkk...',
    '.kbbbbbkkk',
    '.kbbbwbbbk',
    '.kbbbbbbk.',
    '.kbbbbbbbk',
    '.kbkkkkkkk',
    '.kk.......',
    '.kk.......',
    '.kk.......'
  ],
  trophy: [
    '.kkkkkkkk.',
    'kkgyyggGkk',
    'kgkyggGkgk',
    '.kkgggGkk.',
    '..kggGGk..',
    '...kgGk...',
    '....kk....',
    '...kggk...',
    '..kGGGGk..',
    '..kkkkkk..'
  ],
  flask: [
    '...kkkk...',
    '...kcck...',
    '...kcck...',
    '..kcccck..',
    '.kcccccck.',
    'kvvvvvvvvk',
    'kvwvvvvvvk',
    'kvvvvvwvvk',
    'kvvvvvvvvk',
    '.kkkkkkkk.'
  ],
  cloud: [
    '..........',
    '...kkk....',
    '..kwwwkk..',
    '.kkwwwwwk.',
    'kwwwwwwwwk',
    'kwwwwwwlwk',
    'kllwwwlllk',
    '.kkkkkkkk.',
    '..........',
    '..........'
  ],
  net: [
    '.kkk......',
    '.kbk......',
    '.kkkk.....',
    '...kk.....',
    '....kk....',
    '.....kk...',
    '......kkk.',
    '......kok.',
    '......kkk.',
    '..........'
  ],
  paw: [
    '..kk..kk..',
    '.kcck kcck',
    '.kcck.kcck',
    'kk.kkkk.kk',
    'kck.kk.kck',
    'kck.kk.kck',
    '.kkcccckk.',
    '.kcccccck.',
    '.kcccccck.',
    '..kkkkkk..'
  ],
  swap: [
    '...k......',
    '..kwk.....',
    '.kwwwkkkk.',
    'kwwwwwwwwk',
    '.kwwwkkkk.',
    '.kkkkwwwk.',
    'kwwwwwwwwk',
    '.kkkkwwwk.',
    '.....kwk..',
    '......k...'
  ],
  hourglass: [
    'kkkkkkkkkk',
    '.kcccccck.',
    '.kyyyyyyk.',
    '..kyyyyk..',
    '...kyyk...',
    '...kcck...',
    '..kcyyck..',
    '.kcyyyyck.',
    '.kyyyyyyk.',
    'kkkkkkkkkk'
  ]
};

export type IconName = keyof typeof ICONS;

export function iconRects(name: string): { x: number; y: number; fill: string }[] {
  const rows = ICONS[name] ?? ICONS.question;
  const out: { x: number; y: number; fill: string }[] = [];
  rows.forEach((row, y) => {
    for (let x = 0; x < row.length; x++) {
      const ch = row[x];
      const fill = PALETTE[ch];
      if (fill) out.push({ x, y, fill });
    }
  });
  return out;
}
