import Link from 'next/link';
import { getPosts, getImage, toText } from '@/lib/wordpress';

export default async function HomePage() {
  const posts = await getPosts();

  return (
    <main className="container">
      <h1 className="page-title">Latest travel tips</h1>
      <div className="post-grid">
        {posts.map((post) => {
          const image = getImage(post);
          const href = `/posts/${post.slug}`;

          return (
            <article key={post.id} className="post-card">
              {image && <img src={image.src} alt={image.alt} className="post-card__image" />}
              <div className="post-card__body">
                <h2>
                  <Link href={href}>
                    <span dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                  </Link>
                </h2>
                <div
                  className="post-card__excerpt"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <Link
                  href={href}
                  className="read-more"
                  aria-label={`Read more: ${toText(post.title.rendered)}`}
                >
                  Read more →
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </main>
  );
}