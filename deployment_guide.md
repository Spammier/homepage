# 服务器应用部署指南

本文档旨在指导如何在当前服务器环境下部署新的前后端分离或其他 Web 应用，并将其正确集成到共享的反向代理服务中。

## 环境概述

本服务器采用 Docker Compose 进行应用部署，并配置了一个**独立的反向代理服务** (`reverse_proxy_app`) 来处理所有外部 HTTP/HTTPS 请求。

- **反向代理管理目录**: `/opt/reverse-proxy/`
  - **Compose 文件**: `/opt/reverse-proxy/docker-compose.yml` (管理反向代理容器)
  - **Nginx 配置目录**: `/opt/reverse-proxy/nginx-conf/` (存放所有应用的路由配置文件)
- **共享 Docker 网络**: `shared-network` (所有需要通过反向代理访问的应用容器，以及反向代理本身，都连接到此网络)
- **宿主机端口占用**: 反向代理监听宿主机的 `80` 端口 (未来可能监听 `443` 用于 HTTPS)。**其他应用不应直接映射宿主机的 80 或 443 端口。**

## 部署新应用步骤

假设你要部署一个新的应用，例如 `crm`。

**1. 创建应用目录**

在 `/opt/` 下为你的应用创建一个专属目录：

```bash
mkdir /opt/crm
cd /opt/crm
# 在此目录下创建你的应用代码目录，例如 frontend, backend等
# mkdir frontend backend
```

**2. 编写应用的 `docker-compose.yml`**

在 `/opt/crm/` 目录下创建 `docker-compose.yml` 文件。关键配置点：

- **引用外部网络**: 声明 `shared-network` 为外部网络。
- **连接服务到网络**: 将需要通过反向代理访问的服务（通常是前端 Nginx 和后端 API）连接到 `shared-network`。
- **服务名**: 为你的服务使用清晰、唯一的名称 (例如 `crm_frontend`, `crm_backend`)。反向代理将通过这些名称在网络内找到它们。
- **不要映射 80/443**: **不要**在应用服务的 `ports` 部分映射宿主机的 80 或 443 端口。让容器内部监听它们自己的端口（例如，前端 Nginx 监听 80，后端 API 监听 8000）。
- **容器名**: 使用唯一的容器名 (例如 `crm_frontend_app`)。

**示例 `/opt/crm/docker-compose.yml`:**

```yaml
version: '3.8'

networks:
  shared-network:
    external: true # 重要：引用已存在的共享网络

services:
  crm_frontend:
    build: ./frontend
    container_name: crm_frontend_app
    restart: always
    # 无需 ports 映射到宿主机
    networks:
      - shared-network # 连接到共享网络
    depends_on:
      - crm_backend

  crm_backend:
    build: ./backend
    container_name: crm_backend_app
    restart: always
    environment:
      # ... 应用所需环境变量 ...
      BACKEND_PORT: 8000 # 假设后端监听 8000
    networks:
      - shared-network # 连接到共享网络
    # ports:
      # - "8000" # 只暴露容器端口，不映射到宿主机

  # ... 其他服务，如数据库、缓存等 ...
  # crm_database:
  #   image: postgres:latest
  #   container_name: crm_db_app
  #   # ...
  #   networks:
  #     # 数据库通常不需要连接到 shared-network，除非有特殊需求
  #     - crm-internal-network # 可以为应用内部通信创建独立网络

# volumes:
#   # ... 定义数据卷 ...

# （可选）如果应用内部组件间需要网络通信，但不需要暴露给反向代理
# networks:
#   crm-internal-network:
#     driver: bridge
```

**3. 添加反向代理配置**

进入反向代理的配置目录：

```bash
cd /opt/reverse-proxy/nginx-conf/
```

创建一个新的配置文件（推荐，例如 `crm.conf`）或者编辑现有的文件（例如 `default.conf`），添加一个新的 `server` 块来定义如何路由到你的 `crm` 应用。

**示例 `/opt/reverse-proxy/nginx-conf/crm.conf`:**

```nginx
server {
    listen 80;
    # listen 443 ssl; # 用于 HTTPS
    server_name crm.yourdomain.com; # 你的 CRM 应用域名

    # ssl_certificate /etc/nginx/certs/crm.yourdomain.com.crt; # HTTPS 证书
    # ssl_certificate_key /etc/nginx/certs/crm.yourdomain.com.key; # HTTPS 私钥
    # include /etc/nginx/conf.d/ssl_params.conf; # 可选：通用的 SSL 参数

    location / {
        # 代理到 CRM 前端服务（使用 docker-compose 中定义的服务名）
        proxy_pass http://crm_frontend:80; # crm_frontend 内部监听的端口
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location /api/ { # 假设 CRM 的 API 路径是 /api/
        # 代理到 CRM 后端服务
        proxy_pass http://crm_backend:8000/api/; # crm_backend 内部监听的端口和路径
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_buffering off;
    }

    # 可根据需要添加其他 location 规则
}
```

**4. 启动/重启服务**

- **首次启动新应用**:
  ```bash
  cd /opt/crm
  docker-compose up -d --build
  ```

- **加载新的 Nginx 配置**:
  ```bash
  cd /opt/reverse-proxy
  # 测试 Nginx 配置语法是否正确 (在容器内执行)
  docker-compose exec reverse_proxy nginx -t
  # 如果测试通过，重启反向代理以应用新配置
  docker-compose restart reverse_proxy
  # 或者强制重新创建容器
  # docker-compose up -d --force-recreate reverse_proxy
  ```

**5. DNS 配置**

确保你的应用域名 (例如 `crm.yourdomain.com`) 的 DNS A 记录指向本服务器的 IP 地址 (`115.190.29.88`)。

---

## (可选) 启用 HTTPS (使用 Let's Encrypt)

为了确保网站安全并获得浏览器信任（显示小锁标志），强烈建议为你的应用启用 HTTPS。以下步骤使用 Let's Encrypt 提供的免费证书和 Certbot 工具。

**前提条件:**

*   **DNS 已生效**: 确保第 5 步中的 DNS A 记录已经生效。
*   **端口 80/443 可访问**:
    *   服务器防火墙（如 ufw, firewalld）必须允许外部访问 TCP 端口 80 (用于 Let's Encrypt 验证) 和 TCP 端口 443 (用于 HTTPS)。
    *   反向代理容器 (`reverse_proxy_app`) 的 Docker Compose 文件 (`/opt/reverse-proxy/docker-compose.yml`) 必须已将宿主机的 80 和 443 端口映射到容器，即 `ports` 部分包含 `- "80:80"` 和 `- "443:443"`。 **请务必检查并取消注释 `- "443:443"` 如果它被注释掉了！**

**步骤:**

**A. 安装 Certbot (在宿主机上)**

如果尚未安装 Certbot 及其 Nginx 插件，请在**宿主机终端**执行：

```bash
# 检查是否已安装 (如果显示版本则跳过安装)
certbot --version

# 使用 apt 安装 (适用于 Debian/Ubuntu)
sudo apt update
sudo apt install certbot python3-certbot-nginx -y

# 使用 snap 安装 (另一种方法)
# sudo snap install core; sudo snap refresh core
# sudo snap install --classic certbot
# sudo ln -s /snap/bin/certbot /usr/bin/certbot
# sudo snap set certbot trust-plugin-with-root=ok
# sudo snap install certbot-nginx
```

**B. 配置 Webroot 验证环境**

由于 Nginx 运行在 Docker 容器内，我们使用 Webroot 方式进行验证。

1.  **创建宿主机验证目录**:
    ```bash
    sudo mkdir -p /opt/reverse-proxy/letsencrypt-challenges/
    sudo chmod -R 777 /opt/reverse-proxy/letsencrypt-challenges/ # 确保 Certbot 和 Nginx 容器都有权限
    ```

2.  **配置反向代理 Nginx (`.conf` 文件)**:
    编辑你的应用的 Nginx 配置文件 (例如 `/opt/reverse-proxy/nginx-conf/crm.conf`)，在监听 `80` 端口的 `server` 块内添加一个 `location` 块来处理验证请求：
    ```nginx
    server {
        listen 80;
        server_name crm.yourdomain.com;

        # 添加此 location 块用于 Let's Encrypt 验证
        location /.well-known/acme-challenge/ {
            # 注意: 这个路径是容器内部路径，下一步会映射它
            alias /var/www/letsencrypt/.well-known/acme-challenge/;
        }

        # 其他 location 块... (例如代理到 crm_frontend 的块，稍后会修改为重定向)
        location / {
           # ... 初始配置可能在这里 ...
        }
    }
    ```

3.  **配置反向代理 Docker 卷映射**:
    编辑反向代理的 Docker Compose 文件 (`/opt/reverse-proxy/docker-compose.yml`)，添加卷映射，将宿主机的验证目录和证书目录挂载到容器内：
    ```yaml
    services:
      reverse_proxy:
        # ... 其他配置 ...
        volumes:
          - ./nginx-conf:/etc/nginx/conf.d:ro # 已有的配置目录挂载
          # 添加以下三行 (如果不存在)
          - /opt/reverse-proxy/letsencrypt-challenges/:/var/www/letsencrypt/ # 验证文件目录
          - /etc/letsencrypt:/etc/letsencrypt         # 证书/密钥主目录
          - /var/lib/letsencrypt:/var/lib/letsencrypt # Certbot 工作/续期目录
        # ... 其他配置 ...
    ```

4.  **重启反向代理**:
    应用 Nginx 配置和 Docker Compose 的卷映射更改。因为修改了 `docker-compose.yml`，需要强制重新创建容器：
    ```bash
    cd /opt/reverse-proxy
    docker-compose exec reverse_proxy nginx -t  # 测试配置
    docker-compose up -d --force-recreate reverse_proxy # 重启并应用卷更改
    ```

**C. 获取证书 (在宿主机上)**

使用 webroot 方式运行 Certbot：

```bash
# 将 crm.yourdomain.com 替换为你的实际域名
sudo certbot certonly --webroot -w /opt/reverse-proxy/letsencrypt-challenges/ -d crm.yourdomain.com
```

*   按照提示输入邮箱、同意条款等。
*   成功后，Certbot 会显示证书和私钥的路径（通常在 `/etc/letsencrypt/live/yourdomain.com/` 下）。

**D. 配置 Nginx 使用证书并强制 HTTPS**

再次编辑你的应用的 Nginx 配置文件 (例如 `/opt/reverse-proxy/nginx-conf/crm.conf`)：

```nginx
# 重定向 HTTP 到 HTTPS
server {
    listen 80;
    server_name crm.yourdomain.com;

    # 保留 Let's Encrypt 验证 location
    location /.well-known/acme-challenge/ {
        alias /var/www/letsencrypt/.well-known/acme-challenge/;
    }

    # 将所有其他 HTTP 请求重定向到 HTTPS
    location / {
        return 301 https://$host$request_uri;
    }
}

# 配置 HTTPS 服务
server {
    listen 443 ssl http2; # 监听 443 端口，启用 SSL 和 HTTP/2
    # 或者 listen 443 ssl; http2 on;
    server_name crm.yourdomain.com;

    # SSL 证书路径 (容器内路径)
    ssl_certificate /etc/letsencrypt/live/crm.yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/crm.yourdomain.com/privkey.pem;

    # 可选: 引入推荐的 SSL 参数配置 (提高安全性)
    # include /etc/nginx/conf.d/ssl_params.conf;

    # 原有的代理设置保持不变
    location / {
        proxy_pass http://crm_frontend:80; # 代理到前端服务
        # ... 其他 proxy_set_header 指令 ...
    }

    location /api/ {
        proxy_pass http://crm_backend:8000/api/; # 代理到后端服务
        # ... 其他 proxy_set_header 指令 ...
    }

    # 根据应用需要添加其他 location 规则
}
```

**E. 再次重启反向代理**

加载最终的 HTTPS Nginx 配置：

```bash
cd /opt/reverse-proxy
docker-compose exec reverse_proxy nginx -t
docker-compose restart reverse_proxy # 这次只需 restart，因为 docker-compose.yml 未变
```

**F. 证书自动续期**

Certbot 在安装时通常会自动设置一个系统任务（如 cron job 或 systemd timer）来定期检查并续订即将过期的证书。你可以通过以下命令测试续订过程（不会真的续订，除非证书快过期）：

```bash
sudo certbot renew --dry-run
```

---

遵循以上步骤，你可以将多个应用安全、独立地部署到服务器上，并通过统一的反向代理进行访问控制和管理，同时启用 HTTPS 加密。 