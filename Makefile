PWD=$(shell pwd)
VER=1.05
NAME=Cloudian-S3CliHelper
PNAME=$(NAME)-$(VER)
RPMTOP=~/rpmbuild
SPEC=frontend

prep:
	mkdir -p $(RPMTOP)/SOURCES
	mkdir -p $(RPMTOP)/RPMS/noarch
	mkdir -p $(RPMTOP)/SRPMS
clean: 
	rm -rf $(PNAME) $(PNAME)*rpm $(PNAME)*.zip


diff: clean
	git diff > diffs.txt
	nedit diffs.txt &

refresh:
	sudo cp -avpf *.html /opt/Cloudian/HyperCamp/www/
	sudo cp -avpf config.js /opt/Cloudian/HyperCamp/www/
	sudo cp -avpf js/tools.js /opt/Cloudian/HyperCamp/www/js/


install: 
	echo "destdir=$(DESTDIR)"
	mkdir -p $(DESTDIR)/opt/Cloudian/HyperCamp/www/js
	
	install -m 400 css/*.css $(DESTDIR)/opt/Cloudian/HyperCamp/www/css/
	install -m 400 s3clihelper.html $(DESTDIR)/opt/Cloudian/HyperCamp/www/
	install -m 400 js/tools.js $(DESTDIR)/opt/Cloudian/HyperCamp/www/js/
	install -m 400 config.js  $(DESTDIR)/opt/Cloudian/HyperCamp/www/
	install -m 400 fvw.png  $(DESTDIR)/opt/Cloudian/HyperCamp/www/
	
zip: clean
	mkdir -p $(PNAME)
	cp -avpf css $(PNAME)/
	cp -avpf s3clihelper.html $(PNAME)/
	cp -avpf fvw.png $(PNAME)/
	cp -avpf js $(PNAME)/
	cp -avpf config.js $(PNAME)/
	cp -avpf webfonts $(PNAME)/
	zip -r $(PNAME).zip $(PNAME)
	sudo install -m 444 $(PNAME).zip  $(DESTDIR)/opt/Cloudian/HyperCamp/www/

rpms:
	#begin standard prep
	mkdir -p $(PNAME)
	
	cp -avpf css $(PNAME)/
	cp -avpf s3clihelper.html $(PNAME)/
	cp -avpf fvw.png $(PNAME)/
	cp -avpf js $(PNAME)/
	cp -avpf config.js $(PNAME)/
	cp -avpf webfonts $(PNAME)/

	cp Makefile $(PNAME)/Makefile
	touch $(PNAME)/configure
	chmod 755 $(PNAME)/configure
	#end standard prep
	
	tar -cvp $(PNAME) -f - | gzip > $(RPMTOP)/SOURCES/$(PNAME).tar.gz
	rpmbuild -ba ./$(SPEC).spec --target noarch
	mv -vf $(RPMTOP)/RPMS/noarch/$(NAME)-* .
	mv -vf $(RPMTOP)/SRPMS/$(NAME)-* .


upload:
	./upload.sh
