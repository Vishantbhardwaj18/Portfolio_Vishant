from PIL import Image
path = 'c:/Users/Vishant Bhardwaj/Downloads/vishant-bhardwaj-portfolio (11)/src/images/my-photo2.png'
img = Image.open(path)
print(img.format, img.size, img.mode)
w, h = img.size
coords = [(0,0), (w-1,0), (0,h-1), (w-1,h-1), (w//2,h//2), (w//4,h//4), (3*w//4,h//4), (w//4,3*h//4), (3*w//4,3*h//4)]
for c in coords:
    print(c, img.getpixel(c))
img.close()
