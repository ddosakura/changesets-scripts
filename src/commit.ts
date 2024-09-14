import type { Changeset, CommitFunctions, ReleasePlan } from '@changesets/types'
import outdent from 'outdent'

type SkipCI = boolean | 'add' | 'version'

const defaultCommitFunctions = {
  async getAddMessage(
    changeset: Changeset,
    options: { skipCI?: SkipCI, prefix?: string } | null,
  ) {
    const rawType = changeset.releases.find(r => r.type === 'major' || r.type === 'minor') ? 'feat' : 'fix'
    const cType = changeset.releases.length === 1 ? `${rawType}(${changeset.releases[0].name.replace(options?.prefix ?? '', '')})` : rawType
    const skipCI = options?.skipCI === 'add' || options?.skipCI === true
    return `${cType}: ${changeset.summary}${
      skipCI ? `\n\n[skip ci]\n` : ''
    }`
  },
  async getVersionMessage(
    releasePlan: ReleasePlan,
    options: { skipCI?: SkipCI } | null,
  ) {
    const skipCI = options?.skipCI === 'version' || options?.skipCI === true
    const publishableReleases = releasePlan.releases.filter(
      release => release.type !== 'none',
    )
    const numPackagesReleased = publishableReleases.length

    const releasesLines = publishableReleases
      .map(release => `  ${release.name}@${release.newVersion}`)
      .join('\n')

    return outdent`
      RELEASING: Releasing ${numPackagesReleased} package(s)
  
      Releases:
      ${releasesLines}
      ${skipCI ? `\n[skip ci]\n` : ''}
  `
  },
} satisfies Required<CommitFunctions>

export default defaultCommitFunctions
