<h1 align="center">CHANGELOG</h1>

## [0.2](https://github.com/mellobacon/Termello/releases/tag/0.2)
***Change to versioning. Now versioning with numbers only hence skipping beta naming***
- New Features
  - Added lots of new Unix commands (type <code>help</code> for the list of commands)
  - Syntax highlighting. The terminal now has colors instead of plain white.
  - Terminal Customization
    - Themes! Currently there are 6 themes to choose from.
  - Copy and paste.
- Bug fixes
  - Backspace works properly
  
**Current bugs**
- The <code>cp</code> command currently doesnt work properly. As a result its been disabled temporarily.
- Attempting to execute a process that requires input (ie powershell, windows cmd, node, etc) does work but does not show in the terminal. This causes it to hang indefinately. *Its advised to try to not run those until a fix is found*. *Note: Running <code>npm install</code>, <code>node --version</code> or other commands like those will work but only the result will show in the terminal as of this release*
- When you open the settings window, choose a theme, close it, and open it again, the selector will be back at "default". Themes still work as normal.

## [0.1.1a](https://github.com/mellobacon/Termello/releases/tag/0.1.1a)
- Fixed bugs
  - Commands will no longer not be accepted if there is a new line before the command. They should now work no matter what.
  - *Backspace bug still persists. Working on a fix.*
- Other non signifigant fixes
  - Changed loading icon and exe icon

## [0.1.0a](https://github.com/mellobacon/Termello/releases/tag/0.1.0a)
- Initial release
