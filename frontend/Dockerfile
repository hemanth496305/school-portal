FROM nginx:latest

# Copy all HTML, CSS, and image files into Nginx web folder
COPY . /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

