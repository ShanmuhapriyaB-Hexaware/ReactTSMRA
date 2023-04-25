export interface FoundationInput {
    component_name: string;
    description: string;
    author: string;
    variations: Variations[];
}

export interface Variations {
    category: string;
    choices : string[];
    multiple?: boolean;
}