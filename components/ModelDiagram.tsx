import { MentalModel } from '@/lib/models'

function darkenHex(hex: string): string {
  try {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - 85)
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - 85)
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - 85)
    return `rgb(${r},${g},${b})`
  } catch { return '#333' }
}

function wrapText(text: string, maxLen = 12): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let cur = ''
  for (const w of words) {
    if (cur && (cur + ' ' + w).length > maxLen) { lines.push(cur); cur = w }
    else cur = cur ? cur + ' ' + w : w
  }
  if (cur) lines.push(cur)
  return lines
}

export default function ModelDiagram({ model }: { model: MentalModel }) {
  const { nodes, colors } = model.visual
  const W = 660
  const H = 120
  const pad = 16
  const gap = 12
  const bh = 64
  const bw = Math.min(110, (W - pad * 2 - gap * (nodes.length - 1)) / nodes.length)
  const totalW = bw * nodes.length + gap * (nodes.length - 1)
  const startX = (W - totalW) / 2
  const cy = (H - bh) / 2

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full"
      style={{ fontFamily: 'var(--font-dm-sans, sans-serif)' }}
    >
      {nodes.map((node, i) => {
        const x = startX + i * (bw + gap)
        const col = colors[i] ?? colors[0]
        const textColor = darkenHex(col)
        const lines = wrapText(node, 11)
        const textCy = cy + bh / 2 - (lines.length - 1) * 8

        return (
          <g key={i}>
            <rect x={x} y={cy} width={bw} height={bh} rx={8} fill={col} opacity={0.93} />
            {lines.map((line, li) => (
              <text
                key={li}
                x={x + bw / 2}
                y={textCy + li * 15}
                textAnchor="middle"
                fontSize={10}
                fontWeight={500}
                fill={textColor}
              >
                {line}
              </text>
            ))}
            {i < nodes.length - 1 && (
              <>
                <line
                  x1={x + bw + 1} y1={cy + bh / 2}
                  x2={x + bw + gap - 2} y2={cy + bh / 2}
                  stroke="#9A9890" strokeWidth={1.5} strokeLinecap="round"
                />
                <polygon
                  points={`${x + bw + gap - 2},${cy + bh / 2 - 3.5} ${x + bw + gap + 2},${cy + bh / 2} ${x + bw + gap - 2},${cy + bh / 2 + 3.5}`}
                  fill="#9A9890"
                />
              </>
            )}
          </g>
        )
      })}
    </svg>
  )
}
