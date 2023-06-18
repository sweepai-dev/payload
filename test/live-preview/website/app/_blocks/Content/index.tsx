import React from 'react'

import classes from './index.module.scss'
import { Page } from '../../payload-types'
import { RichText } from '../../_components/RichText'

export type ContentBlock = Extract<Page['layout'], { blockType: 'content' }>

const Content: React.FC<ContentBlock & {
  attributes: React.HTMLAttributes<HTMLDivElement>
}> = ({ className, richText, attributes = {}}) => {
  if (!richText) {
    return null
  }

  return (
    <div
      {...attributes}
      className={[classes.content, className].filter(Boolean).join(' ')}
    >
      <RichText content={richText} />
    </div>
  )
}

export default Content
