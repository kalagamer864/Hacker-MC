import React from 'react';
import { Server, ServerStatus } from '../types';
import { useServers } from '../context/ServerContext';

interface ServerCardProps {
  server: Server;
}

const ServerCard: React.FC<ServerCardProps> = ({ server }) => {
  const { removeServer, toggleServerStatus, restartServer } = useServers();

  const getStatusIndicator = () => {
    switch (server.status) {
      case ServerStatus.Online:
        return { color: 'bg-green-500 animate-pulse', text: 'Online' };
      case ServerStatus.Offline:
        return { color: 'bg-red-500', text: 'Offline' };
      case ServerStatus.Creating:
        return { color: 'bg-yellow-500 animate-spin', text: 'Creating...' };
      default:
        return { color: 'bg-gray-500', text: 'Unknown' };
    }
  };

  const statusInfo = getStatusIndicator();
  
  const handleCopyIp = () => {
    navigator.clipboard.writeText(server.ip);
    // You can add a toast notification here
  }

  const isOnline = server.status === ServerStatus.Online;
  const isOffline = server.status === ServerStatus.Offline;

  return (
    <div className="bg-secondary rounded-lg border border-gray-800 p-5 flex flex-col justify-between transition-all duration-300 hover:border-accent-red hover:shadow-lg hover:shadow-black/50">
      <div>
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white truncate pr-2">{server.name}</h3>
          <div className="flex items-center space-x-2 text-sm text-gray-300 flex-shrink-0">
            <div className={`w-3 h-3 rounded-full ${statusInfo.color}`}></div>
            <span>{statusInfo.text}</span>
          </div>
        </div>
        
        <div className="text-gray-400 text-sm mb-4 bg-primary p-2 rounded flex justify-between items-center">
            <code className="truncate">{server.ip}</code>
            <button onClick={handleCopyIp} title="Copy IP" className="text-gray-500 hover:text-white ml-2 flex-shrink-0">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
            </button>
        </div>

        <div className="text-gray-400 text-sm flex justify-between mb-4 px-1">
            <span>Players: {server.players} / &infin;</span>
            <span>{server.version}</span>
        </div>
        
        <div className="space-y-3 text-sm text-gray-400 mb-4">
          <div>
            <div className="flex justify-between mb-1">
              <span>RAM</span>
              <span>{server.ramUsage}MB / {server.maxRam}MB</span>
            </div>
            <div className="w-full bg-primary rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full transition-all duration-500" style={{ width: `${(server.ramUsage / server.maxRam) * 100}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
                <span>CPU</span>
                <span>{server.cpuUsage}%</span>
            </div>
            <div className="w-full bg-primary rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full transition-all duration-500" style={{ width: `${server.cpuUsage}%` }}></div>
            </div>
          </div>
        </div>

        {isOnline && (
           <div className="grid grid-cols-3 gap-2 text-center text-white">
            <button onClick={() => alert('Opening Console...')} className="bg-gray-700/50 hover:bg-gray-700 text-xs font-semibold py-2 rounded-md transition">Console</button>
            <button onClick={() => alert('Opening File Manager...')} className="bg-gray-700/50 hover:bg-gray-700 text-xs font-semibold py-2 rounded-md transition">Files</button>
            <button onClick={() => alert('Opening Plugins/Mods installer...')} className="bg-gray-700/50 hover:bg-gray-700 text-xs font-semibold py-2 rounded-md transition">Plugins</button>
          </div>
        )}
      </div>

      <div className="mt-5 flex gap-2">
        {isOffline && (
            <button
              onClick={() => toggleServerStatus(server.id)}
              className="flex-1 py-2 rounded-md bg-green-600 hover:bg-green-700 font-semibold text-white transition duration-300 text-sm"
            >Start</button>
        )}
        {isOnline && (
          <>
            <button
              onClick={() => toggleServerStatus(server.id)}
              className="flex-1 py-2 rounded-md bg-yellow-600 hover:bg-yellow-700 font-semibold text-white transition duration-300 text-sm"
            >Stop</button>
            <button
              onClick={() => restartServer(server.id)}
              className="flex-1 py-2 rounded-md bg-blue-600 hover:bg-blue-700 font-semibold text-white transition duration-300 text-sm"
            >Restart</button>
          </>
        )}
        <button
          onClick={() => removeServer(server.id)}
          className="flex-1 py-2 rounded-md bg-accent-red hover:bg-accent-red-hover font-semibold text-white transition duration-300 text-sm"
        >Delete</button>
      </div>
    </div>
  );
};

export default ServerCard;