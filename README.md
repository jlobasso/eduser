# complaint-backend

## CREACION DEL PROYECTO

##### INSTALAR & CONFIGURAR 
	sudo apt update
	
	curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
	sudo apt-get install -y nodejs
	sudo apt install nodejs
	sudo apt install npm

##### crear esqueleto de aplicación.
	sudo npm install express-generator -g

##### crea una aplicación Express
	express --view=pug complaint-backend
	express --view=pug 

##### MySQL y mongodb
	sudo apt install -y mongodb
	sudo apt install mysql-server
	sudo mysql_secure_installation

##### change directory:
	cd complaint-backend

##### Instalar módulos
	npm install mysql --save
	npm install mongoose
	npm install crypto-js
	npm install --save-dev jest supertest

#### run 
	npm start or npm test
