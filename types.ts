export enum Page {
  Home = 'HOME',
  Login = 'LOGIN',
  Signup = 'SIGNUP',
  Dashboard = 'DASHBOARD',
  Support = 'SUPPORT',
  AiSupport = 'AI_SUPPORT',
}

export interface Plan {
  name: string;
  price: string;
  features: string[];
  ram: string;
  cpu: string;
  storage: string;
  isPopular?: boolean;
}

export enum ServerStatus {
  Online = 'ONLINE',
  Offline = 'OFFLINE',
  Creating = 'CREATING',
}

export enum ServerVersion {
  Vanilla = 'Vanilla 1.21',
  Paper = 'Paper 1.21',
  Spigot = 'Spigot 1.21',
  Forge = 'Forge 1.21',
}

export interface Server {
  id: string;
  name: string;
  ip: string;
  status: ServerStatus;
  players: number;
  maxPlayers: number;
  version: ServerVersion;
  ramUsage: number; // in MB
  maxRam: number; // in MB
  cpuUsage: number; // in percent
}

export interface User {
  username: string;
  email: string;
}