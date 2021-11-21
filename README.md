
# FDN App

## Prerequisites
1. Install Node.js latest

2. Install Mysql latest

3. Clone this repository:

		https://github.com/AndriIstiawan/FDN.git
		

## How to build
1. Change directory to one of the sample folders, e.g. FDN-backend:

		cd FDN/

2. Install the sample's dependencies:

		npm install

3. Configure the environment variables in the `.env` file

		cp example.env .env

4. Run the sample:

		node app.js
		

## API Test
### How to run all test

	1. npm run unit-test


## API Usage
### GET API ORDER

1. GET Order

		`GET http://<server_ip>/api/v1/order?limit=&page=`
  
2. GET Order PIVOT

		`GET http://<server_ip>/api/v1/order/pivot?limit=&page=`


## Contributing

	1. Fork it!

	2. Create your feature branch: `git checkout -b my-new-feature`

	3. Commit your changes: `git commit -am 'Add some feature'`

	4. Push to the branch: `git push origin my-new-feature`

	5. Submit a pull request :D
  

## History
	TODO: Write history  

## Author

	Andri Istiawan


## License  

	TODO: Write license