# (Build)
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .


ENV VITE_FIREBASE_API_KEY=AIzaSyCH-FTwQgYxyiwVxf8ZWvwspgeUgleIAHY
ENV VITE_FIREBASE_AUTH_DOMAIN=medical-appointment-syst-7d642.firebaseapp.com
ENV VITE_FIREBASE_PROJECT_ID=medical-appointment-syst-7d642
ENV VITE_FIREBASE_STORAGE_BUCKET=medical-appointment-syst-7d642.firebasestorage.app
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=635827260336
ENV VITE_FIREBASE_APP_ID=1:635827260336:web:7f245c5a7b597def7a6475
ENV VITE_FIREBASE_MEASUREMENT_ID=G-BB0D4GZKJJ


RUN npm run build


FROM nginx:stable-alpine
COPY --from=build /app/dist /usr/share/nginx/html
RUN echo 'server { listen 80; location / { root /usr/share/nginx/html; index index.html; try_files $uri $uri/ /index.html; } }' > /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]