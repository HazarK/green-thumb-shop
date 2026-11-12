import type { PlantArtKind, ProductArtKind } from "@/types";
import { PlantArt } from "./PlantArt";

const FOREST = "#1F4D36";

function Shadow({ rx = 44 }: { rx?: number }) {
  return <ellipse cx="100" cy="182" rx={rx} ry="5" fill="#1B2B22" opacity="0.1" />;
}

function Leaf({ x, y, size = 10, rotate = 0, fill = "#fff" }: { x: number; y: number; size?: number; rotate?: number; fill?: string }) {
  return (
    <path
      transform={`translate(${x} ${y}) rotate(${rotate}) scale(${size / 10})`}
      d="M0,6 C-7,2 -6,-7 0,-10 C6,-7 7,2 0,6 Z"
      fill={fill}
    />
  );
}

function Bottle({ accent, label }: { accent: string; label?: string }) {
  return (
    <g>
      <Shadow rx={38} />
      <rect x="85" y="24" width="30" height="22" rx="5" fill={FOREST} />
      <rect x="90" y="44" width="20" height="14" fill="#F6F1E4" />
      <path d="M90,56 C72,62 66,72 66,86 L66,168 Q66,180 78,180 L122,180 Q134,180 134,168 L134,86 C134,72 128,62 110,56 Z" fill="#F6F1E4" />
      <path d="M74,84 L74,166" stroke="#fff" strokeWidth="5" strokeLinecap="round" />
      <rect x="66" y="96" width="68" height="62" fill={accent} />
      <Leaf x={100} y={116} size={13} />
      <text x="100" y="146" textAnchor="middle" fontSize="13" fontWeight="700" fill="#fff" fontFamily="inherit" letterSpacing="1">
        {label}
      </text>
    </g>
  );
}

function PotProduct() {
  return (
    <g>
      <Shadow rx={56} />
      <path d="M48,168 L152,168 L146,180 Q145,182 142,182 L58,182 Q55,182 54,180 Z" fill="#A95B3A" />
      <path d="M50,74 L64,164 Q65,170 72,170 L128,170 Q135,170 136,164 L150,74 Z" fill="#C8744F" />
      <rect x="42" y="56" width="116" height="22" rx="6" fill="#C8744F" />
      <rect x="42" y="72" width="116" height="6" rx="3" fill="#A95B3A" opacity="0.5" />
      <ellipse cx="100" cy="58" rx="52" ry="6" fill="#5B4334" />
      <path d="M62,90 L72,156" stroke="#fff" strokeOpacity="0.25" strokeWidth="6" strokeLinecap="round" />
      <path d="M100,56 C100,44 96,38 88,34" stroke="#2F7D4F" strokeWidth="3" fill="none" strokeLinecap="round" />
      <Leaf x={86} y={30} size={11} rotate={-50} fill="#3C9160" />
      <Leaf x={106} y={40} size={9} rotate={55} fill="#4FA06D" />
    </g>
  );
}

function Bag({ accent, label }: { accent: string; label?: string }) {
  return (
    <g>
      <Shadow rx={50} />
      <path d="M56,36 L144,36 L140,50 C152,90 152,140 146,176 Q145,182 138,182 L62,182 Q55,182 54,176 C48,140 48,90 60,50 Z" fill="#F6F1E4" />
      <rect x="56" y="30" width="88" height="14" rx="3" fill={accent} />
      <path d="M60,37 L140,37" stroke="#fff" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="3 3" />
      <rect x="62" y="70" width="76" height="62" rx="8" fill={accent} />
      <Leaf x={100} y={90} size={12} />
      <text x="100" y="118" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#fff" fontFamily="inherit" letterSpacing="0.8">
        {label}
      </text>
      {[
        [70, 156, 5], [84, 164, 4], [98, 154, 5.5], [112, 165, 4], [126, 156, 5], [76, 170, 3], [120, 172, 3],
      ].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill={i % 2 ? "#B9AFA0" : accent} opacity={i % 2 ? 0.9 : 0.55} />
      ))}
    </g>
  );
}

function MossPole() {
  return (
    <g>
      <rect x="89" y="14" width="22" height="140" rx="10" fill="#8A6844" />
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} d={`M89,${26 + i * 10} L111,${20 + i * 10}`} stroke="#6E5133" strokeWidth="2.5" />
      ))}
      <path d="M100,150 C70,130 128,112 100,92 C76,76 122,62 104,40" stroke="#2F7D4F" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <Leaf x={72} y={128} size={20} rotate={-70} fill="#3C9160" />
      <Leaf x={128} y={108} size={20} rotate={70} fill="#2F7D4F" />
      <Leaf x={74} y={78} size={18} rotate={-60} fill="#4FA06D" />
      <Leaf x={124} y={54} size={16} rotate={60} fill="#3C9160" />
      <g transform="translate(0 -4)">
        <Shadow rx={42} />
        <path d="M66,160 L72,180 Q73,184 78,184 L122,184 Q127,184 128,180 L134,160 Z" fill="#C8744F" />
        <rect x="61" y="150" width="78" height="13" rx="4" fill="#C8744F" />
        <rect x="61" y="159" width="78" height="4" rx="2" fill="#A95B3A" opacity="0.45" />
      </g>
    </g>
  );
}

function WateringCan() {
  return (
    <g>
      <Shadow rx={52} />
      <path d="M128,92 C176,84 178,150 132,150" stroke={FOREST} strokeWidth="9" fill="none" strokeLinecap="round" />
      <path d="M78,128 L28,70" stroke="#2F7D4F" strokeWidth="9" strokeLinecap="round" />
      <path d="M20,74 L36,62" stroke={FOREST} strokeWidth="7" strokeLinecap="round" />
      <path d="M72,82 L136,82 L140,172 Q140,180 132,180 L76,180 Q68,180 68,172 Z" fill="#2F7D4F" />
      <rect x="68" y="76" width="72" height="12" rx="5" fill={FOREST} />
      <path d="M80,98 L80,166" stroke="#fff" strokeOpacity="0.22" strokeWidth="6" strokeLinecap="round" />
      <Leaf x={108} y={136} size={16} fill="#F4C542" />
      {[[14, 90], [22, 102], [10, 108]].map(([x, y], i) => (
        <path key={i} d={`M${x},${y} q-3,5 0,8 q3,-3 0,-8`} fill="#3E86AD" />
      ))}
    </g>
  );
}

function Mister() {
  return (
    <g>
      <Shadow rx={40} />
      <path d="M84,84 C66,92 62,104 62,118 L62,166 Q62,180 76,180 L124,180 Q138,180 138,166 L138,118 C138,104 134,92 116,84 Z" fill="#C98B3E" opacity="0.9" />
      <path d="M62,138 L138,138 L138,166 Q138,180 124,180 L76,180 Q62,180 62,166 Z" fill="#A86E2A" opacity="0.55" />
      <path d="M72,112 L72,164" stroke="#fff" strokeOpacity="0.35" strokeWidth="5" strokeLinecap="round" />
      <rect x="86" y="66" width="28" height="20" rx="3" fill="#B8923E" />
      <rect x="92" y="40" width="16" height="28" rx="3" fill="#D6AE52" />
      <path d="M70,38 L112,38 Q118,38 118,44 L118,52 L70,52 Z" fill="#D6AE52" />
      <path d="M112,52 L126,74" stroke="#B8923E" strokeWidth="6" strokeLinecap="round" />
      {[[52, 34, 3], [40, 44, 2.5], [44, 26, 2], [30, 34, 2.5], [34, 54, 2], [22, 46, 1.8]].map(([x, y, r], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="#3E86AD" opacity="0.7" />
      ))}
    </g>
  );
}

const plantKinds: PlantArtKind[] = ["echeveria", "monstera", "snake", "aloe", "haworthia", "pilea", "cactus"];

export function ProductArt({
  kind,
  bg,
  accent = "#5E9E6E",
  label,
  className,
}: {
  kind: ProductArtKind;
  bg?: string;
  accent?: string;
  label?: string;
  className?: string;
}) {
  if ((plantKinds as string[]).includes(kind)) {
    return <PlantArt kind={kind as PlantArtKind} bg={bg} className={className} />;
  }
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {kind === "bottle" && <Bottle accent={accent} label={label} />}
      {kind === "pot" && <PotProduct />}
      {kind === "bag" && <Bag accent={accent} label={label} />}
      {kind === "moss-pole" && <MossPole />}
      {kind === "watering-can" && <WateringCan />}
      {kind === "mister" && <Mister />}
    </svg>
  );
}
