kubectl get secret "$1"-grafana -o jsonpath="{.data.admin-password}" | base64 --decode ; echo