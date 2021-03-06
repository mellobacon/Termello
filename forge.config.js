const path = require('path')

module.exports = {
  "packagerConfig": {
    "icon": "./src/Icons/Terminal.ico",
    //"platform": "linux" // Choices are 'darwin', 'mas', 'win32' or 'linux'
    //"arch": "arm64" // Choices are ia32, x64, armv7l, arm64
  },
  "makers": [
    {
      "name": "@electron-forge/maker-squirrel",
      "config": {
        "setupIcon": "./src/Icons/Terminal.ico",
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
      "platforms": [
        "darwin",
        "linux"
      ],
      "config": {
        "options": {
          "name": "Termello",
          "iconURL": "https://raw.githubusercontent.com/mellobacon/Termello/master/Icons/Terminal.ico",
        }
      }
    },
    {
      "name": "@electron-forge/maker-rpm",
      "config": {}
    }
  ]
}