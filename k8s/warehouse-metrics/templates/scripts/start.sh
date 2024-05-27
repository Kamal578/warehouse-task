#!/bin/bash

# Deploy PersistentVolumeClaims
echo "Deploying PersistentVolumeClaims..."
kubectl apply -f ../postgres-pvc.yaml
echo "PersistentVolumeClaims deployed successfully."


# Deploy PostgreSQL Service
echo "Deploying PostgreSQL Service..."
kubectl apply -f ../postgres-service.yaml
echo "PostgreSQL Service deployed successfully."

# Deploy PostgreSQL Deployment
echo "Deploying PostgreSQL Deployment..."
kubectl apply -f ../postgres-deployment.yaml
echo "PostgreSQL Deployment deployed successfully."

# Deploy the existing ConfigMap
echo "Deploying ConfigMap for environment variables..."
kubectl apply -f ../app-config.yaml
echo "ConfigMap for environment variables deployed successfully."

# Deploy Warehouse Application Deployment
echo "Deploying Warehouse Application Deployment..."
kubectl apply -f ../app-deployment.yaml
echo "Warehouse Application Deployment deployed successfully."

# Deploy Warehouse Application Service
echo "Deploying Warehouse Application Service..."
kubectl apply -f ../app-service.yaml
echo "Warehouse Application Service deployed successfully."

echo "Deployment completed successfully."