export type Region = "US" | "EU";

export interface Motd {
  mainLine: string;
  otherLines: Array<string>;
}

export interface RegionStatus {
  status: string;
  playerCount: number;
  motd: Motd;
};

export interface NetworkStatus {
  US: RegionStatus;
  EU: RegionStatus;
  playerCount: number;
};

export interface MinecraftServer {
  name: string;
  group: string;
  motd: string;
  playerCount: number;
  maxPlayerCount: number;
};
