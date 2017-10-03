import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';

const styles = {
  card: {
    maxWidth: 345,
  },
  media: {
    height: 200,
  },
};

function CardComponent(props) {
  const classes = props.classes;
  const image = props.image;
  const title = props.title;
  const kepadatan = props.kepadatan;
  const volume = props.volume;
  const hujan = props.hujan;
  const banjir = props.banjir;

  return (
    <div>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={image}
          title={title}
        />
        <CardContent>
          <Typography type="headline" component="h2">
            {title}
          </Typography>
          <br/>
          <Typography component="p">
            <table style={{width:"100%"}}>
              <tr>
                <td><img src="../../../images/road.png" height="20" width="20"/></td>
                <td>{kepadatan}</td>
                <td><img src="../../../images/two-cars.png" height="20" width="20"/></td>
                <td>{volume}</td>
              </tr>
              <tr>
                <td><img src="../../../images/rainy.png" height="20" width="20"/></td>
                <td>{hujan}</td>
                <td><img src="../../../images/flooding-house.png" height="20" width="20"/></td>
                <td>{banjir}</td>
              </tr>
            </table>
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}

CardComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CardComponent);
