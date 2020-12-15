const path = require('path')

module.exports = {
  "packagerConfig": {
    "icon": path.join(__dirname, "Icons", "Terminal.ico"),
    //"platform": "linux" // Choices are 'darwin', 'mas', 'win32' or 'linux'
    //"arch": "arm64" // Choices are ia32, x64, armv7l, arm64
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "setupIcon": path.join(__dirname, "Icons", "Terminal.ico"),
        "iconURL": "https://raw.githubusercontent.com/mellobacon/Termello/master/Icons/Terminal.ico",
        "name": "Termello",
        "authors": "Mellobacon",
        "description": "A terminal emulator made with Electron"
      }
    },
    {
      "name": "@electron-forge/maker-zip",
      "platforms": [
        "darwin",
        "linux"
      ]
    },
    {
      "name": "@electron-forge/maker-deb",
      "config": {}
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
}