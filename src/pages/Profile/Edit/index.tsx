import { useInitState } from '@/hook/useInitState'
import { patchProfileActionCreator, profileActionCreator } from '@/store/actions/profile'
import { Button, List, DatePicker, NavBar, Popup, Toast } from 'antd-mobile'
import classNames from 'classnames'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import EditInput from '../EditInput'
import EditList from '../EditList'
import styles from './index.module.scss'
const Item = List.Item

interface Pop1upType {
  visible:boolean,
  type:'' | 'name' | 'intro'
}
interface Pop2upType {
  visible:boolean,
  type:'' | 'photo' | 'gender'
}

const ProfileEdit = () => {
  const { profile } = useInitState(profileActionCreator).profile
  const history = useHistory()
  const dispatch = useDispatch()
  const [pop1up, setPop1up] = useState<Pop1upType>({
    visible:false,
    type:''
  })
  const [pop2up, setPop2up] = useState<Pop2upType>({
    visible:false,
    type:''
  })
  return (
    <div className={styles.root}>
      <div className="content">
        {/* 标题 */}
        <NavBar
          onBack={()=>history.go(-1)}
          style={{
            '--border-bottom': '1px solid #F0F0F0'
          }}
        >
          个人信息
        </NavBar>

        <div className="wrapper">
          {/* 列表 */}
          <List className="profile-list">
            {/* 列表项 */}
            <Item
             onClick={()=>setPop2up({
              type:'photo',
              visible:true
            })}
              extra={
                <span className="avatar-wrapper">
                  <img
                    width={24}
                    height={24}
                    src={profile.photo}
                    alt=""
                  />
                </span>
              }
              arrow
            >
              头像
            </Item>
            <Item 
              onClick={()=>{
                setPop1up({
                  type:'name',
                  visible:true
                })
              }}
            arrow extra={profile.name}>
              昵称
            </Item>
            <Item
              arrow
              extra={
                <span className={classNames('intro', 'normal')}>
                  {profile.intro ? profile.intro :'未填写'}
                </span>
              }
              onClick={()=>{
                setPop1up({
                  type:'intro',
                  visible:true
                })
              }}
            >
              简介
            </Item>
          </List>

          <List className="profile-list">
            <Item 
              onClick={()=>setPop2up({
                type:'gender',
                visible:true
              })}
            arrow extra={profile.gender === 1 ? '男' : '女'}>
              性别
            </Item>
            <Item arrow extra={'1999-9-9'}>
              生日
            </Item>
          </List>

          <DatePicker
            visible={false}
            value={new Date()}
            title="选择年月日"
            min={new Date(1900, 0, 1, 0, 0, 0)}
            max={new Date()}
          />
        </div>

        <div className="logout">
          <Button className="btn">退出登录</Button>
        </div>
      </div>
      <Popup destroyOnClose   bodyStyle={{ height: '100%' }} visible={pop1up.visible} position="right">
        <EditInput 
        type={pop1up.type}
        onUpdate={async(type:string,value:string)=>{
         await dispatch(patchProfileActionCreator({
          [type]:value
         }))
         Toast.show('修改成功')
         setPop1up({type:'',visible:false})
        }
        }
        close={()=>{
          setPop1up({
            type:'',
            visible:false
          })
        }}/>
      </Popup>
      <Popup destroyOnClose position='bottom' visible={pop2up.visible}>
        <EditList type={pop2up.type} onClose={()=>setPop2up({
          type:'',
          visible:false
        })}/>
      </Popup>
    </div>
  )
}

export default ProfileEdit
