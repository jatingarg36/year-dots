#!/bin/bash
SPLASH_PATH="assets/images/splash-icon.png"

# Function to update splash
process_splash() {
  DENSITY=$1
  SIZE=$2
  DEST="android/app/src/main/res/$DENSITY"
  
  echo "Processing splash for $DENSITY ($SIZE px)..."
  mkdir -p $DEST
  sips -z $SIZE $SIZE $SPLASH_PATH --out "$DEST/splashscreen_logo.png" > /dev/null
}

# mdpi: 288
process_splash "drawable-mdpi" 288
# hdpi: 432
process_splash "drawable-hdpi" 432
# xhdpi: 576
process_splash "drawable-xhdpi" 576
# xxhdpi: 864
process_splash "drawable-xxhdpi" 864
# xxxhdpi: 1152
process_splash "drawable-xxxhdpi" 1152

echo "Done updating Android splash screens."
