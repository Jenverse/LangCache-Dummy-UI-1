# Images Directory

## Adding Your Hero Image

To add your hero image to the landing page:

1. **Save your image** in this directory (`public/images/`)
   - Recommended name: `langcache-hero.png` or `langcache-hero.jpg`
   - Recommended size: 800x600px or similar aspect ratio

2. **Update the landing page** (`components/langcache-landing.tsx`)
   - Find the "Hero Image Placeholder" section (around line 70)
   - Replace the placeholder div with:
   ```jsx
   <img 
     src="/images/your-image-name.png" 
     alt="Redis LangCache Dashboard"
     className="w-full h-auto rounded-lg shadow-xl"
   />
   ```

3. **Optional: Add more images**
   - You can add additional images for other sections
   - Use the same pattern: save in `/public/images/` and reference with `/images/filename`

## Current Structure
```
public/
  images/
    README.md (this file)
    [your images will go here]
```
