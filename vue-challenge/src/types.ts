export interface apiData {
  _id: string;
  name: string;
  age: number;
  gender: string;
  eyeColor: string;
  location: {
    latitude: number;
    longitude: number;
  };
  preferences: {
    pet: string;
    fruit: string;
  };
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  age: number;
  eyeColor: string;
  location: string;
  gender: string;
  petPreference: string;
  fruitPreference: string;
}

export interface TableColumn {
  key: keyof User;
  label: string;
}

export interface SortPayload {
  criteria: keyof User | null;
  ascending: boolean;
}

export interface FilterPayload {
  [key: string]: string[];
}

export interface SortCriteria {
  key: keyof User;
  label: string;
}

export interface FilterCriteria {
  key: keyof User;
  label: string;
  values: string[];
}
