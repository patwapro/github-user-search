import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import Task from './UserCard';
import Fetch from '../utility/Fetch';

const styles = theme => ({
    input: {
        padding: '16px 16px 16px 60px',
        backgroundColor: '#fff',
        boxShadow: '0 1px 1px 0 rgba(116, 129, 141, 0.1)',
        fontSize:22
      },
});

class Home extends Component{
  constructor(props){
    super(props);
    this.state = {
      userRepo:{},
      input:'',
      error: null,
      isLoaded: false
    }
  }

  onSubmit = async (event) => {
    event.preventDefault();
    await this.fetchData(this.state.input);
  }


  fetchData = async (data) => {
    const response = await Fetch.FetchUser(data);
      if (response) {
        console.log(response);
          setTimeout(
            () =>
              this.setState({
                isLoaded: true,
                userRepo: response
              }),
            1000
          );
        }
  }

  async componentDidMount(){
    await this.fetchData('patwapro');
  }



  render() {
    const { classes } = this.props;
    return (
      <React.Fragment>
          <div style={{marginBottom:30}}>
            <form onSubmit={this.onSubmit}>
              <Input className={classes.input} value={this.state.input} onChange={(event)=>this.setState({input: event.target.value})} placeholder="Press enter to search user" disableUnderline fullWidth />
            </form>
         </div>
          <div>
              <Task user={this.state.input} userRepo={this.state.userRepo} error={this.state.error} isLoaded={this.state.isLoaded}/>
          </div>
      </React.Fragment>
    )
  };
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);