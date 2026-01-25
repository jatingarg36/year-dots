from PIL import Image, ImageDraw

def simple_flood_fill(image, seed_point, target_color, tolerance=30):
    # Basic BFS flood fill to replace white-ish background with target_color
    width, height = image.size
    pixels = image.load()
    
    start_color = pixels[seed_point]
    
    # If start color is already close to target, or not white-ish, skip
    # (Checking if it's bright)
    r, g, b = start_color[:3]
    if r < 200 or g < 200 or b < 200:
        print(f"Corner {seed_point} is dark ({start_color}), skipping.")
        return image
        
    print(f"Filling from {seed_point} (color: {start_color})...")
    
    # Target is #0A0A0A -> (10, 10, 10)
    fill_color = (10, 10, 10, 255)
    
    stack = [seed_point]
    visited = set([seed_point])
    
    while stack:
        x, y = stack.pop()
        pixels[x, y] = fill_color
        
        for dx, dy in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
            nx, ny = x + dx, y + dy
            if 0 <= nx < width and 0 <= ny < height:
                if (nx, ny) not in visited:
                    curr_r, curr_g, curr_b = pixels[nx, ny][:3]
                    # Check distance to start_color (white-ish)
                    # We accept strictly pixels that are "close enough to white"
                    # Using a simple threshold for now: > 200 brightness
                    if curr_r > 200 and curr_g > 200 and curr_b > 200:
                        visited.add((nx, ny))
                        stack.append((nx, ny))
    return image

img_path = 'assets/images/icon.png'
img = Image.open(img_path).convert('RGBA')

# Fill from all 4 corners
fill_coords = [
    (0, 0),
    (img.width - 1, 0),
    (0, img.height - 1),
    (img.width - 1, img.height - 1)
]

for coord in fill_coords:
    simple_flood_fill(img, coord, (10, 10, 10))

img.save(img_path)
print("Processed icon.")
