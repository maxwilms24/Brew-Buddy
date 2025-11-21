import { User, Transaction, StockItem } from './types';

export const MOCK_USERS: User[] = [
  { id: '1', name: 'Virgile', rfid: 'A1-B2-C3-D4', totalConsumption: 15, memberSince: '2023-09-01' },
  { id: '2', name: 'Max', rfid: 'E5-F6-G7-H8', totalConsumption: 12, memberSince: '2023-09-05' },
  { id: '3', name: 'Jaydi', rfid: 'I9-J0-K1-L2', totalConsumption: 8, memberSince: '2023-09-10' },
  { id: '4', name: 'Henk', rfid: 'M3-N4-O5-P6', totalConsumption: 5, memberSince: '2023-09-12' },
  { id: '5', name: 'Gert', rfid: 'Q7-R8-S9-T0', totalConsumption: 3, memberSince: '2023-09-15' },
  { id: '6', name: 'Marik', rfid: 'U1-V2-W3-X4', totalConsumption: 18, memberSince: '2023-08-28' },
  { id: '7', name: 'Roxy', rfid: 'Y5-Z6-A7-B8', totalConsumption: 0, memberSince: '2023-09-20' },
];

export const INITIAL_STOCK: StockItem = {
  id: 'beer',
  name: 'Pilsner',
  quantity: 12,
  maxCapacity: 48,
  icon: 'beer',
};

export const RECENT_TRANSACTIONS: Transaction[] = [
  { id: 't1', userId: '1', userName: 'Virgile', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date() },
  { id: 't2', userId: '2', userName: 'Max', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 15) }, // 15 mins ago
  { id: 't3', userId: '3', userName: 'Jaydi', type: 'RESTOCK', amount: 24, item: 'voorraad', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) }, // 2 hours ago
  { id: 't4', userId: '4', userName: 'Henk', type: 'CONSUMPTION', amount: 5, item: 'biertjes', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5) }, // 5 hours ago
  { id: 't5', userId: '5', userName: 'Gert', type: 'CONSUMPTION', amount: 1, item: 'biertje', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) }, // 1 day ago
];

export const WEEKLY_DATA = [
  { name: 'Maandag', usage: 5 },
  { name: 'Dinsdag', usage: 10 },
  { name: 'Woensdag', usage: 15 },
  { name: 'Donderdag', usage: 20 },
  { name: 'Vrijdag', usage: 25 },
  { name: 'Zaterdag', usage: 30 },
  { name: 'Zondag', usage: 35 },
];