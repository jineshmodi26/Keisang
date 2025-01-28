import React, { useState } from "react";
import { Drawer, Button, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import Appbar from '../components/Appbar'
import FilterDrawer from "../components/FilterDrawer";
import Divider from '@mui/material/Divider';
import Data from "../components/Data";
import CountChart from "../components/CountChart";
import MSRPChart from "../components/MSRPChart";
import DataTable from "../components/DataTable";

const Dashboard = () => {

  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    makes: { Ford: true, Cadillac: false, Jeep: false },
    durations: {
      "Last Month": true,
      "This Month": false,
      "Last 3 Months": false,
      "Last 6 Months": false,
      "This Year": false,
      "Last Year": false,
    },
  });
  
  const [duration, setDuration] = useState("last month")

  const toggleDrawer = (state) => () => {
    setOpen(state);
  };

  return <>
  <Appbar />
    <div className="main">
    <div className='inventory'>
      <h2>Inventory</h2>
      <div className='filter-div'>
        <p>Select Dealer</p>
        <p className="dealer-name">AAA MISTUBISI DEALER</p>
        <div>
          <Button variant="contained" onClick={toggleDrawer(true)} sx={{ backgroundColor: "#FF9926", color: "black", marginLeft: "10px", marginRight: "10px", fontSize: "12px" }}>
            Filter Data By
          </Button>
          <FilterDrawer filters={filters} setFilters={setFilters} open={open} toggleDrawer={toggleDrawer} setDuration={setDuration}/>
        </div>
      </div>
    </div>
    <Divider />
    <div>
      <p>Recent Gathered Data 04/01/24</p>
      <Data />
    </div>
    <div>
      <CountChart duration={duration}/>
    </div>
    <div>
      <MSRPChart filters={filters}/>
    </div>
    <div>
      <DataTable />
    </div>
    </div>
  </>
}

export default Dashboard