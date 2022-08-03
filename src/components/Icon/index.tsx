import React from 'react'
import classnames from 'classnames'
type IconPropType = {
  name:string,
  className?:string,
  onClick?:()=>void
}

export default function Icon(props:IconPropType) {
  const { name,className,onClick } = props
  return (
    <svg className={classnames('icon',className)}
      onClick={onClick}
      aria-hidden>
        <use xlinkHref={`#${name}`}/>
    </svg>
  )
}
