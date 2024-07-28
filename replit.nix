{ pkgs }: {
  deps = [
    pkgs.python3
    pkgs.nodejs
    pkgs.python3Packages.pip
  ];

  shellHook = ''
    echo "Setting up the backend..."
    cd Backend
    pip install -r requirements.txt

    echo "Setting up the frontend..."
    cd ../frontend
    npm install

    echo "Starting the servers..."
    cd ../Backend
    python manage.py runserver 0.0.0.0:8000 &

    cd ../frontend
    npm start
  '';
}
