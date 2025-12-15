### Run local mail service
```
aiosmtpd -n -c aiosmtpd.handlers.Debugging -l localhost:8025
```
before 
```
export MAIL_SERVER=localhost
export MAIL_PORT=8025
```

```
docker run --name elasticsearch -d --rm -p 9200:9200 \
  -m 2GB \
  -e discovery.type=single-node \
  -e xpack.security.enabled=false \
  -e xpack.security.enrollment.enabled=false \
  -e ES_JAVA_OPTS="-Xms1g -Xmx1g" \
  docker.elastic.co/elasticsearch/elasticsearch:9.2.2
```

```
curl http://localhost:9200 
```