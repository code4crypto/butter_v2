#!/usr/bin/env python3
"""
Automated deployment script for butter_v2
Uses paramiko for SSH connection with password authentication
"""

import os
import sys
import tarfile
import tempfile
from pathlib import Path

try:
    import paramiko
except ImportError:
    print("Installing paramiko...")
    os.system(f"{sys.executable} -m pip install paramiko --quiet")
    import paramiko

# Configuration
SERVER = "140.82.5.79"
USER = "root"
DEPLOY_PATH = "/var/www/ButterWeb"
SCRIPT_DIR = Path(__file__).parent
DIST_DIR = SCRIPT_DIR / "dist"

def deploy():
    print("🚀 Deploying butter_v2 to production...")
    
    # Check if dist exists
    if not DIST_DIR.exists():
        print("❌ dist/ directory not found. Building first...")
        os.chdir(SCRIPT_DIR)
        os.system("npm run build")
        if not DIST_DIR.exists():
            print("❌ Build failed!")
            return False
    
    # Create tar archive
    print("📦 Creating deployment package...")
    with tempfile.NamedTemporaryFile(suffix='.tar.gz', delete=False) as tmp:
        tar_path = tmp.name
        with tarfile.open(tar_path, 'w:gz') as tar:
            tar.add(DIST_DIR, arcname='.')
        tar_size = os.path.getsize(tar_path)
    
    print(f"✅ Package created: {tar_size / 1024:.1f}KB")
    
    # Get password
    import getpass
    password = getpass.getpass(f"Enter SSH password for {USER}@{SERVER}: ")
    
    # Connect to server
    print(f"🔌 Connecting to {SERVER}...")
    ssh = paramiko.SSHClient()
    ssh.set_missing_host_key_policy(paramiko.AutoAddPolicy())
    
    try:
        ssh.connect(SERVER, username=USER, password=password, timeout=10)
        print("✅ Connected!")
    except Exception as e:
        print(f"❌ Connection failed: {e}")
        return False
    
    # Upload file
    print("📤 Uploading files...")
    sftp = ssh.open_sftp()
    remote_path = f"/tmp/butter_v2_deploy.tar.gz"
    
    try:
        sftp.put(tar_path, remote_path)
        print("✅ Upload complete!")
    except Exception as e:
        print(f"❌ Upload failed: {e}")
        sftp.close()
        ssh.close()
        os.unlink(tar_path)
        return False
    
    sftp.close()
    
    # Extract on server
    print("📂 Extracting files on server...")
    commands = [
        f"cd {DEPLOY_PATH}",
        f"tar -xzf {remote_path}",
        f"rm {remote_path}",
        "ls -la | head -10"
    ]
    
    for cmd in commands:
        stdin, stdout, stderr = ssh.exec_command(cmd)
        exit_status = stdout.channel.recv_exit_status()
        if exit_status != 0:
            error = stderr.read().decode()
            print(f"⚠️  Warning: {error}")
    
    print("✅ Extraction complete!")
    
    # Cleanup
    ssh.close()
    os.unlink(tar_path)
    
    print("\n✅ Deployment complete!")
    print(f"🌐 Website should be live at: https://buttertrade.xyz")
    return True

if __name__ == "__main__":
    success = deploy()
    sys.exit(0 if success else 1)








