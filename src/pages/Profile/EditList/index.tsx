import styles from './index.module.scss'

type EditProps = {
  onClose:()=>void,
  onUpdate:(type:string,value:number)=>void
  type:'' | 'photo' | 'gender'
}

const genderList = [
  {title:'男',value:1},
  {title:'女',value:0}
]

const photoList = [
  {title:'拍照',value:-1},
  {title:'本地选择',value:-1},
]

const EditList = ({onClose,type,onUpdate}:EditProps) => {
  const listItems = type === 'gender' ? genderList : photoList 
  return (
    <div className={styles.root}>
        {listItems.map(item=><div onClick={()=>onUpdate(type,item.value)}  key={item.title} className="list-item">{item.title}</div>)}
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList
