#!/bin/bash
# Desktop Organizer - Linux/Mac Launcher
# This script provides an interactive menu to run the Desktop Organizer

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR"

echo "================================================"
echo "Desktop Organizer"
echo "================================================"
echo ""
echo "This will organize files on your Desktop."
echo ""
echo "Options:"
echo "  1. Organize Desktop (dry-run preview)"
echo "  2. Organize Desktop (actually move files)"
echo "  3. Organize custom folder"
echo "  4. Exit"
echo ""

read -p "Enter your choice (1-4): " choice

case $choice in
    1)
        python3 desk_organizer.py --dry-run
        ;;
    2)
        python3 desk_organizer.py
        ;;
    3)
        read -p "Enter folder path to organize: " folder_path
        python3 desk_organizer.py --path "$folder_path"
        ;;
    4)
        exit 0
        ;;
    *)
        echo "Invalid choice!"
        exit 1
        ;;
esac

read -p "Press Enter to continue..."
