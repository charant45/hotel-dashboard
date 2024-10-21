import axios from 'axios';
import { BookingData } from '../types';

const API_BASE_URL = 'https://archive-api.open-meteo.com/v1/archive';

const countries = ['Germany', 'France', 'Spain', 'Italy', 'UK', 'Netherlands', 'Belgium', 'Switzerland', 'Austria', 'Poland'];

export const fetchBookingData = async (startDate: Date, endDate: Date): Promise<BookingData[]> => {
  try {
    
    const response = await axios.get(API_BASE_URL, {
      params: {
        latitude: 52.52, 
        longitude: 13.41,
        start_date: startDate.toISOString().split('T')[0],
        end_date: endDate.toISOString().split('T')[0],
        timezone: 'Europe/Berlin',
      },
    });

    
    const numberOfDays = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

    return Array.from({ length: numberOfDays }).map((_, index) => {
      const bookingDate = new Date(startDate);
      bookingDate.setDate(startDate.getDate() + index);

      return {
        arrival_date_year: bookingDate.getFullYear(),
        arrival_date_month: bookingDate.getMonth() + 1,
        arrival_date_day_of_month: bookingDate.getDate(),
        adults: Math.floor(Math.random() * 4) + 1,  
        children: Math.floor(Math.random() * 3),     
        babies: Math.floor(Math.random() * 2),       
        country: countries[Math.floor(Math.random() * countries.length)],
      };
    });
  } catch (error) {
    console.error('Error fetching booking data:', error);
    return [];
  }
};
