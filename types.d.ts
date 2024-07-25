declare global {
  export type FullLeaderboardPlayer = {
    username: string;
    items: number;
    wealth_index: number;
  };

  export type FullLeaderboardResponse = {
    leaderboard: {
      players: FullLeaderboardPlayer[];
    };
  };

  type LeaderBoardPlayer = {
    username: string;
    image_url: string;
    items: number;
    wealth_index: number;
  };

  type SpawnedItem = {
    name: string;
    number?: number;
    zone?: string;
    createdAt?: Date;
    rarity: number;
  };

  type Population = {
    [key: string]: number;
  };

  type PlayerWithItem = {
    player: {
      username: string;
      image_url: string;
    };
    item: {
      name: string;
      rarity: number;
      zone: string;
    };
  };

  export type NewestPlayer = {
    username: string;
    image_url: string;
    zone: string;
  };

  interface MetaResponse {
    meta: {
      latestSpawned: SpawnedItem;
      mostSpawned: SpawnedItem;
      leastSpawned: SpawnedItem;
      population: Population;
      latestClaim: PlayerWithItem;
      newestPlayer: NewestPlayer;
    };
  }

  type WorldItem = {
    rarity: number;
    name: string;
    count?: number;
    onlyZone: string | null;
  };

  interface InventoryResponse {
    inventory: {
      total: number;
      items: WorldItem[];
      location: string;
      spawn_date: Date | null;
      players_in_zone: number;
      wealth_index: number;
    };
  }
}

export {};
