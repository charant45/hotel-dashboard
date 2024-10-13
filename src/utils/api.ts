import axios from 'axios';
import { BookingData } from '../types';

const API_BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';

const countries = ['Germany', 'France', 'Spain', 'Italy', 'UK', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland'];

export const fetchBookingData = async (startDate: Date, endDate: Date): Promise<BookingData[]> => {
  try {
    const response = await axios.get<{ daily: { time: string[], temperature_2m_max: number[], precipitation_sum: number[] } }>(API_BASE_URL, {
      params: {
        latitude: 52.52, 
        longitude: 13.41,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        daily: 'temperature_2m_max,precipitation_sum',
        timezone: 'Europe/Berlin',
      },
    });

    const { daily } = response.data;
    
    return daily.time.map((date: string, index: number) => ({
      arrival_date_year: new Date(date).getFullYear(),
      arrival_date_month: new Date(date).getMonth() + 1,
      arrival_date_day_of_month: new Date(date).getDate(),
      adults: Math.floor(daily.temperature_2m_max[index]),
      children: Math.floor(daily.precipitation_sum[index] * 2),
      babies: Math.floor(Math.random() * 5),
      country: countries[Math.floor(Math.random() * countries.length)],
    }));
  } catch (error) {
    console.error('Error fetching booking data:', error);
    return [];
  }
};