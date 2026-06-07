# Whisper

## Sample tech stack

Frontend:
Next.js + TypeScript
Tailwind CSS
shadcn/ui
Framer Motion, optional

Backend:
Node.js + TypeScript
Fastify
Socket.IO

Database:
Redis for live rooms / rate limits / ephemeral state

Crypto:
libsodium-wrappers in the browser

## Practical threats

| Threat                               | Protected? | How                                           |
| ------------------------------------ | ---------- | --------------------------------------------- |
| Server reads messages                | Yes        | E2E encryption, server only relays ciphertext |
| Server links identity to messages    | Yes        | No accounts, ephemeral session IDs            |
| DB breach exposes history            | Yes        | No message storage                            |
| Traffic analysis (who talked to who) | Partial    | Don't log IPs; timing still visible to server |
| Real identity (IP)                   | No         | Requires user to use Tor/VPN                  |

## Features

E2E enctryption via Diffie-Hellman using libsodium

## ToDo

### Connecting both users

### Displaying the host users code

### Animations (Optional)

### Constant connection of users via sockets

### End-to-End encryption of messages

### Temporary user creation based on website session
