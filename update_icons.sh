#!/bin/bash
ICON_PATH="assets/images/icon.png"

# Function to process icon
# args: density_folder launcher_size foreground_size
process_icon() {
  DENSITY=$1
  SIZE=$2
  FG_SIZE=$3
  DEST="android/app/src/main/res/$DENSITY"
  
  echo "Processing $DENSITY..."
  # Ensure dir exists
  mkdir -p $DEST
  
  # ic_launcher
  sips -z $SIZE $SIZE $ICON_PATH --out temp_launcher.png > /dev/null
  cwebp -q 100 temp_launcher.png -o "$DEST/ic_launcher.webp" -quiet
  
  # ic_launcher_round (use same, let OS mask)
  cwebp -q 100 temp_launcher.png -o "$DEST/ic_launcher_round.webp" -quiet
  
  # ic_launcher_foreground
  # Maintain scale for adaptive icon (108dp viewport)
  sips -z $FG_SIZE $FG_SIZE $ICON_PATH --out temp_fg.png > /dev/null
  cwebp -q 100 temp_fg.png -o "$DEST/ic_launcher_foreground.webp" -quiet
}

# Densities and sizes (launcher_px, foreground_px)
# mdpi: 48, 108
process_icon "mipmap-mdpi" 48 108
# hdpi: 72, 162
process_icon "mipmap-hdpi" 72 162
# xhdpi: 96, 216
process_icon "mipmap-xhdpi" 96 216
# xxhdpi: 144, 324
process_icon "mipmap-xxhdpi" 144 324
# xxxhdpi: 192, 432
process_icon "mipmap-xxxhdpi" 192 432

rm temp_launcher.png temp_fg.png
echo "Done updating Android icons."
