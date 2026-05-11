// 后端地址，部署后替换为 Railway 域名
const BASE_URL = 'https://habit-tracker-backend.up.railway.app/api';

const request = (url, method = 'GET', data = {}) => {
  return new Promise((resolve, reject) => {
    const token = uni.getStorageSync('token');
    uni.request({
      url: BASE_URL + url,
      method,
      data,
      header: token ? { Authorization: `Bearer ${token}` } : {},
      success: ({ statusCode, data }) => {
        if (statusCode >= 400) reject(data);
        else resolve(data);
      },
      fail: reject,
    });
  });
};

export const api = {
  register: (data) => request('/auth/register', 'POST', data),
  login: (data) => request('/auth/login', 'POST', data),
  getHabits: () => request('/habits'),
  addHabit: (data) => request('/habits', 'POST', data),
  deleteHabit: (id) => request(`/habits/${id}`, 'DELETE'),
  checkIn: (id, date) => request(`/habits/${id}/checkin`, 'POST', { date }),
};
