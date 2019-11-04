import { Menu } from './menu';
import { Kasir } from './Kasir';
export interface Transaksi {
    id: any;
    kasir: Kasir[];
    Menu: Menu[];
    tanggal: Date;
    total: number;
}