import React, { useState, useEffect } from 'react';
import { Transaction } from "@/app/api/getTransaction";

interface TransactionModalProps {
  type: "credit" | "debit";
  onClose: () => void;
  onSubmit: (newTransaction: Transaction) => Promise<void>;
  initialData?: Transaction | null;
}

const TransactionModal: React.FC<TransactionModalProps> = ({
  type,
  onClose,
  onSubmit,
  initialData = null
}) => {
  const [amount, setAmount] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [note, setNote] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  // Populate form if editing an existing transaction
  useEffect(() => {
    if (initialData) {
      setAmount(initialData["Amount"]?.toString() || "");
      setName(initialData["Name"] || "");
      setNote(initialData["Note"] || "");
      setCategory(initialData["Category"] || "");
    }
  }, [initialData]);

  const handleSubmitTransaction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const newTransaction: Transaction = {
        "Sr. No.": initialData ? initialData["Sr. No."] : Date.now().toString(),
        "Name": name,
        "Note": note,
        "Category": category,
        "Type": type === "credit" ? "Income" : "Expense",
        "Transaction Type": type === "credit" ? "Credit" : "Debit",
        "Amount": amount,
        "Date": initialData ? initialData["Date"] : new Date().toISOString().split('T')[0]
      };
      
      await onSubmit(newTransaction);
      onClose();
    } catch (error) {
      console.error("Error submitting transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const isEditing = !!initialData;
  const modalTitle = isEditing 
    ? `Edit ${type === 'credit' ? 'Income' : 'Expense'}`
    : `Add ${type === 'credit' ? 'Income' : 'Expense'}`;

  return (
    <div className="fixed inset-0 overflow-y-auto z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        {/* Background overlay with blur effect */}
        <div 
          className="fixed inset-0 bg-gray-500 bg-opacity-75 backdrop-blur-sm transition-opacity" 
          aria-hidden="true" 
          onClick={onClose}
        ></div>

        {/* Modal panel */}
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmitTransaction}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className={`mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full sm:mx-0 sm:h-10 sm:w-10 ${
                  type === 'credit' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {type === 'credit' ? (
                    <svg className="h-6 w-6 text-green-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  ) : (
                    <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  )}
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    {modalTitle}
                  </h3>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                        Amount (₹)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        min="0.01"
                        id="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                      </label>
                      <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        required
                      >
                        <option value="">Select a category</option>
                        {type === 'credit' ? (
                          <>
                            <option value="Salary">Salary</option>
                            <option value="Bonus">Bonus</option>
                            <option value="Investment">Investment</option>
                            <option value="Gift">Gift</option>
                            <option value="Other">Other</option>
                          </>
                        ) : (
                          <>
                            <option value="Food">Food</option>
                            <option value="Transportation">Transportation</option>
                            <option value="Housing">Housing</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Utilities">Utilities</option>
                            <option value="Shopping">Shopping</option>
                            <option value="Health">Health</option>
                            <option value="Other">Other</option>
                          </>
                        )}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                        Note
                      </label>
                      <textarea
                        id="note"
                        rows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm ${
                  type === 'credit' 
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500' 
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                } ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Saving...' : (isEditing ? 'Update' : 'Save')}
              </button>
              <button
                type="button"
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                onClick={onClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={onClose}
                  disabled={isSubmitting}
                >
                  Delete
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TransactionModal;