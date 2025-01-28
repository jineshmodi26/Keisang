const fs = require("fs")
const csvParser = require("csv-parser")
const Papa = require('papaparse');

module.exports = {
    getCount: async (req, res) => {

        // Load CSV Data into memory
        let inventoryData = [];
        fs.readFile('data.csv', 'utf8', (err, data) => {
            if (err) {
              console.error('Error reading the CSV file:', err);
              return res.status(500).send('Error reading the CSV file');
            }
        
            // Parse the CSV file content using PapaParse
            Papa.parse(data, {
              header: true, // Treat the first row as headers
              skipEmptyLines: true,
              complete: (results) => {
                inventoryData.push(results.data); // Send the parsed data as a JSON response
              },
              error: (parseError) => {
                console.error('Error parsing the CSV file:', parseError);
                res.status(500).send('Error parsing the CSV file');
              },
            });

            const { condition, duration } = req.body;
        
          if (!condition || !duration) {
            return res.status(400).json({ error: 'Both condition and duration are required' });
          }
        
          const currentDate = new Date();
          let startDate;
          let timeIntervals = [];

          function createMonthlyIntervals(year) {
            let intervals = [];
            for (let month = 0; month < 12; month++) {
              let start = new Date(year, month, 1);
              let end = new Date(year, month + 1, 0);
              intervals.push({ start, end });
            }
            return intervals;
          }

          function createLast3MonthsIntervals() {
            const currentDate = new Date();
            let intervals = [];
            
            for (let i = 2; i >= 0; i--) {
              let month = currentDate.getMonth() - i;
              let year = currentDate.getFullYear();
              if (month < 0) {
                month += 12;
                year -= 1;
              }
              let start = new Date(year, month, 1);
              let end = new Date(year, month + 1, 0);
              intervals.push({ start, end });
            }
            return intervals;
          }

          function createCurrentYearMonths() {
            const currentYear = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            let intervals = [];
            
            for (let month = 0; month <= currentMonth; month++) {
              let start = new Date(currentYear, month, 1);
              let end = new Date(currentYear, month + 1, 0);
              intervals.push({ start, end });
            }
            return intervals;
          }

          function createLast6MonthsIntervals() {
            const currentDate = new Date();
            let intervals = [];
            
            for (let i = 5; i >= 0; i--) {
              let month = currentDate.getMonth() - i;
              let year = currentDate.getFullYear();
              if (month < 0) {
                month += 12;
                year -= 1;
              }
              let start = new Date(year, month, 1);
              let end = new Date(year, month + 1, 0);
              intervals.push({ start, end });
            }
            return intervals;
          }
        
        
          function createIntervalsByFixedDays(start, end) {
            let intervals = [];
            let intervalStarts = [];
            
            for (let i = 1; i <= end.getDate(); i += 10) {
              intervalStarts.push(i);
            }
            
            intervalStarts.forEach(day => {
              let intervalStart = new Date(start.getFullYear(), start.getMonth(), day);
              let intervalEnd = new Date(start.getFullYear(), start.getMonth(), day + 9);
              if (intervalEnd > end) intervalEnd = end;
              intervals.push({ start: intervalStart, end: intervalEnd });
            });
            return intervals;
          }
        
          if (duration === 'last month') {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
            const endDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
            timeIntervals = createIntervalsByFixedDays(startDate, endDate);
          } else if (duration === 'this month') {
            startDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
            const endDate = new Date();
            timeIntervals = createIntervalsByFixedDays(startDate, endDate);
          } else if (duration === 'last 3 months') {
            timeIntervals = createLast3MonthsIntervals();
          } else if (duration === 'last 6 months') {
            timeIntervals = createLast6MonthsIntervals();
          } else if (duration === "this year") {
            timeIntervals = createCurrentYearMonths()
          }
          else if (duration === 'last year') {
            startDate = new Date(currentDate.getFullYear() - 1, 0, 1);
            timeIntervals = createMonthlyIntervals(startDate.getFullYear());
          } else {
            return res.status(400).json({ error: 'Invalid duration specified' });
          }
        
          let responseData = [];
          
          timeIntervals.forEach(interval => {
            const count = inventoryData[0].filter(item => {
              const itemDate = new Date(item.timestamp);
              return item.condition === condition && itemDate >= interval.start && itemDate <= interval.end;
            }).length;
        
            responseData.push({
              duration: `${interval.start.toISOString().split('T')[0]}`,
              count: count
            });
          });
        
          res.status(200).json(responseData);

          });
    }
}