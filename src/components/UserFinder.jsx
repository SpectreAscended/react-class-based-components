import { Fragment, useState, useEffect, Component } from 'react';
import Users from './Users';
import classes from './UserFinder.module.css';
import UsersContext from '../store/usersContext';
import ErrorBoundary from './ErrorBoundary';

// instead of using useContext, we set a static property to the Context. "static contextType = OurContext"  We can only set the static context once per component. If you would need to use a second context you would have to find some other work around, like wrapping your component in another component.  Access your context by using "this.context.users"(to access users from our context)

class UserFinder extends Component {
  static contextType = UsersContext;

  constructor() {
    super();
    this.state = {
      filteredUsers: [],
      searchTerm: '',
    };
  }

  componentDidMount() {
    // useEffect(() => {}, [])
    // Send http request...
    this.setState({ filteredUsers: this.context.users });
  }

  searchChangeHandler(event) {
    this.setState({ searchTerm: event.target.value });
  }

  componentDidUpdate(prevProps, prevState) {
    // useEffect(() => {}, [dependencies])
    // This if statement is how we can tell if our dependency changed.  If we don't include this if check we will create an infinite loop.
    if (prevState.searchTerm !== this.state.searchTerm) {
      this.setState({
        filteredUsers: this.context.users.filter(user =>
          user.name.includes(this.state.searchTerm)
        ),
      });
    }
  }

  render() {
    return (
      <Fragment>
        <div className={classes.finder}>
          <input type="search" onChange={this.searchChangeHandler.bind(this)} />
        </div>
        <ErrorBoundary>
          <Users users={this.state.filteredUsers} />
        </ErrorBoundary>
      </Fragment>
    );
  }
}

// const UserFinder = () => {
//   const [filteredUsers, setFilteredUsers] = useState(DUMMY_USERS);
//   const [searchTerm, setSearchTerm] = useState('');

//   useEffect(() => {
//     setFilteredUsers(
//       DUMMY_USERS.filter(user => user.name.includes(searchTerm))
//     );
//   }, [searchTerm]);

//   const searchChangeHandler = event => {
//     setSearchTerm(event.target.value);
//   };

//   return (
//     <Fragment>
//       <div className={classes.finder}>
//         <input type="search" onChange={searchChangeHandler} />
//       </div>
//       <Users users={filteredUsers} />
//     </Fragment>
//   );
// };

export default UserFinder;
