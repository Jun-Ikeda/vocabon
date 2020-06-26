const Color = {
  primary1: '#07b86c',
  primary2: '#1e8f5e',
  primary3: '#5bde80',
  background1: 'rgb(249,249,249)',
  background2: 'rgba(255,255,255,1)',
  background3: 'rgb(230,230,230)',
  accent1: '',
  accent2: '',
  accent3: '',
  font1: 'rgb(255,255,255)',
  font2: 'rgb(30,30,30)',
  font3: 'rgb(230,230,230)',
  font4: 'rgb(220,220,220)',
  font5: 'rgb(180,180,180)',
  hyperlink1: '#257df7',
  transparent1: 'rgba(0,0,0,0)',
  transparent2: 'rgba(0,0,0,0.3)',
};

export const PastelColors = [
  '#F59BC1',
  '#FFCED6',
  '#FFF9F9',
  '#D9FED6',
  '#B2F1B3',
  '#53A1B3',
  '#68B5C7',
  '#E5315B',
];

export const getRandomPastel = () => {
  const r = Math.floor(Math.random() * PastelColors.length);
  return PastelColors[r];
};

export default Color;
