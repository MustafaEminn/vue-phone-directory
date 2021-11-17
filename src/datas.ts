export const alphabet = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

export interface IUser {
  id: number;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string | null;
}

export const users = [
  {
    id: 1,
    firstName: "Abdul",
    lastName: "Aziz",
    phoneNumber: "+90 552 625 58 84",
    email: "abdulaziz@hotmail.com",
  },
  {
    id: 2,
    firstName: "Ali",
    lastName: "Kamışçı",
    phoneNumber: "+90 567 586 34 63",
    email: null,
  },
  {
    id: 3,
    firstName: "Ahmet",
    lastName: "Ulu",
    phoneNumber: "+90 593 386 25 63",
    email: "ahmetulu@hotmail.com",
  },
  {
    id: 4,
    firstName: "Bamsı",
    lastName: "Bilgin",
    phoneNumber: "+90 532 385 78 33",
    email: "bamsibilgin@hotmail.com",
  },
  {
    id: 5,
    firstName: "Beyza",
    lastName: "Altın",
    phoneNumber: "+90 535 756 85 84",
    email: "beyzaaltin@hotmail.com",
  },
  {
    id: 6,
    firstName: "Canan",
    lastName: "Haluk",
    phoneNumber: "+90 582 651 65 46",
    email: "cananhaluk@hotmail.com",
  },
  {
    id: 7,
    firstName: "Deniz",
    lastName: "Bilgin",
    phoneNumber: "+90 542 384 34 63",
    email: null,
  },
  {
    id: 8,
    firstName: "Derya",
    lastName: "Derin",
    phoneNumber: "+90 524 438 35 78",
    email: "deryaderin@hotmail.com",
  },
  {
    id: 9,
    firstName: "Efe",
    lastName: "Soylu",
    phoneNumber: "+90 559 325 35 43",
    email: null,
  },
  {
    id: 10,
    firstName: "Zekariya",
    lastName: "Öz",
    phoneNumber: "+90 546 454 46 54",
    email: "zekariyaoz@hotmail.com",
  },
];
