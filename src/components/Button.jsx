export default function Button({
  children,
  variant = 'primary',
  type = 'button',
  disabled = false,
  loading = false,
  onClick,
  fullWidth = false,
  ...rest
}) {
  const styles = {
    primary: { background: 'var(--color-primary)', color: '#fff', border: 'none' },
    secondary: { background: '#fff', color: 'var(--color-text)', border: '1px solid var(--color-border)' },
    danger: { background: 'var(--color-danger)', color: '#fff', border: 'none' },
    ghost: { background: 'transparent', color: 'var(--color-primary)', border: 'none' },
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      style={{
        ...styles[variant],
        padding: '0.6rem 1.1rem',
        borderRadius: 8,
        fontWeight: 600,
        width: fullWidth ? '100%' : 'auto',
        opacity: disabled || loading ? 0.65 : 1,
        transition: 'opacity 0.15s ease, background 0.15s ease',
      }}
      {...rest}
    >
      {loading ? 'Please wait…' : children}
    </button>
  )
}
