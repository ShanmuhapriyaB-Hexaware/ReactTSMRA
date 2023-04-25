export interface FoundationInput {
    component_name: string;
    description: string;
    author: string;
    variationsChosen: Variations[];
}

export interface Variations {
    category: string;
    selectedChoice?: string;
    choice : string[];
    multiple?: boolean;
}