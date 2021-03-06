import React, { Component } from 'react'
import Axios from 'axios';
import {Link} from 'react-router-dom'
import img from '../../assets/Pikachu.png'
import './FolloweringCard.css'

class FolloweringCard extends Component {
    state = {
        buttonText: 'Wait...',
        isDisable: true,
    }
    componentDidMount() {
        let path = this.props.user.userId;
        Axios.get(`/api/checkfollowstatus/${path}`, {withCredentials: true})
            .then(res => {
                if(res.status === 207) {
                    alert("You are not LoggedIn!")
                    this.props.history.push({
                        pathname: `/login`,
                    })
                } else if(path === this.props.userId) {
                    this.setState({
                        buttonText: 'Follow',
                        isDisable: true,
                    })
                } else if(res.data.isFollowing) {
                    this.setState({
                        buttonText: 'Following',
                        isDisable: false,
                    })
                } else {
                    this.setState({
                        buttonText: 'Follow',
                        isDisable: false,
                    })
                }
            })
            .catch(err => console.log(err));
    }
    handleFollowUnFollow = () => {
        this.setState({
            isDisable: true,
        })
        if(this.state.buttonText === 'Follow') {
            const data = {
                followUserId: this.props.user.userId,
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
                        alert('You are not LoggedIn!');
                        this.props.history.push({
                            pathname: `/login`,
                        })
                    }
                })
                .catch(err => console.log(err));
        } else {
            const data = {
                unFollowUserId: this.props.user.userId,
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
            <div className="post card followeringCard">
                <div className="row followering-card-top">
                    <div className="followering-card-info"> 
                        <div className="image"><img src={img}></img></div>
                        <Link to={{ pathname: `/profile/${this.props.user.userId}` }}>{user.userName}</Link>
                    </div>
                </div>
                <div className="row followering-card-footer">
                    <div className='btn-container'>
                        <button onClick={this.handleFollowUnFollow} disabled={this.state.isDisable} className="waves-effect waves-light btn-small">{this.state.buttonText}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default FolloweringCard;