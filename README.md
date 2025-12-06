### Run local mail service
```
aiosmtpd -n -c aiosmtpd.handlers.Debugging -l localhost:8025
```
before 
```
export MAIL_SERVER=localhost
export MAIL_PORT=8025
```