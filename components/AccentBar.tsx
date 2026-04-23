import { BRAND_COLORS } from './PhotoTile'

export function AccentBar({ style = {} }: { style?: React.CSSProperties }) {
  return (
    <div style={{ display: 'flex', gap: 12, ...style }}>
      {BRAND_COLORS.map((c) => (
        <span key={c} className="dot" style={{ background: c, width: 14, height: 14 }} />
      ))}
    </div>
  )
}
