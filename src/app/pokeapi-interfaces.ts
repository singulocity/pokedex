export interface INamedAPIResource {
    name: string;
    url: string;
}
export interface INamedAPIResourceList {
    count: number;
    next?: string;
    previous?: string;
    results?: INamedAPIResource[];
}

export interface IPokemonAbility {
    ability: INamedAPIResource;
    is_hidden: boolean;
    slot: number;
}

export interface IVersionGameIndex {
    game_index: number;
    version: INamedAPIResource;
}

export interface IPokemonHeldItem {
    item: INamedAPIResource;
    version_details: IPokemonHeldItemVersion[];
}

export interface IPokemonHeldItemVersion {
    version: INamedAPIResource;
    rarity: number;
}

export interface IPokemonMoveVersion{
    move_learn_method: INamedAPIResource;
    version_group: INamedAPIResource;
    level_learned_at: number;
}

export interface IPokemonMove {
    move: INamedAPIResource;
    version_group_details: IPokemonMoveVersion[];
}

export interface IPokemonType {
    slot: number;
    type: INamedAPIResource;
}

export interface IPokemonTypePast {
    generation: INamedAPIResource;
    types: IPokemonType[];
}

export interface IPokemonSprites {
    front_default: string;
    front_shiny?: string;
    front_female: string;
    front_shiny_female?: string;
    back_default?: string;
    back_shiny?: string;
    back_female?: string;
    back_shiny_female?: string;
    other: [];
    versions: [];
}

export interface IPokemonStat {
    stat: INamedAPIResource;
    effort: number;
    base_stat: number;
}

export interface IPokemon {
    abilities: IPokemonAbility[];
    base_experience: number;
    forms: INamedAPIResource[];
    game_indices: IVersionGameIndex[];
    height: number;
    held_items: IPokemonHeldItem[];
    id: number;
    is_default: boolean;
    location_area_encounters: string;
    moves: IPokemonMove[];
    name: string;
    order: number;
    past_abilities: [];
    past_types: IPokemonTypePast[];
    species: INamedAPIResource[];
    sprites: IPokemonSprites;
    stats: IPokemonStat[];
    types: IPokemonType[];
    weight: number;
}