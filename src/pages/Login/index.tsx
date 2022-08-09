import React,{useRef, useState,useEffect} from 'react'
import styles from './index.module.scss'
import { NavBar, Form, Input, List, Button, Toast } from 'antd-mobile'
import { useHistory,useLocation } from 'react-router'
import { loginForm } from '@/types/data'
import { codeActionCreator, loginActionCreator } from '@/store/actions/login'
import { useDispatch } from 'react-redux'
import { InputRef } from 'antd-mobile/es/components/input'

export default function Login() {
  const history = useHistory()
  const location = useLocation<{from:string}>()
  const dispatch = useDispatch()
  const onFinish = async(values:loginForm) => {
    console.log(location)
      await dispatch(loginActionCreator(values))
      Toast.show({
        content:'登录成功',
        duration:1000,
        afterClose:()=>{
          if(location.state){
            console.log(1)
            history.replace(location.state!.from)
          }else{
            console.log(2)
            history.push('/home')
          }
        }
      })
  }
  const [seconds, setSeconds] = useState(0)
  const [form] = Form.useForm()
  const iptRef = useRef<InputRef>(null)
  const timeId = useRef<number>(-1)
  const sendCode = async() => {
    if (seconds > 0 ) return
    const mobile = form.getFieldValue('mobile')
    const mobileError = form.getFieldError('mobile')

    if(mobileError.length > 0){
      return iptRef.current!.focus()
    }

    await dispatch(codeActionCreator(mobile))

    setSeconds(60)

    timeId.current = window.setInterval(()=>{
      setSeconds(s=>s-1)
    },1000)
  }
  useEffect(() => {
    if(seconds <= 0) clearInterval(timeId.current)
  }, [seconds])
  useEffect(() => {  
    return () => {
      clearInterval(timeId.current)
    }
  }, [])
  
  return (
    <div className={styles.root}>
      <NavBar onBack={() => history.go(-1)}></NavBar>

      <div className="login-form">
        <h2 className="title">账号登录</h2>

        <Form form={form} onFinish={onFinish}>
          <Form.Item className="login-item"
            name="mobile"
            validateTrigger={['onBlur','onChange']}
            rules={[
              {required:true,message:'手机号不能为空'},
              {pattern:/^1[3-9]\d{9}$/,message:'手机号格式错误'}
            ]}
          >
            <Input ref={iptRef} placeholder="请输入用户名"></Input>
          </Form.Item>
          
          <List.Item
            className="login-code-extra"
            extra={<span className="code-extra"
              onClick={sendCode}
            >{seconds === 0 ? '发送验证码' : `${seconds}后重新发送`}</span>}
          >
            <Form.Item className="login-item"
              name='code'
              validateTrigger={['onBlur','onChange']}
              rules={[
                {required:true,message:'验证码不能为空'},
                {pattern:/^\d{6}$/,message:'验证码格式错误'}
              ]}
            >
              <Input placeholder="请输入验证码"></Input>
            </Form.Item>
          </List.Item>
          
          <Form.Item>
            <Button type='submit' color="primary" className="login-submit" block>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  )
}