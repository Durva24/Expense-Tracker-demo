import React from 'react';
import { motion } from 'framer-motion';

interface BalanceCardProps {
  title: string;
  amount: number;
  type: 'balance' | 'credit' | 'debit';
}

const BalanceCard: React.FC<BalanceCardProps> = ({ title, amount, type }) => {
  // Determine styles based on card type
  const getCardStyles = () => {
    switch (type) {
      case 'balance':
        return {
          textColor: 'text-blue-800',
          gradientColor: 'bg-gradient-to-r from-blue-600 to-blue-400',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
            </svg>
          ),
          label: 'Updated today'
        };
      case 'credit':
        return {
          textColor: 'text-green-600',
          gradientColor: 'bg-gradient-to-r from-green-600 to-green-400',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          ),
          label: 'All time income'
        };
      case 'debit':
        return {
          textColor: 'text-red-500',
          gradientColor: 'bg-gradient-to-r from-red-500 to-red-400',
          icon: (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          ),
          label: 'All time expenses'
        };
      default:
        return {
          textColor: 'text-blue-800',
          gradientColor: 'bg-gradient-to-r from-blue-600 to-blue-400',
          icon: null,
          label: ''
        };
    }
  };

  const { textColor, gradientColor, icon, label } = getCardStyles();

  return (
    <motion.div 
      className="bg-white rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="p-6">
        <h2 className="text-sm font-medium text-gray-500 mb-1">{title}</h2>
        <p className={`text-3xl font-bold {textColor}`}>
          ₹{amount}
        </p>
        <div className="mt-4 flex items-center text-sm text-gray-500">
          {icon}
          <span>{label}</span>
        </div>
      </div>
      <div className={`h-2 ₹{gradientColor}`}></div>
    </motion.div>
  );
};

export default BalanceCard;
