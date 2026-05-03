#!/bin/bash

# Minecraft 服务器官网部署脚本
# 使用方法: bash deploy.sh

set -e

echo "========================================="
echo "  Minecraft 服务器官网部署"
echo "========================================="

# 1. 安装依赖
echo "[1/5] 安装依赖..."
npm install

# 2. 构建项目
echo "[2/5] 构建项目..."
npm run build

# 3. 复制静态资源
echo "[3/5] 复制静态资源..."
cp -r public .next/standalone/public 2>/dev/null || true
cp -r .next/static .next/standalone/.next/static 2>/dev/null || true

# 4. 创建日志目录
echo "[4/5] 创建日志目录..."
mkdir -p logs

# 5. 使用 PM2 启动/重启
echo "[5/5] 启动服务..."
if command -v pm2 &> /dev/null; then
    pm2 delete mc-website 2>/dev/null || true
    pm2 start ecosystem.config.js
    pm2 save
    echo "服务已启动！"
    echo "使用 'pm2 logs mc-website' 查看日志"
    echo "使用 'pm2 monit' 监控服务"
else
    echo "PM2 未安装，使用 npm start 启动"
    echo "安装 PM2: npm install -g pm2"
    cd .next/standalone && PORT=3000 node server.js
fi

echo ""
echo "========================================="
echo "  部署完成！"
echo "  访问: http://localhost:3000"
echo "========================================="
