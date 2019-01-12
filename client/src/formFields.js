import {Input, Textarea, Image, Select} from './components/Fields';

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