import React, { useState, useEffect } from 'react';
// import { Check, X, Fingerprint, AlertCircle, RefreshCw, Shield, Settings } from 'lucide-react';

const Finger = () => {
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [isEnrolling, setIsEnrolling] = useState(false);
  const [enrollmentProgress, setEnrollmentProgress] = useState(0);
  const [lastEnrolled, setLastEnrolled] = useState(null);
  const [fingerprintCount, setFingerprintCount] = useState(0);
  const [securityLevel, setSecurityLevel] = useState('Medium');
  const [showDetails, setShowDetails] = useState(false);

  // Simulate fingerprint enrollment process
  const handleEnrollment = async () => {
    setIsEnrolling(true);
    setEnrollmentProgress(0);

    // Simulate enrollment progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 200));
      setEnrollmentProgress(i);
    }

    setIsEnrolled(true);
    setIsEnrolling(false);
    setEnrollmentProgress(0);
    setLastEnrolled(new Date());
    setFingerprintCount(prev => prev + 1);
  };

  const handleDeleteFingerprint = () => {
    setIsEnrolled(false);
    setFingerprintCount(0);
    setLastEnrolled(null);
  };

  const formatDate = (date) => {
    if (!date) return 'Never';
    return date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full border border-gray-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl mb-4">
            <Fingerprint className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Fingerprint Security</h1>
          <p className="text-gray-600">Manage your biometric authentication</p>
        </div>

        {/* Status Display */}
        <div className="bg-gray-50 rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-gray-700">Status</span>
            <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
              isEnrolled 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {isEnrolled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              {isEnrolled ? 'Enrolled' : 'Not Enrolled'}
            </div>
          </div>

          {/* Enrollment Progress */}
          {isEnrolling && (
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Enrolling...</span>
                <span className="text-sm font-medium text-blue-600">{enrollmentProgress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${enrollmentProgress}%` }}
                />
              </div>
            </div>
          )}

          {/* Details Toggle */}
          <button
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            <Settings className="w-4 h-4" />
            {showDetails ? 'Hide Details' : 'Show Details'}
          </button>

          {/* Expanded Details */}
          {showDetails && (
            <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Fingerprints Enrolled</span>
                <span className="text-sm font-medium text-gray-800">{fingerprintCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Security Level</span>
                <span className="text-sm font-medium text-gray-800 flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  {securityLevel}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Last Enrolled</span>
                <span className="text-sm font-medium text-gray-800">{formatDate(lastEnrolled)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {!isEnrolled ? (
            <button
              onClick={handleEnrollment}
              disabled={isEnrolling}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-blue-600 hover:to-indigo-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isEnrolling ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Enrolling...
                </>
              ) : (
                <>
                  <Fingerprint className="w-5 h-5" />
                  Enroll Fingerprint
                </>
              )}
            </button>
          ) : (
            <div className="space-y-3">
              <button
                onClick={handleEnrollment}
                disabled={isEnrolling}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isEnrolling ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Re-enrolling...
                  </>
                ) : (
                  <>
                    <RefreshCw className="w-5 h-5" />
                    Re-Enroll Fingerprint
                  </>
                )}
              </button>
              
              <button
                onClick={handleDeleteFingerprint}
                className="w-full bg-red-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-red-600 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <X className="w-5 h-5" />
                Delete Fingerprint
              </button>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="mt-6 flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm text-amber-800 font-medium mb-1">Security Notice</p>
            <p className="text-xs text-amber-700">
              Your fingerprint data is stored securely on your device and never transmitted to external servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Finger;