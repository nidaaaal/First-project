import * as React from "react";

const Card = ({ children, className }) => {
  return (
    <div className={`bg-white shadow-lg rounded-xl p-4 ${className}`}>
      {children}
    </div>
  );
};

const CardContent = ({ children }) => {
  return <div className="p-4">{children}</div>;
};

const Button = ({ children, className, ...props }) => {
    return (
      <button
        className={`px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  const Progress = ({ value, className }) => {
    return (
      <div className={`w-full bg-gray-200 h-3 rounded-full overflow-hidden ${className}`}>
        <div className="bg-blue-500 h-full" style={{ width: `${value}%` }}></div>
      </div>
    );
  };
    

export { Card, CardContent,Button,Progress };
