from PIL import Image, ImageDraw

# Create image
img = Image.new('RGBA', (88, 32), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Purple color
purple = (155, 138, 196, 255)  # #9B8AC4
purple_light1 = (155, 138, 196, 179)  # 70% opacity
purple_light2 = (155, 138, 196, 128)  # 50% opacity

# Draw circle
draw.ellipse([0, 8, 16, 24], fill=purple)

# Draw first triangle
triangle1 = [(28, 4), (52, 16), (28, 28)]
draw.polygon(triangle1, fill=purple_light1)

# Draw second triangle
triangle2 = [(52, 4), (76, 16), (52, 28)]
draw.polygon(triangle2, fill=purple_light2)

# Save
img.save('arrow_nav.png')
print("Arrow image created successfully")
