import React from 'react'
import $ from 'jquery'
import { Router, Route, browserHistory ,Link,IndexRoute } from 'react-router';
import localUser from '../localUser/index'
class Navs extends React.Component{
    constructor(props){
        super(props)
        this.state ={localUser:null,err:null,success:null,isSuper:false}
    }
    componentWillMount(){
        $.get('/localUser').then((data)=>{
            this.setState({localUser:data.localUser,err:data.err,success:data.success})
            localUser.set(data.localUser)
            //判断超级是否是超级用户
            var user=localUser.query()
            if(user){
                this.setState({isSuper:user.username=='simba'})
            }
            else{
                this.setState({isSuper:false})
            }
        })

    }
    handleClick(){
        $.get('/user/signout').then((data)=>{
            if(data.err==0){
                localUser.del()
                this.setState({localUser:null,isSuper:false})
            }

        })
    }
    render(){
        const Login = ()=>{
            return (<div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="/about">Simba Blog</a>
                        </div>
                        <ul className="nav navbar-nav col-md-11 " >
                            <li ><Link activeStyle={{background:"#e7e7e7"}} to="/">首页</Link></li>
                            <li><Link activeStyle={{background:"#e7e7e7"}} to="/article/add">发表文章</Link></li>
                            <li className="navbar-right btn-group">
                                <Link   activeStyle={{background:"#e7e7e7"}} className="dropdown-toggle col-md-12" data-toggle="dropdown" >
                                    <img src={this.state.localUser.avatar} />
                                    <span className="caret"></span>
                                </Link>
                                <ul className="dropdown-menu" >
                                    <li><Link  activeStyle={{background:"#e7e7e7"}} to="###">个人主页</Link></li>
                                    <li><Link  onClick={this.handleClick.bind(this)}>退出</Link></li>
                                </ul>
                            </li>
                            <li className="navbar-right"><Link activeStyle={{background:"#e7e7e7"}}  to="/user/signup">注册</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>)
        }
        const NoLogin = ()=>{
            return ( <div>
                <nav className="navbar navbar-default" role="navigation">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <Link className="navbar-brand" to="/about">Simba Blog</Link>
                        </div>
                        <ul className="nav navbar-nav col-md-11 " >
                            <li ><Link activeStyle={{background:"#e7e7e7"}}  to="/">首页</Link></li>
                            <li className="navbar-right" ><Link activeStyle={{background:"#e7e7e7"}}  to="/user/signup">注册</Link></li>
                            <li className="navbar-right"><Link activeStyle={{background:"#e7e7e7"}}  to="/user/signin">登录</Link></li>
                        </ul>
                    </div>
                </nav>
            </div>)
        }
        /*var NavsChild=()=>{
            return (
                <div className="container">
                    {React.cloneElement(this.props.children)}

                </div>
            )
        }*/
        /*var NavsChild=()=>{
            console.log(this.props.children,'childern')
            return (
                <div className="container">
                    {React.cloneElement(this.props.children,{isSuper:this.state.isSuper})}
                </div>
            )
        }*/
        return (
            <div>
                {this.state.localUser? <Login/>: <NoLogin/>}
                {/*<NavsChild />*/}
                <div className="container">{React.cloneElement(this.props.children,{isSuper:this.state.isSuper})}</div>
            </div>
        )
    }
};

export default Navs