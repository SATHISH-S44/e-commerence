import { useState } from 'react';

function AddProductModal({ isOpen, onClose }) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const ADMIN_PASSWORD = 'admin123';
  const GOOGLE_SHEET_URL = 'https://docs.google.com/spreadsheets/d/1WT2t2Gcplr3vbSam8lEnxcwBGl_fnYUwDUBlEE0X3fs/edit';

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setError('');
      window.open(GOOGLE_SHEET_URL, '_blank');
      handleClose();
    } else {
      setError('Incorrect password!');
    }
  };

  const handleClose = () => {
    setPassword('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full animate-slideUp">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">Admin Access</h2>
          <p className="text-gray-600 text-sm mt-1">Enter password to manage products</p>
        </div>

        <div className="p-6">
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all duration-200"
                placeholder="Enter admin password"
                required
                autoFocus
              />
            </div>

            {error && <p className="text-red-500 text-sm animate-shake">{error}</p>}

            <div className="flex gap-3">
              <button
                type="submit"
                className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 active:scale-95 transition-all duration-200 font-medium"
              >
                Open Google Sheet
              </button>
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 active:scale-95 transition-all duration-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </form>

          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>📝 Instructions:</strong> After entering the correct password, Google Sheets will open in a new tab. Add products there and they'll appear on the website automatically!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddProductModal;