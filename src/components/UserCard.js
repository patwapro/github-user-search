import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Hidden from '@material-ui/core/Hidden';
import CircularProgress from '@material-ui/core/CircularProgress';
import Chip from '@material-ui/core/Chip';

const styles = theme => ({
  card: {
    display: 'flex',
    justifyContent:'space-between'
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  chip:{
    height:22,
    margin: theme.spacing.unit,
  },
  responsiveImg:{
    maxWidth:'100%',
    display:'block',
    margin:'auto',
    width:130
  },
  cover:{
    margin:'auto'
  },
  progress: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
class UserCard extends React.Component{
    
    render(){
        const { classes, userRepo, error, isLoaded} = this.props;
        let headlines;
        if (error) {
            return <div>Error: {error.message}</div>;
          } else if (!isLoaded) {
            return <div className={classes.progress}><CircularProgress  /></div>;
          } else {
            if(userRepo){
              if(userRepo.message !== 'Not Found'){
                return(
                  <Grid container>
                  <Grid item xs={12} md={3}></Grid>
                    <Grid item xs={12} md={6}>
                      <Card className={classes.card}>
                          <div className={classes.details}>
                              <CardContent className={classes.content}>
                              <Typography component="h4" variant="h4">{userRepo.name}</Typography>
                              <Typography variant="subtitle2" gutterBottom>
                                {userRepo.location}
                              </Typography>
                              <div>
                              <Chip label={`followers `+userRepo.followers} 
                                className={classes.chip}
                                color="primary"
                              />
                              <Chip label={`Repo `+userRepo.public_repos} 
                                className={classes.chip}
                                color="primary"
                              />
                              <Chip label={`Following `+userRepo.following} 
                                className={classes.chip}
                                color="primary"
                              />
                              </div>
                              </CardContent>  
                              <CardActions className={classes.actions} disableActionSpacing>
                                <Button size="small" color="primary" href={userRepo.html_url} target="_blank">
                                  View Profile
                                </Button>
                            </CardActions>
                          </div>
                          <Hidden xsDown>
                          <CardMedia className={classes.cover}>
                            <img src={userRepo.avatar_url} className={classes.responsiveImg} alt={userRepo.url} />
                          </CardMedia>
                          </Hidden>
                      </Card>
                  </Grid>
                  <Grid item xs={12} md={3}></Grid>
                  </Grid>
                );
            }else{
              headlines = <Typography component="h4" variant="h4" gutterBottom>
                  Repo Not Found
              </Typography>;
            }
            }           
            return (
              <React.Fragment>
                  <Grid container spacing={24}>
                      {headlines}
                </Grid>
              </React.Fragment>
          );
        }
    }
}

UserCard.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(UserCard);