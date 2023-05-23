python -m grpc_tools.protoc --proto_path=. ./helloworld.proto --python_out=. --grpc_python_out=.

python greeter_server.py

python greeter_client.py