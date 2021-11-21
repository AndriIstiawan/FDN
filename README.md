
# SmartEye VR/AR Viewer App

## Prerequisites
1. Install Node.js latest

2. Clone this repository:

		https://gitlab.playcourt.id/amoeba/smarteye/api-mysql.git/
		

## How to build
1. Change directory to one of the sample folders, e.g. platform-backend:

		cd api-mysql/

2. Install the sample's dependencies (see the sample's README for details):

		npm install

3. Configure the environment variables in the `.env` file

		cp example.env .env

4. Run the sample:

		node app.js

  

## API Usage


### Register & Login

1. CREATE (melakukan registrasi) user baru

	`POST` request ke `http://<server_ip>/api/v1/auth/register`

	dengan form berisi:

	* username

	* password

	* email

  

2. LOGIN

	`POST` request ke `http://<server_ip>/api/v1/auth/login`

	dengan form berisi:

	* username

	* password

	Return object berisi:

	`{

	user: <username>,

	token: <token_untuk_melakukan_modifikasi_data_selanjutnya>

	}`
  

## Contributing

  

1. Fork it!

2. Create your feature branch: `git checkout -b my-new-feature`

3. Commit your changes: `git commit -am 'Add some feature'`

4. Push to the branch: `git push origin my-new-feature`

5. Submit a pull request :D

  

## History

  

TODO: Write history

  

## Author

* Andri Istiawan
  

TODO: Write credits

  

## License

  

TODO: Write license