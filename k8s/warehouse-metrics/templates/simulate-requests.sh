for i in {1..100000}; do echo "Request $i"; curl http://localhost:30003/error/test; echo ""; done