import { Cache } from "./pokecache.js";

const INTERVAL = 1000;

export class PokeAPI {
  private static readonly baseURL = "https://pokeapi.co/api/v2";
  cache = new Cache(INTERVAL);

  constructor() {}

  async fetchLocations(
    pageURL?: string,
    id?: number,
    name?: string
  ): Promise<ShallowLocations> {
    let fullURL = `${PokeAPI.baseURL}/location-area/`;
    if (pageURL) {
      fullURL = pageURL;
    }
    if (id) {
      fullURL = `${PokeAPI.baseURL}/location-area/${id}`;
    }
    if (name) {
      fullURL = `${PokeAPI.baseURL}/location-area/${name}`;
    }

    if (this.cache.get(fullURL)) return this.cache.get(fullURL)?.val;

    try {
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const locations: ShallowLocations = await response.json();
      this.cache.add(fullURL, locations);
      return locations;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async fetchLocation(locationName: string): Promise<Location> {
    const fullURL = `${PokeAPI.baseURL}/location-area/${locationName}`;

    if (this.cache.get(fullURL)) return this.cache.get(fullURL)?.val;

    try {
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const location: Location = await response.json();
      this.cache.add(fullURL, location);
      return location;
    } catch (e) {
      throw new Error(`Error fetching locations: ${(e as Error).message}`);
    }
  }

  async catchPokemon(name: string): Promise<Pokemon> {
    const fullURL = `${PokeAPI.baseURL}/pokemon/${name}/`;

    if (this.cache.get(fullURL)) return this.cache.get(fullURL)?.val;

    try {
      const response = await fetch(fullURL);

      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }

      const pokemon: Pokemon = await response.json();
      this.cache.add(fullURL, pokemon);
      return pokemon;
    } catch (e) {
      throw new Error(`Error fetching pokemon: ${(e as Error).message}`);
    }
  }
}

export type ShallowLocations = {
  count: number;
  next: string;
  previous: string;
  results: {
    name: string;
    url: string;
  }[];
};

export type Location = {
  encounter_method_rates: {
    encounter_method: {
      name: string;
      url: string;
    };
    version_details: {
      rate: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  game_index: number;
  id: number;
  location: {
    name: string;
    url: string;
  };
  name: string;
  names: {
    language: {
      name: string;
      url: string;
    };
    name: string;
  }[];
  pokemon_encounters: {
    pokemon: {
      name: string;
      url: string;
    };
    version_details: {
      encounter_details: {
        chance: number;
        condition_values: any[];
        max_level: number;
        method: {
          name: string;
          url: string;
        };
        min_level: number;
      }[];
      max_chance: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  base_experience: number;
  height: number;
  is_default: boolean;
  order: number;
  weight: number;
  abilities: {
    is_hidden: boolean;
    slot: number;
    ability: {
      name: string;
      url: string;
    };
  }[];
  forms: {
    name: string;
    url: string;
  }[];
  game_indices: {
    game_index: number;
    version: {
      name: string;
      url: string;
    };
  }[];
  held_items: {
    item: {
      name: string;
      url: string;
    };
    version_details: {
      rarity: number;
      version: {
        name: string;
        url: string;
      };
    }[];
  }[];
  location_area_encounters: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
    version_group_details: {
      level_learned_at: number;
      version_group: {
        name: string;
        url: string;
      };
      move_learn_method: {
        name: string;
        url: string;
      };
      order: number;
    }[];
  }[];
  species: {
    name: string;
    url: string;
  };
  sprites: any;
  cries: {
    latest: string;
    legacy: string;
  };
  stats: {
    base_stat: number;
    effort: number;
    stat: {
      name: string;
      url: string;
    };
  }[];
  types: {
    slot: number;
    type: {
      name: string;
      url: string;
    };
  }[];
  past_types: {
    generation: {
      name: string;
      url: string;
    };
    types: {
      slot: number;
      type: {
        name: string;
        url: string;
      };
    }[];
  }[];
  past_abilities: {
    generation: {
      name: string;
      url: string;
    };
    abilities: {
      ability: any;
      is_hidden: boolean;
      slot: number;
    }[];
  }[];
};
