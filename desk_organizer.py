#!/usr/bin/env python3
"""
Desktop Organizer - Automatically organize files on your desktop into categorized folders.

This script scans a specified directory (default: Desktop) and organizes files into
folders based on their file extensions.
"""

import os
import shutil
import argparse
from pathlib import Path
from collections import defaultdict

# File categories and their extensions
FILE_CATEGORIES = {
    'Images': ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.svg', '.ico', '.webp', '.tiff'],
    'Documents': ['.pdf', '.doc', '.docx', '.txt', '.rtf', '.odt', '.xls', '.xlsx', '.ppt', '.pptx', '.csv'],
    'Videos': ['.mp4', '.avi', '.mkv', '.mov', '.wmv', '.flv', '.webm', '.mpeg', '.mpg'],
    'Audio': ['.mp3', '.wav', '.flac', '.aac', '.ogg', '.wma', '.m4a'],
    'Archives': ['.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso'],
    'Code': ['.py', '.java', '.c', '.cpp', '.h', '.js', '.html', '.css', '.php', '.rb', '.go', '.rs', '.swift'],
    'Executables': ['.exe', '.msi', '.app', '.deb', '.rpm', '.dmg'],
    'Others': []  # Catch-all for uncategorized files
}


def get_file_category(file_extension):
    """
    Determine the category of a file based on its extension.
    
    Args:
        file_extension (str): The file extension (including the dot)
    
    Returns:
        str: The category name
    """
    file_extension = file_extension.lower()
    for category, extensions in FILE_CATEGORIES.items():
        if file_extension in extensions:
            return category
    return 'Others'


def resolve_file_conflict(destination, item):
    """
    Resolve file name conflicts by appending a counter to the filename.
    
    Args:
        destination (Path): The initial destination path
        item (Path): The source file item
    
    Returns:
        Path: The resolved destination path (original or with counter appended)
    """
    if not destination.exists():
        return destination
    
    base_name = item.stem
    extension = item.suffix
    counter = 1
    category_folder = destination.parent
    
    while destination.exists():
        new_name = f"{base_name}_{counter}{extension}"
        destination = category_folder / new_name
        counter += 1
    
    return destination


def organize_desktop(desktop_path, dry_run=False):
    """
    Organize files in the desktop directory into categorized folders.
    
    Args:
        desktop_path (str): Path to the desktop directory
        dry_run (bool): If True, only show what would be done without making changes
    
    Returns:
        dict: Statistics about the organization process
    """
    desktop_path = Path(desktop_path).expanduser().resolve()
    
    if not desktop_path.exists():
        print(f"Error: Desktop path '{desktop_path}' does not exist.")
        return None
    
    if not desktop_path.is_dir():
        print(f"Error: '{desktop_path}' is not a directory.")
        return None
    
    stats = defaultdict(int)
    stats['total_files'] = 0
    stats['files_organized'] = 0
    stats['files_skipped'] = 0
    
    print(f"\n{'DRY RUN - ' if dry_run else ''}Organizing files in: {desktop_path}\n")
    
    # Iterate through all items in the desktop
    for item in desktop_path.iterdir():
        # Skip directories and hidden files
        if item.is_dir() or item.name.startswith('.'):
            continue
        
        stats['total_files'] += 1
        
        # Get file extension and category
        file_extension = item.suffix
        if not file_extension:
            # Files without extension go to Others
            category = 'Others'
        else:
            category = get_file_category(file_extension)
        
        # Create category folder if it doesn't exist
        category_folder = desktop_path / category
        
        if not dry_run:
            category_folder.mkdir(exist_ok=True)
        
        # Destination path
        destination = category_folder / item.name
        
        # Handle file name conflicts (check even in dry-run to show accurate preview)
        if dry_run and category_folder.exists():
            # In dry-run, only check for conflicts if category folder already exists
            destination = resolve_file_conflict(destination, item)
        elif not dry_run:
            # In actual execution, always check and resolve conflicts
            destination = resolve_file_conflict(destination, item)
        
        # Move the file
        try:
            if dry_run:
                print(f"  [DRY RUN] Would move: {item.name} -> {category}/{destination.name}")
            else:
                shutil.move(item, destination)
                print(f"  Moved: {item.name} -> {category}/{destination.name}")
            stats['files_organized'] += 1
            stats[category] += 1
        except Exception as e:
            print(f"  Error moving {item.name}: {e}")
            stats['files_skipped'] += 1
    
    return stats


def print_statistics(stats):
    """
    Print organization statistics.
    
    Args:
        stats (dict): Statistics dictionary
    """
    if not stats:
        return
    
    print("\n" + "="*50)
    print("Organization Statistics")
    print("="*50)
    print(f"Total files found: {stats['total_files']}")
    print(f"Files organized: {stats['files_organized']}")
    print(f"Files skipped: {stats['files_skipped']}")
    
    print("\nFiles organized by category:")
    for category in FILE_CATEGORIES.keys():
        if category in stats and stats[category] > 0:
            print(f"  {category}: {stats[category]}")
    print("="*50 + "\n")


def main():
    """Main function to run the desktop organizer."""
    parser = argparse.ArgumentParser(
        description='Automatically organize files on your desktop into categorized folders.',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  %(prog)s                           # Organize files in ~/Desktop
  %(prog)s --path /path/to/folder    # Organize files in custom folder
  %(prog)s --dry-run                 # Preview what would be organized
        """
    )
    
    # Default desktop path
    default_desktop = str(Path.home() / 'Desktop')
    
    parser.add_argument(
        '--path',
        default=default_desktop,
        help=f'Path to the directory to organize (default: {default_desktop})'
    )
    
    parser.add_argument(
        '--dry-run',
        action='store_true',
        help='Show what would be done without making any changes'
    )
    
    args = parser.parse_args()
    
    # Run the organizer
    stats = organize_desktop(args.path, dry_run=args.dry_run)
    
    # Print statistics
    if stats:
        print_statistics(stats)
        
        if args.dry_run:
            print("This was a dry run. No files were actually moved.")
            print("Run without --dry-run to organize files.\n")


if __name__ == '__main__':
    main()
