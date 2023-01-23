import { Component } from 'react';
import User from './User';

import classes from './Users.module.css';

// LEC With class based components state always must be called state, and it MUST be an object.  We always put all state in this component in this one object.  We edit state by calling this.setState({}) which also takes an object.  We then pass in the state and value we want to change.  We do not need to manage other existing state, it will not be overwritten like it would be in functional components.

class Users extends Component {
  constructor() {
    super();
    this.state = {
      showUsers: true,
      moreState: 'Test',
    };
  }

  toggleUsersHandler() {
    //this.state.showUsers = false // NOT HOW TO DO IT
    this.setState(curState => {
      return { showUsers: !curState.showUsers };
    });
  }

  render() {
    const usersList = (
      <ul>
        {this.props.users.map(user => (
          <User key={user.id} name={user.name} />
        ))}
      </ul>
    );

    return (
      <div className={classes.users}>
        <button onClick={this.toggleUsersHandler.bind(this)}>
          {this.state.showUsers ? 'Hide' : 'Show'} Users
        </button>
        {this.state.showUsers && usersList}
      </div>
    );
  }
}

// const Users = () => {
//   const [showUsers, setShowUsers] = useState(true);

//   const toggleUsersHandler = () => {
//     setShowUsers((curState) => !curState);
//   };

// const usersList = (
//   <ul>
//     {DUMMY_USERS.map((user) => (
//       <User key={user.id} name={user.name} />
//     ))}
//   </ul>
// );

//   return (
//     <div className={classes.users}>
//       <button onClick={toggleUsersHandler}>
//         {showUsers ? 'Hide' : 'Show'} Users
//       </button>
//       {showUsers && usersList}
//     </div>
//   );
// };

export default Users;
