import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Card, { CardActions, CardContent, CardMedia } from 'material-ui/Card';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import { CircularProgress } from 'material-ui/Progress';

const styles = {
  card: {
    margin: '0px 10px 0px 10px',
    width: 385,
    height: 380
  },
  media: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    display: 'flex'
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
            image={image === "" ? "https://images.unsplash.com/photo-1508292549404-81fd946f8c2e?ixlib=rb-0.3.5&s=2b255582246617b61b167259ec1bd3af&auto=format&fit=crop&w=1650&q=80" : image}
            title={title}
          >
        </CardMedia>
        <CardContent>
          {title === "" ? <div style={{alignItems: 'center'}}><CircularProgress size={20} /> </div>: <Typography type="headline" style={{fontSize: '15px'}}>{ title }</Typography>}
          <br/>
          <Typography component="p">
            <table style={{width:"100%", marginBottom: "10px"}}>
              <tr>
                <td><img src="../../../images/road.png" height="20" width="20"/></td>
                <td>{kepadatan}</td>
                <td><img src="../../../images/two-cars.png" height="20" width="20"/></td>
                <td>{volume}</td>
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
