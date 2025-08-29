# pin pkgs to version nixos-23.05, commit found in https://status.nixos.org/
{ pkgs ? import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/4077a0e4ac3356222bc1f0a070af7939c3098535.tar.gz") {} }:

pkgs.mkShell {
  buildInputs = [
    (pkgs.postgresql_15.withPackages (p: [ p.postgis ]))
    pkgs.awscli2
    pkgs.zsh
  ];

  shellHook = ''
    # load .env.local values
    set -a # automatically exports all variables
    source .env.local
    set +a

    # local vars
    db_file=".tmp/$PGDATABASE"

    # create postgres db file if not there
    [ -e "$db_file" ] || initdb -D "$db_file" --no-locale
    # start postgres server
    pg_ctl -D "$db_file" -l pg-logfile start 1>/dev/null

    existing_db=`psql -lqt | cut -d \| -f 1 | grep $PGDATABASE`
    # if [ $existing_db != $PGDATABASE ]; then
      createdb $PGDATABASE
    # fi
    
    # check user and database and create them if they dont exist
    existing_user=`psql -qtAX -U $PGUSER -d $PGDATABASE -c "SELECT usename FROM pg_user WHERE usename = '$PGUSER';"`
    # if [ $existing_user != $PGUSER ]; then
      createuser $PGUSER
      psql -U $PGUSER -d $PGDATABASE -c "GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO $PGUSER;"
    # fi

    # since we are using an old node unset ssl options here
    export NODE_OPTIONS=""
    export HISTFILE=$PWD/.zsh_history

    ${pkgs.zsh}/bin/zsh --login

    echo "[ATTENTION] Press cmd+d to shut the server down gracefully."

    # stop server on shell exit
    trap "pg_ctl -D $db_file stop" EXIT

  '';
}
