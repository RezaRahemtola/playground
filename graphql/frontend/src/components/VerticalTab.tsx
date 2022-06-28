import React from "react";

import { makeStyles, Theme } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { gql, useQuery } from "@apollo/client";

import { Category } from "../api/Entities";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: "flex",
    height: `calc(100vh - 8vh)`,
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    marginRight: 20,
  },
}));

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}

interface CategoriesData {
  categories: Category[];
}

const GET_CATEGORIES_AND_PRODUCT = gql`
  query {
    categories {
      name
      products {
        name
        desc
        price
      }
    }
  }
`;

export default function VerticalTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { loading, error, data } = useQuery<CategoriesData>(
    GET_CATEGORIES_AND_PRODUCT
  );

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  if (error) return <p>Error</p>;
  if (loading) return <p>Fetch products...</p>;

  if (data) {
    return (
      <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {data.categories.map((category, i) => (
            <Tab label={category.name} {...a11yProps(i)} key={i} />
          ))}
        </Tabs>
      </div>
    );
  }
  return <div />;
}
