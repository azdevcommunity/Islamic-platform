/**
 * Modern loading spinner with enhanced design
 */
function Spinner({ size = "md", color = "primary" }) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10", 
    lg: "h-16 w-16",
    xl: "h-20 w-20"
  };

  const colorClasses = {
    primary: "text-primary-600",
    secondary: "text-gray-600",
    accent: "text-accent-600",
    orange: "text-orange-600"
  };

  return (
    <div className="relative">
      {/* Outer ring */}
      <div className={`${sizeClasses[size]} border-4 border-gray-200 rounded-full animate-pulse`}></div>
      
      {/* Spinning ring */}
      <svg
        className={`absolute top-0 left-0 animate-spin ${sizeClasses[size]} ${colorClasses[color]}`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle 
          className="opacity-25" 
          cx="12" 
          cy="12" 
          r="10" 
          stroke="currentColor" 
          strokeWidth="4"
        />
        <path 
          className="opacity-75" 
          fill="currentColor" 
          d="M4 12a8 8 0 018-8v8z"
        />
      </svg>
      
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 ${colorClasses[color]} rounded-full animate-pulse`}></div>
    </div>
  )
}

export default Spinner

