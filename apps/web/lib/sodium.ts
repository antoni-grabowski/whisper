import _sodium from "libsodium-wrappers";

await _sodium.ready;

export function getKeyPair() {
  return _sodium.crypto_box_keypair();
}

export function encryptMessage(
  message: string,
  receiverPublicKey: string,
  senderPrivateKey: string,
) {
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  return _sodium.crypto_box_easy(
    message,
    nonce,
    _sodium.from_base64(receiverPublicKey),
    _sodium.from_base64(senderPrivateKey),
  );
}

export function decryptMessage(
  message: string,
  receiverPublicKey: string,
  senderPrivateKey: string,
) {
  const rawMessage = _sodium.from_string(message);
  const nonce = _sodium.randombytes_buf(_sodium.crypto_box_NONCEBYTES);
  return _sodium.to_string(
    _sodium.crypto_box_open_easy(
      rawMessage,
      nonce,
      _sodium.from_base64(receiverPublicKey),
      _sodium.from_base64(senderPrivateKey),
    ),
  );
}
