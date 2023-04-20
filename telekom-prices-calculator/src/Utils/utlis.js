export const INTERNET = 1;
export const TV = 2;
export const PHONE_SUB = 4;
export const DECODER = 8;
export const INTERNET_TV = INTERNET + TV; // 3
export const INTERNET_PHONE = INTERNET + PHONE_SUB; // 5

export const serviceNames = {
  [INTERNET]: 'Internet',
  [TV]: 'Telewizja',
  [PHONE_SUB]: 'Abonament telefoniczny',
  [DECODER]: 'Dekoder 4K',
  [INTERNET_TV]: 'Internet + telewizja',
  [INTERNET_PHONE]: 'Internet + Abonament telefoniczny'
};

export const pricesMatrix = {
  [INTERNET]: { // INTERNET
    '2023': 39,
    '2024': 49,
    '2025': 59
  },
  [TV]: { // TV
    '2023': 49,
    '2024': 49,
    '2025': 59
  },
  [PHONE_SUB]: { // PHONE_SUB
    '2023': 29,
    '2024': 29,
    '2025': 29
  },
  [DECODER]: { // DECODER
    '2023': 29,
    '2024': 29,
    '2025': 29
  },
  [INTERNET_TV]: { // INTERNET_TV
    '2023': 79,
    '2024': 89,
    '2025': 99
  },
  [INTERNET_PHONE]: { // INTERNET_PHONE
    '2023': 64,
    '2024': 64,
    '2025': 64
  }
}

export const serviceList = [
  {value: INTERNET, label:'Internet'},
  {value: TV, label: 'Telewizja',},
  {value: PHONE_SUB, label: 'Abonament telefoniczny'},
  {value: DECODER, label: 'Dekoder 4K', isDisabled: true}
];

export const yearOptions = [
  {value: 2023, label: '2023'},
  {value: 2024, label: '2024'},
  {value: 2025, label: '2025'}
];