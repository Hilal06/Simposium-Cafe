import { Menu } from './menu';
import { Kasir } from './Kasir';
export interface Transaksi {
    id: any;
    pelanggan: any;
    kasir: Kasir;
    menu: Menu[];
    tanggal: any;
    total: number;
    status: boolean;
}
