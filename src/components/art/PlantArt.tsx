import type { PlantArtKind } from "@/types";

/**
 * Hand-drawn SVG plant illustrations. Using inline artwork instead of stock
 * photos keeps the prototype self-contained (no third-party image hosts).
 */

const TERRACOTTA = "#C8744F";
const TERRACOTTA_DARK = "#A95B3A";
const SOIL = "#5B4334";

function Pot({ top = 146, width = 78, height = 46 }: { top?: number; width?: number; height?: number }) {
  const l = 100 - width / 2;
  const r = 100 + width / 2;
  const inset = width * 0.13;
  return (
    <g>
      <ellipse cx="100" cy={top + height + 3} rx={width * 0.55} ry="5" fill="#1B2B22" opacity="0.1" />
      <path
        d={`M${l + 4},${top + 10} L${l + inset},${top + height - 6} Q${l + inset + 1},${top + height} ${l + inset + 7},${top + height} L${r - inset - 7},${top + height} Q${r - inset - 1},${top + height} ${r - inset},${top + height - 6} L${r - 4},${top + 10} Z`}
        fill={TERRACOTTA}
      />
      <rect x={l} y={top} width={width} height="13" rx="4" fill={TERRACOTTA} />
      <rect x={l} y={top + 9} width={width} height="4" rx="2" fill={TERRACOTTA_DARK} opacity="0.45" />
      <path
        d={`M${l + 12},${top + 18} L${l + inset + 6},${top + height - 8}`}
        stroke="#fff"
        strokeOpacity="0.25"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </g>
  );
}

function petalPath(len: number, w: number) {
  return `M0,0 C${w * 0.72},${-len * 0.4} ${w * 0.58},${-len * 0.93} 0,${-len} C${-w * 0.58},${-len * 0.93} ${-w * 0.72},${-len * 0.4} 0,0 Z`;
}

function Echeveria() {
  const rings = [
    { n: 9, len: 68, w: 40, fill: "#6FA690", edge: "#5A8F7A", off: 0 },
    { n: 8, len: 54, w: 36, fill: "#86B8A1", edge: "#6FA690", off: 22 },
    { n: 7, len: 40, w: 30, fill: "#A2CDB6", edge: "#86B8A1", off: 8 },
    { n: 6, len: 27, w: 22, fill: "#BFDFCB", edge: "#A2CDB6", off: 30 },
    { n: 5, len: 15, w: 14, fill: "#D8EEDD", edge: "#BFDFCB", off: 12 },
  ];
  return (
    <g>
      <ellipse cx="100" cy="106" rx="88" ry="86" fill="#1B2B22" opacity="0.08" />
      <circle cx="100" cy="100" r="86" fill={TERRACOTTA} />
      <circle cx="100" cy="100" r="77" fill={TERRACOTTA_DARK} />
      <circle cx="100" cy="100" r="74" fill={SOIL} />
      {[
        [48, 60], [150, 56], [160, 132], [44, 140], [100, 168], [70, 36], [134, 160],
      ].map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 2 ? 2.2 : 3} fill="#8A6C58" />
      ))}
      <g transform="translate(100 100)">
        {rings.map((ring, ri) => (
          <g key={ri}>
            {Array.from({ length: ring.n }, (_, i) => {
              const angle = ring.off + (360 / ring.n) * i;
              return (
                <g key={i} transform={`rotate(${angle})`}>
                  <path d={petalPath(ring.len, ring.w)} fill={ring.fill} stroke={ring.edge} strokeWidth="1.2" />
                  <circle cx="0" cy={-ring.len + 2.5} r={ring.len > 30 ? 2.6 : 1.6} fill="#D98C8C" opacity="0.85" />
                  <path
                    d={`M0,${-ring.len * 0.2} L0,${-ring.len * 0.8}`}
                    stroke="#fff"
                    strokeOpacity="0.22"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </g>
              );
            })}
          </g>
        ))}
        <circle r="4" fill="#E8F6EA" />
      </g>
    </g>
  );
}

function MonsteraLeaf({ x, y, rotate, scale, fill, bg }: { x: number; y: number; rotate: number; scale: number; fill: string; bg: string }) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`}>
      <path
        d="M0,0 C-10,9 -40,8 -43,-22 C-45,-52 -20,-74 0,-84 C20,-74 45,-52 43,-22 C40,8 10,9 0,0 Z"
        fill={fill}
      />
      <g stroke={bg} strokeWidth="4.5" strokeLinecap="round" fill="none">
        <path d="M-47,-16 L-15,-12" />
        <path d="M-46,-38 L-14,-30" />
        <path d="M-36,-58 L-11,-47" />
        <path d="M47,-16 L15,-12" />
        <path d="M46,-38 L14,-30" />
        <path d="M36,-58 L11,-47" />
      </g>
      <ellipse cx="-8" cy="-60" rx="2.6" ry="4.5" fill={bg} transform="rotate(-20 -8 -60)" />
      <ellipse cx="8" cy="-60" rx="2.6" ry="4.5" fill={bg} transform="rotate(20 8 -60)" />
      <path d="M0,-2 L0,-78" stroke="#173A29" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
}

function Monstera({ bg }: { bg: string }) {
  return (
    <g>
      <g stroke="#2F6B4A" strokeWidth="4" strokeLinecap="round" fill="none">
        <path d="M100,150 Q94,118 76,104" />
        <path d="M100,150 Q110,126 124,108" />
        <path d="M100,150 L101,86" />
      </g>
      <MonsteraLeaf x={101} y={88} rotate={6} scale={0.86} fill="#2F7D4F" bg={bg} />
      <MonsteraLeaf x={76} y={104} rotate={-52} scale={0.98} fill="#3C9160" bg={bg} />
      <MonsteraLeaf x={124} y={108} rotate={56} scale={0.9} fill="#256B43" bg={bg} />
      <Pot />
    </g>
  );
}

function swordPath(h: number, w: number) {
  return `M${-w / 2},0 C${-w * 0.72},${-h * 0.5} ${-w * 0.3},${-h * 0.9} 0,${-h} C${w * 0.3},${-h * 0.9} ${w * 0.72},${-h * 0.5} ${w / 2},0 Z`;
}

function Snake() {
  const leaves = [
    { x: 80, h: 74, w: 18, r: -24 },
    { x: 121, h: 82, w: 18, r: 22 },
    { x: 89, h: 104, w: 21, r: -11 },
    { x: 112, h: 110, w: 21, r: 10 },
    { x: 100, h: 126, w: 23, r: -1 },
  ];
  return (
    <g>
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(${l.x} 152) rotate(${l.r})`}>
          <path d={swordPath(l.h, l.w)} fill="#2C6646" stroke="#D8C64F" strokeWidth="3" strokeLinejoin="round" />
          {Array.from({ length: Math.floor(l.h / 14) - 1 }, (_, b) => {
            const y = -12 - b * 14;
            const half = l.w * 0.3 * (1 - (b * 14) / (l.h * 1.25));
            return (
              <path
                key={b}
                d={`M${-half},${y} l${half / 2},-3 l${half / 2},3 l${half / 2},-3 l${half / 2},3`}
                stroke="#8FC29A"
                strokeOpacity="0.65"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            );
          })}
        </g>
      ))}
      <Pot />
    </g>
  );
}

function Spiky({ variant }: { variant: "aloe" | "haworthia" }) {
  const aloe = variant === "aloe";
  const fill = aloe ? "#6FAE80" : "#2C6646";
  const edge = aloe ? "#4F8F62" : "#1F4D36";
  const leaves = aloe
    ? [
        { r: -62, h: 66, w: 20 }, { r: 62, h: 64, w: 20 }, { r: -36, h: 86, w: 22 },
        { r: 36, h: 84, w: 22 }, { r: -12, h: 100, w: 23 }, { r: 13, h: 96, w: 23 },
      ]
    : [
        { r: -66, h: 50, w: 18 }, { r: 66, h: 50, w: 18 }, { r: -42, h: 62, w: 19 },
        { r: 42, h: 62, w: 19 }, { r: -18, h: 72, w: 20 }, { r: 18, h: 70, w: 20 }, { r: 0, h: 60, w: 18 },
      ];
  return (
    <g>
      {leaves.map((l, i) => (
        <g key={i} transform={`translate(100 152) rotate(${l.r})`}>
          <path d={swordPath(l.h, l.w)} fill={fill} stroke={edge} strokeWidth="1.5" />
          {aloe
            ? [0.25, 0.42, 0.6].map((t, d) => (
                <circle key={d} cx={d % 2 ? 3 : -3} cy={-l.h * t} r="1.8" fill="#D6EFD9" opacity="0.8" />
              ))
            : Array.from({ length: Math.floor(l.h / 9) - 1 }, (_, b) => {
                const y = -10 - b * 9;
                const half = l.w * 0.34 * (1 - (b * 9) / (l.h * 1.15));
                return (
                  <path key={b} d={`M${-half},${y} L${half},${y}`} stroke="#F3F7EE" strokeWidth="2.2" strokeLinecap="round" />
                );
              })}
        </g>
      ))}
      <Pot />
    </g>
  );
}

function Pilea() {
  const leaves = [
    { x: 52, y: 96, r: 17 }, { x: 78, y: 62, r: 19 }, { x: 118, y: 52, r: 20 },
    { x: 150, y: 88, r: 18 }, { x: 98, y: 98, r: 17 }, { x: 66, y: 126, r: 14 },
    { x: 137, y: 124, r: 15 }, { x: 96, y: 28, r: 15 },
  ];
  return (
    <g>
      {leaves.map((l, i) => (
        <path
          key={i}
          d={`M100,150 Q${(100 + l.x) / 2 + (l.x < 100 ? 8 : -8)},${(150 + l.y) / 2} ${l.x},${l.y}`}
          stroke="#5E8F5F"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
      ))}
      {leaves.map((l, i) => (
        <g key={i}>
          <circle cx={l.x} cy={l.y} r={l.r} fill={i % 3 === 0 ? "#3C9160" : i % 3 === 1 ? "#4FA06D" : "#2F7D4F"} />
          <path
            d={`M${l.x - l.r * 0.55},${l.y - l.r * 0.3} A${l.r * 0.7},${l.r * 0.7} 0 0 1 ${l.x + l.r * 0.1},${l.y - l.r * 0.68}`}
            stroke="#fff"
            strokeOpacity="0.3"
            strokeWidth="2.5"
            fill="none"
            strokeLinecap="round"
          />
          <circle cx={l.x} cy={l.y + l.r * 0.15} r="2.2" fill="#D6EFD9" />
        </g>
      ))}
      <Pot />
    </g>
  );
}

function Cactus() {
  return (
    <g>
      <ellipse cx="100" cy="112" rx="50" ry="46" fill="#4C8C5C" />
      {[38, 24, 9].map((rx) => (
        <ellipse key={rx} cx="100" cy="112" rx={rx} ry="46" fill="none" stroke="#2F6B4A" strokeWidth="2" />
      ))}
      {[-44, -31, -16, 0, 16, 31, 44].map((dx) =>
        [-28, -12, 6, 22].map((dy) => {
          const squeeze = Math.sqrt(Math.max(0, 1 - (dy / 46) ** 2));
          const x = 100 + dx * squeeze;
          const y = 108 + dy;
          return (
            <g key={`${dx}-${dy}`} stroke="#F1CE55" strokeWidth="1.6" strokeLinecap="round">
              <path d={`M${x - 4},${y - 3} L${x + 4},${y + 3}`} />
              <path d={`M${x + 4},${y - 3} L${x - 4},${y + 3}`} />
            </g>
          );
        }),
      )}
      <ellipse cx="100" cy="68" rx="14" ry="5" fill="#F4C542" />
      <Pot top={150} width={84} height={42} />
    </g>
  );
}

function MixedSucculents() {
  const petals = [
    { r: -78, len: 30, fill: "#6FA690" }, { r: 78, len: 30, fill: "#6FA690" },
    { r: -52, len: 34, fill: "#86B8A1" }, { r: 52, len: 34, fill: "#86B8A1" },
    { r: -26, len: 34, fill: "#A2CDB6" }, { r: 26, len: 34, fill: "#A2CDB6" },
    { r: 0, len: 30, fill: "#BFDFCB" },
  ];
  return (
    <g>
      {/* small barrel cactus */}
      <ellipse cx="141" cy="128" rx="19" ry="23" fill="#4C8C5C" />
      {[13, 5].map((rx) => (
        <ellipse key={rx} cx="141" cy="128" rx={rx} ry="23" fill="none" stroke="#2F6B4A" strokeWidth="1.6" />
      ))}
      {[-14, -5, 5, 14].map((dx) =>
        [-10, 3].map((dy) => (
          <path
            key={`${dx}-${dy}`}
            d={`M${141 + dx - 2.5},${126 + dy - 2} l5,4 m0,-4 l-5,4`}
            stroke="#F1CE55"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        )),
      )}
      <ellipse cx="141" cy="106" rx="6" ry="2.5" fill="#F4C542" />
      {/* small striped haworthia */}
      {[-48, -24, 0, 24, 48].map((r, i) => (
        <g key={r} transform={`translate(60 152) rotate(${r})`}>
          <path d={swordPath(i === 2 ? 50 : 42, 13)} fill="#2C6646" stroke="#1F4D36" strokeWidth="1.2" />
          {[14, 23, 32].map((y) => (
            <path key={y} d={`M-3,${-y} L3,${-y}`} stroke="#F3F7EE" strokeWidth="1.8" strokeLinecap="round" />
          ))}
        </g>
      ))}
      {/* rosette, seen from the side */}
      <g transform="translate(100 152)">
        {petals.map((p) => (
          <g key={p.r} transform={`rotate(${p.r})`}>
            <path d={petalPath(p.len, 20)} fill={p.fill} stroke="#5A8F7A" strokeWidth="1" />
            <circle cx="0" cy={-p.len + 2} r="1.7" fill="#D98C8C" opacity="0.85" />
          </g>
        ))}
      </g>
      <Pot top={148} width={124} height={40} />
    </g>
  );
}

export function PlantArt({ kind, bg = "#E4F0E2", className }: { kind: PlantArtKind; bg?: string; className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true" focusable="false">
      {kind === "echeveria" && <Echeveria />}
      {kind === "monstera" && <Monstera bg={bg} />}
      {kind === "snake" && <Snake />}
      {kind === "aloe" && <Spiky variant="aloe" />}
      {kind === "haworthia" && <Spiky variant="haworthia" />}
      {kind === "pilea" && <Pilea />}
      {kind === "cactus" && <Cactus />}
      {kind === "mixed" && <MixedSucculents />}
    </svg>
  );
}
