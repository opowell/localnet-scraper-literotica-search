import { afterEach, describe, expect, it } from 'vitest'
import { parserLoader, resetPage, visit } from '#scraper-test'

// The parser, evaluated with the helpers it is injected with, as a scrape runs it.
const load = parserLoader(__dirname)

afterEach(resetPage)

describe('sites\' own searches', () => {
  const one = { url: 'https://one.example/', title: 'One', score: 1 }

  it('reads a Literotica search from its schema.org list of works', () => {
    visit('https://search.literotica.com/?query=castle', `
      <div typeof="ItemList">
        <div property="itemListElement" resource="https://one.example/"><a href="https://one.example/"><h4>One</h4></a></div>
      </div>`)
    expect(load('literotica-search.js', ['parseLiteroticaSearch']).parseLiteroticaSearch()).toEqual({ listing: true, content: [], links: [one] })
  })
})
