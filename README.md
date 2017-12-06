# se3309_Assign04

### Setup
Download and install [XAMPP](https://www.apachefriends.org/index.html) (available on all platforms). Clone this repository into the /xampp/htdocs/ folder. Start Apache and MySQL through the XAMPP control panel. Naviagte to http://localhost/se3309_Assign04/src/ in any browser.

XAMPP installs it's own instance of MySQL. The database must be created within XAMPP's install of MySQL in order for the application to make database queries.

### Operation
This application uses a PHP backend to make database queries. The application makes the backend requests via AJAX. The backend returns results in JSON. JQuery is then used to populate the webpage with the results.

### Frameworks and Libraries
This application make use of JQuery and Bootstrap CSS 4.