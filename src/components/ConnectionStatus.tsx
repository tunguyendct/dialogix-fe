import { Wifi, WifiOff } from 'lucide-react';
import { useHealthCheck } from '../hooks/useApi';

const ConnectionStatus = () => {
  const { data, isLoading, isError } = useHealthCheck();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-100 text-yellow-800 text-sm">
        <div className="w-2 h-2 bg-yellow-600 rounded-full animate-pulse"></div>
        <span>Connecting...</span>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
        <WifiOff size={14} />
        <span>Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">
      <Wifi size={14} />
      <span>Connected</span>
    </div>
  );
};

export default ConnectionStatus;
