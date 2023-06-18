'use client'

import React, { Fragment } from 'react'
import Content from '../../_blocks/Content'
import { BlockSpacing } from '../BlockSpacing'
import { Page } from '../../payload-types'
import { MediaBlock } from '../../_blocks/MediaBlock'
import classes from './index.module.scss'

const blockComponents = {
  content: Content,
  media: MediaBlock
}

type Props = {
  blocks: Page['layout']
}

export const Blocks: React.FC<Props> = props => {
  const { blocks } = props
  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <BlockSpacing
                  key={index}
                  top={index !== 0}
                  bottom={index !== blocks.length - 1}
                  attributes={{
                    'data-vercel-edit-target': ''
                  }}
                >
                  <span className={classes.sourceMap}>
                    {/* @ts-expect-error */}
                    {block?.encodedSourceMap}
                  </span>
                  {/* @ts-expect-error */}
                  <Block {...block} />
                </BlockSpacing>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
