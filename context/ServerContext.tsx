import React, { createContext, useState, useContext, ReactNode, useCallback, useEffect } from 'react';
import { Server, ServerStatus, ServerVersion } from '../types';

interface ServerContextType {
  servers: Server[];
  addServer: (name: string, version: ServerVersion) => void;
  removeServer: (id: string) => void;
  toggleServerStatus: (id: string) => void;
  restartServer: (id: string) => void;
}

const ServerContext = createContext<ServerContextType | undefined>(undefined);

const initialServers: Server[] = [
    { id: '1', name: 'My Epic World', ip: '192.168.1.101', status: ServerStatus.Online, players: 10, maxPlayers: 100, version: ServerVersion.Paper, ramUsage: 2048, maxRam: 8192, cpuUsage: 35 },
    { id: '2', name: 'Creative Hub', ip: 'play.hacker.host', status: ServerStatus.Offline, players: 0, maxPlayers: 50, version: ServerVersion.Vanilla, ramUsage: 0, maxRam: 4096, cpuUsage: 0 },
];

export const ServerProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [servers, setServers] = useState<Server[]>(initialServers);

  useEffect(() => {
    const interval = setInterval(() => {
        setServers(prevServers => prevServers.map(server => {
            if (server.status === ServerStatus.Online) {
                // Simulate fluctuations
                const ramChange = (Math.random() - 0.5) * 100;
                const cpuChange = (Math.random() - 0.5) * 10;
                
                const newRam = Math.max(512, Math.min(server.maxRam, server.ramUsage + ramChange));
                const newCpu = Math.max(10, Math.min(95, server.cpuUsage + cpuChange));

                return { ...server, ramUsage: Math.round(newRam), cpuUsage: Math.round(newCpu) };
            }
            return server;
        }));
    }, 2000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, []);

  const addServer = useCallback((name: string, version: ServerVersion) => {
    const newServer: Server = {
      id: new Date().toISOString(),
      name,
      ip: `srv${Math.floor(Math.random() * 100)}.hacker.host`,
      status: ServerStatus.Creating,
      players: 0,
      maxPlayers: 100, // Unlimited slots
      version,
      ramUsage: 0,
      maxRam: 8192,
      cpuUsage: 0,
    };

    setServers(prev => [...prev, newServer]);

    // Simulate server creation process
    setTimeout(() => {
        setServers(prev => prev.map(s => s.id === newServer.id ? {...s, status: ServerStatus.Offline} : s));
    }, 3000);
  }, []);

  const removeServer = useCallback((id: string) => {
    setServers(prev => prev.filter(server => server.id !== id));
  }, []);

  const toggleServerStatus = useCallback((id: string) => {
    setServers(prev => prev.map(server => {
      if (server.id === id) {
        const isNowOnline = server.status !== ServerStatus.Online;
        return {
          ...server,
          status: isNowOnline ? ServerStatus.Online : ServerStatus.Offline,
          players: isNowOnline ? Math.floor(Math.random() * 50) : 0,
          ramUsage: isNowOnline ? 1024 : 0,
          cpuUsage: isNowOnline ? 20 : 0,
        };
      }
      return server;
    }));
  }, []);
  
  const restartServer = useCallback((id: string) => {
    setServers(prev => prev.map(s => s.id === id ? { ...s, status: ServerStatus.Creating, players: 0 } : s));
    setTimeout(() => {
        setServers(prev => prev.map(s => {
            if (s.id === id) {
                return {...s, status: ServerStatus.Online, players: Math.floor(Math.random() * 25)};
            }
            return s;
        }));
    }, 4000);
  }, []);

  return (
    <ServerContext.Provider value={{ servers, addServer, removeServer, toggleServerStatus, restartServer }}>
      {children}
    </ServerContext.Provider>
  );
};

export const useServers = (): ServerContextType => {
  const context = useContext(ServerContext);
  if (context === undefined) {
    throw new Error('useServers must be used within a ServerProvider');
  }
  return context;
};