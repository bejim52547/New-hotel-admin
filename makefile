# EC2 Configuration
EC2_USER = ubuntu
EC2_IP = 34.211.103.187
SSH_KEY_PATH = /home/layman/layman/main_server.pem
DIST_DIR = ./dist

# Commands for Building and Deploying React App
.PHONY: build deploy

# Step 1: Build the React app
build:
	npm run build

# Step 2: Deploy the build to EC2 instance
deploy: build
	@echo "Deploying build to EC2 instance..."
	# Create the frontend directory if it doesn't exist and copy the build files
	ssh -o StrictHostKeyChecking=no -i $(SSH_KEY_PATH) $(EC2_USER)@$(EC2_IP) "mkdir -p ~/frontend"
	scp -o StrictHostKeyChecking=no -i $(SSH_KEY_PATH) -r $(DIST_DIR)/* $(EC2_USER)@$(EC2_IP):~/frontend/

