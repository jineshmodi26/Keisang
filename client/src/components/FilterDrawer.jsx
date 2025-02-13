import React from "react";
import { Drawer, Button, FormGroup, FormControlLabel, Checkbox, Typography } from "@mui/material";
import Divider from "@mui/material/Divider";
import { useState } from "react";

export default function FilterDrawer({ filters, setFilters, open, toggleDrawer, setDuration }) {

  const [applied, setApplied] = useState(false)

  const handleChange = (category, key) => (event) => {
    if (event.target.checked) {
      // Allow only one checkbox to be checked at a time within the category
      setFilters((prev) => ({
        ...prev,
        [category]: Object.keys(prev[category]).reduce(
          (acc, curr) => ({ ...acc, [curr]: curr === key }),
          {}
        ),
      }));
      setDuration(key.toLowerCase())
    } else {
      // Uncheck the current checkbox
      setFilters((prev) => ({
        ...prev,
        [category]: { ...prev[category], [key]: false },
      }));
    }
  };

  return (
    <Drawer anchor="right" open={applied ? !open : open} onClose={toggleDrawer(false)}>
      <div style={{ width: 300, padding: 20 }}>
        <Typography variant="h6" style={{ fontWeight: "bold", paddingBottom: "10px" }}>
          Filter Data By
        </Typography>
        <Divider />
        <Typography variant="subtitle1" style={{ paddingTop: "10px", fontWeight: "bold" }}>
          Make
        </Typography>
        <FormGroup>
          {Object.keys(filters.makes).map((make) => (
            <FormControlLabel
              key={make}
              control={<Checkbox checked={filters.makes[make]} onChange={handleChange("makes", make)} />}
              label={make}
            />
          ))}
        </FormGroup>

        <Divider />

        <Typography variant="subtitle1" style={{ paddingTop: "10px", fontWeight: "bold" }}>
          Duration
        </Typography>
        <FormGroup>
          {Object.keys(filters.durations).map((duration) => (
            <FormControlLabel
              key={duration}
              control={<Checkbox checked={filters.durations[duration]} onChange={handleChange("durations", duration)} />}
              label={duration}
            />
          ))}
        </FormGroup>

        <Divider />

        <Button
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginTop: 10 }}
          sx={{ backgroundColor: "#FF9926" }}
          onClick={() => {
            setApplied(true)
          }}
        >
          Apply Filter
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          style={{ marginTop: 10, color: "#FF9926", borderColor: "#FF9926" }}
          onClick={() =>
            setFilters({
              makes: { Ford: false, Cadillac: false, Jeep: false },
              durations: {
                "Last Month": false,
                "This Month": false,
                "Last 3 Months": false,
                "Last 6 Months": false,
                "This Year": false,
                "Last Year": false,
              },
            })
          }
        >
          Remove All Filters
        </Button>
      </div>
    </Drawer>
  );
}
