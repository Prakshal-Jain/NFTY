import { Component } from 'react';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
    }

    componentDidMount() {
        fetch('/api/users/testing')
        //returns the .json of users from backend
            .then(res => res.json())
            .then(users => {
                this.setState({users: users}); 
            });
    }

    render() {
        return (    
            <ul>
                {
                    this.state.users.map(users => (
                        <li>Username: {users.username}</li>
                    ))
                }
            </ul>
        )
    }
}

export default Users;