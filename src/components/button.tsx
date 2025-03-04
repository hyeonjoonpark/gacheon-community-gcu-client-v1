export const Button = ({ children, className = '', size = 'md', ...props }: any) => {
  const sizes = {
    lg: 'px-8 py-3 text-lg',
    md: 'px-6 py-2 text-md',
    sm: 'px-4 py-1 text-sm'
  }

  return (
    <button 
      className={`
        rounded-lg
        font-semibold
        transition-all
        duration-200
        ${sizes[size as keyof typeof sizes]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  )
} 