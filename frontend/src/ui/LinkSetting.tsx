import React, { useState } from 'react';

const LinkSettings: React.FC = () => {
  const [passwordProtection, setPasswordProtection] = useState<boolean>(false);
  const [autoExpire, setAutoExpire] = useState<boolean>(false);
  const [downloadLimit, setDownloadLimit] = useState<boolean>(false);
  const [viewTracking, setViewTracking] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [expiryDays, setExpiryDays] = useState<string>('');
  const [expiryUnit, setExpiryUnit] = useState<string>('days');
  const [maxDownloads, setMaxDownloads] = useState<string>('');

  return (
    <div className="bg-gray-800/50 border border-gray-600 rounded-xl p-6">
      {/* Header */}
      <div className="flex items-center mb-6">
        <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mr-3">
          <span className="text-white text-sm">⚙️</span>
        </div>
        <h3 className="text-xl font-semibold text-white">Link Settings</h3>
      </div>

      {/* Settings Options */}
      <div className="space-y-4">
        {/* Password Protection */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="passwordProtection"
              checked={passwordProtection}
              onChange={(e) => setPasswordProtection(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="passwordProtection" className="ml-3 text-white font-medium">
              Password Protection
            </label>
          </div>
          {passwordProtection && (
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ml-7"
            />
          )}
        </div>

        {/* Auto-expire */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="autoExpire"
              checked={autoExpire}
              onChange={(e) => setAutoExpire(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="autoExpire" className="ml-3 text-white font-medium">
              Auto-expire after
            </label>
          </div>
          {autoExpire && (
            <div className="ml-7 flex gap-2">
              <input
                type="number"
                value={expiryDays}
                onChange={(e) => setExpiryDays(e.target.value)}
                placeholder="7"
                min="1"
                className="flex-1 px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              />
              <select 
                value={expiryUnit}
                onChange={(e) => setExpiryUnit(e.target.value)}
                className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200"
              >
                <option value="days">Days</option>
                <option value="hours">Hours</option>
                <option value="minutes">Minutes</option>
              </select>
            </div>
          )}
        </div>

        {/* Download Limit */}
        <div>
          <div className="flex items-center mb-2">
            <input
              type="checkbox"
              id="downloadLimit"
              checked={downloadLimit}
              onChange={(e) => setDownloadLimit(e.target.checked)}
              className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <label htmlFor="downloadLimit" className="ml-3 text-white font-medium">
              Download limit
            </label>
          </div>
          {downloadLimit && (
            <input
              type="number"
              value={maxDownloads}
              onChange={(e) => setMaxDownloads(e.target.value)}
              placeholder="10"
              min="1"
              className="w-full px-4 py-2 bg-gray-900 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors duration-200 ml-7"
            />
          )}
        </div>

        {/* View Tracking */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="viewTracking"
            checked={viewTracking}
            onChange={(e) => setViewTracking(e.target.checked)}
            className="w-4 h-4 text-blue-600 bg-gray-900 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
          />
          <label htmlFor="viewTracking" className="ml-3 text-white font-medium">
            Enable view tracking
          </label>
        </div>
      </div>
    </div>
  );
};

export default LinkSettings;