import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getPosts, getPost, getImage, toText } from '@/lib/wordpress';

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: 'Post not found' };

  return {
    title: `${toText(post.title.rendered)} | Travel Blog`,
    description: toText(post.excerpt.rendered).slice(0, 160),
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const image = getImage(post, 'large');
  const date = new Date(post.date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <main className="container post">
      <p className="post__date">{date}</p>
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      {image && <img src={image.src} alt={image.alt} className="post__image" />}
      <div className="post__content" dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
      <p>
        <Link href="/">← Back to all posts</Link>
      </p>
    </main>
  );
}