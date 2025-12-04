#!/bin/bash

# Setup SSH key for automated deployment
# Run this ONCE to set up key-based authentication

SERVER="140.82.5.79"
USER="root"
KEY_FILE="$HOME/.ssh/id_ed25519_buttertrade"

echo "🔑 Setting up SSH key authentication for $SERVER..."

# Generate key if it doesn't exist
if [ ! -f "$KEY_FILE" ]; then
    echo "Generating SSH key..."
    ssh-keygen -t ed25519 -f "$KEY_FILE" -N "" -C "buttertrade-deploy-$(date +%Y%m%d)"
fi

# Display public key
echo ""
echo "📋 Public key to add to server:"
echo "=================================="
cat "$KEY_FILE.pub"
echo "=================================="
echo ""

# Create expect script to add key to server
cat > /tmp/add_key.exp << 'EXPEOF'
#!/usr/bin/expect -f
set timeout 30
set password [lindex $argv 0]
set pubkey [lindex $argv 1]
set server [lindex $argv 2]
set user [lindex $argv 3]

spawn ssh $user@$server "mkdir -p ~/.ssh && chmod 700 ~/.ssh && cat >> ~/.ssh/authorized_keys && chmod 600 ~/.ssh/authorized_keys"
expect {
    "password:" { 
        send "$password\r"
        exp_continue
    }
    "Password:" { 
        send "$password\r"
        exp_continue
    }
    "yes/no" { 
        send "yes\r"
        exp_continue
    }
}
send "$pubkey\r"
expect eof
EXPEOF

chmod +x /tmp/add_key.exp

PUBKEY=$(cat "$KEY_FILE.pub")
read -sp "Enter SSH password (to add key to server): " PASS
echo ""
echo "Adding key to server..."
/tmp/add_key.exp "$PASS" "$PUBKEY" "$SERVER" "$USER"

# Test connection
echo ""
echo "Testing SSH key connection..."
ssh -i "$KEY_FILE" -o ConnectTimeout=5 $USER@$SERVER "echo 'SSH key authentication successful!'" 2>/dev/null

if [ $? -eq 0 ]; then
    echo "✅ SSH key setup complete! You can now deploy automatically."
    rm /tmp/add_key.exp
else
    echo "⚠️  Key added but test failed. You may need to manually add the key."
    echo "Run this on the server:"
    echo "  echo '$(cat $KEY_FILE.pub)' >> ~/.ssh/authorized_keys"
fi








