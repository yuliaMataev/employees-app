export interface ICity {
  id: string;
  name: string;
}

export interface IEmployee {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  cityId: number;
  active: boolean;
}
