/**
 * Land border adjacency list for all countries.
 * Keys are ISO 3166-1 alpha-2 codes.
 * Values are arrays of neighboring country codes sharing a land border.
 * The relationship is symmetric: if A lists B, then B lists A.
 * Island nations with no land borders have empty arrays.
 */
export const borders: Record<string, string[]> = {
  // A
  AF: ["CN", "IR", "PK", "TJ", "TM", "UZ"], // Afghanistan
  AL: ["GR", "ME", "MK", "XK"], // Albania
  DZ: ["LY", "MA", "MR", "ML", "NE", "TN", "EH"], // Algeria
  AD: ["ES", "FR"], // Andorra
  AO: ["CD", "CG", "NA", "ZM"], // Angola
  AG: [], // Antigua and Barbuda
  AR: ["BO", "BR", "CL", "PY", "UY"], // Argentina
  AM: ["AZ", "GE", "IR", "TR"], // Armenia
  AU: [], // Australia
  AT: ["CZ", "DE", "HU", "IT", "LI", "SK", "SI", "CH"], // Austria
  AZ: ["AM", "GE", "IR", "RU", "TR"], // Azerbaijan

  // B
  BS: [], // Bahamas
  BH: [], // Bahrain (island, connected to SA by causeway but not land border)
  BD: ["IN", "MM"], // Bangladesh
  BB: [], // Barbados
  BY: ["LV", "LT", "PL", "RU", "UA"], // Belarus
  BE: ["FR", "DE", "LU", "NL"], // Belgium
  BZ: ["GT", "MX"], // Belize
  BJ: ["BF", "NE", "NG", "TG"], // Benin
  BT: ["CN", "IN"], // Bhutan
  BO: ["AR", "BR", "CL", "PY", "PE"], // Bolivia
  BA: ["HR", "ME", "RS"], // Bosnia and Herzegovina
  BW: ["NA", "ZA", "ZM", "ZW"], // Botswana
  BR: ["AR", "BO", "CO", "GF", "GY", "PY", "PE", "SR", "UY", "VE"], // Brazil
  BN: ["MY"], // Brunei
  BG: ["GR", "MK", "RO", "RS", "TR"], // Bulgaria
  BF: ["BJ", "CI", "GH", "ML", "NE", "TG"], // Burkina Faso
  BI: ["CD", "RW", "TZ"], // Burundi

  // C
  KH: ["LA", "TH", "VN"], // Cambodia
  CM: ["CF", "TD", "CG", "GQ", "GA", "NG"], // Cameroon
  CA: ["US"], // Canada
  CV: [], // Cape Verde
  CF: ["CM", "TD", "CD", "CG", "SS", "SD"], // Central African Republic
  TD: ["CM", "CF", "LY", "NE", "NG", "SD"], // Chad
  CL: ["AR", "BO", "PE"], // Chile
  CN: ["AF", "BT", "IN", "KZ", "KG", "LA", "MN", "MM", "NP", "KP", "PK", "RU", "TJ", "VN"], // China
  CO: ["BR", "EC", "PA", "PE", "VE"], // Colombia
  KM: [], // Comoros
  CG: ["AO", "CM", "CF", "CD", "GA"], // Congo (Republic)
  CD: ["AO", "BI", "CF", "CG", "RW", "SS", "TZ", "UG", "ZM"], // Congo (DR)
  CR: ["NI", "PA"], // Costa Rica
  CI: ["BF", "GH", "GN", "LR", "ML"], // Cote d'Ivoire
  HR: ["BA", "HU", "ME", "RS", "SI"], // Croatia
  CU: [], // Cuba
  CY: [], // Cyprus
  CZ: ["AT", "DE", "PL", "SK"], // Czech Republic

  // D
  DK: ["DE"], // Denmark
  DJ: ["ER", "ET", "SO"], // Djibouti
  DM: [], // Dominica
  DO: ["HT"], // Dominican Republic

  // E
  EC: ["CO", "PE"], // Ecuador
  EG: ["IL", "LY", "PS", "SD"], // Egypt
  SV: ["GT", "HN"], // El Salvador
  GQ: ["CM", "GA"], // Equatorial Guinea
  ER: ["DJ", "ET", "SD"], // Eritrea
  EE: ["LV", "RU"], // Estonia
  SZ: ["MZ", "ZA"], // Eswatini
  ET: ["DJ", "ER", "KE", "SO", "SS", "SD"], // Ethiopia

  // F
  FJ: [], // Fiji
  FI: ["NO", "RU", "SE"], // Finland
  FR: ["AD", "BE", "DE", "IT", "LU", "MC", "ES", "CH"], // France
  GF: ["BR", "SR"], // French Guiana

  // G
  GA: ["CM", "CG", "GQ"], // Gabon
  GM: ["SN"], // Gambia
  GE: ["AM", "AZ", "RU", "TR"], // Georgia
  DE: ["AT", "BE", "CZ", "DK", "FR", "LU", "NL", "PL", "CH"], // Germany
  GH: ["BF", "CI", "TG"], // Ghana
  GR: ["AL", "BG", "MK", "TR"], // Greece
  GD: [], // Grenada
  GT: ["BZ", "SV", "HN", "MX"], // Guatemala
  GN: ["CI", "GW", "LR", "ML", "SN", "SL"], // Guinea
  GW: ["GN", "SN"], // Guinea-Bissau
  GY: ["BR", "SR", "VE"], // Guyana

  // H
  HT: ["DO"], // Haiti
  HN: ["SV", "GT", "NI"], // Honduras
  HU: ["AT", "HR", "RO", "RS", "SK", "SI", "UA"], // Hungary

  // I
  IS: [], // Iceland
  IN: ["BD", "BT", "CN", "MM", "NP", "PK"], // India
  ID: ["MY", "PG", "TL"], // Indonesia
  IR: ["AF", "AM", "AZ", "IQ", "PK", "TR", "TM"], // Iran
  IQ: ["IR", "JO", "KW", "SA", "SY", "TR"], // Iraq
  IE: ["GB"], // Ireland
  IL: ["EG", "JO", "LB", "PS", "SY"], // Israel
  IT: ["AT", "FR", "SM", "SI", "CH", "VA"], // Italy

  // J
  JM: [], // Jamaica
  JP: [], // Japan
  JO: ["IQ", "IL", "PS", "SA", "SY"], // Jordan

  // K
  KZ: ["CN", "KG", "RU", "TM", "UZ"], // Kazakhstan
  KE: ["ET", "SO", "SS", "TZ", "UG"], // Kenya
  KI: [], // Kiribati
  KP: ["CN", "KR", "RU"], // North Korea
  KR: ["KP"], // South Korea
  KW: ["IQ", "SA"], // Kuwait
  KG: ["CN", "KZ", "TJ", "UZ"], // Kyrgyzstan

  // L
  LA: ["CN", "KH", "MM", "TH", "VN"], // Laos
  LV: ["BY", "EE", "LT", "RU"], // Latvia
  LB: ["IL", "SY"], // Lebanon
  LS: ["ZA"], // Lesotho
  LR: ["CI", "GN", "SL"], // Liberia
  LY: ["DZ", "TD", "EG", "NE", "SD", "TN"], // Libya
  LI: ["AT", "CH"], // Liechtenstein
  LT: ["BY", "LV", "PL", "RU"], // Lithuania
  LU: ["BE", "FR", "DE"], // Luxembourg

  // M
  MG: [], // Madagascar
  MW: ["MZ", "TZ", "ZM"], // Malawi
  MY: ["BN", "ID", "TH"], // Malaysia
  MV: [], // Maldives
  ML: ["DZ", "BF", "CI", "GN", "MR", "NE", "SN"], // Mali
  MT: [], // Malta
  MH: [], // Marshall Islands
  MR: ["DZ", "ML", "SN", "EH"], // Mauritania
  MU: [], // Mauritius
  MX: ["BZ", "GT", "US"], // Mexico
  FM: [], // Micronesia
  MD: ["RO", "UA"], // Moldova
  MC: ["FR"], // Monaco
  MN: ["CN", "RU"], // Mongolia
  ME: ["AL", "BA", "HR", "RS", "XK"], // Montenegro
  MA: ["DZ", "EH", "ES"], // Morocco (Ceuta/Melilla border with Spain)
  MZ: ["MW", "ZA", "SZ", "TZ", "ZM", "ZW"], // Mozambique
  MM: ["BD", "CN", "IN", "LA", "TH"], // Myanmar

  // N
  NA: ["AO", "BW", "ZA", "ZM"], // Namibia
  NR: [], // Nauru
  NP: ["CN", "IN"], // Nepal
  NL: ["BE", "DE"], // Netherlands
  NZ: [], // New Zealand
  NI: ["CR", "HN"], // Nicaragua
  NE: ["DZ", "BJ", "BF", "TD", "LY", "ML", "NG"], // Niger
  NG: ["BJ", "CM", "TD", "NE"], // Nigeria
  MK: ["AL", "BG", "GR", "RS", "XK"], // North Macedonia
  NO: ["FI", "RU", "SE"], // Norway

  // O
  OM: ["SA", "AE", "YE"], // Oman

  // P
  PK: ["AF", "CN", "IN", "IR"], // Pakistan
  PW: [], // Palau
  PS: ["EG", "IL", "JO"], // Palestine
  PA: ["CO", "CR"], // Panama
  PG: ["ID"], // Papua New Guinea
  PY: ["AR", "BO", "BR"], // Paraguay
  PE: ["BO", "BR", "CL", "CO", "EC"], // Peru
  PH: [], // Philippines
  PL: ["BY", "CZ", "DE", "LT", "RU", "SK", "UA"], // Poland
  PT: ["ES"], // Portugal

  // Q
  QA: ["SA"], // Qatar

  // R
  RO: ["BG", "HU", "MD", "RS", "UA"], // Romania
  RU: ["AZ", "BY", "CN", "EE", "FI", "GE", "KZ", "KP", "LV", "LT", "MN", "NO", "PL", "UA"], // Russia
  RW: ["BI", "CD", "TZ", "UG"], // Rwanda

  // S
  KN: [], // Saint Kitts and Nevis
  LC: [], // Saint Lucia
  VC: [], // Saint Vincent and the Grenadines
  WS: [], // Samoa
  SM: ["IT"], // San Marino
  ST: [], // Sao Tome and Principe
  SA: ["IQ", "JO", "KW", "OM", "QA", "AE", "YE"], // Saudi Arabia
  SN: ["GM", "GN", "GW", "ML", "MR"], // Senegal
  RS: ["BA", "BG", "HR", "HU", "ME", "MK", "RO", "XK"], // Serbia
  SC: [], // Seychelles
  SL: ["GN", "LR"], // Sierra Leone
  SG: [], // Singapore (island, causeways to Malaysia are not land borders)
  SK: ["AT", "CZ", "HU", "PL", "UA"], // Slovakia
  SI: ["AT", "HR", "HU", "IT"], // Slovenia
  SB: [], // Solomon Islands
  SO: ["DJ", "ET", "KE"], // Somalia
  ZA: ["BW", "LS", "MZ", "NA", "SZ", "ZW"], // South Africa
  SS: ["CF", "CD", "ET", "KE", "SD", "UG"], // South Sudan
  ES: ["AD", "FR", "GI", "MA", "PT"], // Spain (includes Ceuta/Melilla border with Morocco, Gibraltar)
  LK: [], // Sri Lanka
  SD: ["CF", "TD", "EG", "ER", "ET", "LY", "SS"], // Sudan
  SR: ["BR", "GF", "GY"], // Suriname
  SE: ["FI", "NO"], // Sweden
  CH: ["AT", "FR", "DE", "IT", "LI"], // Switzerland
  SY: ["IQ", "IL", "JO", "LB", "TR"], // Syria

  // T
  TW: [], // Taiwan
  TJ: ["AF", "CN", "KG", "UZ"], // Tajikistan
  TZ: ["BI", "CD", "KE", "MW", "MZ", "RW", "UG", "ZM"], // Tanzania
  TH: ["KH", "LA", "MY", "MM"], // Thailand
  TL: ["ID"], // Timor-Leste
  TG: ["BJ", "BF", "GH"], // Togo
  TO: [], // Tonga
  TT: [], // Trinidad and Tobago
  TN: ["DZ", "LY"], // Tunisia
  TR: ["AM", "AZ", "BG", "GE", "GR", "IR", "IQ", "SY"], // Turkey
  TM: ["AF", "IR", "KZ", "UZ"], // Turkmenistan
  TV: [], // Tuvalu

  // U
  UG: ["CD", "KE", "RW", "SS", "TZ"], // Uganda
  UA: ["BY", "HU", "MD", "PL", "RO", "RU", "SK"], // Ukraine
  AE: ["OM", "SA"], // United Arab Emirates
  GB: ["IE"], // United Kingdom
  US: ["CA", "MX"], // United States
  UY: ["AR", "BR"], // Uruguay
  UZ: ["AF", "KZ", "KG", "TJ", "TM"], // Uzbekistan

  // V
  VU: [], // Vanuatu
  VA: ["IT"], // Vatican City
  VE: ["BR", "CO", "GY"], // Venezuela
  VN: ["CN", "KH", "LA"], // Vietnam

  // W
  EH: ["DZ", "MA", "MR"], // Western Sahara

  // Y
  YE: ["OM", "SA"], // Yemen

  // Z
  ZM: ["AO", "BW", "CD", "MW", "MZ", "NA", "TZ", "ZW"], // Zambia
  ZW: ["BW", "MZ", "ZA", "ZM"], // Zimbabwe

  // Territories / disputed / special
  XK: ["AL", "ME", "MK", "RS"], // Kosovo
  GI: ["ES"], // Gibraltar
};
