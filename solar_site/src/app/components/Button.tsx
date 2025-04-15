interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'ghost' | 'solid'; 
}

const Button = ({ type = 'button', onClick, children, className = '', variant = 'solid' }: ButtonProps) => {
  const baseClasses = "px-4 py-2 font-semibold rounded-md focus:outline-none focus:ring-2";
  const variantClasses =
    variant === 'ghost'
      ? 'bg-transparent text-gray-800 hover:bg-gray-100'
      : 'bg-blue-500 text-white hover:bg-blue-600';

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
