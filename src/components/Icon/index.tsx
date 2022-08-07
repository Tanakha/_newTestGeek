import classNames from 'classnames'
import React from 'react'

// 组件自己的props类型
interface IconPropsType {
  name: string
  className?: string
  onClick?: () => void
}

export default function Icon({ className, onClick, name }: IconPropsType) {
  return (
    <svg
      className={classNames('icon', className)}
      onClick={onClick}
      aria-hidden="true"
    >
      <use xlinkHref={`#${name}`}></use>
    </svg>
  )
}
