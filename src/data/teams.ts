import { getFlagForCountry } from "@/utils/flags";

export interface Team {
  name: string;
  code: string;
  flag: string;
  rating: number;
  isPlayoff?: boolean;
}

// Official 2026 World Cup Draw
export const groups: { name: string; teams: Team[] }[] = [
  {
    name: "A",
    teams: [
      { name: "Mexico", code: "MEX", flag: getFlagForCountry("MEX"), rating: 80 },
      { name: "South Africa", code: "RSA", flag: getFlagForCountry("RSA"), rating: 68 },
      { name: "South Korea", code: "KOR", flag: getFlagForCountry("KOR"), rating: 78 },
      { name: "Denmark", code: "DEN", flag: getFlagForCountry("DEN"), rating: 79, isPlayoff: true }, // UEFA Playoff D winner (likely)
    ],
  },
  {
    name: "B",
    teams: [
      { name: "Canada", code: "CAN", flag: getFlagForCountry("CAN"), rating: 75 },
      { name: "Italy", code: "ITA", flag: getFlagForCountry("ITA"), rating: 82, isPlayoff: true }, // UEFA Playoff A winner (likely)
      { name: "Qatar", code: "QAT", flag: getFlagForCountry("QAT"), rating: 65 },
      { name: "Switzerland", code: "SUI", flag: getFlagForCountry("SUI"), rating: 79 },
    ],
  },
  {
    name: "C",
    teams: [
      { name: "Brazil", code: "BRA", flag: getFlagForCountry("BRA"), rating: 90 },
      { name: "Morocco", code: "MAR", flag: getFlagForCountry("MAR"), rating: 82 },
      { name: "Haiti", code: "HAI", flag: getFlagForCountry("HAI"), rating: 55 },
      { name: "Scotland", code: "SCO", flag: getFlagForCountry("SCO"), rating: 72 },
    ],
  },
  {
    name: "D",
    teams: [
      { name: "USA", code: "USA", flag: getFlagForCountry("USA"), rating: 82 },
      { name: "Paraguay", code: "PAR", flag: getFlagForCountry("PAR"), rating: 70 },
      { name: "Australia", code: "AUS", flag: getFlagForCountry("AUS"), rating: 74 },
      { name: "Turkey", code: "TUR", flag: getFlagForCountry("TUR"), rating: 77, isPlayoff: true }, // UEFA Playoff C winner (likely)
    ],
  },
  {
    name: "E",
    teams: [
      { name: "Germany", code: "GER", flag: getFlagForCountry("GER"), rating: 85 },
      { name: "Curaçao", code: "CUW", flag: getFlagForCountry("CUW"), rating: 52 },
      { name: "Ivory Coast", code: "CIV", flag: getFlagForCountry("CIV"), rating: 75 },
      { name: "Ecuador", code: "ECU", flag: getFlagForCountry("ECU"), rating: 76 },
    ],
  },
  {
    name: "F",
    teams: [
      { name: "Netherlands", code: "NED", flag: getFlagForCountry("NED"), rating: 84 },
      { name: "Japan", code: "JPN", flag: getFlagForCountry("JPN"), rating: 80 },
      { name: "Ukraine", code: "UKR", flag: getFlagForCountry("UKR"), rating: 76, isPlayoff: true }, // UEFA Playoff B winner (likely)
      { name: "Tunisia", code: "TUN", flag: getFlagForCountry("TUN"), rating: 72 },
    ],
  },
  {
    name: "G",
    teams: [
      { name: "Belgium", code: "BEL", flag: getFlagForCountry("BEL"), rating: 81 },
      { name: "Egypt", code: "EGY", flag: getFlagForCountry("EGY"), rating: 74 },
      { name: "Iran", code: "IRN", flag: getFlagForCountry("IRN"), rating: 73 },
      { name: "New Zealand", code: "NZL", flag: getFlagForCountry("NZL"), rating: 58 },
    ],
  },
  {
    name: "H",
    teams: [
      { name: "Spain", code: "ESP", flag: getFlagForCountry("ESP"), rating: 88 },
      { name: "Cape Verde", code: "CPV", flag: getFlagForCountry("CPV"), rating: 56 },
      { name: "Saudi Arabia", code: "KSA", flag: getFlagForCountry("KSA"), rating: 68 },
      { name: "Uruguay", code: "URU", flag: getFlagForCountry("URU"), rating: 83 },
    ],
  },
  {
    name: "I",
    teams: [
      { name: "France", code: "FRA", flag: getFlagForCountry("FRA"), rating: 89 },
      { name: "Senegal", code: "SEN", flag: getFlagForCountry("SEN"), rating: 78 },
      { name: "Iraq", code: "IRQ", flag: getFlagForCountry("IRQ"), rating: 62, isPlayoff: true }, // FIFA Playoff 2 winner (likely)
      { name: "Norway", code: "NOR", flag: getFlagForCountry("NOR"), rating: 74 },
    ],
  },
  {
    name: "J",
    teams: [
      { name: "Argentina", code: "ARG", flag: getFlagForCountry("ARG"), rating: 92 },
      { name: "Algeria", code: "ALG", flag: getFlagForCountry("ALG"), rating: 70 },
      { name: "Austria", code: "AUT", flag: getFlagForCountry("AUT"), rating: 76 },
      { name: "Jordan", code: "JOR", flag: getFlagForCountry("JOR"), rating: 60 },
    ],
  },
  {
    name: "K",
    teams: [
      { name: "Portugal", code: "POR", flag: getFlagForCountry("POR"), rating: 86 },
      { name: "DR Congo", code: "COD", flag: getFlagForCountry("COD"), rating: 64, isPlayoff: true }, // FIFA Playoff 1 winner (likely)
      { name: "Uzbekistan", code: "UZB", flag: getFlagForCountry("UZB"), rating: 62 },
      { name: "Colombia", code: "COL", flag: getFlagForCountry("COL"), rating: 81 },
    ],
  },
  {
    name: "L",
    teams: [
      { name: "England", code: "ENG", flag: getFlagForCountry("ENG"), rating: 87 },
      { name: "Croatia", code: "CRO", flag: getFlagForCountry("CRO"), rating: 80 },
      { name: "Ghana", code: "GHA", flag: getFlagForCountry("GHA"), rating: 70 },
      { name: "Panama", code: "PAN", flag: getFlagForCountry("PAN"), rating: 62 },
    ],
  },
];

export const allTeams: Team[] = groups.flatMap(g => g.teams);
