# Ressafe

## Setup
Clone repository with all submodules
```bash
git clone --recurse-submodules https://github.com/EkMi00/Ressafe.git
```

## Directory Structure
```
SincereProduct
├── client
│   ├── public
│   └── src
│       ├── assets
│       │   └── images
│       ├── components
│       ├── data
│       └── scenes
│           ├── API
│           ├── dashboard
│           ├── form
│           ├── layout
│           ├── review
│           └── success
├── server
│   └── src 
└── sql
```

## Setup 

### Client
- Ensure you have [node.js](https://nodejs.org/en) installed
```bash
cd client/
npm install
npm run dev
```

### Database
- Ensure you have installed [MySQL](https://nodejs.org/en)
```bash
cd sql/
mysql -u root -p
SOURCE init.sql
```

### Server
```bash
cd server
conda create -n server python=3.10 -y
pip install -r requirements.txt
```
- Create a .env file in the server directory and enter your sql password
```bash
MYSQL_ROOT_PASSWORD=...
MYSQL_DATABASE=ressafe
MYSQL_HOST=localhost
MYSQL_USER=root
MYSQL_TCP_PORT=3306
```
- Then run the server
```bash
fastapi run src/main.py --port 8000
```


## Running Locally
- Ensure that in client your `.env` file is empty
- Then run all the steps in the `setup`.

## Deploying by Ngrok
- Run all the steps in the `setup`.
- Sign up for an [ngrok](https://ngrok.com/).
- Follow the steps to setup your ngrok config [here](https://ngrok.com/docs/getting-started/)
- Run
```
ngrok config check
ngrok config edit 
```
- Replace the `tunnel` with
```bash
tunnels:
  app:
    addr: 5173
    proto: http
    hostname: {YOUR_STATIC_DOMAIN}
  server:
    addr: 8000
    proto: http
```

- Run `Ressafe/run.sh`
- Run `ngrok start --all`

