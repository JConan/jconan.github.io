#!/bin/bash

# Pre-commit Testing Hook
# Runs essential tests before allowing commits to ensure code quality

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
MAGENTA='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Icons
CHECK="✅"
CROSS="❌"
WARNING="⚠️"
INFO="ℹ️"
ROCKET="🚀"

echo -e "${CYAN}${ROCKET} Pre-commit Testing Hook${NC}"
echo -e "${BLUE}Running essential tests before commit...${NC}\n"

# Track overall success
OVERALL_SUCCESS=true

# Function to run a command and track success
run_check() {
    local name="$1"
    local command="$2"
    local required="$3" # true/false
    
    echo -e "${BLUE}${INFO} Running $name...${NC}"
    
    if eval "$command" > /dev/null 2>&1; then
        echo -e "${GREEN}${CHECK} $name passed${NC}"
        return 0
    else
        if [ "$required" = true ]; then
            echo -e "${RED}${CROSS} $name failed (required)${NC}"
            OVERALL_SUCCESS=false
            return 1
        else
            echo -e "${YELLOW}${WARNING} $name failed (optional)${NC}"
            return 0
        fi
    fi
}

# Function to run a command with output
run_check_with_output() {
    local name="$1"
    local command="$2"
    local required="$3"
    
    echo -e "${BLUE}${INFO} Running $name...${NC}"
    
    if eval "$command"; then
        echo -e "${GREEN}${CHECK} $name passed${NC}"
        return 0
    else
        if [ "$required" = true ]; then
            echo -e "${RED}${CROSS} $name failed (required)${NC}"
            OVERALL_SUCCESS=false
            return 1
        else
            echo -e "${YELLOW}${WARNING} $name failed (optional)${NC}"
            return 0
        fi
    fi
}

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}${CROSS} Error: Not in project root directory${NC}"
    exit 1
fi

# Check if pnpm is available
if ! command -v pnpm &> /dev/null; then
    echo -e "${RED}${CROSS} Error: pnpm is not installed${NC}"
    echo -e "${YELLOW}Please install pnpm: npm install -g pnpm${NC}"
    exit 1
fi

echo -e "${MAGENTA}📋 Pre-commit Checklist:${NC}\n"

# 1. Code formatting and linting
echo -e "${CYAN}1. Code Quality Checks${NC}"
run_check_with_output "Code formatting (Prettier)" "pnpm format --check" true
run_check_with_output "Linting (ESLint)" "pnpm lint" true
run_check_with_output "Type checking (svelte-check)" "pnpm check" true

echo ""

# 2. Unit tests (required)
echo -e "${CYAN}2. Unit Tests${NC}"
run_check "Unit tests" "pnpm test:unit --run --reporter=basic" true

echo ""

# 3. Integration tests (optional - requires Mailpit)
echo -e "${CYAN}3. Integration Tests${NC}"

# Check if Mailpit is running
if curl -f http://localhost:8025/api/v1/info > /dev/null 2>&1; then
    echo -e "${GREEN}${INFO} Mailpit service detected${NC}"
    run_check "Integration tests" "pnpm test:integration --run --reporter=basic" false
else
    echo -e "${YELLOW}${WARNING} Mailpit not running - skipping integration tests${NC}"
    echo -e "${BLUE}${INFO} To run integration tests: pnpm mailpit:start${NC}"
fi

echo ""

# 4. Build test
echo -e "${CYAN}4. Build Test${NC}"
run_check "Production build" "pnpm build" true

echo ""

# 5. Critical file validation
echo -e "${CYAN}5. Critical File Validation${NC}"

# Check for required test files
REQUIRED_FILES=(
    "tests/unit/example.test.ts"
    "tests/setup/vitest.setup.ts"
    "vitest.config.ts"
    "playwright.config.ts"
)

for file in "${REQUIRED_FILES[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}${CHECK} $file exists${NC}"
    else
        echo -e "${RED}${CROSS} Missing required file: $file${NC}"
        OVERALL_SUCCESS=false
    fi
done

echo ""

# 6. Dependencies check
echo -e "${CYAN}6. Dependencies Check${NC}"
run_check "Dependency audit" "pnpm audit --audit-level moderate" false

echo ""

# 7. Test coverage check (if coverage exists)
echo -e "${CYAN}7. Test Coverage${NC}"
if [ -d "coverage" ]; then
    echo -e "${GREEN}${INFO} Coverage directory found - checking thresholds${NC}"
    run_check "Coverage thresholds" "pnpm test:unit:coverage --run --reporter=basic" false
else
    echo -e "${YELLOW}${INFO} No coverage directory - running with coverage${NC}"
    run_check "Generate coverage" "pnpm test:unit:coverage --run --reporter=basic" false
fi

echo ""

# Summary
echo -e "${MAGENTA}📊 Pre-commit Summary${NC}"
echo -e "${BLUE}================================================${NC}"

if [ "$OVERALL_SUCCESS" = true ]; then
    echo -e "${GREEN}${CHECK} All required checks passed!${NC}"
    echo -e "${GREEN}${ROCKET} Ready to commit${NC}"
    echo ""
    echo -e "${CYAN}Commit guidelines:${NC}"
    echo -e "• Use conventional commits: feat:, fix:, docs:, test:, refactor:, style:, chore:"
    echo -e "• Include test coverage for new features"
    echo -e "• Update documentation if needed"
    echo ""
    exit 0
else
    echo -e "${RED}${CROSS} Some required checks failed!${NC}"
    echo -e "${RED}Please fix the issues above before committing${NC}"
    echo ""
    echo -e "${YELLOW}Quick fixes:${NC}"
    echo -e "• Run ${CYAN}pnpm format${NC} to fix formatting"
    echo -e "• Run ${CYAN}pnpm lint --fix${NC} to fix linting issues"
    echo -e "• Run ${CYAN}pnpm test:unit${NC} to see test failures"
    echo -e "• Run ${CYAN}pnpm check${NC} to see type errors"
    echo ""
    echo -e "${BLUE}For detailed testing info: ${CYAN}docs/TESTING.md${NC}"
    echo ""
    exit 1
fi