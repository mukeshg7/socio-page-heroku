import React, { Component } from 'react'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import './FollowCard.css'
import img from '../../assets/Pikachu.png'

class FollowCard extends Component {
    state = {
        buttonText: 'Follow',
        isDisable: false
    }

    handleFollowUnFollow = () => {
        this.setState({
            isDisable: true,
        })
        if(this.state.buttonText === 'Follow') {
            const data = {
                followUserId: this.props.user._id,
                followUserName: this.props.user.userName,
            }
            Axios.post('/api/follow', data, {withCredentials: true})
                .then(res => {
                    if(res.status === 200) {
                        this.setState({
                            buttonText: 'Following',
                            isDisable: false,
                        })
                    } else {
                        alert("You are not LoggedIn!")
                        this.props.history.push({
                            pathname: `/login`,
                        })
                    }
                })
                .catch(err => console.log(err));
        } else {
            const data = {
                unFollowUserId: this.props.user._id,
                unFollowUserName: this.props.user.userName,
            };
            Axios.post('/api/unfollow', data, {withCredentials: true})
                .then(res => {
                    if(res.status === 200) {
                        this.setState({
                            buttonText: 'Follow',
                            isDisable: false,
                        })
                    } else {
                        alert("You are not LoggedIn!")
                        this.props.history.push({
                            pathname: `/login`,
                        })
                    }
                })
                .catch(err => console.log(err));
        }
    }

    render() {
        const user = this.props.user;
        return (
            <div className="post card followcard">
                    <div className="row follow-card-top">
                        <div className="follow-card-info"> 
                            <div className="image"><img src={img}></img></div>
                            <Link to={{ pathname: `/profile/${this.props.user._id}` }}>{user.userName}</Link>
                        </div>
                    </div>
                    <div className="row follow-card-footer">
                        <div className='btn-container'>
                            <button onClick={this.handleFollowUnFollow} disabled={this.state.isDisable} className="waves-effect waves-light btn-small">{this.state.buttonText}</button>
                        </div>
                    </div>
            </div>
        )
    }
}

export default FollowCard;