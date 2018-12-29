import {Input, Textarea, Image, Select} from './components/Fields';

export const loginFields = [
  {
    id: "username",
    title: "Prisijungimo vardas",
    component: Input,
    type: "text"
  },
  {
    id: "password",
    title: "Slaptažodis",
    component: Input,
    type: "password"
  }
];

export const registrationFields = [
  {
    id: "email",
    title: "El. paštas",
    component: Input,
    type: "email"
  },
  {
    id: "username",
    title: "Prisijungimo vardas",
    component: Input,
    type: "text"
  },
  {
    id: "password1",
    title: "Slaptažodis",
    component: Input,
    type: "password"
  },
  {
    id: "password2",
    title: "Slaptažodio pakartojimas",
    component: Input,
    type: "password"
  }
];

export const productFields = [
  {
    id: "title",
    title: "Pavadinimas",
    component: Input,
    type: "text"
  },
  {
    id: "price",
    title: "Kaina",
    component: Input,
    type: "number"
  },
  {
    id: "description",
    title: "Aprašymas",
    component: Textarea
  },
  {
    id: "logo",
    title: "Produkto paveikslėlis",
    component: Image
  }
];

export const keyFields = [
  {
    id: "game_id",
    title: "Žaidimas",
    component: Select
  },
  {
    id: "steam_key",
    title: "Raktas",
    component: Input,
    type: "text"
  }
];