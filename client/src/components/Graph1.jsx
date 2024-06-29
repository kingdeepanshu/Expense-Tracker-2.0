import React from 'react';
import { BarChart } from '@mui/x-charts';

function Graph1() {
    return (
        <BarChart
          series={[
            { data: [51, 6, 49, 30],
                color: '#4f47e6'
             },
            
          ]}
          height={290}
          xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
          margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
        />
      );
}

export default Graph1
