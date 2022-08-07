import { RootState } from '@/types/store'
import { Input, NavBar, TextArea } from 'antd-mobile'
import { InputRef } from 'antd-mobile/es/components/input'
import { TextAreaRef } from 'antd-mobile/es/components/text-area'
import { useRef,useEffect,useState } from 'react'
import { useSelector } from 'react-redux'

import styles from './index.module.scss'

type EditProp = {
  close:()=>void,
  type:'' | 'name' | 'intro',
  onUpdate:(type:string,value:string) => void
}
const EditInput = ({close,type,onUpdate}:EditProp) => {
  const iptRef = useRef<InputRef>(null)
  const textRef = useRef<TextAreaRef>(null)
  const { profile } = useSelector((state:RootState)=>state.profile)
  const [value, setValue] = useState(()=>type === 'name' ? profile.name : profile.intro)
  useEffect(() => {
    iptRef.current?.focus()
    textRef.current?.focus()
  }, [])
  
  return (
    <div className={styles.root}>
      <NavBar
        onBack={()=>close()}
        className="navbar"
        right={<span onClick={()=>onUpdate?.(type,value)} className="commit-btn">提交</span>}
      >
        编辑{type === 'name' ? '昵称' : '简介'}
      </NavBar>

      <div className="edit-input-content">
        <h3>{type === 'name' ? '昵称' : '简介'}</h3>

        <div className="input-wrap">
          {
            type === 'name' ? <Input
              value={value}
              onChange={(e)=>setValue(e)}
              ref={iptRef} placeholder="请输入" /> : (
              <TextArea
                value={value}
                onChange={(e)=>setValue(e)}
                ref={textRef}
                className="textarea"
                placeholder="请输入简介"
                showCount
                maxLength={99}
              />
            )
          }
        </div>
      </div>
    </div>
  )
}

export default EditInput
