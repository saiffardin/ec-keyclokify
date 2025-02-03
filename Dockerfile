FROM quay.io/keycloak/keycloak:22.0.4 AS builder
WORKDIR /opt/keycloak
COPY /dist_keycloak/keycloak-theme-for-kc-22-to-25.jar /opt/keycloak/providers/
RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:22.0.4
COPY --from=builder /opt/keycloak/ /opt/keycloak/
ENV KC_HOSTNAME=localhost
ENTRYPOINT ["/opt/keycloak/bin/kc.sh", "start-dev"]

# yarn build-keycloak-theme

# sudo docker build -t ec-keycloak-app .
# sudo docker run -e KEYCLOAK_ADMIN=admin -e KEYCLOAK_ADMIN_PASSWORD=admin -p 8080:8080 ec-keycloak-app

