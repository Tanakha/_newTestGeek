import Icon from '@/components/Icon'
import { RootState } from '@/types/store'
import { getToken } from '@/utils/token'
import { NavBar, Input } from 'antd-mobile'
import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { io, Socket } from 'socket.io-client'
import styles from './index.module.scss'

type Message = {
  type:'Robot' | 'user',
  text:string
}

const Chat = () => {
  const history = useHistory()
  const { photo } = useSelector((state:RootState)=>state.profile.user)
  const [message, setMessage] = useState<Message[]>([
    {type:'Robot',text:'你好，你好'},
    {type:'user',text:'吵吵机器人'}
  ])
  const clientRef = useRef<Socket | null>(null)
  const divRef = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState('')
  useEffect(() => {
    const client = io('http://toutiao.itheima.net',{
      transports:['websocket'],
      query:{
        token:getToken().token
      }
    })
    clientRef.current = client
    client.on('connect',()=>{console.log('连接建立成功')})
    client.on('disconnect',()=>{console.log('断开连接')})
    setTimeout(()=>{
      setMessage((preState)=>[
        ...preState,{
          type:'user',
          text:'我想吃冰淇淋'
        }
      ])
      client.emit('message',{
        msg:'我想吃冰淇淋',
        timestamp:Date.now()
      })
      client.on('message',(data)=>{
        setMessage((preState)=>[
          ...preState,{
            type:'Robot',
            text:data.msg
          }
        ])
      })
    },3000)
    return () => {
      client.close()
    }
  }, [])
  useEffect(() => {
    const div = divRef.current!
    div.scrollTop = div.offsetHeight - div.scrollTop
  }, [message])
  
  
  return (
    <div className={styles.root}>
      {/* 顶部导航栏 */}
      <NavBar className="fixed-header" onBack={() => history.go(-1)}>
        小智同学
      </NavBar>

      {/* 聊天记录列表 */}
      <div ref={divRef} className="chat-list">
        {/* 机器人的消息 */}
        {
          message.map((item,index)=>{
            if(item.type === 'Robot'){
              return(
                <div key={index} className="chat-item">
                <Icon name="iconbtn_xiaozhitongxue" />
                <div className="message">{item.text}</div>
              </div>
              )
            }else{
              return(
                <div key={index} className="chat-item user">
                <img src={photo} alt="" />
                <div className="message">{item.text}</div>
              </div>
              )
            }
          })
        }
      </div>

      {/* 底部消息输入框 */}
      <div className="input-footer">
        <Input onKeyUp={(e)=>{
          if(e.key === 'Enter' && value.trim()){
            setMessage((preState)=>[
              ...preState,{
                type:'user',
                text:value
              }
            ])
            clientRef.current?.emit('message',{
              msg:value,
              timestamp:Date.now()
            })
           setValue('')
          }
        }} value={value} onChange={(v)=>setValue(v)} className="no-border" placeholder="请描述您的问题" />
        <Icon name="iconbianji" />
      </div>
    </div>
  )
}

export default Chat
