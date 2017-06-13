import React from 'react';
import {List, ListItem} from 'material-ui/List';

export class DrawerMenu extends React.Component {

  state = {
    open: false,
  };

  render() {
    return (
      <div style={{width:250}}>
        <br />
          <List>
            <ListItem primaryText="Students" />
            <ListItem primaryText="Projects" />
            <ListItem
              primaryText="Curriculum"
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="Subject"
                />,
                <ListItem
                  key={2}
                  primaryText="Team"
                />,
                <ListItem
                  key={3}
                  primaryText="Schedule"
                />,
              ]}
            />
            <ListItem
              primaryText="Data Master"
              initiallyOpen={false}
              primaryTogglesNestedList={true}
              nestedItems={[
                <ListItem
                  key={1}
                  primaryText="City"
                />,
                <ListItem
                  key={2}
                  primaryText="Campuses"
                />,
                <ListItem
                  key={3}
                  primaryText="Batches"
                />,
                <ListItem
                  key={3}
                  primaryText="Partners"
                />,
              ]}
            />
          </List>
      </div>
    );
  }
}
