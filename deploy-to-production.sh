#!/bin/bash

# Deployment script for butter_v2 website to buttertrade.xyz
# Server: 140.82.5.79
# This script builds the site and prepares it for deployment

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROD_SERVER="140.82.5.79"
PROD_USER="root"
PROD_PATH="/var/www/butterterminal"  # Will check nginx config to confirm
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${YELLOW}🚀 Deploying ButterTrade Website to Production${NC}"
echo ""

# Step 1: Build the production version
echo -e "${YELLOW}📦 Building production frontend...${NC}"
cd "$SCRIPT_DIR"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"
echo ""

# Check build output
if [ ! -d "dist" ]; then
    echo -e "${RED}❌ dist directory not found${NC}"
    exit 1
fi

echo -e "${YELLOW}📊 Build Summary:${NC}"
du -sh dist/*
echo ""

# Step 2: Create deployment package
echo -e "${YELLOW}📦 Creating deployment package...${NC}"
DEPLOY_DIR="deploy_package"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"
cp -r dist/* "$DEPLOY_DIR/"
echo -e "${GREEN}✅ Package created${NC}"
echo ""

# Step 3: Display deployment instructions
echo -e "${YELLOW}📋 Deployment Instructions:${NC}"
echo ""
echo "The built website is ready in: $SCRIPT_DIR/$DEPLOY_DIR/"
echo ""
echo "To deploy, run ONE of these options:"
echo ""
echo -e "${GREEN}Option 1: Manual SCP upload${NC}"
echo "  scp -r $SCRIPT_DIR/$DEPLOY_DIR/* $PROD_USER@$PROD_SERVER:$PROD_PATH/"
echo ""
echo -e "${GREEN}Option 2: Using rsync${NC}"
echo "  rsync -avz --progress $SCRIPT_DIR/$DEPLOY_DIR/ $PROD_USER@$PROD_SERVER:$PROD_PATH/"
echo ""
echo -e "${GREEN}Option 3: Create zip and upload${NC}"
echo "  cd $SCRIPT_DIR && tar -czf butter_v2_deploy.tar.gz -C $DEPLOY_DIR . && scp butter_v2_deploy.tar.gz $PROD_USER@$PROD_SERVER:/tmp/ && ssh $PROD_USER@$PROD_SERVER 'cd $PROD_PATH && tar -xzf /tmp/butter_v2_deploy.tar.gz && rm /tmp/butter_v2_deploy.tar.gz'"
echo ""
echo -e "${YELLOW}⚠️  Note: Make sure $PROD_PATH is the correct directory${NC}"
echo "    Check nginx config: ssh $PROD_USER@$PROD_SERVER 'cat /etc/nginx/sites-available/buttertrade.online | grep root'"
echo ""
echo -e "${GREEN}✅ Build complete! Files are ready in: $SCRIPT_DIR/$DEPLOY_DIR/${NC}"








