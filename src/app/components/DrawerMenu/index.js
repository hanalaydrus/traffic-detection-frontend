import React from 'react'
import {Link} from 'react-router-dom'
import {List, ListItem} from 'material-ui/List'

export class DrawerMenu extends React.Component {

  state = {
    open: false,
  }

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
                  key={3.1}
                  primaryText="Subject"
                />,
                <ListItem
                  key={3.2}
                  primaryText="Team"
                />,
                <ListItem
                  key={3.3}
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
                  key={4.1}
                  primaryText="City"
                  containerElement={<Link to="/city" />}
                />,
                <ListItem
                  key={4.2}
                  primaryText="Campuses"
                />,
                <ListItem
                  key={4.3}
                  primaryText="Batches"
                />,
                <ListItem
                  key={4.4}
                  primaryText="Partners"
                />,
              ]}
            />
          </List>
      </div>
    );
  }
}
