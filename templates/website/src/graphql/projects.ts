import { ARCHIVE_BLOCK, CALL_TO_ACTION, CONTENT, MEDIA_BLOCK } from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PROJECTS = `
  query Projects($publishedOn: DateTime) {
    Projects(where: { publishedOn: { less_than_equal: $publishedOn} }, limit: 300 sort: "-publishedOn") {
      docs {
        id
        title
        image ${MEDIA}
        meta ${META}
        createdAt
        author {
          name
        }
        publishedDate
        slug
      }
    }
  }
`

export const PROJECT_SLUGS = `
  query Projects {
    Projects(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PROJECT = `
  query Project($slug: String ) {
    Projects(where: { AND: [{ slug: { equals: $slug }}] }) {
      docs {
        id
        title
        hero {
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          ${MEDIA}
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
        ${META}
      }
    }
  }
`
