#!/bin/bash

# Delete Warehouse Application Service
echo "Deleting Warehouse Application Service..."
kubectl delete -f ../app-service.yaml
echo "Warehouse Application Service deleted successfully."

# Delete Warehouse Application Deployment
echo "Deleting Warehouse Application Deployment..."
kubectl delete -f ../app-deployment.yaml
echo "Warehouse Application Deployment deleted successfully."

# Wait for Warehouse Application Deployment to be deleted
echo "Waiting for Warehouse Application Deployment to be deleted..."
kubectl wait --for=delete deployment/app --timeout=5m
echo "Warehouse Application Deployment is deleted."

# Delete PostgreSQL Deployment
echo "Deleting PostgreSQL Deployment..."
kubectl delete -f ../postgres-deployment.yaml
echo "PostgreSQL Deployment deleted successfully."

# Wait for PostgreSQL Deployment to be deleted
echo "Waiting for PostgreSQL Deployment to be deleted..."
kubectl wait --for=delete deployment/postgres --timeout=5m
echo "PostgreSQL Deployment is deleted."

# Delete PostgreSQL Service
echo "Deleting PostgreSQL Service..."
kubectl delete -f ../postgres-service.yaml
echo "PostgreSQL Service deleted successfully."

# Wait for PostgreSQL Service to be deleted
echo "Waiting for PostgreSQL Service to be deleted..."
kubectl wait --for=delete service/postgres --timeout=5m
echo "PostgreSQL Service is deleted."

# Delete PersistentVolumeClaims
echo "Deleting PersistentVolumeClaims..."
kubectl delete -f ../postgres-pvc.yaml
echo "PersistentVolumeClaims deleted successfully."

# Wait for PersistentVolumeClaims to be deleted
echo "Waiting for PersistentVolumeClaims to be deleted..."
kubectl wait --for=delete pvc -l app=postgres --timeout=5m
echo "PersistentVolumeClaims are deleted."

echo "Removal completed successfully."