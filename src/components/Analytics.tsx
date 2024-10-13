import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, TooltipProps } from 'recharts';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { fetchBookingData } from '../utils/api';
import DateRangePicker from './DateRangePicker';
import 'react-datepicker/dist/react-datepicker.css';

interface BookingData {
  arrival_date_year: number;
  arrival_date_month: number;
  arrival_date_day_of_month: number;
  adults: number;
  children: number;
  babies: number;
  country: string;
}

interface CustomTooltipProps extends TooltipProps<number, string> {}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <Card>
        <CardContent>
          <Typography variant="subtitle2" gutterBottom>{`Date: ${label}`}</Typography>
          {payload.map((entry, index) => (
            <Typography key={index} variant="body2" style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}`}
            </Typography>
          ))}
        </CardContent>
      </Card>
    )
  }
  return null
}

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

const Analytics: React.FC = () => {
  const [bookingData, setBookingData] = useState<BookingData[]>([])
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date('2023-01-01'), new Date('2023-01-31')])
  const [isLoading, setIsLoading] = useState(false)

  const fetchData = React.useCallback(async () => {
    setIsLoading(true)
    try {
      const data = await fetchBookingData(dateRange[0], dateRange[1])
      setBookingData(data)
    } catch (error) {
      console.error('Error fetching booking data:', error)
    } finally {
      setIsLoading(false)
    }
  }, [dateRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const chartData = bookingData.map((booking) => ({
    date: `${booking.arrival_date_year}-${booking.arrival_date_month}-${booking.arrival_date_day_of_month}`,
    adults: booking.adults,
    children: booking.children,
    babies: booking.babies,
  }))

  const totalBookings = bookingData.reduce((sum, booking) => sum + booking.adults + booking.children + booking.babies, 0)
  const averageBookings = Math.round(totalBookings / bookingData.length) || 0

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Typography variant="h4" gutterBottom>Booking Analytics</Typography>
        <Typography variant="subtitle1" gutterBottom>Daily booking trends and insights</Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={9}>
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={fetchData}
              disabled={isLoading}
              sx={{ height: '56px', width: '100%' }}
            >
              {isLoading ? 'Loading...' : 'Fetch Data'}
            </Button>
          </Grid>
        </Grid>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>Total Bookings</Typography>
                <Typography variant="h4" color="primary">{totalBookings.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>Average Daily Bookings</Typography>
                <Typography variant="h4" color="secondary">{averageBookings.toLocaleString()}</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box sx={{ height: 400, width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Bar dataKey="adults" fill="#3f51b5" stackId="a" />
              <Bar dataKey="children" fill="#f50057" stackId="a" />
              <Bar dataKey="babies" fill="#ff9800" stackId="a" />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      </Box>
    </ThemeProvider>
  )
}

export default Analytics
