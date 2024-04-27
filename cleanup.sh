# remove migration files in db/migrations
rm -rf db/migrations/*

# clean logs
rm -rf logs
rm -rf devLogs

# reinitialize docker workspace
docker compose down
docker rmi $(docker images -f "dangling=true" -q) --force
docker rmi warehouse-task-warehouse --force
docker volume rm $(docker volume ls -q)

docker pull node:21-alpine3.18
docker pull postgres:16.2-alpine3.18