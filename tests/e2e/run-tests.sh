#!/bin/bash

# E2E Test Runner Script
# Usage: ./run-tests.sh [category] [browser] [options]

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
CATEGORY=""
BROWSER=""
OPTIONS=""

# Function to display usage
usage() {
    echo -e "${BLUE}E2E Test Runner for Contact Form${NC}"
    echo ""
    echo "Usage: $0 [category] [browser] [options]"
    echo ""
    echo -e "${YELLOW}Categories:${NC}"
    echo "  rendering     - Form rendering and accessibility tests"
    echo "  validation    - Form validation tests"
    echo "  submission    - Form submission flow tests"
    echo "  i18n         - Internationalization tests"
    echo "  mobile       - Mobile responsiveness tests"
    echo "  performance  - Performance and loading tests"
    echo "  ux           - User experience scenarios"
    echo "  security     - Security and edge case tests"
    echo "  all          - All test categories (default)"
    echo ""
    echo -e "${YELLOW}Browsers:${NC}"
    echo "  chromium     - Desktop Chrome"
    echo "  firefox      - Desktop Firefox"
    echo "  webkit       - Desktop Safari"
    echo "  mobile-chrome - Mobile Chrome (Pixel 5)"
    echo "  mobile-safari - Mobile Safari (iPhone 12)"
    echo "  all          - All browsers (default)"
    echo ""
    echo -e "${YELLOW}Options:${NC}"
    echo "  --debug      - Run in debug mode"
    echo "  --headed     - Run with visible browser"
    echo "  --trace      - Enable tracing"
    echo "  --reporter   - Specify reporter (html, json, junit)"
    echo ""
    echo -e "${YELLOW}Examples:${NC}"
    echo "  $0                           # Run all tests"
    echo "  $0 validation chromium       # Run validation tests in Chrome"
    echo "  $0 mobile mobile-chrome      # Run mobile tests on mobile Chrome"
    echo "  $0 submission all --debug    # Debug submission tests in all browsers"
}

# Function to run tests by category
run_category_tests() {
    local category=$1
    local browser_option=$2
    local extra_options=$3
    
    case $category in
        "rendering")
            echo -e "${GREEN}Running Form Rendering and Accessibility tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Form Rendering and Accessibility"
            ;;
        "validation")
            echo -e "${GREEN}Running Form Validation tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Form Validation"
            ;;
        "submission")
            echo -e "${GREEN}Running Form Submission Flow tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Form Submission Flow"
            ;;
        "i18n")
            echo -e "${GREEN}Running Internationalization tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Internationalization"
            ;;
        "mobile")
            echo -e "${GREEN}Running Mobile Responsiveness tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Mobile Responsiveness"
            ;;
        "performance")
            echo -e "${GREEN}Running Performance and Loading tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Performance and Loading"
            ;;
        "ux")
            echo -e "${GREEN}Running User Experience tests...${NC}"
            npx playwright test $browser_option $extra_options -g "User Experience Scenarios"
            ;;
        "security")
            echo -e "${GREEN}Running Security and Edge Case tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Security and Edge Cases"
            ;;
        "cross-browser")
            echo -e "${GREEN}Running Cross-Browser Compatibility tests...${NC}"
            npx playwright test $browser_option $extra_options -g "Cross-Browser Compatibility"
            ;;
        "all"|"")
            echo -e "${GREEN}Running all E2E tests...${NC}"
            npx playwright test $browser_option $extra_options
            ;;
        *)
            echo -e "${RED}Unknown category: $category${NC}"
            usage
            exit 1
            ;;
    esac
}

# Function to get browser option
get_browser_option() {
    local browser=$1
    
    case $browser in
        "chromium")
            echo "--project=chromium"
            ;;
        "firefox")
            echo "--project=firefox"
            ;;
        "webkit")
            echo "--project=webkit"
            ;;
        "mobile-chrome")
            echo "--project=\"Mobile Chrome\""
            ;;
        "mobile-safari")
            echo "--project=\"Mobile Safari\""
            ;;
        "all"|"")
            echo ""
            ;;
        *)
            echo -e "${RED}Unknown browser: $browser${NC}"
            usage
            exit 1
            ;;
    esac
}

# Function to check prerequisites
check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    # Check if Mailpit is running
    if ! curl -s http://localhost:8025/api/v1/info > /dev/null; then
        echo -e "${YELLOW}Warning: Mailpit not running on localhost:8025${NC}"
        echo -e "${YELLOW}Starting Mailpit...${NC}"
        npm run mailpit:start &
        sleep 3
    else
        echo -e "${GREEN}✓ Mailpit is running${NC}"
    fi
    
    # Check if dev server is running
    if ! curl -s http://localhost:5173 > /dev/null; then
        echo -e "${YELLOW}Warning: Dev server not running on localhost:5173${NC}"
        echo -e "${YELLOW}Note: Playwright will start the dev server automatically${NC}"
    else
        echo -e "${GREEN}✓ Dev server is running${NC}"
    fi
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --help|-h)
            usage
            exit 0
            ;;
        --debug|--headed|--trace)
            OPTIONS="$OPTIONS $1"
            shift
            ;;
        --reporter)
            OPTIONS="$OPTIONS $1 $2"
            shift 2
            ;;
        --*)
            OPTIONS="$OPTIONS $1"
            shift
            ;;
        *)
            if [[ -z "$CATEGORY" ]]; then
                CATEGORY=$1
            elif [[ -z "$BROWSER" ]]; then
                BROWSER=$1
            else
                echo -e "${RED}Too many arguments${NC}"
                usage
                exit 1
            fi
            shift
            ;;
    esac
done

# Main execution
main() {
    echo -e "${BLUE}=== Contact Form E2E Test Runner ===${NC}"
    echo ""
    
    # Check prerequisites
    check_prerequisites
    echo ""
    
    # Get browser option
    BROWSER_OPTION=$(get_browser_option "$BROWSER")
    
    # Display test configuration
    echo -e "${BLUE}Test Configuration:${NC}"
    echo -e "  Category: ${YELLOW}${CATEGORY:-all}${NC}"
    echo -e "  Browser: ${YELLOW}${BROWSER:-all}${NC}"
    echo -e "  Options: ${YELLOW}${OPTIONS:-none}${NC}"
    echo ""
    
    # Run tests
    echo -e "${BLUE}Starting tests...${NC}"
    echo ""
    
    start_time=$(date +%s)
    
    if run_category_tests "$CATEGORY" "$BROWSER_OPTION" "$OPTIONS"; then
        end_time=$(date +%s)
        duration=$((end_time - start_time))
        echo ""
        echo -e "${GREEN}✓ Tests completed successfully in ${duration}s${NC}"
        
        # Show report if HTML reporter was used
        if [[ "$OPTIONS" == *"html"* ]] || [[ -z "$OPTIONS" ]]; then
            echo -e "${BLUE}Opening test report...${NC}"
            npx playwright show-report
        fi
    else
        echo ""
        echo -e "${RED}✗ Tests failed${NC}"
        exit 1
    fi
}

# Run main function
main "$@"