import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useServers } from '../context/ServerContext';
import ServerCard from '../components/ServerCard';
import { ServerVersion } from '../types';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { servers, addServer } = useServers();
  const [newServerName, setNewServerName] = useState('');
  const [serverVersion, setServerVersion] = useState<ServerVersion>(ServerVersion.Paper);

  const handleCreateServer = (e: React.FormEvent) => {
    e.preventDefault();
    if (newServerName.trim()) {
      addServer(newServerName.trim(), serverVersion);
      setNewServerName('');
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold text-white mb-2">Welcome, {user?.username}</h1>
      <p className="text-gray-400 mb-8">Manage your free Minecraft servers below.</p>

      <div className="bg-secondary p-6 rounded-lg border border-gray-800 mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Create a New Server</h2>
        <form onSubmit={handleCreateServer} className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            value={newServerName}
            onChange={(e) => setNewServerName(e.target.value)}
            placeholder="Enter server name"
            className="flex-grow p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red"
            required
          />
          <select
            value={serverVersion}
            onChange={(e) => setServerVersion(e.target.value as ServerVersion)}
            className="p-3 bg-primary text-white rounded-md border border-gray-700 focus:outline-none focus:ring-2 focus:ring-accent-red sm:w-48"
            aria-label="Select server version"
          >
            {Object.values(ServerVersion).map(version => (
                <option key={version} value={version}>{version}</option>
            ))}
        </select>
          <button type="submit" className="bg-accent-red text-white font-bold py-3 px-6 rounded-md hover:bg-accent-red-hover transition duration-300">
            Create Server (Free)
          </button>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-white mb-4">Your Servers ({servers.length})</h2>
        {servers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servers.map(server => (
              <ServerCard key={server.id} server={server} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-secondary rounded-lg border border-gray-800">
            <p className="text-gray-400">You don't have any servers yet. Create one above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;