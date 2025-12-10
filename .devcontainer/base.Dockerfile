# syntax=docker/dockerfile:1.5
# HugoBlox devcontainer base image

FROM mcr.microsoft.com/devcontainers/go:1.22-bookworm

ARG NODE_VERSION=20
ARG PNPM_VERSION=10.14.0
ARG HUGO_VERSION=0.152.2

ENV DEBIAN_FRONTEND=noninteractive
ENV PNPM_HOME=/home/vscode/.local/share/pnpm
ENV PATH=${PNPM_HOME}:/usr/local/go/bin:${PATH}

USER root

RUN set -eux; \
    apt-get update; \
    apt-get install -y --no-install-recommends ca-certificates curl gnupg; \
    NODE_MAJOR="${NODE_VERSION%%.*}"; \
    curl -fsSL "https://deb.nodesource.com/setup_${NODE_MAJOR}.x" | bash -; \
    apt-get install -y --no-install-recommends nodejs; \
    corepack enable; \
    corepack prepare "pnpm@${PNPM_VERSION}" --activate; \
    mkdir -p "${PNPM_HOME}"; \
    chown -R vscode:vscode "${PNPM_HOME}"; \
    ARCH="$(uname -m)"; \
    if [ "$ARCH" = "x86_64" ] || [ "$ARCH" = "amd64" ]; then \
        HUGO_ARCH="amd64"; \
    elif [ "$ARCH" = "aarch64" ] || [ "$ARCH" = "arm64" ]; then \
        HUGO_ARCH="arm64"; \
    else \
        echo "Unsupported architecture: ${ARCH}"; \
        exit 1; \
    fi; \
    HUGO_PKG="hugo_extended_${HUGO_VERSION}_Linux-${HUGO_ARCH}.tar.gz"; \
    curl -fsSL -o "/tmp/${HUGO_PKG}" "https://github.com/gohugoio/hugo/releases/download/v${HUGO_VERSION}/${HUGO_PKG}"; \
    tar -xzf "/tmp/${HUGO_PKG}" -C /tmp hugo; \
    install -m 0755 /tmp/hugo /usr/local/bin/hugo; \
    rm -rf "/tmp/${HUGO_PKG}" /tmp/hugo; \
    apt-get clean; \
    rm -rf /var/lib/apt/lists/*

USER vscode
