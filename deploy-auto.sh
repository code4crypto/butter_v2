#!/bin/bash

# Automated deployment script using SSH key or password
# This script will deploy butter_v2 to the production server

set -e

SERVER="140.82.5.79"
USER="root"
KEY_FILE="$HOME/.ssh/id_ed25519_buttertrade"
DEPLOY_PATH="/var/www/butterterminal"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo "🚀 Deploying butter_v2 to $SERVER..."

# Check if build exists
if [ ! -d "$SCRIPT_DIR/dist" ]; then
    echo "❌ Building first..."
    cd "$SCRIPT_DIR"
    npm run build
fi

# Create deployment package
cd "$SCRIPT_DIR"
tar -czf /tmp/butter_v2_deploy.tar.gz -C dist .

# Try SSH key first, fallback to expect script
if [ -f "$KEY_FILE" ]; then
    echo "✅ Using SSH key authentication"
    scp -i "$KEY_FILE" /tmp/butter_v2_deploy.tar.gz $USER@$SERVER:/tmp/
    ssh -i "$KEY_FILE" $USER@$SERVER "cd $DEPLOY_PATH && tar -xzf /tmp/butter_v2_deploy.tar.gz && rm /tmp/butter_v2_deploy.tar.gz && echo 'Deployment complete!'"
else
    echo "⚠️  No SSH key found. Creating expect script..."
    # Create expect script for password
    cat > /tmp/deploy.exp << 'EXPEOF'
#!/usr/bin/expect -f
set timeout 30
set password [lindex $argv 0]
set tar_file [lindex $argv 1]
set server [lindex $argv 2]
set user [lindex $argv 3]
set deploy_path [lindex $argv 4]

spawn scp $tar_file $user@$server:/tmp/
expect {
    "password:" { send "$password\r"; exp_continue }
    "Password:" { send "$password\r"; exp_continue }
    "yes/no" { send "yes\r"; exp_continue }
    eof
}

spawn ssh $user@$server "cd $deploy_path && tar -xzf /tmp/butter_v2_deploy.tar.gz && rm /tmp/butter_v2_deploy.tar.gz"
expect {
    "password:" { send "$password\r"; exp_continue }
    "Password:" { send "$password\r"; exp_continue }
    "yes/no" { send "yes\r"; exp_continue }
    eof
}
EXPEOF
    
    chmod +x /tmp/deploy.exp
    read -sp "Enter SSH password: " PASS
    echo ""
    /tmp/deploy.exp "$PASS" "/tmp/butter_v2_deploy.tar.gz" "$SERVER" "$USER" "$DEPLOY_PATH"
    rm /tmp/deploy.exp
fi

rm /tmp/butter_v2_deploy.tar.gz
echo "✅ Deployment complete!"








