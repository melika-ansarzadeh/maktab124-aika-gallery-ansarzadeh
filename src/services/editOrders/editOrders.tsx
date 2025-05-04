import { BASE_URL } from '@/constants/api/api';

import axios from 'axios';

export const editOrders = async (orderId: string, newStatus: string) => {
  try {
    const response = await axios.patch(`${BASE_URL}/api/orders/${orderId}`, {
      status: newStatus,
    });

    return response.data;
  } catch (error) {
    throw new Error('خطا در تغییر وضعیت سفارش');
  }
};
