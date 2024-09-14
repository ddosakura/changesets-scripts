import { describe, expect, it } from 'vitest'
import commit from './commit'

describe('commit', () => {
  it('getAddMessage', async () => {
    expect(await commit.getAddMessage({
      summary: 'summary',
      releases: [
        { name: '@ddosakura/changesets', type: 'patch' },
      ],
    }, {
      prefix: '@ddosakura/',
    })).toBe('fix(changesets): summary')
  })

  it('getAddMessage multi', async () => {
    expect(await commit.getAddMessage({
      summary: 'summary',
      releases: [
        { name: '@ddosakura/changesets', type: 'patch' },
        { name: '@ddosakura/eslint-config', type: 'minor' },
      ],
    }, {
      prefix: '@ddosakura/',
    })).toBe('feat: summary')
  })
})
