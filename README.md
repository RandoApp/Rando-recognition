Rando-recognition
===========

Project for recognition nude content, black or boring photos and so on...

Run tests:

```
npm test
firefox report.html
```

If you add new image to assets folder, run:

```
npm run update-assets
```


About `assets.zip.gpg` file:
- This file contains images that we use in tests and neural network training
- This file is encyptyed, because contains nude content that cannot be public
