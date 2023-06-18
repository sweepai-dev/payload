import React from 'react'

import classes from './index.module.scss'

type Props = {
  top?: boolean
  bottom?: boolean
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  attributes?: React.HTMLAttributes<HTMLDivElement> & {
    'data-vercel-edit-target'?: string
  }
}

export const BlockSpacing: React.FC<Props> = ({
  top = true,
  bottom = true,
  className,
  children,
  style,
  attributes = {}
}) => {
  return (
    <div
      className={[className, top && classes.top, bottom && classes.bottom]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...attributes}
    >
      {children}
    </div>
  )
}
