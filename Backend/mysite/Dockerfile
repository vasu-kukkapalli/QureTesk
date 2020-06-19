FROM django

ADD . /mysite

WORKDIR /mysite

COPY requirements.txt /mysite

RUN pip install -r requirements.txt

EXPOSE 8000

CMD [ "python", "manage.py", "runserver", "0.0.0.0:8000" ]