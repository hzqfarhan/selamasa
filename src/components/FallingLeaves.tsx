export default function FallingLeaves({ count = 18 }: { count?: number }) {
  return (
    <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }}>
      {[...Array(count)].map((_, i) => {
        const delay = i * 0.35;
        const duration = 4.8 + (i % 3) * 2.1;
        const left = 5 + (i * 18.5) % 90;
        const size = 12 + (i % 4) * 4.5;
        return (
          <div key={i} style={{
            position: 'absolute',
            width: `${size}px`, height: `${size}px`,
            background: 'linear-gradient(135deg, var(--gold), var(--gold3))',
            borderRadius: '0 100% 0 100%',
            opacity: 0,
            left: `${left}%`,
            animation: `splashFall ${duration}s ${delay}s infinite linear`
          }} />
        )
      })}
    </div>
  )
}