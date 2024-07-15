declare global {
  type LeaderBoardPlayer = {
    username: string;
    image_url: string;
    items: number;
    wealthIndex: number;
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

  interface MetaResponse {
    meta: {
      leaderboard: LeaderBoardPlayer[];
      latestSpawned: SpawnedItem;
      mostSpawned: SpawnedItem;
      leastSpawned: SpawnedItem;
      population: Population;
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
    };
  }
}

export {};
