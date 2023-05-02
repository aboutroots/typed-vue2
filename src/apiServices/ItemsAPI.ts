import { Item } from '@/modules/Item';
import { AxiosResponse } from 'axios';
import api from './api';

class ItemsAPI {
  static baseUrl = 'https://fakestoreapi.com';

  static async fetchList(): Promise<AxiosResponse<Item[]>> {
    const response = await api.get(`${this.baseUrl}/products`);
    return response.data;
  }
}

export default ItemsAPI;
