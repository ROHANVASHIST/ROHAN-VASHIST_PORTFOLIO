export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
}

export function getBlogPosts(): BlogPost[] {
  const stored = localStorage.getItem('rohan_blog_posts');
  if (!stored) {
    return [];
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    console.error('Error parsing blog posts', e);
    return [];
  }
}

export function saveBlogPosts(posts: BlogPost[]) {
  localStorage.setItem('rohan_blog_posts', JSON.stringify(posts));
}

export function addBlogPost(post: Omit<BlogPost, 'id' | 'date'>): BlogPost {
  const posts = getBlogPosts();
  const formattedDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: '2-digit',
    year: 'numeric'
  });
  
  const id = post.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
    
  // Check collision
  const exists = posts.some(p => p.id === id);
  const uniqueId = exists ? `${id}-${Math.floor(Math.random() * 1000)}` : id;

  const newPost: BlogPost = {
    ...post,
    id: uniqueId,
    date: formattedDate
  };

  posts.unshift(newPost); // Add at the start
  saveBlogPosts(posts);
  return newPost;
}
