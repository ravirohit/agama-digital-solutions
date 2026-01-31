if github username: ravirohit
repository name: the-wedding-pitara.github.io
So, url to access it is: https://ravirohit.github.io/the-wedding-pitara.github.io/

Steps to deploy static page in github:
    Go to your repository on GitHub: the-wedding-pitara.github.io.
    Click on the Settings tab (top right).
    On the left sidebar, click Pages.
    Under Build and deployment > Branch:
    Ensure it is set to master (or main).
    Ensure the folder is set to / (root).
    Click Save.

Steps to server these static file using python server: 
    go to the directory C:\Users\ravis\Documents\Agama Digital Software Applications\agama-web-desinger
    Start the python server: 
      #python -m http.server 8000 
    access the website usring url: http://localhost:8000/
    What happens when we access url:
        The server looks for index.html in your workspace folder
        When your JavaScript fetches comments.json, the server reads that file and serves it with proper HTTP headers
        All CSS, JS, and image files are served the same way
