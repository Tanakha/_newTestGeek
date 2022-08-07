import styles from './index.module.scss'

type EditProps = {
  onClose:()=>void,
  type:'' | 'photo' | 'gender'
}

const genderList = [
  {title:'男',value:1},
  {title:'女',value:0}
]

const photoList = [
  {title:'拍照',value:''},
  {title:'本地选择',value:''},
]

const EditList = ({onClose,type}:EditProps) => {
  const listItems = type === 'gender' ? genderList : photoList 
  return (
    <div className={styles.root}>
        {listItems.map(item=><div key={item.title} className="list-item">{item.title}</div>)}
      <div className="list-item" onClick={onClose}>取消</div>
    </div>
  )
}

export default EditList
