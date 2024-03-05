echo "Restarting gunicorn server..."
kill -HUP `cat app.pid`
echo "Gunicorn server restarted"