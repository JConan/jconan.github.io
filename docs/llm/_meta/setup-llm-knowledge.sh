#!/bin/bash

# LLM Knowledge Management System Setup Script
# Project-agnostic setup for intelligent documentation architecture
# Ensures all symlinks are correctly created and maintained

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Script configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Navigate up from docs/llm/_meta/ to project root
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../../.." && pwd)"
DRY_RUN=false
VERBOSE=false

# Function to print colored output
print_status() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

print_success() { print_status "$GREEN" "✅ $1"; }
print_error() { print_status "$RED" "❌ $1"; }
print_warning() { print_status "$YELLOW" "⚠️  $1"; }
print_info() { print_status "$BLUE" "ℹ️  $1"; }

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Options:"
    echo "  -d, --dry-run     Show what would be done without making changes"
    echo "  -v, --verbose     Enable verbose output"
    echo "  -h, --help        Show this help message"
    echo ""
    echo "Description:"
    echo "  Sets up and maintains the LLM knowledge management system symlinks."
    echo "  Ensures proper linking between centralized docs and project integration."
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        -d|--dry-run)
            DRY_RUN=true
            shift
            ;;
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        -h|--help)
            show_usage
            exit 0
            ;;
        *)
            print_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
done

# Function to check if we're in a valid project directory
check_project_root() {
    # Check if we can create the required directories (basic validation)
    if [[ ! -w "$PROJECT_ROOT" ]]; then
        print_error "No write permission in project directory: $PROJECT_ROOT"
        exit 1
    fi
    
    # Ensure we're not in a system directory
    case "$PROJECT_ROOT" in
        /|/usr|/usr/*|/bin|/bin/*|/sbin|/sbin/*|/etc|/etc/*)
            print_error "Cannot run in system directory: $PROJECT_ROOT"
            print_error "Please run from a project directory"
            exit 1
            ;;
    esac
    
    if [[ "$VERBOSE" == true ]]; then
        print_info "Project root detected: $PROJECT_ROOT"
    fi
}

# Function to create directory if it doesn't exist
ensure_directory() {
    local dir_path=$1
    
    if [[ ! -d "$dir_path" ]]; then
        if [[ "$DRY_RUN" == true ]]; then
            print_info "Would create directory: $dir_path"
        else
            mkdir -p "$dir_path"
            print_success "Created directory: $dir_path"
        fi
    elif [[ "$VERBOSE" == true ]]; then
        print_info "Directory exists: $dir_path"
    fi
}

# Function to create or verify symlink
manage_symlink() {
    local link_path=$1
    local target_path=$2
    local description=$3
    
    # Convert to absolute paths for verification
    local abs_link_path="$(cd "$(dirname "$link_path")" 2>/dev/null && pwd)/$(basename "$link_path")" 2>/dev/null || echo "$link_path"
    local abs_target_path="$(cd "$(dirname "$target_path")" 2>/dev/null && pwd)/$(basename "$target_path")" 2>/dev/null || echo "$target_path"
    
    # Check if target exists
    if [[ ! -f "$target_path" ]]; then
        print_error "Target file does not exist: $target_path"
        return 1
    fi
    
    # Check if link already exists and is correct
    if [[ -L "$link_path" ]]; then
        local current_target=$(readlink "$link_path")
        local resolved_target="$(cd "$(dirname "$link_path")" && cd "$(dirname "$current_target")" 2>/dev/null && pwd)/$(basename "$current_target")" 2>/dev/null || echo "$current_target"
        
        if [[ "$resolved_target" == "$abs_target_path" ]] || [[ "$current_target" == "$target_path" ]]; then
            if [[ "$VERBOSE" == true ]]; then
                print_success "$description: Symlink already correct"
            fi
            return 0
        else
            print_warning "$description: Symlink exists but points to wrong target"
            print_warning "Current: $current_target"
            print_warning "Expected: $target_path"
            
            if [[ "$DRY_RUN" == true ]]; then
                print_info "Would remove and recreate symlink"
            else
                rm "$link_path"
                print_info "Removed incorrect symlink"
            fi
        fi
    elif [[ -f "$link_path" ]]; then
        print_error "$description: Regular file exists at symlink location: $link_path"
        print_error "Please remove or rename this file manually"
        return 1
    elif [[ -d "$link_path" ]]; then
        print_error "$description: Directory exists at symlink location: $link_path"
        print_error "Please remove or rename this directory manually"
        return 1
    fi
    
    # Create the symlink
    if [[ "$DRY_RUN" == true ]]; then
        print_info "Would create symlink: $link_path -> $target_path"
    else
        # Ensure the directory for the symlink exists
        ensure_directory "$(dirname "$link_path")"
        
        # Create relative path from link to target
        local relative_target=$(python3 -c "import os.path; print(os.path.relpath('$target_path', '$(dirname "$link_path")'))" 2>/dev/null || echo "$target_path")
        
        ln -s "$relative_target" "$link_path"
        print_success "$description: Created symlink $link_path -> $relative_target"
    fi
}

# Function to verify symlink functionality
verify_symlink() {
    local link_path=$1
    local description=$2
    
    if [[ "$DRY_RUN" == true ]]; then
        return 0
    fi
    
    if [[ -L "$link_path" ]] && [[ -f "$link_path" ]]; then
        # Try to read first line to verify accessibility
        local first_line=$(head -n 1 "$link_path" 2>/dev/null || echo "")
        if [[ -n "$first_line" ]]; then
            if [[ "$VERBOSE" == true ]]; then
                print_success "$description: Symlink verified and accessible"
            fi
            return 0
        else
            print_error "$description: Symlink exists but target is not readable"
            return 1
        fi
    else
        print_error "$description: Symlink verification failed"
        return 1
    fi
}

# Main setup function
setup_llm_knowledge_system() {
    print_info "Setting up LLM Knowledge Management System..."
    
    if [[ "$DRY_RUN" == true ]]; then
        print_warning "DRY RUN MODE - No changes will be made"
    fi
    
    echo ""
    
    # Ensure base directories exist
    ensure_directory "$PROJECT_ROOT/docs/llm/_meta"
    ensure_directory "$PROJECT_ROOT/.roo/rules-code"
    
    # Define symlink mappings
    # Format: "link_path|target_path|description"
    local symlinks=(
        "$PROJECT_ROOT/.roo/rules-code/extra-guide.md|$PROJECT_ROOT/docs/llm/_meta/extra-guide.md|LLM Extra Guide (Core Loading Rules)"
    )
    
    # Additional symlinks can be added here as needed:
    # "$PROJECT_ROOT/.roo/rules-code/llm-writing-guide.md|$PROJECT_ROOT/docs/llm/_meta/llm-writing-guide.md|LLM Writing Standards"
    # "$PROJECT_ROOT/.roo/rules-code/imagemagick-guide.md|$PROJECT_ROOT/docs/llm/imagemagick-tool-guide.md|ImageMagick Tool Guide"
    
    local success_count=0
    local total_count=${#symlinks[@]}
    
    # Process each symlink
    for symlink_def in "${symlinks[@]}"; do
        IFS='|' read -r link_path target_path description <<< "$symlink_def"
        
        echo ""
        print_info "Processing: $description"
        
        if manage_symlink "$link_path" "$target_path" "$description"; then
            if verify_symlink "$link_path" "$description"; then
                ((success_count++))
            fi
        fi
    done
    
    echo ""
    print_info "Setup Summary:"
    print_info "Successfully processed: $success_count/$total_count symlinks"
    
    if [[ $success_count -eq $total_count ]]; then
        print_success "LLM Knowledge Management System setup completed successfully!"
        
        if [[ "$DRY_RUN" == false ]]; then
            echo ""
            print_info "System is ready for use. Key features:"
            print_info "• Dynamic knowledge loading based on task context"
            print_info "• Project-aware guidance (SvelteKit, React, Vue, etc.)"
            print_info "• Condensation-resilient documentation"
            print_info "• Centralized file management with symlinks"
            print_info "• Subtask extraction for efficient context usage"
        fi
    else
        print_error "Setup completed with errors. Please review the output above."
        exit 1
    fi
}

# Function to show system status
show_system_status() {
    print_info "LLM Knowledge Management System Status:"
    echo ""
    
    # Check key files
    local files_to_check=(
        "$PROJECT_ROOT/docs/llm/_meta/extra-guide.md|Core Loading Rules"
        "$PROJECT_ROOT/docs/llm/_meta/llm-writing-guide.md|Writing Standards"
        "$PROJECT_ROOT/docs/llm/_meta/template.md|Guide Template"
        "$PROJECT_ROOT/docs/llm/imagemagick-tool-guide.md|ImageMagick Guide"
        "$PROJECT_ROOT/.roo/rules-code/extra-guide.md|Symlinked Rules"
    )
    
    for file_def in "${files_to_check[@]}"; do
        IFS='|' read -r file_path description <<< "$file_def"
        
        if [[ -f "$file_path" ]]; then
            if [[ -L "$file_path" ]]; then
                local target=$(readlink "$file_path")
                print_success "$description: ✓ (symlink → $target)"
            else
                print_success "$description: ✓"
            fi
        else
            print_error "$description: ✗ (missing)"
        fi
    done
}

# Main execution
main() {
    # Change to project root
    cd "$PROJECT_ROOT"
    
    # Verify we're in the right place
    check_project_root
    
    # Show current status if verbose
    if [[ "$VERBOSE" == true ]]; then
        show_system_status
        echo ""
    fi
    
    # Run the setup
    setup_llm_knowledge_system
    
    # Show final status
    if [[ "$DRY_RUN" == false ]] && [[ "$VERBOSE" == true ]]; then
        echo ""
        show_system_status
    fi
}

# Run main function
main "$@"