# Desktop Organizer

An automatic Desktop organizer that helps you keep your desktop clean and organized by automatically sorting files into categorized folders based on their file types.

## Features

- 🗂️ Automatically categorizes files by type (Images, Documents, Videos, Audio, Archives, Code, Executables, etc.)
- 🔄 Supports dry-run mode to preview changes before applying them
- 🎯 Customizable directory path (not limited to Desktop)
- 📊 Provides detailed statistics after organization
- ⚡ Fast and efficient - uses Python's standard library only
- 🛡️ Safe - handles file name conflicts automatically

## Installation

No external dependencies required! Just Python 3.6+

```bash
# Clone the repository
git clone https://github.com/Plavixal2023/DeskOrganization.git
cd DeskOrganization

# Make the script executable (optional, Unix/Linux/Mac)
chmod +x desk_organizer.py
```

### Desktop Shortcut

Want a desktop shortcut to easily run the organizer? 

📁 **See [SHORTCUT_SETUP.md](SHORTCUT_SETUP.md)** for instructions on creating a desktop launcher for:
- **Linux** - `.desktop` file and shell launcher
- **Windows** - Batch file launcher  
- **macOS** - Shell launcher and Automator app

The repository includes `DesktopOrganizer.desktop`, `DesktopOrganizer.bat`, `DesktopOrganizer.sh`, and an icon file (`icon.svg`) that you can download and use.

## Usage

### Basic Usage

Organize your Desktop (default behavior):
```bash
python desk_organizer.py
```

### Dry Run (Preview Changes)

See what would be organized without making any changes:
```bash
python desk_organizer.py --dry-run
```

### Organize Custom Directory

Organize files in a specific folder:
```bash
python desk_organizer.py --path /path/to/your/folder
```

### Help

View all available options:
```bash
python desk_organizer.py --help
```

## File Categories

The organizer automatically categorizes files into the following folders:

- **Images**: `.jpg`, `.jpeg`, `.png`, `.gif`, `.bmp`, `.svg`, `.ico`, `.webp`, `.tiff`
- **Documents**: `.pdf`, `.doc`, `.docx`, `.txt`, `.rtf`, `.odt`, `.xls`, `.xlsx`, `.ppt`, `.pptx`, `.csv`
- **Videos**: `.mp4`, `.avi`, `.mkv`, `.mov`, `.wmv`, `.flv`, `.webm`, `.mpeg`, `.mpg`
- **Audio**: `.mp3`, `.wav`, `.flac`, `.aac`, `.ogg`, `.wma`, `.m4a`
- **Archives**: `.zip`, `.rar`, `.7z`, `.tar`, `.gz`, `.bz2`, `.xz`, `.iso`
- **Code**: `.py`, `.java`, `.c`, `.cpp`, `.h`, `.js`, `.html`, `.css`, `.php`, `.rb`, `.go`, `.rs`, `.swift`
- **Executables**: `.exe`, `.msi`, `.app`, `.deb`, `.rpm`, `.dmg`
- **Others**: All uncategorized files

## Examples

### Example 1: Clean Your Desktop

Before:
```
Desktop/
├── photo.jpg
├── resume.pdf
├── video.mp4
├── song.mp3
└── script.py
```

Run:
```bash
python desk_organizer.py
```

After:
```
Desktop/
├── Images/
│   └── photo.jpg
├── Documents/
│   └── resume.pdf
├── Videos/
│   └── video.mp4
├── Audio/
│   └── song.mp3
└── Code/
    └── script.py
```

### Example 2: Preview Changes (Dry Run)

```bash
python desk_organizer.py --dry-run
```

Output:
```
DRY RUN - Organizing files in: /home/user/Desktop

  [DRY RUN] Would move: photo.jpg -> Images/photo.jpg
  [DRY RUN] Would move: resume.pdf -> Documents/resume.pdf
  [DRY RUN] Would move: video.mp4 -> Videos/video.mp4

==================================================
Organization Statistics
==================================================
Total files found: 3
Files organized: 3
Files skipped: 0

Files organized by category:
  Images: 1
  Documents: 1
  Videos: 1
==================================================

This was a dry run. No files were actually moved.
Run without --dry-run to organize files.
```

## Customization

You can customize the file categories by modifying the `FILE_CATEGORIES` dictionary in `desk_organizer.py`.

## Safety Features

- **Hidden files are ignored**: Files starting with `.` are not moved
- **Directories are skipped**: Only files are organized
- **File name conflicts**: If a file with the same name exists in the destination folder, it's renamed (e.g., `file_1.txt`, `file_2.txt`)
- **Error handling**: Errors during file movement are caught and reported

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is open source and available under the MIT License.

## Author

Created for automatic desktop organization.
