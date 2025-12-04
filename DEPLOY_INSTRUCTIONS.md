# Deployment Instructions for butter_v2

## Built Files Location
- Build output: `butter_v2/dist/`
- Deployment package: `butter_v2/butter_v2_deploy.tar.gz`

## Quick Deploy Commands

### Option 1: Using SCP (copy files directly)
```bash
cd "/Users/laila/Python Programs/buttertradexyz/butter_v2"
scp -r dist/* root@140.82.5.79:/var/www/butterterminal/
```

### Option 2: Using tar.gz package (recommended)
```bash
cd "/Users/laila/Python Programs/buttertradexyz/butter_v2"

# Upload the package
scp butter_v2_deploy.tar.gz root@140.82.5.79:/tmp/

# SSH in and extract (run this after uploading)
ssh root@140.82.5.79 "cd /var/www/butterterminal && tar -xzf /tmp/butter_v2_deploy.tar.gz && rm /tmp/butter_v2_deploy.tar.gz && ls -la"
```

### Option 3: Using rsync (if available)
```bash
cd "/Users/laila/Python Programs/buttertradexyz/butter_v2"
rsync -avz --progress dist/ root@140.82.5.79:/var/www/butterterminal/
```

## Verify Deployment Path

**First, check where the website should actually go:**
```bash
ssh root@140.82.5.79 "cat /etc/nginx/sites-available/buttertrade.online | grep -E '(root|server_name)'"
```

This will show you the exact path where files should be deployed.

## After Deployment

1. **Restart nginx** (if needed):
   ```bash
   ssh root@140.82.5.79 "nginx -t && systemctl reload nginx"
   ```

2. **Check the website**: Visit `https://buttertrade.xyz` or `http://buttertrade.online`

## Backup Existing Files (Optional)

Before deploying, you might want to backup the current version:
```bash
ssh root@140.82.5.79 "cd /var/www && tar -czf butterterminal_backup_$(date +%Y%m%d_%H%M%S).tar.gz butterterminal/"
```








