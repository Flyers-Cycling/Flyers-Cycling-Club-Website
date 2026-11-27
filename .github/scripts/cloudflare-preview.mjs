// Reads the comment the Cloudflare Workers Builds bot posts on a pull request
// and decides whether a preview is ready to share in Slack.
// Used by .github/workflows/slack-preview.yml and tested in
// tests/unit/cloudflare-preview.test.ts.

export const CLOUDFLARE_BOT = 'cloudflare-workers-and-pages[bot]';

/**
 * @param {string} body The bot comment's Markdown/HTML body.
 * @returns {{ ready: boolean, url?: string, commit?: string }}
 *   `ready` is true only when the latest commit's build and deployment both
 *   succeeded. `url` is the branch preview link (the first one on the
 *   "Preview URL" line), which stays the same across pushes.
 */
export function parsePreviewComment(body) {
  const line = body.match(/Preview URL:\s*(.+)/);
  if (!line) return { ready: false };

  const url = line[1].match(/https:\/\/[^\s,()<>]+/)?.[0];
  const commit = line[1].match(/\(commit ([0-9a-f]{7,40})\)/)?.[1];
  if (!url || !commit) return { ready: false };

  // Each table row is one commit. Find the row for the latest commit and
  // check that both its build and deployment say Success.
  const row = body.split(/<tr>/).find((r) => r.includes(`<td>${commit}</td>`));
  const ready =
    !!row && /Build:<\/b>\s*Success/.test(row) && /Deployment:<\/b>\s*Success/.test(row);

  return { ready, url, commit };
}

/** Escapes text for Slack mrkdwn (only &, <, and > need it). */
export function slackEscape(text) {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/**
 * Builds the Slack incoming-webhook payload.
 * @param {{ url: string, number: number, title: string, prUrl: string, author: string }} p
 */
export function slackMessage({ url, number, title, prUrl, author }) {
  const text = `Preview ready for PR #${number}: ${title}\n${url}`;
  return {
    text,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text:
            `*Preview ready:* <${url}|${slackEscape(title)}>\n` +
            `<${prUrl}|PR #${number}> by ${slackEscape(author)}`,
        },
      },
    ],
  };
}
