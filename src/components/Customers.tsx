import React, { useEffect, useState, useCallback } from 'react'
import { fetchBookingData } from '../utils/api'
import { BookingData } from '../types'
import { CalendarIcon, Loader2, AlertCircle, Users, Baby, MapPin } from 'lucide-react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const Table: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <table className="min-w-full border-collapse border border-gray-300">{children}</table>
}

const TableHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <thead className="bg-gray-100">{children}</thead>
}

const TableBody: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tbody>{children}</tbody>
}

const TableRow: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <tr className="border-b border-gray-300 hover:bg-gray-50">{children}</tr>
}

const TableHead: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <th className="text-left p-4 border border-gray-300">{children}</th>
}

const TableCell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <td className="p-4 border border-gray-300">{children}</td>
}

interface DateRangePickerProps {
  dateRange: [Date, Date];
  setDateRange: React.Dispatch<React.SetStateAction<[Date, Date]>>;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ dateRange, setDateRange }) => {
  return (
    <div className="flex items-center justify-center space-x-4">
      <DatePicker
        selected={dateRange[0]}
        onChange={(date: Date | null) => date && setDateRange([date, dateRange[1]])}
        selectsStart
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none"
        popperClassName="!hidden" 
      />
      <span className="text-gray-400">to</span>
      <DatePicker
        selected={dateRange[1]}
        onChange={(date: Date | null) => date && setDateRange([dateRange[0], date])}
        selectsEnd
        startDate={dateRange[0]}
        endDate={dateRange[1]}
        minDate={dateRange[0]}
        className="bg-gray-700 text-white border border-gray-600 rounded px-3 py-2 focus:outline-none"
        popperClassName="!hidden" 
      />
    </div>
  );
};

const useBookingData = (startDate: Date, endDate: Date) => {
  const [bookingData, setBookingData] = useState<BookingData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadBookingData = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await fetchBookingData(startDate, endDate)
      setBookingData(data)
    } catch (err) {
      setError('Failed to fetch booking data')
      console.error('Error fetching booking data:', err)
    } finally {
      setIsLoading(false)
    }
  }, [startDate, endDate])

  useEffect(() => {
    loadBookingData()
  }, [loadBookingData])

  return { bookingData, isLoading, error, loadBookingData }
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

export default function CustomerBooking() {
  const [dateRange, setDateRange] = useState<[Date, Date]>([new Date('2023-01-01'), new Date('2023-01-31')])

  const { bookingData, isLoading, error, loadBookingData } = useBookingData(dateRange[0], dateRange[1])

  useEffect(() => {
    console.log('Component mounted or dates changed:', { startDate: dateRange[0], endDate: dateRange[1] })
  }, [dateRange])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ maxWidth: 1200, margin: 'auto', padding: 3 }}>
        <Typography variant="h4" gutterBottom>Booking Data</Typography>
        
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={9}>
            <DateRangePicker dateRange={dateRange} setDateRange={setDateRange} />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Button
              variant="contained"
              onClick={loadBookingData}
              disabled={isLoading}
              startIcon={<CalendarIcon />}
              sx={{ height: '40px', width: '80%' }}
            >
              {isLoading ? 'Loading...' : 'Load Data'}
            </Button>
          </Grid>
        </Grid>

        {isLoading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' }}>
            <Loader2 className="h-8 w-8 animate-spin" />
          </Box>
        ) : error ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px', color: 'error.main' }}>
            <AlertCircle className="mr-2 h-6 w-6" />
            {error}
          </Box>
        ) : (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>Booking Details</Typography>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className="flex items-center">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            Date
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <MapPin className="mr-2 h-4 w-4" />
                            Country
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Adults
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <Users className="mr-2 h-4 w-4" />
                            Children
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className="flex items-center">
                            <Baby className="mr-2 h-4 w-4" />
                            Babies
                          </div>
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookingData.map((booking, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            {`${booking.arrival_date_year}-${String(booking.arrival_date_month).padStart(2, '0')}-${String(booking.arrival_date_day_of_month).padStart(2, '0')}`}
                          </TableCell>
                          <TableCell>{booking.country}</TableCell>
                          <TableCell>{booking.adults}</TableCell>
                          <TableCell>{booking.children}</TableCell>
                          <TableCell>{booking.babies}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Box>
    </ThemeProvider>
  )
}