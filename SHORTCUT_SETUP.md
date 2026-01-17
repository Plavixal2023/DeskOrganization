# Desktop Shortcut Setup Instructions

This folder contains files to help you create a desktop shortcut for the Desktop Organizer.

## Files Included

- **icon.svg** - Application icon (scalable vector graphic)
- **DesktopOrganizer.desktop** - Linux desktop shortcut file
- **DesktopOrganizer.bat** - Windows batch launcher
- **DesktopOrganizer.sh** - Linux/Mac shell launcher

## Setup Instructions

### For Linux Users

1. **Download** all files from this repository to a permanent location (e.g., `~/Applications/DeskOrganization/`)

2. **Edit the .desktop file** to point to the correct paths:
   - Open `DesktopOrganizer.desktop` in a text editor
   - Replace `%d` with the full path to where you saved the files
   - Example: If saved in `/home/username/Applications/DeskOrganization/`
     ```
     Exec=python3 /home/username/Applications/DeskOrganization/desk_organizer.py
     Icon=/home/username/Applications/DeskOrganization/icon.svg
     ```

3. **Copy to Desktop**:
   ```bash
   cp DesktopOrganizer.desktop ~/Desktop/
   chmod +x ~/Desktop/DesktopOrganizer.desktop
   ```

4. **Alternative - Using the Shell Launcher**:
   - Simply copy `DesktopOrganizer.sh` to your desktop
   - Make it executable: `chmod +x ~/Desktop/DesktopOrganizer.sh`
   - Double-click to run the interactive menu

### For Windows Users

1. **Download** all files from this repository to a permanent location (e.g., `C:\Program Files\DeskOrganization\`)

2. **Create a Shortcut**:
   - Right-click on `DesktopOrganizer.bat`
   - Select "Create shortcut"
   - Move the shortcut to your Desktop

3. **Optional - Change Icon**:
   - Right-click the shortcut → Properties
   - Click "Change Icon"
   - Browse to `icon.svg` (Windows 10+ supports SVG)
   - Or use any .ico file you prefer

4. **Alternative - Direct Command Shortcut**:
   - Create a new shortcut on your desktop
   - Target: `python C:\path\to\DeskOrganization\desk_organizer.py`
   - Start in: `C:\path\to\DeskOrganization\`
   - Set the icon to `icon.svg`

### For macOS Users

1. **Download** all files to a permanent location (e.g., `~/Applications/DeskOrganization/`)

2. **Create an Application** using Automator:
   - Open Automator
   - Create new "Application"
   - Add "Run Shell Script" action
   - Paste this script (update the path):
     ```bash
     cd ~/Applications/DeskOrganization/
     python3 desk_organizer.py
     ```
   - Save as "Desktop Organizer.app" to Desktop

3. **Set Custom Icon** (optional):
   - Get Info on the .app file (Cmd+I)
   - Drag `icon.svg` onto the small icon in the top-left of the Get Info window

## Quick Start

Once you have the shortcut on your desktop:

- **Double-click** to run the organizer
- It will organize your Desktop by default
- Or use the interactive menu (bat/sh launchers) to choose options

## Command Line Usage

You can also run directly from the command line:

```bash
# Preview what would be organized
python3 desk_organizer.py --dry-run

# Organize Desktop
python3 desk_organizer.py

# Organize a specific folder
python3 desk_organizer.py --path /path/to/folder
```

## Troubleshooting

### "Python not found"
- Make sure Python 3 is installed on your system
- On Windows, you may need to use `python` instead of `python3`
- Add Python to your system PATH

### "Permission denied" (Linux/Mac)
- Make the script executable: `chmod +x DesktopOrganizer.sh`
- For .desktop files: `chmod +x DesktopOrganizer.desktop`

### Icon not showing
- Use absolute paths in the .desktop file
- Windows: Convert SVG to ICO format if needed
- macOS: Use Get Info method to set icon

## Need Help?

Refer to the main README.md for more information about how the Desktop Organizer works.
