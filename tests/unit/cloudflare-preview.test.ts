import { describe, expect, it } from 'vitest';
import {
  parsePreviewComment,
  slackEscape,
  slackMessage,
} from '../../.github/scripts/cloudflare-preview.mjs';

// Trimmed copy of the comment the Cloudflare bot posted on PR #25.
const row = (commit: string, build: string, deploy: string) => `
    <tr>
      <td><ul><li><b>Build:</b> ${build}</li><li><b>Deployment:</b> ${deploy}</li></ul><br/>
        <a href="https://dash.cloudflare.com/">View logs ↗</a></td>
      <td><a href="https://0809c74d.preview.flyerscycling.org">https://0809c74d.preview.flyerscycling.org</a></td>
      <td>${commit}</td>
      <td>2026-11-27T22:20:13.077Z</td>
      <td><a href="https://dash.cloudflare.com/">Visit the dashboard ↗</a></td>
    </tr>`;

const comment = (commit: string, rows: string) => `## 🚀 Deploying Preview to Cloudflare 🚀
<!-- Preview URL -->
### Preview URL: https://claude-project-thread-o4u2y2.preview.flyerscycling.org, https://claude-project-thread-o4u2y2-flyers-cycling-club-website.flyers-cycling.workers.dev (commit ${commit})
###### This URL reflects your latest Preview deployment

<!-- Preview Deployments -->
### Preview Deployments by commit

<table>
  <thead>
    <tr>
      <th align="left">Status</th>
      <th align="left">Deployment URL</th>
      <th align="left">Commit</th>
    </tr>
  </thead>
  <tbody>${rows}
  </tbody>
</table>
`;

describe('parsePreviewComment', () => {
  it('is ready when the latest commit built and deployed', () => {
    const body = comment('0eefc6c', row('0eefc6c', 'Success ✅', 'Success ✅'));
    expect(parsePreviewComment(body)).toEqual({
      ready: true,
      url: 'https://claude-project-thread-o4u2y2.preview.flyerscycling.org',
      commit: '0eefc6c',
    });
  });

  it('waits while the latest commit is still deploying', () => {
    const body = comment(
      'abc1234',
      row('abc1234', 'Success ✅', 'In progress 🔄') + row('0eefc6c', 'Success ✅', 'Success ✅'),
    );
    expect(parsePreviewComment(body).ready).toBe(false);
  });

  it('waits while a newer push builds, even though the old preview is still live', () => {
    // Shape seen on PR #26: the Preview URL line keeps the old commit while
    // the new commit's row (first) is still building.
    const building = row('639459c', 'In progress 🔵', '').replace(
      /<li><b>Deployment:<\/b> <\/li>/,
      '',
    );
    const body = comment('5b988d2', building + row('5b988d2', 'Success ✅', 'Success ✅'));
    expect(parsePreviewComment(body).ready).toBe(false);
  });

  it('is not ready when the build failed', () => {
    const body = comment('abc1234', row('abc1234', 'Failed ❌', 'Skipped'));
    expect(parsePreviewComment(body).ready).toBe(false);
  });

  it('ignores comments without a preview URL', () => {
    expect(parsePreviewComment('Looks good to me!')).toEqual({ ready: false });
  });
});

describe('slackMessage', () => {
  it('links the preview and the PR, escaping the title', () => {
    const msg = slackMessage({
      url: 'https://x.preview.flyerscycling.org',
      number: 25,
      title: 'Fix <Safari> & export',
      prUrl: 'https://github.com/Flyers-Cycling/Flyers-Cycling-Club-Website/pull/25',
      author: 'runningrandall',
    });
    expect(msg.text).toContain('https://x.preview.flyerscycling.org');
    expect(msg.blocks[0].text.text).toContain('Fix &lt;Safari&gt; &amp; export');
    expect(msg.blocks[0].text.text).toContain('|PR #25>');
  });

  it('escapes only Slack control characters', () => {
    expect(slackEscape('Jr. Flyers: K-6')).toBe('Jr. Flyers: K-6');
  });
});
