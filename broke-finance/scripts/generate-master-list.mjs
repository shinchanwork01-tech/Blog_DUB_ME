import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'src/posts');
const filenames = fs.readdirSync(postsDir);

const posts = filenames.map(filename => {
  const filePath = path.join(postsDir, filename);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContents);
  
  // 1. Get the filename without the .md extension
  const fileBase = filename.replace(/\.md$/, '');

  return {
    slug: data['post-id'] || fileBase,
    // 2. Save this base name instead of the full original filename
    filebase: fileBase, 
    ...data,
  };
});

posts.reverse();

fs.writeFileSync(
  path.join(process.cwd(), 'src/master-list.json'),
  JSON.stringify(posts, null, 2)
);

console.log('✅ Master list generated successfully!');