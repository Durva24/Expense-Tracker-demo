import React from 'react';

interface TransactionControlsProps {
  openTransactionModal: (type: string) => void;
}

const TransactionControls: React.FC<TransactionControlsProps> = ({ 
  openTransactionModal 
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h2 className="text-xl font-bold text-gray-800">Recent Transactions</h2>
      <div className="flex space-x-4">
        <button
          onClick={() => openTransactionModal('Add credit')}
          className="px-4 py-2 bg-blue-600 text-white rounded-md flex items-center hover:bg-blue-700 transition-colo₹ duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
          </svg>
          Add Credit
        </button>
        <button
          onClick={() => openTransactionModal('debit')}
          className="px-4 py-2 bg-orange-400 text-white rounded-md flex items-center hover:bg-orange-500 transition-colo₹ duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" transform="rotate(45 10 10)" />
          </svg>
          Add Debit
        </button>
      </div>
    </div>
  );
};

export default TransactionControls;