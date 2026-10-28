const WP_API = 'https://premiumcircle.shop/blocks/wp-json/wp/v2';

export async function getPosts() {
  const res = await fetch(`${WP_API}/posts?_embed&per_page=12`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error('Could not load posts from WordPress');
  return res.json();
}

export async function getPost(slug) {
  const res = await fetch(
    `${WP_API}/posts?slug=${encodeURIComponent(slug)}&_embed`,
    { next: { revalidate: 60 } }
  );
  if (!res.ok) return null;
  const posts = await res.json();
  return posts[0] || null;
}

export function getImage(post, size = 'medium_large') {
  const media = post._embedded?.['wp:featuredmedia']?.[0];
  if (!media?.source_url) return null;
  return {
    src: media.media_details?.sizes?.[size]?.source_url || media.source_url,
    alt: media.alt_text || '',
  };
}

export function toText(html) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(code))
    .replace(/&hellip;/g, '…')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .trim();
}