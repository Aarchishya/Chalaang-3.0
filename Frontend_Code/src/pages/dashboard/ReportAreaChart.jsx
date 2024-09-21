import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';

// third-party
import ReactApexChart from 'react-apexcharts';

// chart options
const lineChartOptions = {
  chart: {
    type: 'line',
    height: 365,
    toolbar: {
      show: false
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  dataLabels: {
    enabled: false
  },
  xaxis: {
    categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'], // Days of the week
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    show: true, // Show the y-axis to represent the time in hours
    title: {
      text: 'Average Processing Time (hours)' // Label for the y-axis
    }
  },
  grid: {
    show: true, // Enable grid for better readability
    borderColor: '#e0e0e0'
  },
  markers: {
    size: 5, // Add markers at each data point
    colors: ['#fff'],
    strokeColors: '#FF5733',
    strokeWidth: 2
  },
  tooltip: {
    x: {
      format: 'dd/MM/yy HH:mm'
    }
  }
};

// ==============================|| AVERAGE LOAN PROCESSING TIME LINE CHART ||============================== //

export default function LoanProcessingTimeLineChart() {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const info = theme.palette.info.light;

  // Updated series data for average loan processing time in hours
  const [series] = useState([
    {
      name: 'Average Processing Time', // Series name reflects processing time
      data: [5.2, 4.8, 6.0, 5.5, 4.3, 7.0, 6.5] // Sample processing time in hours for each day
    }
  ]);

  const [options, setOptions] = useState(lineChartOptions);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [info],
      xaxis: {
        labels: {
          style: {
            colors: [secondary, secondary, secondary, secondary, secondary, secondary, secondary]
          }
        }
      },
      yaxis: {
        labels: {
          style: {
            colors: [secondary]
          }
        },
        title: {
          text: 'Average Processing Time (hours)' // Update y-axis label to reflect time
        }
      }
    }));
  }, [primary, info, secondary]);

  return (
    <Box id="chart" sx={{ bgcolor: 'transparent' }}>
      <ReactApexChart options={options} series={series} type="line" height={365} />
    </Box>
  );
}
