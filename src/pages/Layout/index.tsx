import AuthRoute from '@/components/AuthRoute'
import Icon from '@/components/Icon'
import { TabBar } from 'antd-mobile'
import React from 'react'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Home from '../Home'
import Profile from '../Profile'
import Question from '../Question'
import Video from '../Video'
import styles from './index.module.scss'


// 标签页数据
const tabs = [
  { path: '/home', icon: 'iconbtn_home', text: '首页' },
  { path: '/home/question', icon: 'iconbtn_qa', text: '问答' },
  { path: '/home/video', icon: 'iconbtn_video', text: '视频' },
  { path: '/home/profile', icon: 'iconbtn_mine', text: '我的' },
]

export default function Layout() {
  const location = useLocation()
  const history = useHistory()
  return (
    <div className={styles.root}>
      <Switch>
        <Route exact path="/home" component={Home}/>
        <AuthRoute path="/home/Profile" component={Profile}/>
        <Route path="/home/question" component={Question}/>
        <Route path="/home/video" component={Video}/>
      </Switch>
      <TabBar className='tab-bar' activeKey={location.pathname} 
        onChange={(key)=>{history.push(key)}}>
        {
          tabs.map(item=>{
            return(
              <TabBar.Item
                key={item.path}
                title={item.text}
                icon={(active)=><Icon name={active ? item.icon + '_sel' : item.icon}/>}
              ></TabBar.Item>
            )
          })
        }
      </TabBar>
    </div>
  )
}
