#!/bin/bash

# Create Namespace
echo "Creating Namespace..."
kubectl create ns warehouse-metrics

# Deploy PersistentVolumeClaims
echo "Deploying PersistentVolumeClaims..."
kubectl apply -f postgres-pvc.yaml
echo "PersistentVolumeClaims deployed successfully."

# # Wait for PersistentVolumeClaims to be ready
# echo "Waiting for PersistentVolumeClaims to be ready..."
# kubectl wait --for=condition=bound --timeout=5m pvc -l app=postgres
# echo "PersistentVolumeClaims are ready."


# Deploy PostgreSQL Service
echo "Deploying PostgreSQL Service..."
kubectl apply -f postgres-service.yaml
echo "PostgreSQL Service deployed successfully."

# # Wait for PostgreSQL Service to be ready
# echo "Waiting for PostgreSQL Service to be ready..."
# kubectl wait --for=condition=available --timeout=5m service/postgres
# echo "PostgreSQL Service is ready."

# Deploy PostgreSQL Deployment
echo "Deploying PostgreSQL Deployment..."
kubectl apply -f postgres-deployment.yaml
echo "PostgreSQL Deployment deployed successfully."

# # Wait for PostgreSQL Deployment to be ready
# echo "Waiting for PostgreSQL Deployment to be ready..."
# kubectl wait --for=condition=available --timeout=5m deployment/postgres
# echo "PostgreSQL Deployment is ready."

# Deploy Warehouse Application Deployment
echo "Deploying Warehouse Application Deployment..."
kubectl apply -f app-deployment.yaml
echo "Warehouse Application Deployment deployed successfully."

# # Wait for Warehouse Application Deployment to be ready
# echo "Waiting for Warehouse Application Deployment to be ready..."
# kubectl wait --for=condition=available --timeout=5m deployment/app
# echo "Warehouse Application Deployment is ready."

# Deploy Warehouse Application Service
echo "Deploying Warehouse Application Service..."
kubectl apply -f app-service.yaml
echo "Warehouse Application Service deployed successfully."

# # Wait for Warehouse Application Service to be ready
# echo "Waiting for Warehouse Application Service to be ready..."
# kubectl wait --for=condition=available --timeout=5m service/app
# echo "Warehouse Application Service is ready."

echo "Deployment completed successfully."