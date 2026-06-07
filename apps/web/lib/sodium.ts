import _sodium from "libsodium-wrappers";

await _sodium.ready;

export function getKeyPair() {
  return _sodium.crypto_box_keypair();
}

export function encryptMessage(
  message: string,
  receiverPublicKey: Uint8Array<ArrayBufferLike>,
  senderPrivateKey: Uint8Array<ArrayBufferLike>,
) {
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  return _sodium.crypto_box_easy(
    message,
    nonce,
    receiverPublicKey,
    senderPrivateKey,
  );
}

export function decryptMessage(
  message: string,
  receiverPublicKey: Uint8Array<ArrayBufferLike>,
  senderPrivateKey: Uint8Array<ArrayBufferLike>,
) {
  const rawMessage = _sodium.from_string(message);
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  return _sodium.to_string(
    _sodium.crypto_box_open_easy(
      rawMessage,
      nonce,
      receiverPublicKey,
      senderPrivateKey,
    ),
  );
}
